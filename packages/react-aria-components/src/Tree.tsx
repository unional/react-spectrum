/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {AriaTreeGridListProps, useTreeGridList, useTreeGridListItem} from '@react-aria/tree';
import {BaseCollection, CollectionChildren, CollectionContext, CollectionProps, createBranchComponent, createLeafComponent, ItemRenderProps, NodeValue, useCachedChildren, useCollection} from './Collection';
import {ButtonContext} from './Button';
import {CheckboxContext} from './RSPContexts';
import {ContextValue, DEFAULT_SLOT, forwardRefType, Provider, RenderProps, ScrollableProps, SlotProps, StyleRenderProps, useContextProps, useRenderProps} from './utils';
import {DisabledBehavior, Expandable, HoverEvents, Key, LinkDOMProps} from '@react-types/shared';
import {filterDOMProps, useObjectRef} from '@react-aria/utils';
import {FocusScope,  mergeProps, useFocusRing, useGridListSelectionCheckbox, useHover} from 'react-aria';
import {getLastItem} from '@react-stately/collections';
import {Collection as ICollection, Node, SelectionBehavior, TreeState, useTreeState} from 'react-stately';
import React, {createContext, ForwardedRef, forwardRef, HTMLAttributes, JSX, ReactNode, RefObject, useContext, useEffect, useMemo, useRef} from 'react';
import {useControlledState} from '@react-stately/utils';
class TreeCollection<T> implements ICollection<Node<T>> {
  private flattenedRows: Node<T>[];
  private keyMap: Map<Key, NodeValue<T>> = new Map();

  constructor(opts) {
    let {collection, expandedKeys} = opts;
    let {flattenedRows, keyMap} = flattenTree<T>(collection, {expandedKeys});
    this.flattenedRows = flattenedRows;
    // Use generated keyMap because it contains the modified collection nodes (aka it adjusts the indexes so that they ignore the existence of the Content items)
    this.keyMap = keyMap;
  }

  // TODO: should this collection's getters reflect the flattened structure or the original structure
  // If we respresent the flattened structure, it is easier for the keyboard nav but harder to find all the nodes
  *[Symbol.iterator]() {
    yield* this.flattenedRows;
  }

  get size() {
    return this.flattenedRows.length;
  }

  getKeys() {
    return this.keyMap.keys();
  }

  getItem(key: Key): Node<T> | null {
    return this.keyMap.get(key) || null;
  }

  at(idx: number) {
    return this.flattenedRows[idx];
  }

  getFirstKey() {
    return this.flattenedRows[0]?.key;
  }

  getLastKey() {
    return this.flattenedRows[this.size - 1]?.key;
  }

  getKeyAfter(key: Key) {
    let index = this.flattenedRows.findIndex(row => row.key === key);
    return this.flattenedRows[index + 1]?.key;
  }

  getKeyBefore(key: Key) {
    let index = this.flattenedRows.findIndex(row => row.key === key);
    return this.flattenedRows[index - 1]?.key;
  }

  // Note that this will return Content nodes in addition to nested TreeItems
  getChildren(key: Key): Iterable<Node<T>> {
    let keyMap = this.keyMap;
    return {
      *[Symbol.iterator]() {
        let parent = keyMap.get(key);
        let node = parent?.firstChildKey != null ? keyMap.get(parent.firstChildKey) : null;
        while (node) {
          yield node as Node<T>;
          node = node.nextKey != null ? keyMap.get(node.nextKey) : undefined;
        }
      }
    };
  }

  getTextValue(key: Key): string {
    let item = this.getItem(key);
    return item ? item.textValue : '';
  }
}

export interface TreeRenderProps {
  /**
   * Whether the tree has no items and should display its empty state.
   * @selector [data-empty]
   */
  isEmpty: boolean,
  /**
   * Whether the tree is currently focused.
   * @selector [data-focused]
   */
  isFocused: boolean,
  /**
   * Whether the tree is currently keyboard focused.
   * @selector [data-focus-visible]
   */
  isFocusVisible: boolean,
  /**
   * State of the tree.
   */
  state: TreeState<unknown>
}

