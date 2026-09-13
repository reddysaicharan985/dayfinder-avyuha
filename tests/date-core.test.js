const assert = require("assert");
const dates = require("../dist/date-core.js");

assert.equal(dates.dayOfWeek("2000-01-01").name, "Saturday");
assert.equal(dates.dayOfWeek("2024-02-29").name, "Thursday");
assert.equal(dates.dayOfWeek("1947-08-15").name, "Friday");
assert.equal(dates.dayOfWeek("2100-03-01").name, "Monday");

assert.equal(dates.isLeapYear(2000), true);
assert.equal(dates.isLeapYear(1900), false);
assert.equal(dates.isLeapYear(2024), true);
assert.equal(dates.isLeapYear(2100), false);
assert.equal(dates.daysInMonth(2024, 2), 29);
assert.equal(dates.daysInMonth(2100, 2), 28);

assert.deepEqual(
  (({ totalDays, weeks, remainingDays }) => ({ totalDays, weeks, remainingDays }))(dates.daysBetween("2026-09-01", "2026-09-12", false)),
  { totalDays: 11, weeks: 1, remainingDays: 4 }
);
assert.equal(dates.daysBetween("2026-09-01", "2026-09-12", true).totalDays, 12);

assert.equal(dates.formatISO(dates.addToDate("2024-01-31", 1, "months")), "2024-02-29");
assert.equal(dates.formatISO(dates.addToDate("2024-02-29", 1, "years")), "2025-02-28");
assert.deepEqual(
  (({ years, months, days }) => ({ years, months, days }))(dates.ageBetween("2000-01-15", "2026-09-12")),
  { years: 26, months: 7, days: 28 }
);

assert.deepEqual(dates.getISOWeek("2021-01-04"), { week: 1, isoYear: 2021 });
assert.deepEqual(dates.getISOWeek("2021-01-01"), { week: 53, isoYear: 2020 });
assert.equal(dates.findWeekdays(2026, 9, 1).length, 4);
assert.equal(dates.monthGrid(2026, 9).cells.filter(Boolean).length, 30);

assert.deepEqual(
  (({ working, weekends, holidays, total }) => ({ working, weekends, holidays, total }))(
    dates.workingDays("2026-09-14", "2026-09-18", { holidays: ["2026-09-16"], includeEnd: true })
  ),
  { working: 4, weekends: 0, holidays: 1, total: 5 }
);
assert.equal(dates.workingDays("2026-09-14", "2026-09-18", { includeEnd: false }).working, 4);

assert.throws(() => dates.parseISO("2023-02-29"), /valid/);
assert.throws(() => dates.parseISO("1582-12-31"), /1583/);

console.log("All DayFinder date-engine tests passed.");
