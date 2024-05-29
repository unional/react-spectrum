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

import {act, fireEvent, mockClickDefault, pointerMap, render, within} from '@react-spectrum/test-utils-internal';
import {Button, Cell, Checkbox, Collection, Column, ColumnResizer, DropIndicator, ResizableTableContainer, Row, Table, TableBody, TableHeader, useDragAndDrop, useTableOptions} from '../';
import React, {useMemo, useState} from 'react';
import {resizingTests} from '@react-aria/table/test/tableResizingTests';
import {setInteractionModality} from '@react-aria/interactions';
import userEvent from '@testing-library/user-event';

function MyColumn(props) {
  return (
    <Column {...props}>
      {({allowsSorting, sortDirection}) => (<>
        {props.children}
        {allowsSorting && (
          <span aria-hidden="true" className="sort-indicator">
            {sortDirection === 'ascending' ? '▲' : '▼'}
          </span>
        )}
        {props.allowsResizing && <ColumnResizer data-testid="resizer" />}
      </>)}
    </Column>
  );
}

function MyTableHeader({columns, children, ...otherProps}) {
  let {selectionBehavior, selectionMode, allowsDragging} = useTableOptions();

  return (
    <TableHeader {...otherProps}>
      {allowsDragging && <Column />}
      {selectionBehavior === 'toggle' && (
        <Column>{selectionMode === 'multiple' && <MyCheckbox />}</Column>
      )}
      <Collection items={columns}>
        {children}
      </Collection>
    </TableHeader>
  );
}

function MyRow({id, columns, children, ...otherProps}) {
  let {selectionBehavior, allowsDragging} = useTableOptions();

  return (
    <Row id={id} {...otherProps}>
      {allowsDragging && (
        <Cell>
          <Button slot="drag">≡</Button>
        </Cell>
      )}
      {selectionBehavior === 'toggle' && (
        <Cell>
          <MyCheckbox />
        </Cell>
      )}
      <Collection items={columns}>
        {children}
      </Collection>
    </Row>
  );
}

function MyCheckbox() {
  return (
    <Checkbox slot="selection">
      {({isIndeterminate}) => (
        <div className="checkbox">
          <svg viewBox="0 0 18 18">
            {isIndeterminate
              ? <rect x={1} y={7.5} width={15} height={3} />
              : <polyline points="1 9 7 14 15 4" />}
          </svg>
        </div>
      )}
    </Checkbox>
  );
}

let TestTable = ({tableProps, tableHeaderProps, columnProps, tableBodyProps, rowProps, cellProps}) => (
  <Table aria-label="Files" {...tableProps}>
    <MyTableHeader {...tableHeaderProps}>
      <MyColumn id="name" isRowHeader {...columnProps}>Name</MyColumn>
      <MyColumn {...columnProps}>Type</MyColumn>
      <MyColumn {...columnProps}>Date Modified</MyColumn>
    </MyTableHeader>
    <TableBody {...tableBodyProps}>
      <MyRow id="1" textValue="Games" {...rowProps}>
        <Cell {...cellProps}>Games</Cell>
        <Cell {...cellProps}>File folder</Cell>
        <Cell {...cellProps}>6/7/2020</Cell>
      </MyRow>
      <MyRow id="2" textValue="Program Files" {...rowProps}>
        <Cell {...cellProps}>Program Files</Cell>
        <Cell {...cellProps}>File folder</Cell>
        <Cell {...cellProps}>4/7/2021</Cell>
      </MyRow>
      <MyRow id="3" textValue="bootmgr" {...rowProps}>
        <Cell {...cellProps}>bootmgr</Cell>
        <Cell {...cellProps}>System file</Cell>
        <Cell {...cellProps}>11/20/2010</Cell>
      </MyRow>
    </TableBody>
  </Table>
);

let DraggableTable = (props) => {
  let {dragAndDropHooks} = useDragAndDrop({
    getItems: (keys) => [...keys].map((key) => ({'text/plain': key})),
    ...props
  });

  return <TestTable tableProps={{dragAndDropHooks}} />;
};

let DraggableTableWithSelection = (props) => {
  let {dragAndDropHooks} = useDragAndDrop({
    getItems: (keys) => [...keys].map((key) => ({'text/plain': key})),
    ...props
  });

  return <TestTable tableProps={{dragAndDropHooks, selectionMode: 'multiple'}} />;
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
  {id: 4, name: 'log.txt', date: '1/18/2016', type: 'Text Document'}
];

let DynamicTable = ({tableProps, tableHeaderProps, tableBodyProps, rowProps}) => (
  <Table aria-label="Files" {...tableProps}>
    <MyTableHeader columns={columns} {...tableHeaderProps}>
      {column => (
        <MyColumn isRowHeader={column.isRowHeader} childColumns={column.children}>
          {column.name}
        </MyColumn>
      )}
    </MyTableHeader>
    <TableBody items={rows} {...tableBodyProps}>
      {item => (
        <MyRow columns={columns} {...rowProps}>
          {column => <Cell>{item[column.id]}</Cell>}
        </MyRow>
      )}
    </TableBody>
  </Table>
);

let renderTable = (props) => render(<TestTable {...props} />);

