/*
 * Copyright 2021 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import {
  AsyncLoadingCardView,
  ControlledCardView,
  CustomLayout,
  DynamicCardView,
  items,
  NoItemCardView,
  renderEmptyState,
  StaticCardView
} from './GridCardView.stories';
import React from 'react';
import {Size} from '@react-stately/virtualizer';
import {useCollator} from '@react-aria/i18n';
import {useMemo} from 'react';
import {WaterfallLayout} from '../';

let itemsNoSize = [
  {
    src: 'https://i.imgur.com/Z7AzH2c.jpg',
    title: 'Bob 1'
  },
  {
    src: 'https://i.imgur.com/DhygPot.jpg',
    title: 'Joe 1'
  },
  {
    src: 'https://i.imgur.com/L7RTlvI.png',
    title: 'Jane 1'
  },
  {
    src: 'https://i.imgur.com/1nScMIH.jpg',
    title: 'Bob 2'
  },
  {
    src: 'https://i.imgur.com/DhygPot.jpg',
    title: 'Joe 2'
  },
  {
    src: 'https://i.imgur.com/1nScMIH.jpg',
    title: 'Jane 2'
  },
  {
    src: 'https://i.imgur.com/Z7AzH2c.jpg',
    title: 'Bob 3'
  },
  {
    src: 'https://i.imgur.com/L7RTlvI.png',
    title: 'Joe 3'
  },
  {
    src: 'https://i.imgur.com/zzwWogn.jpg',
    title: 'Jane 3'
  },
  {
    src: 'https://i.imgur.com/1nScMIH.jpg',
    title: 'Bob 4'
  },
  {
    src: 'https://i.imgur.com/L7RTlvI.png',
    title: 'Joe 4'
  },
  {
    src: 'https://i.imgur.com/Z7AzH2c.jpg',
    title: 'Jane 4'
  },
  {
    src: 'https://i.imgur.com/L7RTlvI.png',
    title: 'Bob 5'
  },
  {
    src: 'https://i.imgur.com/1nScMIH.jpg',
    title: 'Joe 5'
  },
  {
    src: 'https://i.imgur.com/L7RTlvI.png',
    title: 'Jane 5'
  },
  {
    src: 'https://i.imgur.com/1nScMIH.jpg',
    title: 'Bob 6'
  },
  {
    src: 'https://i.imgur.com/zzwWogn.jpg',
    title: 'Joe 6'
  },
  {
    src: 'https://i.imgur.com/DhygPot.jpg',
    title: 'Jane 6'
  },
  {
    src: 'https://i.imgur.com/L7RTlvI.png',
    title: 'Bob 7'
  },
  {
    src: 'https://i.imgur.com/Z7AzH2c.jpg',
    title: 'Joe 7'
  },
  {
    src: 'https://i.imgur.com/1nScMIH.jpg',
    title: 'Jane 7'
  },
  {
    src: 'https://i.imgur.com/zzwWogn.jpg',
    title: 'Bob 8'
  }
];

const StoryFn = ({storyFn}) => storyFn();

export default {
  title: 'CardView/Waterfall layout',
  decorators: [(storyFn) => <StoryFn storyFn={storyFn} />]
};

export const DefaultWaterfallStatic = {
  render: () =>
    StaticCardView({
      layout: WaterfallLayout,
      items
    }),
  name: 'static card'
};

export const DefaultWaterfall = {
  render: () =>
    DynamicCardView({
      layout: WaterfallLayout,
      items
    }),
  name: 'size provided with items'
};

export const DefaultWaterfallNoSize = {
  render: () =>
    DynamicCardView({
      layout: WaterfallLayout,
      items: itemsNoSize
    }),
  name: 'no size provided with items'
};

export const QuietWaterfall = {
  render: () =>
    DynamicCardView({
      layout: WaterfallLayout,
      items,
      isQuiet: true
    }),
  name: 'quiet cards'
};

export const QuietWaterfallNoSize = {
  render: () =>
    DynamicCardView({
      layout: WaterfallLayout,
      items: itemsNoSize,
      isQuiet: true
    }),
  name: 'quiet cards, no size provided with items'
};

export const DisabledKeys = {
  render: () =>
    DynamicCardView({
      layout: WaterfallLayout,
      items,
      disabledKeys: ['Joe 2', 'Bob 4']
    }),
  name: 'disabled keys, Joe2, Bob 4'
};

export const NoSelection = {
  render: () =>
    DynamicCardView({
      layout: WaterfallLayout,
      items,
      selectionMode: 'none'
    }),
  name: 'no selection allowed'
};

export const SingleSelection = {
  render: () =>
    DynamicCardView({
      layout: WaterfallLayout,
      items,
      selectionMode: 'single'
    }),
  name: 'single selection only'
};

export const SelectedKeys = {
  render: () =>
    ControlledCardView({
      layout: WaterfallLayout,
      items
    }),
  name: 'selected keys, controlled'
};

export const isLoadingNoHeightWaterfall = {
  render: () =>
    NoItemCardView({
      layout: WaterfallLayout,
      width: '800px',
      loadingState: 'loading'
    }),
  name: 'loadingState = loading, no height'
};

export const isLoadingHeightWaterfall = {
  render: () =>
    NoItemCardView({
      layout: WaterfallLayout,
      width: '800px',
      height: '800px',
      loadingState: 'loading'
    }),
  name: 'loadingState = loading, set height'
};

export const loadingMoreWaterfall = {
  render: () =>
    DynamicCardView({
      layout: WaterfallLayout,
      loadingState: 'loadingMore',
      items
    }),
  name: 'loadingState = loadingMore'
};

export const filteringWaterfall = {
  render: () =>
    DynamicCardView({
      layout: WaterfallLayout,
      loadingState: 'filtering',
      items
    }),
  name: 'loadingState = filtering'
};

export const emptyWithHeightWaterfall = {
  render: () =>
    NoItemCardView({
      layout: WaterfallLayout,
      width: '800px',
      height: '800px',
      renderEmptyState
    }),
  name: 'empty, set height'
};

export const AsyncLoading = {
  render: () =>
    AsyncLoadingCardView({
      layout: WaterfallLayout
    }),
  name: 'Async loading'
};

export const CustomLayoutOptions = () =>
  CustomGalleryLayout(
    {
      items
    },
    {
      minSpace: new Size(50, 50),
      maxColumns: 2,
      itemPadding: 400,
      margin: 10
    }
  );
CustomGalleryLayout.storyName = 'Custom layout options';

function CustomGalleryLayout(props, layoutOptions) {
  let collator = useCollator({
    usage: 'search',
    sensitivity: 'base'
  });
  let galleryLayout = useMemo(
    () =>
      new WaterfallLayout({
        collator,
        ...layoutOptions
      }),
    [collator, layoutOptions]
  );
  return CustomLayout({...props, layout: galleryLayout}, {});
}
