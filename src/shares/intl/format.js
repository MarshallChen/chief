import IntlMessageFormat from 'intl-messageformat';
import IntlRelativeFormat from 'intl-relativeformat';

const cachedFormatters = Object.create(null);
const intlRelativeFormat = new IntlRelativeFormat;

function getCachedFormatter(message) {
  if (message in cachedFormatters) return cachedFormatters[message];
  cachedFormatters[message] = new IntlMessageFormat(message);
  return cachedFormatters[message];
}

export function format(msg, options = null) {
  if (!options) return msg;
  return getCachedFormatter(msg).format(options);
}

export function dateFormat(date, locales, options) {
  const dateTiemFormat = new Intl.DateTimeFormat(locales, options);
  return dateTimeFormat.format(date);
}

export function relativeDateFormat(date, options) {
  return intlRelativeFormat.format(date, options);
}