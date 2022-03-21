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
import {
  CalendarDate,
  CalendarDateTime,
  getLocalTimeZone,
  parseZonedDateTime,
  today
} from '@internationalized/date';
import {Flex} from '@react-spectrum/layout';
import {RangeCalendar} from '../';
import React, {useState} from 'react';
import {TimeField} from '@react-spectrum/datepicker';

export default {
  title: 'Date and Time/RangeCalendar',
  component: RangeCalendar
};

export const Default = {
  name: 'default'
};

export const DefaultValue = {
  name: 'defaultValue',
  args: {
    defaultValue: {
      start: new CalendarDate(2019, 6, 5),
      end: new CalendarDate(2019, 6, 10)
    }
  }
};

export const ControlledValue = {
  name: 'controlled value',
  args: {
    value: {
      start: new CalendarDate(2019, 6, 5),
      end: new CalendarDate(2019, 6, 10)
    }
  }
};

export const WithTime = {
  name: 'with time',
  render: (props) => <RangeCalendarWithTime {...props} />
};

export const WithZonedTime = {
  name: 'with zoned time',
  render: (props) => <RangeCalendarWithZonedTime {...props} />
};

export const MinValueTodayMaxValue1WeekFromNow = {
  name: 'minValue: today, maxValue: 1 week from now',
  args: {
    minValue: today(getLocalTimeZone()),
    maxValue: today(getLocalTimeZone()).add({
      weeks: 1
    })
  }
};

export const DefaultValueMinValueMaxValue = {
  ...DefaultValue,
  name: 'defaultValue + minValue + maxValue',
  args: {
    minValue: new CalendarDate(2019, 6, 5),
    maxValue: new CalendarDate(2019, 6, 20)
  }
};

export const IsDisabled = {
  ...DefaultValue,
  name: 'isDisabled',
  args: {
    isDisabled: true
  }
};

export const IsReadOnly = {
  ...DefaultValue,
  name: 'isReadOnly',
  args: {isReadOnly: true}
};

export const AutoFocus = {
  ...DefaultValue,
  name: 'autoFocus',
  args: {autoFocus: true}
};

export const VisibleMonths2 = {
  name: 'visibleMonths: 2',
  args: {visibleMonths: 2}
};

export const VisibleMonths3 = {
  name: 'visibleMonths: 3',
  args: {visibleMonths: 3}
};

export const MinValueTodayVisibleMonths3 = {
  name: 'minValue: today, visibleMonths: 3',
  args: {
    minValue: today(getLocalTimeZone()),
    visibleMonths: 3
  }
};

export const DefaultValueVisibleMonths3 = {
  name: 'defaultValue, visibleMonths: 3',
  args: {
    visibleMonths: 3,
    defaultValue: {
      start: new CalendarDate(2021, 10, 5),
      end: new CalendarDate(2021, 12, 10)
    }
  }
};

function RangeCalendarWithTime() {
  let [value, setValue] = useState({
    start: new CalendarDateTime(2019, 6, 5, 8),
    end: new CalendarDateTime(2019, 6, 10, 12)
  });
  return (
    <Flex direction="column">
      <RangeCalendar value={value} onChange={setValue} />
      <Flex gap="size-100">
        <TimeField
          label="Start time"
          value={value.start}
          onChange={(v) => setValue({...value, start: v})} />
        <TimeField
          label="End time"
          value={value.end}
          onChange={(v) => setValue({...value, end: v})} />
      </Flex>
    </Flex>
  );
}

function RangeCalendarWithZonedTime() {
  let [value, setValue] = useState({
    start: parseZonedDateTime('2021-03-10T00:45-05:00[America/New_York]'),
    end: parseZonedDateTime('2021-03-26T18:05-07:00[America/Los_Angeles]')
  });
  return (
    <Flex direction="column">
      <RangeCalendar value={value} onChange={setValue} />
      <Flex gap="size-100">
        <TimeField
          label="Start time"
          value={value.start}
          onChange={(v) => setValue({...value, start: v})} />
        <TimeField
          label="End time"
          value={value.end}
          onChange={(v) => setValue({...value, end: v})} />
      </Flex>
    </Flex>
  );
}