// So far two approaches that come to mind:
// 1. Have the user provide loadingKeys and renderLoadingElement (name TBD). We can use the keys and the collection within to track when/where to render the extra loading elements
// things to consider/do: the parent will need to have an updated set size for the additional row? Right now we don't do this in RSP for TableView and ListView
// 2. Have the user provide a separate collection element for their load more spinner. We would then just render that as is? Might looks something like this:
// const DynamicTreeItem = (props: DynamicTreeItemProps) => {
//   let {childItems} = props;
//   return (
//     <UNSTABLE_TreeItem>
//       <UNSTABLE_TreeItemContent>
//         {({isExpanded, hasChildRows, level, selectionBehavior, selectionMode}) => (
//          {... cells and buttons}
//       </UNSTABLE_TreeItemContent>
//       // the nested rows below
//       <Collection items={childItems}>
//         {(item: any) => (
//           <>
//             <DynamicTreeItem childItems={item.childItems} textValue={item.name} href={props.href}>
//               {item.name}
//             </DynamicTreeItem>
//           </>
//         )}
//       </Collection>
//     </UNSTABLE_TreeItem>
//     {loadingKeys.contain(props.id) && this is last child row of said parent && <Loader>{...what ever the user wants to render here}</Loader>}
//   );
// };
// TODO can't do #2 for since it will sometimes render the loader between a row and its nested children. This specifically happens when said row is the last row of its isLoading parent
// see stash stash@{0}: WIP on load_more_rac: 2d2e8b6a4 rough approach for having user provide loading element to rac collection element

export interface TreeProps<T> extends Omit<AriaTreeGridListProps<T>, 'children'>, CollectionProps<T>, StyleRenderProps<TreeRenderProps>, SlotProps, ScrollableProps<HTMLDivElement>, Expandable {
  /** How multiple selection should behave in the tree. */
  selectionBehavior?: SelectionBehavior,
  /** Provides content to display when there are no items in the list. */
  renderEmptyState?: (props: Omit<TreeRenderProps, 'isEmpty'>) => ReactNode,
  /**
   * Whether `disabledKeys` applies to all interactions, or only selection.
   * @default 'selection'
   */
  disabledBehavior?: DisabledBehavior
}


export const UNSTABLE_TreeContext = createContext<ContextValue<TreeProps<any>, HTMLDivElement>>(null);
export const UNSTABLE_TreeStateContext = createContext<TreeState<any> | null>(null);

function Tree<T extends object>(props: TreeProps<T>, ref: ForwardedRef<HTMLDivElement>) {
  // Render the portal first so that we have the collection by the time we render the DOM in SSR.
  [props, ref] = useContextProps(props, ref, UNSTABLE_TreeContext);
  let {collection, portal} = useCollection(props);
  let dependencies = useMemo(() => ({dependencies: props.dependencies}), [props.dependencies]);
  return (
    <>
      <CollectionContext.Provider value={dependencies}>
        {portal}
      </CollectionContext.Provider>
      <TreeInner props={props} collection={collection} treeRef={ref} />
    </>
  );
}

interface TreeInnerProps<T extends object> {
  props: TreeProps<T>,
  collection: BaseCollection<T>,
  treeRef: RefObject<HTMLDivElement>
}

