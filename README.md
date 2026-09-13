# DayFinder by Avyuha

DayFinder is a dependency-free collection of ten private date and calendar utilities. It runs entirely in the browser, works offline after the first successful visit, and is designed for everyday, educational and professional planning.

Live site: <https://dayfinder-avyuha.web.app>

## Included tools

1. Working Days Calculator — the featured tool
2. Weekday Finder
3. Age Calculator
4. Date Difference Calculator
5. Add or Subtract Dates
6. Find Specific Weekdays in a Month
7. Countdown Calculator
8. ISO Week Number Calculator
9. Leap-Year Checker
10. Printable Monthly Calendar

The calculation engine uses proleptic Gregorian rules from 1583 onward. Indian national and state presets are fixed-date references, not a complete official holiday database. Users should add current festival, bank and gazette holidays manually and verify critical results with the relevant authority.

## Run locally

Open `dist/index.html` directly for basic use, or serve the `dist` directory so the service worker can be tested:

```bash
python -m http.server 5500 --directory dist
```

Then visit <http://localhost:5500>.

## Build and test

No dependencies are required.

```bash
npm run build
npm test
```

`npm run build` regenerates the tool and information pages from `scripts/generate-pages.js`. The pure calculation functions live in `dist/date-core.js` and are covered by Node tests.

## Deploy to Firebase

The repository is configured for the existing `dayfinder` Firebase Hosting target:

```bash
firebase deploy --only hosting:dayfinder
```

## Privacy

Dates are calculated locally in the browser. DayFinder does not require an account or intentionally upload calculator inputs. See `dist/privacy.html` for the complete notice.

## Important limitation

DayFinder is an informational planning tool. Verify dates against official sources for legal, payroll, banking, historical or safety-critical decisions.
