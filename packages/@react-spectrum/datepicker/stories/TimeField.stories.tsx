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
import {
  CalendarDateTime,
  parseTime,
  parseZonedDateTime,
  Time,
  toZoned
} from '@internationalized/date';
import React from 'react';
import {TimeField} from '../';


export default {
  title: 'Date and Time/TimeField',
  component: TimeField,
  args: {label: 'Time'},
  argTypes: {onChange: {action: 'change'}}
};

export const Default = {
  name: 'default'
};

export const DefaultValue = {
  name: 'defaultValue',
  args: {defaultValue: parseTime('20:24')}
};

export const ControlledValue = {
  name: 'controlled value',
  args: {value: new Time(2, 35)}
};

export const GranularitySecond = {
  name: 'granularity: second',
  args: {granularity: 'second'}
};

export const HourCycle12 = {
  name: 'hourCycle: 12',
  args: {
    hourCycle: 12,
    defaultValue: parseTime('00:00')
  }
};

export const HourCycle24 = {
  name: 'hourCycle: 24',
  args: {
    hourCycle: 24,
    defaultValue: parseTime('00:00')
  }
};

export const HourCycle12GranularityHour = {
  name: 'hourCycle: 12, granularity: hour',
  args: {
    hourCycle: 12,
    granularity: 'hour'
  }
};

export const HourCycle24GranularityHour = {
  name: 'hourCycle: 24, granularity: hour',
  args: {
    hourCycle: 24,
    granularity: 'hour'
  }
};

export const Zoned = {
  name: 'zoned',
  args: {
    defaultValue: parseZonedDateTime('2021-11-07T00:45-07:00[America/Los_Angeles]')
  }
};

export const HideTimeZone = {
  name: 'hideTimeZone',
  args: {
    defaultValue: parseZonedDateTime('2021-11-07T00:45-07:00[America/Los_Angeles]'),
    hideTimeZone: true
  }
};

export const IsDisabled = {
  name: 'isDisabled',
  args: {
    isDisabled: true,
    value: new Time(2, 35)
  }
};

export const IsQuietIsDisabled = {
  name: 'isQuiet, isDisabled',
  args: {
    isQuiet: true,
    isDisabled: true,
    value: new Time(2, 35)
  }
};

export const IsReadOnly = {
  name: 'isReadOnly',
  args: {
    isReadOnly: true,
    value: new Time(2, 35)
  }
};

export const AutoFocus = {
  name: 'autoFocus',
  args: {
    autoFocus: true
  }
};

export const ValidationStateInvalid = {
  name: 'validationState: invalid',
  args: {
    validationState: 'invalid',
    value: new Time(2, 35)
  }
};

export const ValidationStateValid = {
  name: 'validationState: valid',
  args: {
    validationState: 'valid',
    value: new Time(2, 35)
  }
};

export const PlaceholderValue8Am = {
  name: 'placeholderValue: 8 AM',
  args: {
    placeholderValue: new Time(8)
  }
};

export const PlaceholderValue1980118AmZoned = {
  name: 'placeholderValue: 1980/1/1 8AM, zoned',
  args: {placeholderValue: toZoned(new CalendarDateTime(1980, 1, 1, 8), 'America/Los_Angeles')}
};

export const MinValue8Am = {
  name: 'minValue: 8 AM',
  args: {minValue: new Time(8)}
};

export const MaxValue8Pm = {
  name: 'maxValue: 8 PM',
  args: {maxValue: new Time(20)}
};

export const MinValue8AmMaxValue8Pm = {
  name: 'minValue: 8 AM, maxValue: 8 PM',
  args: {
    minValue: new Time(8),
    maxValue: new Time(20)
  }
};
