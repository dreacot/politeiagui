import { MONTHS_LABELS, IDENTITY_ERROR } from "./constants";
import { formatDateToInternationalString } from "./helpers";
/**
 * Converts atoms to DCR
 *
 * @param {number} atoms - amount in atoms
 * @return {number} dcr - amount in dcr
 */
export const convertAtomsToDcr = (atoms) => atoms / 100000000;

/**
 * Formats unix seconds timestamp to a UTC string date
 *
 * @param {number} unixtimestamp - unix timestamp
 * @return {string} date - date formated in UTC String
 */
export const formatUnixTimestamp = (unixtimestamp) =>
  new Date(unixtimestamp * 1000).toUTCString();

/**
 * Formats unix seconds timestamp to an { day, month, year} object
 * @param {number} unixtimestamp - unix seconds timestamp
 * @return {object} date - { day, month, year } object
 */
export const formatUnixTimestampToObj = (unixtimestamp) => {
  const date = new Date(unixtimestamp * 1000);
  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear()
  };
};

/**
 * Formats unix seconds timestamp to a short UTC string date
 *
 * @param {number} unixtimestamp - unix seconds timestamp
 * @return {string} date - date formated in dd mmm yyyy
 */
export const formatShortUnixTimestamp = (unixtimestamp) => {
  const currentdate = new Date(unixtimestamp * 1000);
  return `${currentdate.getUTCDate()} ${
    MONTHS_LABELS[currentdate.getUTCMonth()]
  } ${currentdate.getUTCFullYear()}`;
};

/**
 * Returns a formatter to format a number to US standard currency string. Example: const f = currencyFormatter("USD"); f.format(2500) // $2,500.00
 * @param {string} currency
 */
export const currencyFormatter = (currency) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency
  });

/** exports an usdFormatter */
export const usdFormatter = currencyFormatter("USD");

/** Exports a simple formatter that takes cents and returns in dollars and label */
export const formatCentsToUSD = (centsInput) => {
  const dollars = centsInput / 100;
  return dollars.toFixed(2) + " USD";
};

/*
 * Verifies whether given error is some identity error.
 */
export const isIdentityError = (error) => {
  const mapPluginIdentityErrors = {
    "comments-user": 3,
    comments: 2,
    "records-user": 10,
    "pi-user": 2,
    "ticketvote-user": 2,
    ticketvote: 2,
    www: 21
  };
  const isPluginIdentityError =
    error &&
    error.errorid &&
    mapPluginIdentityErrors[error.errorid] === error.errorcode;
  return error?.message === IDENTITY_ERROR || isPluginIdentityError;
};

/**
 * parseTimestampsFromMessage returns a human friendly message with formatted
 * timestamps.
 * @param {string} msg
 */
export function formatTimestampsFromMessage(msg) {
  let newMsg = msg;
  const timestamps = msg.match(/[0-9]+/g);
  timestamps.forEach((t) => {
    const formattedTime = formatDateToInternationalString(
      formatUnixTimestampToObj(t)
    );
    newMsg = newMsg.replace(t, formattedTime);
  });
  return newMsg;
}
