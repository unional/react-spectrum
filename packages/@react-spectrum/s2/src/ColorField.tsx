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

import {
  ColorField as AriaColorField,
  ColorFieldProps as AriaColorFieldProps,
  FormContext
} from 'react-aria-components';
import {style} from '../style/spectrum-theme' with {type: 'macro'};
import {useFormProps} from './Form';
import {StyleProps, field, getAllowedOverrides} from './style-utils' with {type: 'macro'};
import {FieldErrorIcon, FieldGroup, FieldLabel, HelpText, Input} from './Field';
import {HelpTextProps, SpectrumLabelableProps} from '@react-types/shared';
import {Ref, forwardRef, useContext, useImperativeHandle, useRef} from 'react';
import {TextFieldRef} from '@react-types/textfield';
import {createFocusableRef} from '@react-spectrum/utils';

export interface ColorFieldProps extends Omit<AriaColorFieldProps, 'children' | 'className' | 'style'>, StyleProps, Omit<SpectrumLabelableProps, 'contextualHelp'>, HelpTextProps {
  /**
   * The size of the color field.
   *
   * @default 'M'
   */
  size?: 'S' | 'M' | 'L' | 'XL'
}

function ColorField(props: ColorFieldProps, ref: Ref<TextFieldRef>) {
  let formContext = useContext(FormContext);
  props = useFormProps(props);
  let {
    label,
    description,
    errorMessage,
    necessityIndicator,
    labelPosition = 'top',
    labelAlign = 'start',
    UNSAFE_style,
    UNSAFE_className = '',
    styles,
    ...fieldProps
  } = props;

  // Expose imperative interface for ref
  let domRef = useRef<HTMLDivElement>(null);
  let inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => ({
    ...createFocusableRef(domRef, inputRef),
    select() {
      if (inputRef.current) {
        inputRef.current.select();
      }
    },
    getInputElement() {
      return inputRef.current;
    }
  }));

  return (
    <AriaColorField
      {...fieldProps}
      ref={domRef}
      style={UNSAFE_style}
      className={UNSAFE_className + style(field(), getAllowedOverrides())({
        size: props.size,
        labelPosition,
        isInForm: !!formContext
      }, styles)}>
      {({isDisabled, isInvalid}) => (<>
        <FieldLabel
          isDisabled={isDisabled}
          isRequired={props.isRequired}
          size={props.size}
          labelPosition={labelPosition}
          labelAlign={labelAlign}
          necessityIndicator={necessityIndicator}>
          {label}
        </FieldLabel>
        <FieldGroup role="presentation" isDisabled={isDisabled} isInvalid={isInvalid} size={props.size}>
          <Input ref={inputRef} />
          {isInvalid && <FieldErrorIcon isDisabled={isDisabled} />}
        </FieldGroup>
        <HelpText
          size={props.size}
          isDisabled={isDisabled}
          isInvalid={isInvalid}
          description={description}>
          {errorMessage}
        </HelpText>
      </>)}
    </AriaColorField>
  );
}

/**
 * A color field allows users to edit a hex color or individual color channel value.
 */
const _ColorField = forwardRef(ColorField);
export {_ColorField as ColorField};
