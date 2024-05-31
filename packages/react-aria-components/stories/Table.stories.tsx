/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {action} from '@storybook/addon-actions';
import {Button, Cell, Checkbox, CheckboxProps, Collection, Column, ColumnProps, ColumnResizer, Dialog, DialogTrigger, Heading, Menu, MenuTrigger, Modal, ModalOverlay, Popover, ResizableTableContainer, Row, Table, TableBody, TableHeader, useDragAndDrop} from 'react-aria-components';
import {isTextDropItem} from 'react-aria';
import {MyMenuItem} from './utils';
import React from 'react';
import styles from '../example/index.css';
import {UNSTABLE_TableLoader} from '../src/Table';
import {useListData} from 'react-stately';

export default {
  title: 'React Aria Components'
};

const ReorderableTable = ({initialItems}: {initialItems: {id: string, name: string}[]}) => {
  let list = useListData({initialItems});

  const {dragAndDropHooks} = useDragAndDrop({
    getItems: keys => {
      return [...keys].map(k => {
        const item = list.getItem(k);
        return {
          'text/plain': item.id,
          item: JSON.stringify(item)
        };
      });
    },
    getDropOperation: () => 'move',
    onReorder: e => {
      if (e.target.dropPosition === 'before') {
        list.moveBefore(e.target.key, e.keys);
      } else if (e.target.dropPosition === 'after') {
        list.moveAfter(e.target.key, e.keys);
      }
    },
    onInsert: async e => {
      const processedItems = await Promise.all(
        e.items.filter(isTextDropItem).map(async item => JSON.parse(await item.getText('item')))
      );
      if (e.target.dropPosition === 'before') {
        list.insertBefore(e.target.key, ...processedItems);
      } else if (e.target.dropPosition === 'after') {
        list.insertAfter(e.target.key, ...processedItems);
      }
    },

    onDragEnd: e => {
      if (e.dropOperation === 'move' && !e.isInternal) {
        list.remove(...e.keys);
      }
    },

    onRootDrop: async e => {
      const processedItems = await Promise.all(
        e.items.filter(isTextDropItem).map(async item => JSON.parse(await item.getText('item')))
      );

      list.append(...processedItems);
    }
  });

  return (
    <Table aria-label="Reorderable table" dragAndDropHooks={dragAndDropHooks}>
      <TableHeader>
        <MyColumn isRowHeader defaultWidth="50%">Id</MyColumn>
        <MyColumn>Name</MyColumn>
      </TableHeader>
      <TableBody items={list.items} renderEmptyState={({isDropTarget}) => <span style={{color: isDropTarget ? 'red' : 'black'}}>Drop items here</span>}>
        {item => (
          <Row>
            <Cell>{item.id}</Cell>
            <Cell>{item.name}</Cell>
          </Row>
        )}
      </TableBody>
    </Table>
  );
};

export const ReorderableTableExample = () => (
  <>
    <ResizableTableContainer style={{width: 300, overflow: 'auto'}}>
      <ReorderableTable initialItems={[{id: '1', name: 'Bob'}]} />
    </ResizableTableContainer>
    <ResizableTableContainer style={{width: 300, overflow: 'auto'}}>
      <ReorderableTable initialItems={[{id: '2', name: 'Alex'}]} />
    </ResizableTableContainer>
  </>
);

