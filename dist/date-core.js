(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.DayCore = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const DAY_MS = 86400000;
  const MIN_YEAR = 1583;
  const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function isLeapYear(year) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  }

  function daysInMonth(year, month) {
    if (month === 2) return isLeapYear(year) ? 29 : 28;
    return [4, 6, 9, 11].includes(month) ? 30 : 31;
  }

  function makeDate(year, month, day) {
    return new Date(Date.UTC(year, month - 1, day));
  }

  function parseISO(value) {
    const match = /^(\d{4,6})-(\d{2})-(\d{2})$/.exec(String(value || ""));
    if (!match) throw new Error("Choose a valid date.");
    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    if (year < MIN_YEAR || month < 1 || month > 12 || day < 1 || day > daysInMonth(year, month)) {
      throw new Error(`Dates must be valid and from ${MIN_YEAR} onward.`);
    }
    return makeDate(year, month, day);
  }

  function formatISO(date) {
    return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
  }

  function formatLong(date, locale) {
    return new Intl.DateTimeFormat(locale || "en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC"
    }).format(date);
  }

  function dayOfWeek(value) {
    const date = value instanceof Date ? value : parseISO(value);
    return { index: date.getUTCDay(), name: WEEKDAYS[date.getUTCDay()], date };
  }

  function compareDates(a, b) {
    return a.getTime() - b.getTime();
  }

  function daysBetween(startValue, endValue, inclusive) {
    const start = startValue instanceof Date ? startValue : parseISO(startValue);
    const end = endValue instanceof Date ? endValue : parseISO(endValue);
    const sign = compareDates(end, start) >= 0 ? 1 : -1;
    const total = Math.round(Math.abs(end.getTime() - start.getTime()) / DAY_MS) + (inclusive ? 1 : 0);
    return { totalDays: total, sign, weeks: Math.floor(total / 7), remainingDays: total % 7, start, end };
  }

  function addMonthsClamped(date, months) {
    const originalDay = date.getUTCDate();
    const base = makeDate(date.getUTCFullYear(), date.getUTCMonth() + 1, 1);
    base.setUTCMonth(base.getUTCMonth() + months);
    base.setUTCDate(Math.min(originalDay, daysInMonth(base.getUTCFullYear(), base.getUTCMonth() + 1)));
    return base;
  }

  function addToDate(value, amount, unit) {
    const date = value instanceof Date ? new Date(value.getTime()) : parseISO(value);
    const number = Number(amount);
    if (!Number.isInteger(number)) throw new Error("Enter a whole number.");
    if (unit === "days") date.setUTCDate(date.getUTCDate() + number);
    else if (unit === "weeks") date.setUTCDate(date.getUTCDate() + number * 7);
    else if (unit === "months") return addMonthsClamped(date, number);
    else if (unit === "years") return addMonthsClamped(date, number * 12);
    else throw new Error("Choose a valid unit.");
    return date;
  }

  function ageBetween(birthValue, asOfValue) {
    const birth = birthValue instanceof Date ? birthValue : parseISO(birthValue);
    const asOf = asOfValue instanceof Date ? asOfValue : parseISO(asOfValue);
    if (compareDates(asOf, birth) < 0) throw new Error("The calculation date must be after the birth date.");

    let years = asOf.getUTCFullYear() - birth.getUTCFullYear();
    let cursor = addMonthsClamped(birth, years * 12);
    if (compareDates(cursor, asOf) > 0) {
      years -= 1;
      cursor = addMonthsClamped(birth, years * 12);
    }

    let months = (asOf.getUTCFullYear() - cursor.getUTCFullYear()) * 12 + asOf.getUTCMonth() - cursor.getUTCMonth();
    let monthCursor = addMonthsClamped(cursor, months);
    if (compareDates(monthCursor, asOf) > 0) {
      months -= 1;
      monthCursor = addMonthsClamped(cursor, months);
    }

    const days = Math.round((asOf.getTime() - monthCursor.getTime()) / DAY_MS);
    const totalDays = Math.round((asOf.getTime() - birth.getTime()) / DAY_MS);
    return { years, months, days, totalDays, birth, asOf };
  }

  function findWeekdays(year, month, weekday) {
    if (year < MIN_YEAR || month < 1 || month > 12 || weekday < 0 || weekday > 6) {
      throw new Error("Choose a valid month and weekday.");
    }
    const matches = [];
    for (let day = 1; day <= daysInMonth(year, month); day += 1) {
      const date = makeDate(year, month, day);
      if (date.getUTCDay() === weekday) matches.push(date);
    }
    return matches;
  }

  function getISOWeek(value) {
    const date = value instanceof Date ? new Date(value.getTime()) : parseISO(value);
    const day = date.getUTCDay() || 7;
    date.setUTCDate(date.getUTCDate() + 4 - day);
    const isoYear = date.getUTCFullYear();
    const yearStart = makeDate(isoYear, 1, 1);
    const week = Math.ceil((((date - yearStart) / DAY_MS) + 1) / 7);
    return { week, isoYear };
  }

  function nextLeapYear(year) {
    let candidate = Number(year) + 1;
    while (!isLeapYear(candidate)) candidate += 1;
    return candidate;
  }

  function monthGrid(year, month) {
    const leading = makeDate(year, month, 1).getUTCDay();
    const total = daysInMonth(year, month);
    const cells = Array(leading).fill(null);
    for (let day = 1; day <= total; day += 1) cells.push(day);
    while (cells.length % 7 !== 0) cells.push(null);
    return { year, month, cells, totalDays: total, leading };
  }

  function workingDays(startValue, endValue, options) {
    const settings = options || {};
    let start = startValue instanceof Date ? new Date(startValue.getTime()) : parseISO(startValue);
    let end = endValue instanceof Date ? new Date(endValue.getTime()) : parseISO(endValue);
    if (compareDates(start, end) > 0) [start, end] = [end, start];
    const span = Math.round((end - start) / DAY_MS);
    if (span > 36600) throw new Error("Choose a range of 100 years or less.");

    const weekendDays = new Set(settings.weekendDays || [0, 6]);
    const holidays = new Set(settings.holidays || []);
    const includeEnd = settings.includeEnd !== false;
    const last = includeEnd ? end.getTime() : end.getTime() - DAY_MS;
    let working = 0;
    let weekends = 0;
    let holidayCount = 0;
    let total = 0;

    for (let stamp = start.getTime(); stamp <= last; stamp += DAY_MS) {
      const date = new Date(stamp);
      total += 1;
      if (weekendDays.has(date.getUTCDay())) weekends += 1;
      else if (holidays.has(formatISO(date))) holidayCount += 1;
      else working += 1;
    }
    return { working, weekends, holidays: holidayCount, total, start, end };
  }

  return {
    DAY_MS,
    MIN_YEAR,
    WEEKDAYS,
    isLeapYear,
    daysInMonth,
    makeDate,
    parseISO,
    formatISO,
    formatLong,
    dayOfWeek,
    daysBetween,
    addToDate,
    ageBetween,
    findWeekdays,
    getISOWeek,
    nextLeapYear,
    monthGrid,
    workingDays
  };
});
