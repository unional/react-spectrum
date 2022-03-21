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
import {CalendarDate, parseDate, toZoned} from '@internationalized/date';
import {DateRangePicker} from '../';
import React from 'react';


export default {
  title: 'Date and Time/DateRangePicker',
  component: DateRangePicker,
  Decorator: (Story) => (
    <div>
      <Story />
    </div>
  ),
  args: {label: 'Date range'},
  argTypes: {onChange: {action: 'change'}}
};

export const Default = {
  name: 'default'
};

export const DefaultValue = {
  name: 'defaultValue',
  args: {
    defaultValue: {
      start: new CalendarDate(2020, 2, 3),
      end: new CalendarDate(2020, 5, 4)
    }
  }
};

export const ControlledValue = {
  name: 'controlled value',
  args: {
    value: {
      start: new CalendarDate(2020, 2, 3),
      end: new CalendarDate(2020, 5, 4)
    }
  }
};

export const DefaultValueZoned = {
  name: 'defaultValue, zoned',
  args: {
    defaultValue: {
      start: toZoned(parseDate('2020-02-03'), 'America/New_York'),
      end: toZoned(parseDate('2020-02-05'), 'America/Los_Angeles')
    }
  }
};

export const GranularityMinute = {
  name: 'granularity: minute',
  args: {granularity: 'minute'}
};

export const GranularitySecond = {
  name: 'granularity: second',
  args: {granularity: 'second'}
};

export const HourCycle12 = {
  name: 'hourCycle: 12',
  args: {
    granularity: 'minute',
    hourCycle: 12
  }
};

export const HourCycle24 = {
  name: 'hourCycle: 24',
  args: {
    granularity: 'minute',
    hourCycle: 24
  }
};

export const IsDisabled = {
  name: 'isDisabled',
  args: {
    isDisabled: true,
    value: {
      start: new CalendarDate(2020, 2, 3),
      end: new CalendarDate(2020, 5, 4)
    }
  }
};

export const IsQuietIsDisabled = {
  ...IsDisabled,
  name: 'isQuiet, isDisabled',
  args: {
    isQuiet: true
  }
};

export const IsReadOnly = {
  name: 'isReadOnly',
  args: {
    isReadOnly: true,
    value: {
      start: new CalendarDate(2020, 2, 3),
      end: new CalendarDate(2020, 5, 4)
    }
  }
};

export const AutoFocus = {
  name: 'autoFocus',
  args: {autoFocus: true}
};

export const ValidationStateInvalid = {
  name: 'validationState: invalid',
  args: {
    validationState: 'invalid',
    value: {
      start: new CalendarDate(2020, 2, 3),
      end: new CalendarDate(2020, 5, 4)
    }
  }
};

export const ValidationStateValid = {
  name: 'validationState: valid',
  args: {
    validationState: 'valid',
    value: {
      start: new CalendarDate(2020, 2, 3),
      end: new CalendarDate(2020, 5, 4)
    }
  }
};

export const MinDate201011MaxDate202011 = {
  name: 'minDate: 2010/1/1, maxDate: 2020/1/1',
  args: {
    minValue: new CalendarDate(2010, 1, 1),
    maxValue: new CalendarDate(2020, 1, 1)
  }
};

export const PlaceholderValue198011 = {
  name: 'placeholderValue: 1980/1/1',
  args: {placeholderValue: new CalendarDate(1980, 1, 1)}
};

export const VisibleMonths2 = {
  name: 'visibleMonths: 2',
  args: {
    visibleMonths: 2,
    granularity: 'minute'
  }
};

export const VisibleMonths3 = {
  name: 'visibleMonths: 3',
  args: {
    visibleMonths: 3,
    granularity: 'minute'
  }
};