export const TableExample = () => {
  let list = useListData({
    initialItems: [
      {id: 1, name: 'Games', date: '6/7/2020', type: 'File folder'},
      {id: 2, name: 'Program Files', date: '4/7/2021', type: 'File folder'},
      {id: 3, name: 'bootmgr', date: '11/20/2010', type: 'System file'},
      {id: 4, name: 'log.txt', date: '1/18/2016', type: 'Text Document'}
    ]
  });

  return (
    <ResizableTableContainer style={{width: 300, overflow: 'auto'}}>
      <Table aria-label="Example table">
        <TableHeader>
          <MyColumn isRowHeader defaultWidth="50%">Name</MyColumn>
          <MyColumn>Type</MyColumn>
          <MyColumn>Date Modified</MyColumn>
          <MyColumn>Actions</MyColumn>
        </TableHeader>
        <TableBody items={list.items}>
          {item => (
            <Row>
              <Cell>{item.name}</Cell>
              <Cell>{item.type}</Cell>
              <Cell>{item.date}</Cell>
              <Cell>
                <DialogTrigger>
                  <Button>Delete</Button>
                  <ModalOverlay
                    style={{
                      position: 'fixed',
                      zIndex: 100,
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      background: 'rgba(0, 0, 0, 0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    <Modal
                      style={{
                        background: 'Canvas',
                        color: 'CanvasText',
                        border: '1px solid gray',
                        padding: 30
                      }}>
                      <Dialog>
                        {({close}) => (<>
                          <Heading slot="title">Delete item</Heading>
                          <p>Are you sure?</p>
                          <Button onPress={close}>Cancel</Button>
                          <Button
                            onPress={() => {
                              close();
                              list.remove(item.id);
                            }}>
                            Delete
                          </Button>
                        </>)}
                      </Dialog>
                    </Modal>
                  </ModalOverlay>
                </DialogTrigger>
              </Cell>
            </Row>
          )}
        </TableBody>
      </Table>
    </ResizableTableContainer>
  );
};

let columns = [
  {name: 'Name', id: 'name', isRowHeader: true},
  {name: 'Type', id: 'type'},
  {name: 'Date Modified', id: 'date'}
];

let rows = [
  {id: 1, name: 'Games', date: '6/7/2020', type: 'File folder'},
  {id: 2, name: 'Program Files', date: '4/7/2021', type: 'File folder'},
  {id: 3, name: 'bootmgr', date: '11/20/2010', type: 'System file'},
  {id: 4, name: 'log.txt', date: '1/18/20167', type: 'Text Document'}
];

export const TableDynamicExample = () => {
  return (
    <Table aria-label="Files">
      <TableHeader columns={columns}>
        {(column) => (
          <Column isRowHeader={column.isRowHeader}>{column.name}</Column>
        )}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <Row columns={columns}>
            {(column) => {
              return <Cell>{item[column.id]}</Cell>;
            }}
          </Row>
        )}
      </TableBody>
    </Table>
  );
};


const MyColumn = (props: ColumnProps) => {
  return (
    <Column {...props}>
      {({startResize}) => (
        <div style={{display: 'flex'}}>
          <MenuTrigger>
            <Button style={{flex: 1, textAlign: 'left'}}>{props.children as React.ReactNode}</Button>
            <Popover>
              <Menu className={styles.menu} onAction={() => startResize()}>
                <MyMenuItem id="resize">Resize</MyMenuItem>
              </Menu>
            </Popover>
          </MenuTrigger>
          <ColumnResizer onHoverStart={action('onHoverStart')} onHoverChange={action('onHoverChange')} onHoverEnd={action('onHoverEnd')}>
            ↔
          </ColumnResizer>
        </div>
      )}
    </Column>
  );
};

interface FileItem {
  id: string,
  name: string,
  type: string
}

interface DndTableProps {
  initialItems: FileItem[],
  'aria-label': string,
  isDisabled?: boolean
}