function TreeInner<T extends object>({props, collection, treeRef: ref}: TreeInnerProps<T>) {
  let {
    selectionMode = 'none',
    expandedKeys: propExpandedKeys,
    defaultExpandedKeys: propDefaultExpandedKeys,
    onExpandedChange,
    disabledBehavior = 'selection'
  } = props;

  // Kinda annoying that we have to replicate this code here as well as in useTreeState, but don't want to add
  // flattenCollection stuff to useTreeState. Think about this later
  let [expandedKeys, setExpandedKeys] = useControlledState(
    propExpandedKeys ? convertExpanded(propExpandedKeys) : undefined,
    propDefaultExpandedKeys ? convertExpanded(propDefaultExpandedKeys) : new Set(),
    onExpandedChange
  );

  let flattenedCollection = useMemo(() => {
    return new TreeCollection<object>({collection, expandedKeys});
  }, [collection, expandedKeys]);

  let state = useTreeState({
    ...props,
    selectionMode,
    expandedKeys,
    onExpandedChange: setExpandedKeys,
    collection: flattenedCollection,
    children: undefined,
    disabledBehavior
  });

  let {gridProps} = useTreeGridList(props, state, ref);

  let {focusProps, isFocused, isFocusVisible} = useFocusRing();
  let renderValues = {
    isEmpty: state.collection.size === 0,
    isFocused,
    isFocusVisible,
    state
  };

  let renderProps = useRenderProps({
    className: props.className,
    style: props.style,
    defaultClassName: 'react-aria-Tree',
    values: renderValues
  });

  let emptyState: ReactNode = null;
  let emptyStatePropOverrides: HTMLAttributes<HTMLElement> | null = null;
  if (state.collection.size === 0 && props.renderEmptyState) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let {isEmpty, ...values} = renderValues;
    let content = props.renderEmptyState({...values});
    let treeGridRowProps = {
      'aria-level': 1,
      'aria-posinset': 1,
      'aria-setsize': 1
    };

    emptyState = (
      <div role="row" style={{display: 'contents'}} {...treeGridRowProps}>
        <div role="gridcell" style={{display: 'contents'}}>
          {content}
        </div>
      </div>
    );
  }

  return (
    <FocusScope>
      <div
        {...filterDOMProps(props)}
        {...renderProps}
        {...mergeProps(gridProps, focusProps, emptyStatePropOverrides)}
        ref={ref}
        slot={props.slot || undefined}
        onScroll={props.onScroll}
        data-empty={state.collection.size === 0 || undefined}
        data-focused={isFocused || undefined}
        data-focus-visible={isFocusVisible || undefined}>
        <Provider
          values={[
            [UNSTABLE_TreeStateContext, state]
          ]}>
          <CollectionChildren collection={state.collection} />
        </Provider>
        {emptyState}
      </div>
    </FocusScope>
  );
}

/**
 * A tree provides users with a way to navigate nested hierarchical information, with support for keyboard navigation
 * and selection.
 */
const _Tree = /*#__PURE__*/ (forwardRef as forwardRefType)(Tree);
export {_Tree as UNSTABLE_Tree};

// TODO: readd the rest of the render props when tree supports them
export interface TreeItemRenderProps extends Omit<ItemRenderProps, 'allowsDragging' | 'isDragging' | 'isDropTarget'> {
  /** Whether the tree item is expanded. */
  isExpanded: boolean,
  // TODO: api discussion, how do we feel about the below? This is so we can still style the row as grey when a child element within is focused
  // Maybe should have this for the other collection item render props
  /** Whether the tree item's children have keyboard focus. */
  isFocusVisibleWithin: boolean
}

export interface TreeItemContentRenderProps extends ItemRenderProps {
  // Whether the tree item is expanded.
  isExpanded: boolean,
  // Whether the tree item has child rows.
  hasChildRows: boolean,
  // What level the tree item has within the tree.
  level: number,
  // Whether the tree item's children have keyboard focus.
  isFocusVisibleWithin: boolean
}

// The TreeItemContent is the one that accepts RenderProps because we would get much more complicated logic in TreeItem otherwise since we'd
// need to do a bunch of check to figure out what is the Content and what are the actual collection elements (aka child rows) of the TreeItem
export interface TreeItemContentProps extends Pick<RenderProps<TreeItemContentRenderProps>, 'children'> {}

// TODO does this need ref or context? Its only used to shallowly render the Content node... If it was a more generic collection component then I could see an argument for it
// having those
export const UNSTABLE_TreeItemContent = /*#__PURE__*/ createLeafComponent('content', function TreeItemContent(props: TreeItemContentProps) {
  let values = useContext(TreeItemContentContext)!;
  let renderProps = useRenderProps({
    children: props.children,
    values
  });
  return renderProps.children as JSX.Element;
});

export const TreeItemContentContext = createContext<TreeItemContentRenderProps | null>(null);

export interface TreeItemProps<T = object> extends StyleRenderProps<TreeItemRenderProps>, LinkDOMProps, HoverEvents {
  /** The unique id of the tree row. */
  id?: Key,
  /** The object value that this tree item represents. When using dynamic collections, this is set automatically. */
  value?: T,
  /** A string representation of the tree item's contents, used for features like typeahead. */
  textValue: string,
  /** An accessibility label for this tree item. */
  'aria-label'?: string,
  // TODO: made this required since the user needs to pass Content at least
  /** The content of the tree item along with any nested children. Supports static nested tree items or use of a Collection to dynamically render nested tree items. */
  children: ReactNode
}

