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
import {action} from '@storybook/addon-actions';
import {chain} from '@react-aria/utils';
import {Flex} from '@react-spectrum/layout';
import {Form} from '@react-spectrum/form';
import {Item, Picker} from '@react-spectrum/picker';
import {NumberField} from '../src';
import React, {useState} from 'react';

export default {
  title: 'NumberField',
  decorators: [(story) => <ErrorBoundary>{story()}</ErrorBoundary>],
  parameters: {
    providerSwitcher: {
      status: 'notice'
    }
  }
};

export const Default = {
  render: () => render({}),
  name: 'default'
};

export const DefaultValue10 = {
  render: () =>
    render({
      defaultValue: 10
    }),
  name: 'defaultValue: 10'
};

export const Value10 = {
  render: () =>
    render({
      value: 10
    }),
  name: 'value: 10'
};

export const MaximumFractionDigits0 = {
  render: () =>
    render({
      formatOptions: {
        maximumFractionDigits: 0
      }
    }),
  name: 'maximumFractionDigits = 0'
};

export const Currency = {
  render: () =>
    render({
      formatOptions: {
        style: 'currency',
        currency: 'EUR'
      },
      label: 'Price'
    }),
  name: 'currency'
};

export const Percent = {
  render: () =>
    render({
      formatOptions: {
        style: 'percent'
      },
      label: 'Tax'
    }),
  name: 'percent'
};

export const PercentMaxFractionDigits2NoMinFractionDigits = {
  render: () =>
    render({
      formatOptions: {
        style: 'percent',
        maximumFractionDigits: 2
      },
      label: 'Tax'
    }),
  name: 'percent, max fraction digits: 2, no min fraction digits'
};

export const PercentMin2Max2FractionDigits = {
  render: () =>
    render({
      formatOptions: {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      },
      label: 'Tax'
    }),
  name: 'percent min = 2 max = 2 fraction digits'
};

export const PercentMin2Max3FractionDigits = {
  render: () =>
    render({
      formatOptions: {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 3
      },
      label: 'Tax'
    }),
  name: 'percent min = 2 max = 3 fraction digits'
};

export const MinValue00FractionDigits = {
  render: () =>
    render({
      minValue: 0,
      formatOptions: {
        maximumFractionDigits: 0
      }
    }),
  name: 'minValue = 0, 0 fraction digits'
};

export const PercentUsingSign = {
  render: () =>
    render({
      formatOptions: {
        style: 'percent',
        signDisplay: 'always'
      },
      label: 'Tax'
    }),
  name: 'percent using sign'
};

export const Disabled = {
  render: () =>
    render({
      isDisabled: true
    }),
  name: 'disabled'
};

export const Readonly = {
  render: () =>
    render({
      defaultValue: 10,
      isReadOnly: true
    }),
  name: 'readonly'
};

export const IsQuiet = {
  render: () =>
    render({
      isQuiet: true
    }),
  name: 'isQuiet'
};

export const QuietDisabled = {
  render: () =>
    render({
      isQuiet: true,
      isDisabled: true,
      defaultValue: 10
    }),
  name: 'quiet disabled'
};

export const QuietReadonly = {
  render: () =>
    render({
      isQuiet: true,
      isReadOnly: true,
      defaultValue: 10
    }),
  name: 'quiet readonly'
};

export const ValidationStateInvalid = {
  render: () =>
    render({
      validationState: 'invalid'
    }),
  name: 'validationState: invalid'
};

export const ValidationStateValid = {
  render: () =>
    render({
      validationState: 'valid'
    }),
  name: 'validationState: valid'
};

export const ValidationStateInvalidIsQuiet = {
  render: () =>
    render({
      validationState: 'invalid',
      isQuiet: true
    }),
  name: 'validationState: invalid, isQuiet'
};

export const ValidationStateValidIsQuiet = {
  render: () =>
    render({
      validationState: 'valid',
      isQuiet: true
    }),
  name: 'validationState: valid, isQuiet'
};

export const MinValue0MaxValue20 = {
  render: () =>
    render({
      minValue: 0,
      maxValue: 20
    }),
  name: 'minValue = 0, maxValue = 20'
};