const DndTable = (props: DndTableProps) => {
  let list = useListData({
    initialItems: props.initialItems
  });

  let {dragAndDropHooks} = useDragAndDrop({
    isDisabled: props.isDisabled,
    // Provide drag data in a custom format as well as plain text.
    getItems(keys) {
      return [...keys].map((key) => {
        let item = list.getItem(key);
        return {
          'custom-app-type': JSON.stringify(item),
          'text/plain': item.name
        };
      });
    },

    // Accept drops with the custom format.
    acceptedDragTypes: ['custom-app-type'],

    // Ensure items are always moved rather than copied.
    getDropOperation: () => 'move',

    // Handle drops between items from other lists.
    async onInsert(e) {
      let processedItems = await Promise.all(
          e.items
            .filter(isTextDropItem)
            .map(async item => JSON.parse(await item.getText('custom-app-type')))
        );
      if (e.target.dropPosition === 'before') {
        list.insertBefore(e.target.key, ...processedItems);
      } else if (e.target.dropPosition === 'after') {
        list.insertAfter(e.target.key, ...processedItems);
      }
    },

    // Handle drops on the collection when empty.
    async onRootDrop(e) {
      let processedItems = await Promise.all(
          e.items
            .filter(isTextDropItem)
            .map(async item => JSON.parse(await item.getText('custom-app-type')))
        );
      list.append(...processedItems);
    },

    // Handle reordering items within the same list.
    onReorder(e) {
      if (e.target.dropPosition === 'before') {
        list.moveBefore(e.target.key, e.keys);
      } else if (e.target.dropPosition === 'after') {
        list.moveAfter(e.target.key, e.keys);
      }
    },

    // Remove the items from the source list on drop
    // if they were moved to a different list.
    onDragEnd(e) {
      if (e.dropOperation === 'move' && !e.isInternal) {
        list.remove(...e.keys);
      }
    }
  });

  return (
    <Table
      aria-label={props['aria-label']}
      selectionMode="multiple"
      selectedKeys={list.selectedKeys}
      onSelectionChange={list.setSelectedKeys}
      dragAndDropHooks={dragAndDropHooks}>
      <TableHeader>
        <Column />
        <Column><MyCheckbox slot="selection" /></Column>
        <Column>ID</Column>
        <Column isRowHeader>Name</Column>
        <Column>Type</Column>
      </TableHeader>
      <TableBody items={list.items} renderEmptyState={() => 'Drop items here'}>
        {item => (
          <Row>
            <Cell><Button slot="drag">≡</Button></Cell>
            <Cell><MyCheckbox slot="selection" /></Cell>
            <Cell>{item.id}</Cell>
            <Cell>{item.name}</Cell>
            <Cell>{item.type}</Cell>
          </Row>
          )}
      </TableBody>
    </Table>
  );
};

type DndTableExampleProps = {
  isDisabledFirstTable?: boolean,
  isDisabledSecondTable?: boolean
}

export const DndTableExample = (props: DndTableExampleProps) => {
  return (
    <div style={{display: 'flex', gap: 12, flexWrap: 'wrap'}}>
      <DndTable
        initialItems={[
        {id: '1', type: 'file', name: 'Adobe Photoshop'},
        {id: '2', type: 'file', name: 'Adobe XD'},
        {id: '3', type: 'folder', name: 'Documents'},
        {id: '4', type: 'file', name: 'Adobe InDesign'},
        {id: '5', type: 'folder', name: 'Utilities'},
        {id: '6', type: 'file', name: 'Adobe AfterEffects'}
        ]}
        aria-label="First Table"
        isDisabled={props.isDisabledFirstTable} />
      <DndTable
        initialItems={[
        {id: '7', type: 'folder', name: 'Pictures'},
        {id: '8', type: 'file', name: 'Adobe Fresco'},
        {id: '9', type: 'folder', name: 'Apps'},
        {id: '10', type: 'file', name: 'Adobe Illustrator'},
        {id: '11', type: 'file', name: 'Adobe Lightroom'},
        {id: '12', type: 'file', name: 'Adobe Dreamweaver'}
        ]}
        aria-label="Second Table"
        isDisabled={props.isDisabledSecondTable} />
    </div>
  );
};

DndTableExample.args = {
  isDisabledFirstTable: false,
  isDisabledSecondTable: false
};

const MyCheckbox = ({children, ...props}: CheckboxProps) => {
  return (
    <Checkbox {...props}>
      {({isIndeterminate}) => (
        <>
          <div className="checkbox">
            <svg viewBox="0 0 18 18" aria-hidden="true">
              {isIndeterminate
                ? <rect x={1} y={7.5} width={15} height={3} />
                : <polyline points="1 9 7 14 15 4" />}
            </svg>
          </div>
          {children}
        </>
      )}
    </Checkbox>
  );
};