/**
 * A TreeItem represents an individual item in a Tree.
 */
export const UNSTABLE_TreeItem = /*#__PURE__*/ createBranchComponent('item', <T extends object>(props: TreeItemProps<T>, ref: ForwardedRef<HTMLDivElement>, item: Node<T>) => {
  let state = useContext(UNSTABLE_TreeStateContext)!;
  ref = useObjectRef<HTMLDivElement>(ref);

  // TODO: remove this when we support description in tree row
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let {rowProps, gridCellProps, expandButtonProps, descriptionProps, ...states} = useTreeGridListItem({node: item}, state, ref);
  let isExpanded = rowProps['aria-expanded'] === true;
  let hasChildRows = [...state.collection.getChildren!(item.key)]?.length > 1;
  let level = rowProps['aria-level'] || 1;

  let {hoverProps, isHovered} = useHover({
    isDisabled: !states.allowsSelection && !states.hasAction,
    onHoverStart: props.onHoverStart,
    onHoverChange: props.onHoverChange,
    onHoverEnd: props.onHoverEnd
  });

  let {isFocusVisible, focusProps} = useFocusRing();
  let {
    isFocusVisible: isFocusVisibleWithin,
    focusProps: focusWithinProps
  } = useFocusRing({within: true});
  let {checkboxProps} = useGridListSelectionCheckbox(
    {key: item.key},
    state
  );

  let renderPropValues = React.useMemo<TreeItemContentRenderProps>(() => ({
    ...states,
    isHovered,
    isFocusVisible,
    isExpanded,
    hasChildRows,
    level,
    selectionMode: state.selectionManager.selectionMode,
    selectionBehavior: state.selectionManager.selectionBehavior,
    isFocusVisibleWithin
  }), [states, isHovered, isFocusVisible, state.selectionManager, isExpanded, hasChildRows, level, isFocusVisibleWithin]);

  let renderProps = useRenderProps({
    ...props,
    id: undefined,
    children: item.rendered,
    defaultClassName: 'react-aria-TreeItem',
    values: renderPropValues
  });

  useEffect(() => {
    if (!item.textValue) {
      console.warn('A `textValue` prop is required for <TreeItem> elements in order to support accessibility features such as type to select.');
    }
  }, [item.textValue]);

  let expandButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (hasChildRows && !expandButtonRef.current) {
      console.warn('Expandable tree items must contain a expand button so screen reader users can expand/collapse the item.');
    }
  // eslint-disable-next-line
  }, []);

  let children = useCachedChildren({
    items: state.collection.getChildren!(item.key),
    children: item => {
      switch (item.type) {
        case 'content': {
          return item.render!(item);
        }
        // Skip item since we don't render the nested rows as children of the parent row, the flattened collection
        // will render them each as siblings instead
        case 'item':
          return <></>;
        default:
          throw new Error('Unsupported element type in TreeRow: ' + item.type);
      }
    }
  });

  return (
    <>
      <div
        {...mergeProps(filterDOMProps(props as any), rowProps, focusProps, hoverProps, focusWithinProps)}
        {...renderProps}
        ref={ref}
        // TODO: missing selectionBehavior, hasAction and allowsSelection data attribute equivalents (available in renderProps). Do we want those?
        data-expanded={hasChildRows ? isExpanded : undefined}
        data-has-child-rows={hasChildRows}
        data-level={level}
        data-selected={states.isSelected || undefined}
        data-disabled={states.isDisabled || undefined}
        data-hovered={isHovered || undefined}
        data-focused={states.isFocused || undefined}
        data-focus-visible={isFocusVisible || undefined}
        data-pressed={states.isPressed || undefined}
        data-selection-mode={state.selectionManager.selectionMode === 'none' ? undefined : state.selectionManager.selectionMode}>
        <div {...gridCellProps} style={{display: 'contents'}}>
          <Provider
            values={[
              [CheckboxContext, {
                slots: {
                  selection: checkboxProps
                }
              }],
              // TODO: support description in the tree row
              // TODO: don't think I need to pass isExpanded to the button here since it can be sourced from the renderProps? Might be worthwhile passing it down?
              [ButtonContext, {
                slots: {
                  [DEFAULT_SLOT]: {},
                  chevron: {
                    ...expandButtonProps,
                    ref: expandButtonRef
                  }
                }
              }],
              [TreeItemContentContext, {
                ...renderPropValues
              }]
            ]}>
            {children}
          </Provider>
        </div>
      </div>
    </>
  );
});


