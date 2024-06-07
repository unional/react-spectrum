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

import {I18nProvider, RouterProvider, useLocale} from 'react-aria-components';
import {ReactNode, createContext, useContext} from 'react';
import type {ColorScheme, Router} from '@react-types/provider';
import {StyleString} from '../style/types';
import {style} from '../style/spectrum-theme' with {type: 'macro'};
import {colorScheme, UnsafeStyles} from './style-utils' with {type: 'macro'};
import {mergeStyles} from '../style/runtime';

export interface ProviderProps extends UnsafeStyles {
  /** The content of the Provider. */
  children: ReactNode,
  /**
   * The locale for your application as a [BCP 47](https://www.ietf.org/rfc/bcp/bcp47.txt) language code.
   * Defaults to the browser/OS language setting.
   * @default 'en-US'
   */
  locale?: string,
  /**
   * Provides a client side router to all nested React Spectrum links to enable client side navigation.
   */
  router?: Router,
  /**
   * The color scheme for your application.
   * Defaults to operating system preferences.
   */
  colorScheme?: ColorScheme,
  /** The background for this provider. If not provided, the background is transparent. */
  background?: 'base' | 'layer-1' | 'layer-2',
  /** Spectrum-defined styles, returned by the `style()` macro. */
  styles?: StyleString,
  /**
   * The DOM element to render.
   * @default div
   */
  elementType?: keyof JSX.IntrinsicElements
}

export const ColorSchemeContext = createContext<ColorScheme | 'light dark' | null>(null);

export function Provider(props: ProviderProps) {
  let result = <ProviderInner {...props} />;
  let parentColorScheme = useContext(ColorSchemeContext);
  let colorScheme = props.colorScheme || parentColorScheme || 'light dark';
  if (colorScheme !== parentColorScheme) {
    result = <ColorSchemeContext.Provider value={colorScheme}>{result}</ColorSchemeContext.Provider>;
  }

  if (props.locale) {
    result = <I18nProvider locale={props.locale}>{result}</I18nProvider>;
  }

  if (props.router) {
    result = <RouterProvider {...props.router}>{result}</RouterProvider>;
  }

  return result;
}

let providerStyles = style({
  ...colorScheme(),
  backgroundColor: {
    background: {
      base: 'base',
      'layer-1': 'layer-1',
      'layer-2': 'layer-2'
    }
  }
});

function ProviderInner(props: ProviderProps) {
  let {
    elementType: Element = 'div',
    UNSAFE_style,
    UNSAFE_className = '',
    styles,
    children,
    background,
    colorScheme
  } = props;
  let {locale, direction} = useLocale();
  return (
    <Element
      lang={locale}
      dir={direction}
      style={UNSAFE_style}
      className={UNSAFE_className + mergeStyles(
        styles,
        providerStyles({background, colorScheme})
      )}>
      {children}
    </Element>
  );
}
