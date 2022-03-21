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
  CalendarDate,
  CalendarDateTime,
  parseAbsolute,
  parseAbsoluteToLocal,
  parseDate,
  parseDateTime,
  parseZonedDateTime,
  toZoned
} from '@internationalized/date';
import {DateField} from '../';
import {Flex} from '@react-spectrum/layout';
import {Item, Picker, Section} from '@react-spectrum/picker';
import {Provider} from '@react-spectrum/provider';
import React from 'react';
import {useLocale} from '@react-aria/i18n';

export default {
  title: 'Date and Time/DateField',
  render: (props) => <Example label="Date" {...props} />,
  argTypes: {onChange: {action: 'change'}}
};

export const Default = {
  name: 'default'
};

export const DefaultValue = {
  name: 'defaultValue',
  args: {defaultValue: parseDate('2020-02-03')}
};

export const ControlledValue = {
  name: 'controlled value',
  args: {value: new CalendarDate(2020, 2, 3)}
};

export const DefaultValueZoned = {
  name: 'defaultValue, zoned',
  args: {defaultValue: toZoned(parseDate('2020-02-03'), 'America/Los_Angeles')}
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

export const GranularityMinuteDefaultValue = {
  name: 'granularity: minute, defaultValue',
  args: {
    granularity: 'minute',
    defaultValue: parseDateTime('2021-03-14T08:45')
  }
};

export const GranularityMinuteDefaultValueZoned = {
  name: 'granularity: minute, defaultValue, zoned',
  args: {
    granularity: 'minute',
    defaultValue: parseZonedDateTime('2021-11-07T00:45-07:00[America/Los_Angeles]')
  }
};

export const GranularityMinuteDefaultValueZonedAbsolute = {
  name: 'granularity: minute, defaultValue, zoned, absolute',
  args: {
    granularity: 'minute',
    defaultValue: parseAbsoluteToLocal('2021-11-07T07:45:00Z')
  }
};

export const GranularityMinuteDefaultValueZonedAbsoluteTimeZone = {
  name: 'granularity: minute, defaultValue, zoned, absolute, timeZone',
  args: {
    granularity: 'minute',
    defaultValue: parseAbsolute('2021-11-07T07:45:00Z', 'America/New_York')
  }
};

export const DefaultValueWithTimeGranularityDay = {
  name: 'defaultValue with time, granularity: day',
  args: {
    granularity: 'day',
    defaultValue: parseDateTime('2021-03-14T08:45')
  }
};

export const HideTimeZone = {
  name: 'hideTimeZone',
  args: {
    granularity: 'minute',
    defaultValue: parseZonedDateTime('2021-11-07T00:45-07:00[America/Los_Angeles]'),
    hideTimeZone: true
  }
};

export const IsDisabled = {
  name: 'isDisabled',
  args: {
    isDisabled: true,
    value: new CalendarDate(2020, 2, 3)
  }
};

export const IsQuietIsDisabled = {
  name: 'isQuiet, isDisabled',
  args: {
    isQuiet: true,
    isDisabled: true,
    value: new CalendarDate(2020, 2, 3)
  }
};

export const IsReadOnly = {
  name: 'isReadOnly',
  args: {
    isReadOnly: true,
    value: new CalendarDate(2020, 2, 3)
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
    value: new CalendarDate(2020, 2, 3)
  }
};

export const ValidationStateValid = {
  name: 'validationState: valid',
  args: {
    validationState: 'valid',
    value: new CalendarDate(2020, 2, 3)
  }
};

export const MinValue201011MaxValue202011 = {
  name: 'minValue: 2010/1/1, maxValue: 2020/1/1',
  args: {
    minValue: new CalendarDate(2010, 0, 1),
    maxValue: new CalendarDate(2020, 0, 1)
  }
};

export const PlaceholderValue198011 = {
  name: 'placeholderValue: 1980/1/1',
  args: {placeholderValue: new CalendarDate(1980, 1, 1)}
};

export const PlaceholderValue1980118Am = {
  name: 'placeholderValue: 1980/1/1 8 AM',
  args: {placeholderValue: new CalendarDateTime(1980, 1, 1, 8)}
};

export const PlaceholderValue198011Zoned = {
  name: 'placeholderValue: 1980/1/1, zoned',
  args: {placeholderValue: toZoned(new CalendarDate(1980, 1, 1), 'America/Los_Angeles')}
};

// https://github.com/unicode-org/cldr/blob/22af90ae3bb04263f651323ce3d9a71747a75ffb/common/supplemental/supplementalData.xml#L4649-L4664
const preferences = [
  {
    locale: '',
    label: 'Default',
    ordering: 'gregory'
  },
  {
    label: 'Arabic (Algeria)',
    locale: 'ar-DZ',
    territories: 'DJ DZ EH ER IQ JO KM LB LY MA MR OM PS SD SY TD TN YE',
    ordering: 'gregory islamic islamic-civil islamic-tbla'
  },
  {
    label: 'Arabic (United Arab Emirates)',
    locale: 'ar-AE',
    territories: 'AE BH KW QA',
    ordering: 'gregory islamic-umalqura islamic islamic-civil islamic-tbla'
  },
  {
    label: 'Arabic (Egypt)',
    locale: 'AR-EG',
    territories: 'EG',
    ordering: 'gregory coptic islamic islamic-civil islamic-tbla'
  },
  {
    label: 'Arabic (Saudi Arabia)',
    locale: 'ar-SA',
    territories: 'SA',
    ordering: 'islamic-umalqura gregory islamic islamic-rgsa'
  },
  {
    label: 'Farsi (Afghanistan)',
    locale: 'fa-AF',
    territories: 'AF IR',
    ordering: 'persian gregory islamic islamic-civil islamic-tbla'
  },
  // {territories: 'CN CX HK MO SG', ordering: 'gregory chinese'},
  {
    label: 'Amharic (Ethiopia)',
    locale: 'am-ET',
    territories: 'ET',
    ordering: 'gregory ethiopic ethioaa'
  },
  {
    label: 'Hebrew (Israel)',
    locale: 'he-IL',
    territories: 'IL',
    ordering: 'gregory hebrew islamic islamic-civil islamic-tbla'
  },
  {
    label: 'Hindi (India)',
    locale: 'hi-IN',
    territories: 'IN',
    ordering: 'gregory indian'
  },
  // {label: 'Marathi (India)', locale: 'mr-IN', territories: 'IN', ordering: 'gregory indian'},
  {
    label: 'Bengali (India)',
    locale: 'bn-IN',
    territories: 'IN',
    ordering: 'gregory indian'
  },
  {
    label: 'Japanese (Japan)',
    locale: 'ja-JP',
    territories: 'JP',
    ordering: 'gregory japanese'
  },
  // {territories: 'KR', ordering: 'gregory dangi'},
  {
    label: 'Thai (Thailand)',
    locale: 'th-TH',
    territories: 'TH',
    ordering: 'buddhist gregory'
  },
  {
    label: 'Chinese (Taiwan)',
    locale: 'zh-TW',
    territories: 'TW',
    ordering: 'gregory roc chinese'
  }
];

const calendars = [
  {
    key: 'gregory',
    name: 'Gregorian'
  },
  {
    key: 'japanese',
    name: 'Japanese'
  },
  {
    key: 'buddhist',
    name: 'Buddhist'
  },
  {
    key: 'roc',
    name: 'Taiwan'
  },
  {
    key: 'persian',
    name: 'Persian'
  },
  {
    key: 'indian',
    name: 'Indian'
  },
  {
    key: 'islamic-umalqura',
    name: 'Islamic (Umm al-Qura)'
  },
  {
    key: 'islamic-civil',
    name: 'Islamic Civil'
  },
  {
    key: 'islamic-tbla',
    name: 'Islamic Tabular'
  },
  {
    key: 'hebrew',
    name: 'Hebrew'
  },
  {
    key: 'coptic',
    name: 'Coptic'
  },
  {
    key: 'ethiopic',
    name: 'Ethiopic'
  },
  {
    key: 'ethioaa',
    name: 'Ethiopic (Amete Alem)'
  }
];

function Example(props) {
  let [locale, setLocale] = React.useState('');
  let [calendar, setCalendar] = React.useState<React.Key>(calendars[0].key);
  let {locale: defaultLocale} = useLocale();
  let pref = preferences.find((p) => p.locale === locale);
  let preferredCalendars = React.useMemo(
    () =>
      pref
        ? pref.ordering
            .split(' ')
            .map((p) => calendars.find((c) => c.key === p))
            .filter(Boolean)
        : [calendars[0]],
    [pref]
  );
  let otherCalendars = React.useMemo(
    () => calendars.filter((c) => !preferredCalendars.some((p) => p.key === c.key)),
    [preferredCalendars]
  );

  let updateLocale = (locale) => {
    setLocale(locale);
    let pref = preferences.find((p) => p.locale === locale);
    setCalendar(pref.ordering.split(' ')[0]);
  };

  return (
    <Flex direction="column" gap="size-600" alignItems="center">
      <Flex direction="row" gap="size-150" wrap justifyContent="center">
        <Picker
          label="Locale"
          items={preferences}
          selectedKey={locale}
          onSelectionChange={updateLocale}>
          {(item) => <Item key={item.locale}>{item.label}</Item>}
        </Picker>
        <Picker label="Calendar" selectedKey={calendar} onSelectionChange={setCalendar}>
          <Section title="Preferred" items={preferredCalendars}>
            {(item) => <Item>{item.name}</Item>}
          </Section>
          <Section title="Other" items={otherCalendars}>
            {(item) => <Item>{item.name}</Item>}
          </Section>
        </Picker>
      </Flex>
      <Provider
        locale={
          (locale || defaultLocale) +
          (calendar && calendar !== preferredCalendars[0].key ? '-u-ca-' + calendar : '')
        }>
        <DateField {...props} />
      </Provider>
    </Flex>
  );
}