// TODO: note that there exists a problem if you combine dynamic cell rendering with static rows relying on automatic id generation, the collection will mess up due the id scoping being required
// This happened below when I added a fragment wrapper to the table and didn't forward the id to the row in the wrapper
// Will add warning for this and add a test
const TableLoadingBodyWrapper = (args: {isLoading: boolean}) => {
  return (
    <Table aria-label="Files">
      <TableHeader columns={columns}>
        {(column) => (
          <Column isRowHeader={column.isRowHeader}>{column.name}</Column>
        )}
      </TableHeader>
      <MyTableBody rows={rows} isLoading={args.isLoading}>
        {(item) => (
          <Row columns={columns}>
            {(column) => {
              return <Cell>{item[column.id]}</Cell>;
            }}
          </Row>
        )}
      </MyTableBody>
    </Table>
  );
};

function MyTableBody(props) {
  let {rows, children, isLoading, ...otherProps} = props;
  return (
    <TableBody {...otherProps}>
      <Collection items={rows}>
        {children}
      </Collection>
      {isLoading && (
        <UNSTABLE_TableLoader>Placeholder loader</UNSTABLE_TableLoader>
      )}
    </TableBody>
  );
}

export const TableLoadingBodyWrapperStory = {
  render: TableLoadingBodyWrapper,
  args: {
    isLoading: false
  },
  name: 'Table loading, table body wrapper with collection'
};

const TableLoadingRowRenderWrapper = (args: {isLoading: boolean}) => {
  return (
    <Table aria-label="Files">
      <TableHeader columns={columns}>
        {(column) => (
          <Column isRowHeader={column.isRowHeader}>{column.name}</Column>
        )}
      </TableHeader>
      <TableBody items={rows} dependencies={[args.isLoading]}>
        {(item) => (
          <MyRow columns={columns} isLoading={item.id === 4 && args.isLoading}>
            {(column) => {
              return <Cell>{item[column.id]}</Cell>;
            }}
          </MyRow>
        )}
      </TableBody>
    </Table>
  );
};

function MyRow(props) {
  return (
    <>
      {/* Note that all the props are propagated from MyRow to Row, ensuring the id propagates */}
      <Row {...props} />
      {props.isLoading && <UNSTABLE_TableLoader>Placeholder loader</UNSTABLE_TableLoader>}
    </>
  );
}

export const TableLoadingRowRenderWrapperStory = {
  render: TableLoadingRowRenderWrapper,
  args: {
    isLoading: false
  },
  name: 'Table loading, row renderer wrapper and dep array'
};


// TODO: when writing the docs, prefer this pattern in the docs, establish renderEmptyState as something distinct from empty + loading
// (aka users should use empty state for if their table is empty and not loading, but should render the TableLoader for empty + loading and for has items + loading)
// TODO: there is buggy behavior here, try keyboard naving the table when isLoading. Ideally everything should be disabled
const RenderEmptyState = (args: {isLoading: boolean}) => {
  return (
    <Table aria-label="Files" selectionMode="multiple">
      <TableHeader columns={columns}>
        <Column><MyCheckbox slot="selection" /></Column>
        <Collection items={columns}>
          {(column) => (

            <Column isRowHeader={column.isRowHeader}>{column.name}</Column>
          )}
        </Collection>
      </TableHeader>
      <TableBody renderEmptyState={() => 'No results found.'}>
        <Collection items={[]}>
          {(item) => (
            <Row columns={columns}>
              {(column) => {
                return <Cell>{item[column.id]}</Cell>;
              }}
            </Row>
          )}
        </Collection>
        {args.isLoading && (
          <UNSTABLE_TableLoader>Placeholder loader</UNSTABLE_TableLoader>
        )}
      </TableBody>
    </Table>
  );
};

export const RenderEmptyStateStory  = {
  render: RenderEmptyState,
  args: {
    isLoading: false
  },
  name: 'Empty/Loading Table rendered with TableLoader collection element'
};