export const MinValue0MaxValue20Quiet = {
  render: () =>
    render({
      isQuiet: true,
      minValue: 0,
      maxValue: 20
    }),
  name: 'minValue = 0, maxValue = 20, quiet'
};

export const MinValue50MaxValue20 = {
  render: () =>
    render({
      minValue: -50,
      maxValue: -20
    }),
  name: 'minValue = -50, maxValue = -20'
};

export const MinValue20MaxValue50 = {
  render: () =>
    render({
      minValue: 20,
      maxValue: 50
    }),
  name: 'minValue = 20, maxValue = 50'
};

export const MinValue0DefaultValue0 = {
  render: () =>
    render({
      minValue: 0,
      defaultValue: 0
    }),
  name: 'minValue = 0, defaultValue = 0'
};

export const Step5 = {
  render: () =>
    render({
      step: 5
    }),
  name: 'step = 5'
};

export const Step3WithMin2Max21 = {
  render: () =>
    render({
      step: 3,
      minValue: 2,
      maxValue: 21
    }),
  name: 'step = 3 with min = 2, max = 21'
};

export const AutoFocus = {
  render: () =>
    render({
      autoFocus: true
    }),
  name: 'autoFocus'
};

export const HideStepper = {
  render: () =>
    render({
      hideStepper: true
    }),
  name: 'hideStepper'
};

export const IsQuietHideStepper = {
  render: () =>
    render({
      isQuiet: true,
      hideStepper: true
    }),
  name: 'isQuiet, hideStepper'
};

export const Required = {
  render: () =>
    render({
      isRequired: true
    }),
  name: 'required'
};

export const Optional = {
  render: () =>
    render({
      necessityIndicator: 'label'
    }),
  name: 'optional'
};

export const RequiredWithLabel = {
  render: () =>
    render({
      isRequired: true,
      necessityIndicator: 'label'
    }),
  name: 'required with label'
};

export const LabelTopEnd = {
  render: () =>
    render({
      isRequired: true,
      labelPosition: 'top',
      labelAlign: 'end'
    }),
  name: 'label top end'
};

export const LabelSide = {
  render: () =>
    render({
      isRequired: true,
      labelPosition: 'side'
    }),
  name: 'label side'
};

export const NoVisibleLabel = {
  render: () =>
    renderNoLabel({
      isRequired: true,
      'aria-label': 'Width'
    }),
  name: 'no visible label'
};

export const QuietNoVisibleLabel = {
  render: () =>
    renderNoLabel({
      isQuiet: true,
      isRequired: true,
      'aria-label': 'Width'
    }),
  name: 'quiet no visible label'
};

export const QuietNoVisibleLabelHidestepper = {
  render: () =>
    renderNoLabel({
      hideStepper: true,
      isQuiet: true,
      isRequired: true,
      'aria-label': 'Width'
    }),
  name: 'quiet no visible label hidestepper'
};

export const AriaLabelledby = {
  render: () => (
    <>
      <label htmlFor="numberfield" id="label">
        Width
      </label>
      {renderNoLabel({
        isRequired: true,
        id: 'numberfield',
        'aria-labelledby': 'label'
      })}
    </>
  ),
  name: 'aria-labelledby'
};

export const WithDescriptionNoVisibleLabel = {
  render: () =>
    renderNoLabel({
      'aria-label': 'Age',
      description: 'Please select your age.'
    }),
  name: 'with description, no visible label'
};

export const WithErrorMessageLabelPositionSide = {
  render: () =>
    render({
      labelPosition: 'side',
      errorMessage: 'Please enter a positive number.',
      validationState: 'invalid'
    }),
  name: 'with error message, labelPosition: side'
};

export const CustomWidth = {
  render: () =>
    render({
      width: 'size-3000'
    }),
  name: 'custom width'
};

export const QuietCustomWidth = {
  render: () =>
    render({
      isQuiet: true,
      width: 'size-3000'
    }),
  name: 'quiet custom width'
};

export const CustomWidthNoVisibleLabel = {
  render: () =>
    renderNoLabel({
      width: 'size-3000',
      isRequired: true,
      'aria-label': 'Width'
    }),
  name: 'custom width no visible label'
};