// TOOD: decide what props this would need if any
// TODO: this needs the type of 'item' to get the proper level value calculated by Collection. Providing any other type means our level is off by one for any loaders that would appear deeper than root level
export const UNSTABLE_TreeLoader = createLeafComponent('item', function TreeLoader<T extends object>(props: any,  ref: ForwardedRef<HTMLDivElement>, item: Node<T>) {
  let state = useContext(UNSTABLE_TreeStateContext);
  // TODO: might be able to still leverage the hook for the row information, but for now just manaully calc
  // let {rowProps, gridCellProps, expandButtonProps, descriptionProps, ...states} = useTreeGridListItem({node: item}, state, ref);
  // let level = rowProps['aria-level'] || 1;

  let setSize = 0;
  if (item?.level && state != null) {
    if (item.level > 0) {
      let tableChildren = item?.parentKey && state.collection.getChildren && state.collection.getChildren?.(item.parentKey);
      let lastItem = tableChildren ? getLastItem(tableChildren) : null;
      setSize = lastItem && lastItem.index ? lastItem.index + 1 : 1;
    } else if (item.level === 0) {
      // TODO figure out why lint is yelling about this
      setSize = state?.collection ? [...state.collection].filter(row => row?.level === 0).at(-1)?.index + 1 : 1;
    }
  }

  let rowProps = {
    'aria-level': item && item.level ? item.level + 1 : 1,
    'aria-posinset': item && item.index ? item?.index + 1 : 1,
    'aria-setsize': setSize
  };

  let renderProps = useRenderProps({
    ...props,
    id: undefined,
    children: item.rendered,
    defaultClassName: 'react-aria-TreeLoader'
    // TODO: what loader render props do we need
  });

  return (
    <>
      <div
        role="row"
        ref={ref}
        {...mergeProps(filterDOMProps(props as any), rowProps)}
        {...renderProps}
        data-level={item.level + 1}>
        <div role="gridcell" aria-colindex={1}>
          {renderProps.children}
        </div>
      </div>
    </>
  );
});

function convertExpanded(expanded: 'all' | Iterable<Key>): 'all' | Set<Key> {
  if (!expanded) {
    return new Set<Key>();
  }

  return expanded === 'all'
    ? 'all'
    : new Set(expanded);
}
interface TreeGridCollectionOptions {
  expandedKeys: Set<Key>
}

interface FlattenedTree<T> {
  flattenedRows: Node<T>[],
  keyMap: Map<Key, NodeValue<T>>
}

function flattenTree<T>(collection: TreeCollection<T>, opts: TreeGridCollectionOptions): FlattenedTree<T> {
  let {
    expandedKeys = new Set()
  } = opts;
  let keyMap: Map<Key, NodeValue<T>> = new Map();
  let flattenedRows: Node<T>[] = [];

  let visitNode = (node: Node<T>) => {
    if (node.type === 'item') {
      let parentKey = node?.parentKey;
      let clone = {...node};
      if (parentKey != null) {
        // TODO: assumes that non item content node (aka TreeItemContent always placed before Collection) will be always placed before the child rows. If we can't make this assumption then we can filter out
        // every non-item per level and assign indicies based off the node's position in said filtered array
        let hasContentNode = [...collection.getChildren(parentKey)][0].type !== 'item';
        if (hasContentNode) {
          clone.index = node?.index != null ? node?.index - 1 : 0;
        }
        keyMap.set(clone.key, clone as NodeValue<T>);
      } else {
        keyMap.set(node.key, node as NodeValue<T>);
      }

      if (node.level === 0 || (parentKey != null && expandedKeys.has(parentKey) && flattenedRows.find(row => row.key === parentKey))) {
        // Grab the modified node from the key map so our flattened list and modified key map point to the same nodes
        flattenedRows.push(keyMap.get(node.key) || node);
      }
    } else if (node.type !== null) {
      keyMap.set(node.key, node as NodeValue<T>);
    }

    for (let child of collection.getChildren(node.key)) {
      visitNode(child);
    }
  };

  for (let node of collection) {
    visitNode(node);
  }

  return {
    flattenedRows,
    keyMap
  };
}