describe('Table', () => {
  let user;
  beforeAll(() => {
    user = userEvent.setup({delay: null, pointerMap});
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('should render with default classes', () => {
    let {getByRole, getAllByRole} = renderTable();
    let table = getByRole('grid');
    expect(table).toHaveAttribute('class', 'react-aria-Table');

    for (let row of getAllByRole('row').slice(1)) {
      expect(row).toHaveAttribute('class', 'react-aria-Row');
    }

    let rowGroups = getAllByRole('rowgroup');
    expect(rowGroups).toHaveLength(2);
    expect(rowGroups[0]).toHaveAttribute('class', 'react-aria-TableHeader');
    expect(rowGroups[1]).toHaveAttribute('class', 'react-aria-TableBody');

    for (let cell of getAllByRole('columnheader')) {
      expect(cell).toHaveAttribute('class', 'react-aria-Column');
    }

    for (let cell of getAllByRole('rowheader')) {
      expect(cell).toHaveAttribute('class', 'react-aria-Cell');
    }

    for (let cell of getAllByRole('gridcell')) {
      expect(cell).toHaveAttribute('class', 'react-aria-Cell');
    }
  });

  it('should render with custom classes', () => {
    let {getByRole, getAllByRole} = renderTable({
      tableProps: {className: 'table'},
      tableHeaderProps: {className: 'table-header'},
      columnProps: {className: 'column'},
      tableBodyProps: {className: 'table-body'},
      rowProps: {className: 'row'},
      cellProps: {className: 'cell'}
    });
    let table = getByRole('grid');
    expect(table).toHaveAttribute('class', 'table');

    for (let row of getAllByRole('row').slice(1)) {
      expect(row).toHaveAttribute('class', 'row');
    }

    let rowGroups = getAllByRole('rowgroup');
    expect(rowGroups).toHaveLength(2);
    expect(rowGroups[0]).toHaveAttribute('class', 'table-header');
    expect(rowGroups[1]).toHaveAttribute('class', 'table-body');

    for (let cell of getAllByRole('columnheader')) {
      expect(cell).toHaveAttribute('class', 'column');
    }

    for (let cell of getAllByRole('rowheader')) {
      expect(cell).toHaveAttribute('class', 'cell');
    }

    for (let cell of getAllByRole('gridcell')) {
      expect(cell).toHaveAttribute('class', 'cell');
    }
  });

  it('should support DOM props', () => {
    let {getByRole, getAllByRole} = renderTable({
      tableProps: {'data-testid': 'table'},
      tableHeaderProps: {'data-testid': 'table-header'},
      columnProps: {'data-testid': 'column'},
      tableBodyProps: {'data-testid': 'table-body'},
      rowProps: {'data-testid': 'row'},
      cellProps: {'data-testid': 'cell'}
    });
    let table = getByRole('grid');
    expect(table).toHaveAttribute('data-testid', 'table');

    for (let row of getAllByRole('row').slice(1)) {
      expect(row).toHaveAttribute('data-testid', 'row');
    }

    let rowGroups = getAllByRole('rowgroup');
    expect(rowGroups).toHaveLength(2);
    expect(rowGroups[0]).toHaveAttribute('data-testid', 'table-header');
    expect(rowGroups[1]).toHaveAttribute('data-testid', 'table-body');

    for (let cell of getAllByRole('columnheader')) {
      expect(cell).toHaveAttribute('data-testid', 'column');
    }

    for (let cell of getAllByRole('rowheader')) {
      expect(cell).toHaveAttribute('data-testid', 'cell');
    }

    for (let cell of getAllByRole('gridcell')) {
      expect(cell).toHaveAttribute('data-testid', 'cell');
    }
  });

  it('should render checkboxes for selection', async () => {
    let {getAllByRole} = renderTable({
      tableProps: {selectionMode: 'multiple'}
    });

    for (let row of getAllByRole('row')) {
      let checkbox = within(row).getByRole('checkbox');
      expect(checkbox).not.toBeChecked();
    }

    let checkbox = getAllByRole('checkbox')[0];
    expect(checkbox).toHaveAttribute('aria-label', 'Select All');

    await user.click(checkbox);

    for (let row of getAllByRole('row')) {
      let checkbox = within(row).getByRole('checkbox');
      expect(checkbox).toBeChecked();
    }
  });

  it('should not render checkboxes for selection with selectionBehavior=replace', async () => {
    let {getAllByRole} = renderTable({
      tableProps: {
        selectionMode: 'multiple',
        selectionBehavior: 'replace'
      }
    });

    for (let row of getAllByRole('row')) {
      let checkbox = within(row).queryByRole('checkbox');
      expect(checkbox).toBeNull();
    }

    let row = getAllByRole('row')[1];
    expect(row).toHaveAttribute('aria-selected', 'false');
    await user.click(row);
    expect(row).toHaveAttribute('aria-selected', 'true');
  });

  it('should support dynamic collections', () => {
    let {getAllByRole} = render(<DynamicTable />);
    expect(getAllByRole('row')).toHaveLength(5);
  });

  it('should support column hover when sorting is allowed', async () => {
    let {getAllByRole} = renderTable({
      columnProps: {allowsSorting: true, className: ({isHovered}) => isHovered ? 'hover' : ''}
    });
    let column = getAllByRole('columnheader')[0];

    expect(column).not.toHaveAttribute('data-hovered');
    expect(column).not.toHaveClass('hover');

    await user.hover(column);
    expect(column).toHaveAttribute('data-hovered', 'true');
    expect(column).toHaveClass('hover');

    await user.unhover(column);
    expect(column).not.toHaveAttribute('data-hovered');
    expect(column).not.toHaveClass('hover');
  });

  it('should not show column hover state when column is not sortable', async () => {
    let {getAllByRole} = renderTable({
      columnProps: {className: ({isHovered}) => isHovered ? 'hover' : ''}
    });
    let column = getAllByRole('columnheader')[0];

    expect(column).not.toHaveAttribute('data-hovered');
    expect(column).not.toHaveClass('hover');

    await user.hover(column);
    expect(column).not.toHaveAttribute('data-hovered');
    expect(column).not.toHaveClass('hover');
  });

  it('should support hover', async () => {
    let onHoverStart = jest.fn();
    let onHoverChange = jest.fn();
    let onHoverEnd = jest.fn();
    let {getAllByRole} = renderTable({
      tableProps: {selectionMode: 'multiple'},
      rowProps: {className: ({isHovered}) => isHovered ? 'hover' : '', onHoverStart, onHoverChange, onHoverEnd}
    });
    let row = getAllByRole('row')[1];

    expect(row).not.toHaveAttribute('data-hovered');
    expect(row).not.toHaveClass('hover');

    await user.hover(row);
    expect(row).toHaveAttribute('data-hovered', 'true');
    expect(row).toHaveClass('hover');
    expect(onHoverStart).toHaveBeenCalledTimes(1);
    expect(onHoverChange).toHaveBeenCalledTimes(1);

    await user.unhover(row);
    expect(row).not.toHaveAttribute('data-hovered');
    expect(row).not.toHaveClass('hover');
    expect(onHoverEnd).toHaveBeenCalledTimes(1);
    expect(onHoverChange).toHaveBeenCalledTimes(2);
  });

  it('should not show hover state when item is not interactive', async () => {
    let onHoverStart = jest.fn();
    let onHoverChange = jest.fn();
    let onHoverEnd = jest.fn();
    let {getAllByRole} = renderTable({
      rowProps: {className: ({isHovered}) => isHovered ? 'hover' : '', onHoverStart, onHoverChange, onHoverEnd}
    });
    let row = getAllByRole('row')[1];

    expect(row).not.toHaveAttribute('data-hovered');
    expect(row).not.toHaveClass('hover');
    expect(onHoverStart).not.toHaveBeenCalled();
    expect(onHoverChange).not.toHaveBeenCalled();
    expect(onHoverEnd).not.toHaveBeenCalled();

    await user.hover(row);
    expect(row).not.toHaveAttribute('data-hovered');
    expect(row).not.toHaveClass('hover');
    expect(onHoverStart).not.toHaveBeenCalled();
    expect(onHoverChange).not.toHaveBeenCalled();
    expect(onHoverEnd).not.toHaveBeenCalled();
  });

  it('should support focus ring', async () => {
    let {getAllByRole} = renderTable({
      rowProps: {className: ({isFocusVisible}) => isFocusVisible ? 'focus' : ''},
      cellProps: {className: ({isFocusVisible}) => isFocusVisible ? 'focus' : ''},
      columnProps: {className: ({isFocusVisible}) => isFocusVisible ? 'focus' : ''}
    });

    let row = getAllByRole('row')[1];
    let cell = within(row).getAllByRole('rowheader')[0];

    expect(row).not.toHaveAttribute('data-focus-visible');
    expect(row).not.toHaveClass('focus');

    await user.tab();
    expect(document.activeElement).toBe(row);
    expect(row).toHaveAttribute('data-focus-visible', 'true');
    expect(row).toHaveClass('focus');

    fireEvent.keyDown(row, {key: 'ArrowRight'});
    fireEvent.keyUp(row, {key: 'ArrowRight'});

    expect(document.activeElement).toBe(cell);
    expect(row).not.toHaveAttribute('data-focus-visible');
    expect(row).not.toHaveClass('focus');
    expect(cell).toHaveAttribute('data-focus-visible', 'true');
    expect(cell).toHaveClass('focus');

    fireEvent.keyDown(row, {key: 'ArrowUp'});
    fireEvent.keyUp(row, {key: 'ArrowUp'});

    let column = getAllByRole('columnheader')[0];
    expect(document.activeElement).toBe(column);
    expect(column).toHaveAttribute('data-focus-visible', 'true');
    expect(column).toHaveClass('focus');
  });

  it('should support press state', () => {
    let {getAllByRole} = renderTable({
      tableProps: {selectionMode: 'multiple'},
      rowProps: {className: ({isPressed}) => isPressed ? 'pressed' : ''}
    });

    let row = getAllByRole('row')[1];

    expect(row).not.toHaveAttribute('data-pressed');
    expect(row).not.toHaveClass('pressed');

    fireEvent.mouseDown(row);
    expect(row).toHaveAttribute('data-pressed', 'true');
    expect(row).toHaveClass('pressed');

    fireEvent.mouseUp(row);
    expect(row).not.toHaveAttribute('data-pressed');
    expect(row).not.toHaveClass('pressed');
  });

  it('should not show press state when not interactive', () => {
    let {getAllByRole} = renderTable({
      rowProps: {className: ({isPressed}) => isPressed ? 'pressed' : ''}
    });
    let row = getAllByRole('row')[0];

    expect(row).not.toHaveAttribute('data-pressed');
    expect(row).not.toHaveClass('pressed');

    fireEvent.mouseDown(row);
    expect(row).not.toHaveAttribute('data-pressed');
    expect(row).not.toHaveClass('pressed');

    fireEvent.mouseUp(row);
    expect(row).not.toHaveAttribute('data-pressed');
    expect(row).not.toHaveClass('pressed');
  });

  it('should support row actions', () => {
    let onRowAction = jest.fn();
    let {getAllByRole} = renderTable({
      tableProps: {onRowAction},
      rowProps: {className: ({isPressed}) => isPressed ? 'pressed' : ''}
    });

    let row = getAllByRole('row')[1];

    expect(row).not.toHaveAttribute('data-pressed');
    expect(row).not.toHaveClass('pressed');

    fireEvent.mouseDown(row);
    expect(row).toHaveAttribute('data-pressed', 'true');
    expect(row).toHaveClass('pressed');

    fireEvent.mouseUp(row);
    expect(row).not.toHaveAttribute('data-pressed');
    expect(row).not.toHaveClass('pressed');

    expect(onRowAction).toHaveBeenCalledTimes(1);
  });

  it('should support disabled state', async () => {
    let {getAllByRole} = renderTable({
      tableProps: {selectionMode: 'multiple', disabledKeys: ['2'], disabledBehavior: 'all'},
      rowProps: {className: ({isDisabled}) => isDisabled ? 'disabled' : ''}
    });
    let rows = getAllByRole('row');
    let row = rows[2];

    expect(row).toHaveAttribute('aria-disabled', 'true');
    expect(row).toHaveClass('disabled');
    expect(within(row).getByRole('checkbox')).toBeDisabled();

    await user.tab();
    expect(document.activeElement).toBe(rows[1]);
    fireEvent.keyDown(document.activeElement, {key: 'ArrowDown'});
    fireEvent.keyUp(document.activeElement, {key: 'ArrowDown'});
    expect(document.activeElement).toBe(rows[3]);
  });

  it('should support isDisabled prop on rows', async () => {
    let {getAllByRole} = render(
      <Table aria-label="Table" selectionMode="multiple" disabledBehavior="all">
        <MyTableHeader>
          <Column isRowHeader>Foo</Column>
          <Column>Bar</Column>
          <Column>Baz</Column>
        </MyTableHeader>
        <TableBody>
          <MyRow>
            <Cell>Foo 1</Cell>
            <Cell>Bar 1</Cell>
            <Cell>Baz 1</Cell>
          </MyRow>
          <MyRow isDisabled>
            <Cell>Foo 2</Cell>
            <Cell>Bar 2</Cell>
            <Cell>Baz 2</Cell>
          </MyRow>
          <MyRow>
            <Cell>Foo 3</Cell>
            <Cell>Bar 3</Cell>
            <Cell>Baz 3</Cell>
          </MyRow>
        </TableBody>
      </Table>
    );
    let items = getAllByRole('row');
    expect(items[2]).toHaveAttribute('aria-disabled', 'true');

    await user.tab();
    expect(document.activeElement).toBe(items[1]);
    await user.keyboard('{ArrowDown}');
    expect(document.activeElement).toBe(items[3]);
  });

  it('should support onAction on items', async () => {
    let onAction = jest.fn();
    let {getAllByRole} = render(
      <Table aria-label="Table" selectionMode="multiple" disabledBehavior="all">
        <MyTableHeader>
          <Column isRowHeader>Foo</Column>
          <Column>Bar</Column>
          <Column>Baz</Column>
        </MyTableHeader>
        <TableBody>
          <MyRow onAction={onAction}>
            <Cell>Foo 1</Cell>
            <Cell>Bar 1</Cell>
            <Cell>Baz 1</Cell>
          </MyRow>
          <MyRow>
            <Cell>Foo 2</Cell>
            <Cell>Bar 2</Cell>
            <Cell>Baz 2</Cell>
          </MyRow>
        </TableBody>
      </Table>
    );
    let items = getAllByRole('row');
    await user.click(items[1]);
    expect(onAction).toHaveBeenCalled();
  });

  it('should support sorting', () => {
    let {getAllByRole} = renderTable({
      tableProps: {sortDescriptor: {column: 'name', direction: 'ascending'}, onSortChange: jest.fn()},
      columnProps: {allowsSorting: true}
    });

    let columns = getAllByRole('columnheader');
    expect(columns[0]).toHaveAttribute('aria-sort', 'ascending');
    expect(columns[0]).toHaveTextContent('▲');
    expect(columns[1]).toHaveAttribute('aria-sort', 'none');
    expect(columns[1]).not.toHaveTextContent('▲');
    expect(columns[2]).toHaveAttribute('aria-sort', 'none');
    expect(columns[2]).not.toHaveTextContent('▲');
  });

  it('should support empty state', () => {
    let {getAllByRole, getByRole} = render(
      <Table aria-label="Search results">
        <TableHeader>
          <Column isRowHeader>Name</Column>
          <Column>Type</Column>
          <Column>Date Modified</Column>
        </TableHeader>
        <TableBody renderEmptyState={() => 'No results'}>
          {[]}
        </TableBody>
      </Table>
    );
    let body = getAllByRole('rowgroup')[1];
    expect(body).toHaveAttribute('data-empty', 'true');
    let cell = getByRole('gridcell');
    expect(cell).toHaveTextContent('No results');
  });

  it('supports removing rows', async () => {
    let {getAllByRole, rerender} = render(<DynamicTable tableBodyProps={{rows}} />);

    await user.tab();
    fireEvent.keyDown(document.activeElement, {key: 'ArrowDown'});
    fireEvent.keyUp(document.activeElement, {key: 'ArrowDown'});
    fireEvent.keyDown(document.activeElement, {key: 'ArrowRight'});
    fireEvent.keyUp(document.activeElement, {key: 'ArrowRight'});

    let body = getAllByRole('rowgroup')[1];
    let gridRows = within(body).getAllByRole('row');
    expect(gridRows).toHaveLength(4);
    let cell = within(gridRows[1]).getAllByRole('rowheader')[0];
    expect(cell).toHaveTextContent('Program Files');
    expect(document.activeElement).toBe(cell);

    rerender(<DynamicTable tableBodyProps={{items: [rows[0], ...rows.slice(2)]}} />);

    gridRows = within(body).getAllByRole('row');
    expect(gridRows).toHaveLength(3);
    cell = within(gridRows[1]).getAllByRole('rowheader')[0];
    expect(cell).toHaveTextContent('bootmgr');
    expect(document.activeElement).toBe(cell);
  });

  it('should support refs', () => {
    let tableRef = React.createRef();
    let headerRef = React.createRef();
    let columnRef = React.createRef();
    let bodyRef = React.createRef();
    let rowRef = React.createRef();
    let cellRef = React.createRef();
    render(
      <Table aria-label="Search results" ref={tableRef}>
        <TableHeader ref={headerRef}>
          <Column isRowHeader ref={columnRef}>Name</Column>
          <Column>Type</Column>
        </TableHeader>
        <TableBody ref={bodyRef}>
          <Row ref={rowRef}>
            <Cell ref={cellRef}>Foo</Cell>
            <Cell>Bar</Cell>
          </Row>
        </TableBody>
      </Table>
    );
    expect(tableRef.current).toBeInstanceOf(HTMLTableElement);
    expect(headerRef.current).toBeInstanceOf(HTMLTableSectionElement);
    expect(columnRef.current).toBeInstanceOf(HTMLTableCellElement);
    expect(bodyRef.current).toBeInstanceOf(HTMLTableSectionElement);
    expect(rowRef.current).toBeInstanceOf(HTMLTableRowElement);
    expect(cellRef.current).toBeInstanceOf(HTMLTableCellElement);
  });

  it('should support row render function and not call it with state', () => {
    let renderRow = jest.fn(() => {});
    render(
      <Table aria-label="Search results">
        <TableHeader columns={[columns[0]]}>
          {column => (
            <Column isRowHeader={column.isRowHeader}>
              {column.name}
            </Column>
          )}
        </TableHeader>
        <TableBody items={[rows[0]]}>
          {item => (
            <Row columns={[columns[0]]}>
              {column => {
                renderRow(column);
                return (
                  <Cell>
                    {item[column.id]}
                  </Cell>
                );
              }}
            </Row>
          )}
        </TableBody>
      </Table>
    );

    // React canary only calls render function once, vs twice in React 18, 17 and 16.
    // Every call should be the same, so just loop over them.
    expect(renderRow.mock.calls.length).toBeGreaterThanOrEqual(1);
    renderRow.mock.calls.forEach((call) => {
      expect(call[0]).toBe(columns[0]);
    });
    renderRow.mockReset();

    // We do not currently call the renderProps function on any of these changes
    // let rowElems = getAllByRole('row');
    // let cells = getAllByRole('rowheader');
    // act(() => rowElems[1].focus());
    // expect(cells[0]).toHaveTextContent('Games focused');
  });

  it('should support cell render props', () => {
    let {getAllByRole} = render(
      <Table aria-label="Search results">
        <TableHeader>
          <Column isRowHeader>
            {({isFocused}) => `Name${isFocused ? ' (focused)' : ''}`}
          </Column>
          <Column>Type</Column>
        </TableHeader>
        <TableBody>
          <Row>
            <Cell>
              {({isFocused}) => `Foo${isFocused ? ' (focused)' : ''}`}
            </Cell>
            <Cell>Bar</Cell>
          </Row>
        </TableBody>
      </Table>
    );

    let headers = getAllByRole('columnheader');
    expect(headers[0]).toHaveTextContent('Name');
    act(() => headers[0].focus());
    expect(headers[0]).toHaveTextContent('Name (focused)');

    let cells = getAllByRole('rowheader');
    expect(cells[0]).toHaveTextContent('Foo');
    act(() => cells[0].focus());
    expect(cells[0]).toHaveTextContent('Foo (focused)');
  });

  it('should support updating columns', () => {
    let tree = render(<DynamicTable tableHeaderProps={{columns}} tableBodyProps={{dependencies: [columns]}} rowProps={{columns}} />);
    let headers = tree.getAllByRole('columnheader');
    expect(headers).toHaveLength(3);

    let newColumns = [columns[0], columns[2]];
    tree.rerender(<DynamicTable tableHeaderProps={{columns: newColumns}} tableBodyProps={{dependencies: [newColumns]}} rowProps={{columns: newColumns}} />);

    headers = tree.getAllByRole('columnheader');
    expect(headers).toHaveLength(2);
  });

  it('should support updating and reordering a row at the same time', () => {
    let tree = render(<DynamicTable tableBodyProps={{items: rows}} />);
    let rowHeaders = tree.getAllByRole('rowheader');
    expect(rowHeaders.map(r => r.textContent)).toEqual(['Games', 'Program Files', 'bootmgr', 'log.txt']);

    tree.rerender(<DynamicTable tableBodyProps={{items: [rows[1], {...rows[0], name: 'XYZ'}, ...rows.slice(2)]}} />);
    rowHeaders = tree.getAllByRole('rowheader');
    expect(rowHeaders.map(r => r.textContent)).toEqual(['Program Files', 'XYZ', 'bootmgr', 'log.txt']);
  });

  it('should support onScroll', () => {
    let onScroll = jest.fn();
    let {getByRole} = renderTable({tableProps: {onScroll}});
    let grid = getByRole('grid');
    fireEvent.scroll(grid);
    expect(onScroll).toHaveBeenCalled();
  });

  it('should support data-focus-visible-within', async () => {
    let {getAllByRole} = renderTable();
    let items = getAllByRole('row');
    expect(items[1]).not.toHaveAttribute('data-focus-visible-within', 'true');

    await user.tab();
    expect(document.activeElement).toBe(items[1]);
    expect(items[1]).toHaveAttribute('data-focus-visible-within', 'true');
    await user.keyboard('{ArrowRight}');

    let cell = within(items[1]).getAllByRole('rowheader')[0];
    expect(document.activeElement).toBe(cell);
    expect(cell).toHaveAttribute('data-focus-visible', 'true');
    expect(items[1]).toHaveAttribute('data-focus-visible-within', 'true');

    await user.keyboard('{ArrowDown}');
    expect(items[1]).not.toHaveAttribute('data-focus-visible-within', 'true');
  });

  describe('drag and drop', () => {
    it('should support drag button slot', () => {
      let {getAllByRole} = render(<DraggableTable />);
      let button = getAllByRole('button')[0];
      expect(button).toHaveAttribute('aria-label', 'Drag Games');
    });

    it('should render drop indicators', () => {
      let onReorder = jest.fn();
      let {getAllByRole} = render(<DraggableTable onReorder={onReorder} renderDropIndicator={(target) => <DropIndicator target={target}>Test</DropIndicator>} />);
      let button = getAllByRole('button')[0];
      fireEvent.keyDown(button, {key: 'Enter'});
      fireEvent.keyUp(button, {key: 'Enter'});
      act(() => jest.runAllTimers());

      let rows = getAllByRole('row');
      expect(rows).toHaveLength(5);
      expect(rows[0]).toHaveAttribute('class', 'react-aria-DropIndicator');
      expect(rows[0]).toHaveAttribute('data-drop-target', 'true');
      expect(rows[0]).toHaveTextContent('Test');
      expect(within(rows[0]).getByRole('button')).toHaveAttribute('aria-label', 'Insert before Games');
      expect(rows[2]).toHaveAttribute('class', 'react-aria-DropIndicator');
      expect(rows[2]).not.toHaveAttribute('data-drop-target');
      expect(within(rows[2]).getByRole('button')).toHaveAttribute('aria-label', 'Insert between Games and Program Files');
      expect(rows[3]).toHaveAttribute('class', 'react-aria-DropIndicator');
      expect(rows[3]).not.toHaveAttribute('data-drop-target');
      expect(within(rows[3]).getByRole('button')).toHaveAttribute('aria-label', 'Insert between Program Files and bootmgr');
      expect(rows[4]).toHaveAttribute('class', 'react-aria-DropIndicator');
      expect(rows[4]).not.toHaveAttribute('data-drop-target');
      expect(within(rows[4]).getByRole('button')).toHaveAttribute('aria-label', 'Insert after bootmgr');

      fireEvent.keyDown(document.activeElement, {key: 'ArrowDown'});
      fireEvent.keyUp(document.activeElement, {key: 'ArrowDown'});

      expect(document.activeElement).toHaveAttribute('aria-label', 'Insert between Games and Program Files');
      expect(rows[0]).not.toHaveAttribute('data-drop-target', 'true');
      expect(rows[2]).toHaveAttribute('data-drop-target', 'true');

      fireEvent.keyDown(document.activeElement, {key: 'Enter'});
      fireEvent.keyUp(document.activeElement, {key: 'Enter'});
      act(() => jest.runAllTimers());

      expect(onReorder).toHaveBeenCalledTimes(1);
    });

    it('should support dropping on rows', () => {
      let onItemDrop = jest.fn();
      let {getAllByRole} = render(<>
        <DraggableTable />
        <DraggableTable onItemDrop={onItemDrop} />
      </>);

      let button = getAllByRole('button')[0];
      fireEvent.keyDown(button, {key: 'Enter'});
      fireEvent.keyUp(button, {key: 'Enter'});
      act(() => jest.runAllTimers());

      let grids = getAllByRole('grid');
      let rows = within(grids[1]).getAllByRole('row');
      expect(rows).toHaveLength(3);
      expect(within(rows[0]).getByRole('button')).toHaveAttribute('aria-label', 'Drop on Games');
      expect(rows[0].nextElementSibling).toHaveAttribute('data-drop-target', 'true');
      expect(within(rows[1]).getByRole('button')).toHaveAttribute('aria-label', 'Drop on Program Files');
      expect(rows[1].nextElementSibling).not.toHaveAttribute('data-drop-target');
      expect(within(rows[2]).getByRole('button')).toHaveAttribute('aria-label', 'Drop on bootmgr');
      expect(rows[2].nextElementSibling).not.toHaveAttribute('data-drop-target');

      expect(document.activeElement).toBe(within(rows[0]).getByRole('button'));

      fireEvent.keyDown(document.activeElement, {key: 'Enter'});
      fireEvent.keyUp(document.activeElement, {key: 'Enter'});
      act(() => jest.runAllTimers());

      expect(onItemDrop).toHaveBeenCalledTimes(1);
    });

    it('should support dropping on the root', () => {
      let onRootDrop = jest.fn();
      let {getAllByRole} = render(<>
        <DraggableTable />
        <DraggableTable onRootDrop={onRootDrop} />
      </>);

      let button = getAllByRole('button')[0];
      fireEvent.keyDown(button, {key: 'Enter'});
      fireEvent.keyUp(button, {key: 'Enter'});
      act(() => jest.runAllTimers());

      let grids = getAllByRole('grid');
      let rows = within(grids[1]).getAllByRole('row');
      expect(rows).toHaveLength(1);
      expect(within(rows[0]).getByRole('button')).toHaveAttribute('aria-label', 'Drop on');
      expect(document.activeElement).toBe(within(rows[0]).getByRole('button'));
      expect(grids[1]).toHaveAttribute('data-drop-target', 'true');

      fireEvent.keyDown(document.activeElement, {key: 'Enter'});
      fireEvent.keyUp(document.activeElement, {key: 'Enter'});
      act(() => jest.runAllTimers());

      expect(onRootDrop).toHaveBeenCalledTimes(1);
    });

    it('should support disabled drag and drop', async () => {
      let {queryAllByRole, getByRole, getAllByRole} = render(
        <DraggableTable isDisabled />
      );

      let buttons = queryAllByRole('button');
      buttons.forEach(button => {
        expect(button).toBeDisabled();
      });

      let table = getByRole('grid');
      expect(table).not.toHaveAttribute('data-allows-dragging', 'true');
      expect(table).not.toHaveAttribute('draggable', 'true');

      let rows = getAllByRole('row');
      rows.forEach(row => {
        expect(row).not.toHaveAttribute('draggable', 'true');
      });
    });

    it('should allow selection even when drag and drop is disabled', async () => {
      let {getAllByRole} = render(
        <DraggableTableWithSelection isDisabled />
    );

      for (let row of getAllByRole('row')) {
        let checkbox = within(row).getByRole('checkbox');
        expect(checkbox).not.toBeChecked();
      }

      let checkbox = getAllByRole('checkbox')[0];
      expect(checkbox).toHaveAttribute('aria-label', 'Select All');

      await user.click(checkbox);

      for (let row of getAllByRole('row')) {
        let checkbox = within(row).getByRole('checkbox');
        expect(checkbox).toBeChecked();
      }
    });
  });

  describe('column resizing', () => {
    // I'd use tree.getByRole(role, {name: text}) here, but it's unbearably slow.
    function getColumn(tree, name) {
      // Find by text, then go up to the element with the cell role.
      let el = tree.getByText(name);
      while (el && !/columnheader/.test(el.getAttribute('role'))) {
        el = el.parentElement;
      }

      return el;
    }

    function resizeCol(tree, col, delta) {
      act(() => {setInteractionModality('pointer');});
      let column = getColumn(tree, col);
      let resizer = within(column).getByRole('slider');

      fireEvent.pointerEnter(resizer);

      // actual locations do not matter, the delta matters between events for the calculation of useMove
      fireEvent.pointerDown(resizer, {pointerType: 'mouse', pointerId: 1, pageX: 0, pageY: 30});
      fireEvent.pointerMove(resizer, {pointerType: 'mouse', pointerId: 1, pageX: delta, pageY: 25});
      fireEvent.pointerUp(resizer, {pointerType: 'mouse', pointerId: 1});
    }

    function resizeTable(clientWidth, newValue) {
      clientWidth.mockImplementation(() => newValue);
      fireEvent(window, new Event('resize'));
      act(() => {jest.runAllTimers();});
    }

    let defaultColumns = [
      {name: 'Name', uid: 'name', width: '1fr'},
      {name: 'Type', uid: 'type', width: '1fr'},
      {name: 'Height', uid: 'height'},
      {name: 'Weight', uid: 'weight'},
      {name: 'Level', uid: 'level', width: '5fr'}
    ];

    resizingTests(render, (tree, ...args) => tree.rerender(...args), ResizableTable, ControlledResizableTable, resizeCol, resizeTable);

    function ResizableTable(props) {
      let {columns, rows, onResizeStart, onResize, onResizeEnd, ...otherProps} = props;
      return (
        <ResizableTableContainer onResizeStart={onResizeStart} onResize={onResize} onResizeEnd={onResizeEnd}>
          <Table aria-label="Files" {...otherProps}>
            <MyTableHeader columns={columns}>
              {column => (
                <MyColumn {...column} isRowHeader={column.id === 'name'}>
                  {column.name}
                </MyColumn>
              )}
            </MyTableHeader>
            <TableBody items={rows}>
              {item => (
                <MyRow columns={columns}>
                  {column => <Cell>{item[column.id]}</Cell>}
                </MyRow>
              )}
            </TableBody>
          </Table>
        </ResizableTableContainer>
      );
    }

    function ControlledResizableTable(props) {
      let {columns = defaultColumns, rows} = props;
      let [widths, setWidths] = useState(() => new Map(columns.filter(col => col.width).map((col) => [col.uid, col.width])));
      let cols = useMemo(() => columns.map(col => ({...col, width: widths.get(col.uid)})), [columns, widths]);
      return (
        <ResizableTableContainer onResizeStart={props.onResizeStart} onResize={w => {setWidths(w); props.onResize?.(w);}} onResizeEnd={props.onResizeEnd}>
          <Table aria-label="Files">
            <MyTableHeader columns={cols}>
              {column => (
                <MyColumn {...column} id={column.uid} isRowHeader={column.uid === 'name'} allowsResizing>
                  {column.name}
                </MyColumn>
              )}
            </MyTableHeader>
            <TableBody items={rows}>
              {item => (
                <MyRow columns={columns}>
                  {column => <Cell>{item[column.id]}</Cell>}
                </MyRow>
              )}
            </TableBody>
          </Table>
        </ResizableTableContainer>
      );
    }

    it('Column resizer accepts data attributes', () => {
      let {getAllByTestId} = render(<ControlledResizableTable />);
      let resizers = getAllByTestId('resizer');
      expect(resizers).toHaveLength(5);
    });
  });

  it('should support overriding table style', () => {
    let {getByRole} = render(
      <Table aria-label="Table" style={{width: 200}}>
        <MyTableHeader>
          <Column isRowHeader>Foo</Column>
          <Column>Bar</Column>
          <Column>Baz</Column>
        </MyTableHeader>
        <TableBody>
          <MyRow href="https://google.com">
            <Cell>Foo 1</Cell>
            <Cell>Bar 1</Cell>
            <Cell>Baz 1</Cell>
          </MyRow>
          <MyRow href="https://adobe.com">
            <Cell>Foo 2</Cell>
            <Cell>Bar 2</Cell>
            <Cell>Baz 2</Cell>
          </MyRow>
        </TableBody>
      </Table>
    );

    let table = getByRole('grid');
    expect(table).toHaveAttribute('style', expect.stringContaining('width: 200px'));
  });

  describe('links', function () {
    describe.each(['mouse', 'keyboard'])('%s', (type) => {
      let trigger = async (item, key = 'Enter') => {
        if (type === 'mouse') {
          await user.click(item);
        } else {
          fireEvent.keyDown(item, {key});
          fireEvent.keyUp(item, {key});
        }
      };

      it('should support links with selectionMode="none"', async function () {
        let {getAllByRole} = render(
          <Table aria-label="Table">
            <MyTableHeader>
              <Column isRowHeader>Foo</Column>
              <Column>Bar</Column>
              <Column>Baz</Column>
            </MyTableHeader>
            <TableBody>
              <MyRow href="https://google.com">
                <Cell>Foo 1</Cell>
                <Cell>Bar 1</Cell>
                <Cell>Baz 1</Cell>
              </MyRow>
              <MyRow href="https://adobe.com">
                <Cell>Foo 2</Cell>
                <Cell>Bar 2</Cell>
                <Cell>Baz 2</Cell>
              </MyRow>
            </TableBody>
          </Table>
        );

        let items = getAllByRole('row').slice(1);
        for (let item of items) {
          expect(item.tagName).not.toBe('A');
          expect(item).toHaveAttribute('data-href');
        }

        let onClick = mockClickDefault();
        await trigger(items[0]);
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onClick.mock.calls[0][0].target).toBeInstanceOf(HTMLAnchorElement);
        expect(onClick.mock.calls[0][0].target.href).toBe('https://google.com/');
      });

      it.each(['single', 'multiple'])('should support links with selectionBehavior="toggle" selectionMode="%s"', async function (selectionMode) {
        let {getAllByRole} = render(
          <Table aria-label="Table" selectionMode={selectionMode}>
            <MyTableHeader>
              <Column isRowHeader>Foo</Column>
              <Column>Bar</Column>
              <Column>Baz</Column>
            </MyTableHeader>
            <TableBody>
              <MyRow href="https://google.com">
                <Cell>Foo 1</Cell>
                <Cell>Bar 1</Cell>
                <Cell>Baz 1</Cell>
              </MyRow>
              <MyRow href="https://adobe.com">
                <Cell>Foo 2</Cell>
                <Cell>Bar 2</Cell>
                <Cell>Baz 2</Cell>
              </MyRow>
            </TableBody>
          </Table>
        );

        let items = getAllByRole('row').slice(1);
        for (let item of items) {
          expect(item.tagName).not.toBe('A');
          expect(item).toHaveAttribute('data-href');
        }

        let onClick = mockClickDefault();
        await trigger(items[0]);
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onClick.mock.calls[0][0].target).toBeInstanceOf(HTMLAnchorElement);
        expect(onClick.mock.calls[0][0].target.href).toBe('https://google.com/');

        await user.click(within(items[0]).getByRole('checkbox'));
        expect(items[0]).toHaveAttribute('aria-selected', 'true');

        await trigger(items[1], ' ');
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(items[1]).toHaveAttribute('aria-selected', 'true');
      });

      it.each(['single', 'multiple'])('should support links with selectionBehavior="replace" selectionMode="%s"', async function (selectionMode) {
        let {getAllByRole} = render(
          <Table aria-label="Table" selectionMode={selectionMode} selectionBehavior="replace">
            <MyTableHeader>
              <Column isRowHeader>Foo</Column>
              <Column>Bar</Column>
              <Column>Baz</Column>
            </MyTableHeader>
            <TableBody>
              <MyRow href="https://google.com">
                <Cell>Foo 1</Cell>
                <Cell>Bar 1</Cell>
                <Cell>Baz 1</Cell>
              </MyRow>
              <MyRow href="https://adobe.com">
                <Cell>Foo 2</Cell>
                <Cell>Bar 2</Cell>
                <Cell>Baz 2</Cell>
              </MyRow>
            </TableBody>
          </Table>
        );

        let items = getAllByRole('row').slice(1);
        for (let item of items) {
          expect(item.tagName).not.toBe('A');
          expect(item).toHaveAttribute('data-href');
        }
        let onClick = mockClickDefault({once: true});
        if (type === 'mouse') {
          await user.click(items[0]);
        } else {
          fireEvent.keyDown(items[0], {key: ' '});
          fireEvent.keyUp(items[0], {key: ' '});
        }
        expect(onClick).not.toHaveBeenCalled();
        expect(items[0]).toHaveAttribute('aria-selected', 'true');

        if (type === 'mouse') {
          await user.dblClick(items[0], {pointerType: 'mouse'});
        } else {
          fireEvent.keyDown(items[0], {key: 'Enter'});
          fireEvent.keyUp(items[0], {key: 'Enter'});
        }
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onClick.mock.calls[0][0].target).toBeInstanceOf(HTMLAnchorElement);
        expect(onClick.mock.calls[0][0].target.href).toBe('https://google.com/');
      });
    });
  });

  describe('error state', function () {
    let consoleWarnSpy = jest.fn();
    let consoleWarn = console.warn;
    let consoleError = console.error;
    beforeEach(() => {
      console.warn = consoleWarnSpy;
      console.error = jest.fn();
    });

    afterEach(() => {
      console.warn = consoleWarn;
      console.error = consoleError;
      jest.clearAllMocks();
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    it('should throw a warning if the rows are rendered staticly but the cells are rendered dynamically', () => {
      function StaticRowDynamicCell() {
        let columns = [
          {name: 'Name', id: 'name', isRowHeader: true},
          {name: 'Type', id: 'type'},
          {name: 'Date Modified', id: 'date'}
        ];

        return (
          <Table aria-label="Files">
            <TableHeader columns={columns}>
              {(column) => (
                <Column isRowHeader={column.isRowHeader}>{column.name}</Column>
              )}
            </TableHeader>
            <TableBody>
              <Row columns={columns}>
                {() => {
                  return <Cell>filler</Cell>;
                }}
              </Row>
              <Row columns={columns}>
                {() => {
                  return <Cell>filler</Cell>;
                }}
              </Row>
            </TableBody>
          </Table>
        );
      }

      expect(() => render(<StaticRowDynamicCell />)).toThrow();
      expect(consoleWarnSpy).toHaveBeenCalledWith('No id detected for the Row element. The Row element requires a id to be provided to it when the cells are rendered dynamically.');
    });
  });
});
