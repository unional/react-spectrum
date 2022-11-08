import {act, fireEvent} from '@testing-library/react';

export function getElementCenter(element: Element) {
  let {left, top, width, height} = element.getBoundingClientRect();
  return {
    x: left + width / 2,
    y: top + height / 2
  };
}

/**
 * Drag an element onto a target element, by a specific delta, or both.
 * If target element provided, will drag to center of target element.
 * If both provided, delta will be from center of target element.
 */
export async function dragAndDrop(element: Element, {delta, to: targetElement, steps = 1, duration = 0, type = 'mouse'}) {
  if (!delta && !targetElement) {
    throw new Error('Must provide a delta or target element.');
  }

  let from = getElementCenter(element);
  let to = {x: 0, y: 0};

  if (delta && targetElement) {
    let targetCenter = getElementCenter(targetElement);
    to = {x: targetCenter.x + delta.x, y: targetCenter.y + delta.y};
  } else if (targetElement) {
    to = getElementCenter(targetElement);
  } else if (delta) {
    to = {x: from.x + delta.x, y: from.y + delta.y};
  }

  let step = {
    x: (to.x - from.x) / steps,
    y: (to.y - from.y) / steps
  };

  let current = {
    clientX: from.x,
    clientY: from.y
  };

  if (type === 'mouse') {
    fireEvent.mouseEnter(element, current);
    fireEvent.mouseOver(element, current);
    fireEvent.mouseMove(element, current);
    fireEvent.mouseDown(element, current);
  } else if (type === 'pointer') {
    fireEvent.pointerEnter(element, current);
    fireEvent.pointerOver(element, current);
    fireEvent.pointerMove(element, current);
    fireEvent.pointerDown(element, current);
  } else if (type === 'touch') {
    fireEvent.touchStart(element, current);
    fireEvent.touchMove(element, current);
  }

  let dataTransfer = new DataTransfer();
  fireEvent(element, new DragEvent('dragstart', {dataTransfer, clientX: current.clientX, clientY: current.clientY}));
  await act(async () => Promise.resolve());

  for (let i = 0; i < steps; i++) {
    current.clientX += step.x;
    current.clientY += step.y;

    if (duration !== 0 && steps > 1) {
      await new Promise(resolve => {
        setTimeout(resolve, duration / steps);
      });
    }

    if (type === 'mouse') {
      fireEvent.mouseMove(element, current);
    } else if (type === 'pointer') {
      fireEvent.pointerMove(element, current);
    } else if (type === 'touch') {
      fireEvent.touchMove(element, current);
    }

    fireEvent(element, new DragEvent('drag', {dataTransfer, clientX: current.clientX, clientY: current.clientY}));
    fireEvent(targetElement, new DragEvent('dragover', {dataTransfer, clientX: current.clientX, clientY: current.clientY}));
  }

  if (type === 'mouse') {
    fireEvent.mouseUp(element, current);
  } else if (type === 'pointer') {
    fireEvent.pointerUp(element, current);
  } else if (type === 'touch') {
    fireEvent.touchEnd(element, current);
  }

  fireEvent(element, new DragEvent('dragend', {dataTransfer, clientX: current.clientX, clientY: current.clientY}));
  fireEvent(targetElement, new DragEvent('drop', {dataTransfer, clientX: current.clientX, clientY: current.clientY}));
}
