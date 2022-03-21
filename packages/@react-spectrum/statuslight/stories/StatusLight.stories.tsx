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
import React from 'react';
import {StatusLight} from '../';

export default {
  title: 'StatusLight',
  parameters: {
    providerSwitcher: {
      status: 'positive'
    }
  }
};

export const VariantCelery = {
  render: () =>
    render({
      variant: 'celery'
    }),
  name: 'variant: celery'
};

export const VariantYellow = {
  render: () =>
    render({
      variant: 'yellow'
    }),
  name: 'variant: yellow'
};

export const VariantFuchsia = {
  render: () =>
    render({
      variant: 'fuchsia'
    }),
  name: 'variant: fuchsia'
};

export const VariantIndigo = {
  render: () =>
    render({
      variant: 'indigo'
    }),
  name: 'variant: indigo'
};

export const VariantSeafoam = {
  render: () =>
    render({
      variant: 'seafoam'
    }),
  name: 'variant: seafoam'
};

export const VariantChartreuse = {
  render: () =>
    render({
      variant: 'chartreuse'
    }),
  name: 'variant: chartreuse'
};

export const VariantMagenta = {
  render: () =>
    render({
      variant: 'magenta'
    }),
  name: 'variant: magenta'
};

export const VariantPurple = {
  render: () =>
    render({
      variant: 'purple'
    }),
  name: 'variant: purple'
};

export const VariantNeutral = {
  render: () =>
    render({
      variant: 'neutral'
    }),
  name: 'variant: neutral'
};

export const VariantInfo = {
  render: () =>
    render({
      variant: 'info'
    }),
  name: 'variant: info'
};

export const VariantPositive = {
  render: () =>
    render({
      variant: 'positive'
    }),
  name: 'variant: positive'
};

export const VariantNotice = {
  render: () =>
    render({
      variant: 'notice'
    }),
  name: 'variant: notice'
};

export const VariantNegative = {
  render: () =>
    render({
      variant: 'negative'
    }),
  name: 'variant: negative'
};

export const IsDisabledTrue = {
  render: () =>
    render({
      variant: 'positive',
      isDisabled: true
    }),
  name: 'isDisabled: true'
};

function render(props: any = {}) {
  return <StatusLight {...props}>Status light of love</StatusLight>;
}
