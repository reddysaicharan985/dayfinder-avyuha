# DayFinder by Avyuha

DayFinder is a responsive single-page calendar learning application. It can:

- Convert a complete date into its weekday.
- Find every occurrence of a chosen weekday in a selected month and year.
- Explain month lengths, leap years and weekday calculation.
- Run built-in test cases for known dates.

## Open in VS Code

1. Extract the ZIP file.
2. Open the `DayFinder-Avyuha-VSCode` folder in VS Code.
3. Open `dist/index.html`.
4. Right-click the file and select **Open with Live Server**.

You can also double-click `dist/index.html` to run it directly in a browser.

## Deploy as an Avyuha Firebase Hosting site

Install the Firebase CLI if it is not already installed:

```powershell
npm install -g firebase-tools
```

From this project folder, run:

```powershell
firebase login
firebase use avyuha-website
firebase hosting:sites:create YOUR_UNIQUE_SITE_ID
firebase target:apply hosting dayfinder YOUR_UNIQUE_SITE_ID
firebase deploy --only hosting:dayfinder
```

Replace `YOUR_UNIQUE_SITE_ID` with an available ID such as `avyuha-dayfinder`.
Run `firebase hosting:sites:create` only once. Future updates require only:

```powershell
firebase deploy --only hosting:dayfinder
```

## Project structure

```text
DayFinder-Avyuha-VSCode/
|-- dist/
|   `-- index.html
|-- firebase.json
`-- README.md
```

Created by Mukkara Sai Charan Reddy as an Avyuha learning project.

