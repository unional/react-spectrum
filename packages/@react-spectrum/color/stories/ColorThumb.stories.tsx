/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import {ColorThumb} from '../src/ColorThumb';
import {parseColor} from '@react-stately/color';
import React from 'react';

export default {
  title: 'ColorThumb'
};

export const Default = {
  render: () => <ColorThumb value={parseColor('#f00')} />,
  name: 'default'
};

export const Focused = {
  render: () => <ColorThumb value={parseColor('#f00')} isFocused />,
  name: 'focused'
};

export const FocusedDragging = {
  render: () => <ColorThumb value={parseColor('#f00')} isFocused isDragging />,
  name: 'focused, dragging'
};

export const FocusedDraggingAlpha = {
  render: () => <ColorThumb value={parseColor('hsla(0, 100%, 100%, 0)')} isFocused isDragging />,
  name: 'focused, dragging, alpha'
};

export const Disabled = {
  render: () => <ColorThumb value={parseColor('#f00')} isDisabled />,
  name: 'disabled'
};