export const CustomWidthLabelPositionSide = {
  render: () =>
    render({
      width: 'size-3000',
      labelPosition: 'side'
    }),
  name: 'custom width, labelPosition=side'
};

export const Controlled = {
  render: () => <NumberFieldControlled />,
  name: 'controlled'
};

export const CurrencySwitcher = {
  render: () => <NumberFieldWithCurrencySelect />,
  name: 'currency switcher'
};

export const Flexed = {
  render: () => renderSet(),
  name: 'flexed'
};

export const MinWidth = {
  render: () =>
    render({
      width: 0
    }),
  name: 'min width'
};

export const FocusEvents = {
  render: () =>
    render({
      onBlur: action('onBlur'),
      onFocus: action('onFocus'),
      onFocusChange: action('onFocusChange'),
      onKeyDown: action('onKeyDown'),
      onKeyUp: action('onKeyUp')
    }),
  name: 'focus events'
};

function render(props: any = {}) {
  return (
    <NumberField
      onChange={action('onChange')}
      UNSAFE_className="custom_classname"
      label="Width"
      {...props} />
  );
}

function renderNoLabel(props: any = {}) {
  return (
    <NumberField {...props} onChange={action('onChange')} UNSAFE_className="custom_classname" />
  );
}

function renderSet() {
  return (
    <Flex width="100%" gap="size-200" alignItems="end">
      <NumberField label="Grows" flexGrow={1} />
      <NumberField label="Static" />
      <NumberField aria-label="Grows" flexGrow={1} />
      <NumberField aria-label="Static" />
    </Flex>
  );
}

function NumberFieldControlled(props) {
  let [value, setValue] = useState(10);
  return (
    <NumberField
      {...props}
      formatOptions={{
        style: 'currency',
        currency: 'EUR'
      }}
      value={value}
      onChange={chain(setValue, action('onChange'))}
      label="Price" />
  );
}

function NumberFieldWithCurrencySelect(props) {
  let [value, setValue] = useState(10);
  let [currency, setCurrency] = useState('EUR');
  let [currencySign, setCurrencySign] = useState('standard');
  let [currencyDisplay, setCurrencyDisplay] = useState('symbol');
  return (
    <Form>
      <NumberField
        label="Price"
        {...props}
        formatOptions={{
          style: 'currency',
          currency,
          currencySign,
          currencyDisplay
        }}
        value={value}
        onChange={chain(setValue, action('onChange'))} />
      <Picker
        onSelectionChange={(item) => setCurrency(String(item))}
        label="Choose Currency"
        selectedKey={currency}
        items={[
          {
            label: 'Euro',
            value: 'EUR'
          },
          {
            label: 'US Dollar',
            value: 'USD'
          },
          {
            label: 'Japanese Yen',
            value: 'JPY'
          },
          {
            label: 'Saudi Riyal',
            value: 'SAR'
          }
        ]}>
        {(item) => <Item key={item.value}>{item.label}</Item>}
      </Picker>
      <Picker
        onSelectionChange={(item) => setCurrencySign(String(item))}
        label="Currency Sign"
        selectedKey={currencySign}
        items={[
          {
            label: 'Standard',
            value: 'standard'
          },
          {
            label: 'Accounting',
            value: 'accounting'
          }
        ]}>
        {(item) => <Item key={item.value}>{item.label}</Item>}
      </Picker>
      <Picker
        onSelectionChange={(item) => setCurrencyDisplay(String(item))}
        label="Currency Display"
        selectedKey={currencyDisplay}
        items={[
          {
            label: 'Symbol',
            value: 'symbol'
          },
          {
            label: 'Narrow Symbol',
            value: 'narrowSymbol'
          },
          {
            label: 'Code',
            value: 'code'
          },
          {
            label: 'Name',
            value: 'name'
          }
        ]}>
        {(item) => <Item key={item.value}>{item.label}</Item>}
      </Picker>
    </Form>
  );
}

class ErrorBoundary extends React.Component<
  {},
  {
    hasError: boolean
  }
> {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return {
      hasError: true
    };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <div>Your browser may not support this set of Intl.Format options.</div>;
    }

    return this.props.children;
  }
}
