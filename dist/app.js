(function () {
  "use strict";

  const language = document.getElementById("language");
  const localeMap = { en: "en-IN", te: "te-IN", hi: "hi-IN" };
  const weekdays = {
    en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    te: ["ఆదివారం", "సోమవారం", "మంగళవారం", "బుధవారం", "గురువారం", "శుక్రవారం", "శనివారం"],
    hi: ["रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"]
  };

  const copy = {
    en: {
      navTools: "Tools", navGuides: "Guides", navAbout: "About", eyebrow: "Free calendar toolkit",
      heroTitle: "Make every date easier to understand.", heroCopy: "Calculate working days, exact age, date differences, weekdays and printable calendars. Your dates stay in your browser.",
      featured: "Featured tool", openTool: "Open tool", allTools: "Everything you need for dates", toolsCopy: "Fast calculations for daily life, study and professional planning.",
      workingTitle: "Working Days Calculator", workingCopy: "Count working days with weekend and holiday rules.", weekdayTitle: "Weekday Finder", weekdayCopy: "Find the weekday for any Gregorian date from 1583 onward.",
      ageTitle: "Age Calculator", ageCopy: "Calculate exact age in years, months and days.", differenceTitle: "Date Difference", differenceCopy: "Measure the duration between two dates.",
      addTitle: "Add or Subtract Dates", addCopy: "Move a date by days, weeks, months or years.", specificTitle: "Specific Weekdays", specificCopy: "List every selected weekday in a month.",
      countdownTitle: "Countdown Calculator", countdownCopy: "See how long remains until an important date.", weekTitle: "Week Number", weekCopy: "Find a date’s ISO week number and ISO year.",
      leapTitle: "Leap-Year Checker", leapCopy: "Check a year and learn the Gregorian rule.", calendarTitle: "Monthly Calendar", calendarCopy: "Generate and print a calendar for any month.",
      calculate: "Calculate", reset: "Reset", chooseDate: "Choose a date", startDate: "Start date", endDate: "End date", asOfDate: "Calculate age on", birthDate: "Date of birth",
      monthYear: "Month and year", chooseWeekday: "Weekday", amount: "Amount", unit: "Unit", operation: "Operation", targetDate: "Target date", year: "Year", empty: "Your result will appear here.",
      result: "Result", days: "days", weeks: "weeks", months: "months", years: "years", working: "working days", weekends: "weekend days", holidays: "holidays", total: "total days",
      includeEnd: "Include the end date", weekendRule: "Weekend rule", state: "State holiday preset", customHolidays: "Additional holiday dates", print: "Print calendar"
    },
    te: {
      navTools: "సాధనాలు", navGuides: "మార్గదర్శకాలు", navAbout: "గురించి", eyebrow: "ఉచిత క్యాలెండర్ సాధనాలు",
      heroTitle: "ప్రతి తేదీని సులభంగా అర్థం చేసుకోండి.", heroCopy: "పని దినాలు, ఖచ్చితమైన వయస్సు, తేదీల మధ్య వ్యత్యాసం, వారాలు మరియు ముద్రించగల క్యాలెండర్లను లెక్కించండి.",
      featured: "ప్రధాన సాధనం", openTool: "సాధనం తెరవండి", allTools: "తేదీలకు అవసరమైన అన్ని సాధనాలు", toolsCopy: "రోజువారీ జీవితం, చదువు మరియు వృత్తిపరమైన ప్రణాళిక కోసం వేగవంతమైన లెక్కలు.",
      workingTitle: "పని దినాల కాలిక్యులేటర్", workingCopy: "వారాంతాలు మరియు సెలవులతో పని దినాలను లెక్కించండి.", weekdayTitle: "వారం రోజు ఫైండర్", weekdayCopy: "1583 నుంచి ఏ గ్రెగోరియన్ తేదీ వారాన్ని కనుగొనండి.",
      ageTitle: "వయస్సు కాలిక్యులేటర్", ageCopy: "సంవత్సరాలు, నెలలు, రోజులలో ఖచ్చితమైన వయస్సు.", differenceTitle: "తేదీల మధ్య వ్యత్యాసం", differenceCopy: "రెండు తేదీల మధ్య వ్యవధిని లెక్కించండి.",
      addTitle: "తేదీ జోడించు లేదా తీసివేయు", addCopy: "రోజులు, వారాలు, నెలలు లేదా సంవత్సరాలతో తేదీని మార్చండి.", specificTitle: "నిర్దిష్ట వారపు రోజులు", specificCopy: "ఒక నెలలో ఎంపిక చేసిన వారపు రోజులన్నీ కనుగొనండి.",
      countdownTitle: "కౌంట్‌డౌన్", countdownCopy: "ముఖ్యమైన తేదీ వరకు మిగిలిన సమయాన్ని చూడండి.", weekTitle: "వారం సంఖ్య", weekCopy: "ISO వారం సంఖ్య మరియు సంవత్సరాన్ని కనుగొనండి.",
      leapTitle: "లీప్ ఇయర్ తనిఖీ", leapCopy: "సంవత్సరం లీప్ ఇయరా కాదా తనిఖీ చేయండి.", calendarTitle: "నెలవారీ క్యాలెండర్", calendarCopy: "ఏ నెలకైనా క్యాలెండర్ సృష్టించి ముద్రించండి.",
      calculate: "లెక్కించండి", reset: "రీసెట్", chooseDate: "తేదీ ఎంచుకోండి", startDate: "ప్రారంభ తేదీ", endDate: "ముగింపు తేదీ", asOfDate: "ఈ తేదీన వయస్సు", birthDate: "పుట్టిన తేదీ",
      monthYear: "నెల మరియు సంవత్సరం", chooseWeekday: "వారం రోజు", amount: "మొత్తం", unit: "యూనిట్", operation: "చర్య", targetDate: "లక్ష్య తేదీ", year: "సంవత్సరం", empty: "ఫలితం ఇక్కడ కనిపిస్తుంది.",
      result: "ఫలితం", days: "రోజులు", weeks: "వారాలు", months: "నెలలు", years: "సంవత్సరాలు", working: "పని దినాలు", weekends: "వారాంతాలు", holidays: "సెలవులు", total: "మొత్తం రోజులు",
      includeEnd: "ముగింపు తేదీని చేర్చండి", weekendRule: "వారాంతపు నియమం", state: "రాష్ట్ర సెలవుల నమూనా", customHolidays: "అదనపు సెలవు తేదీలు", print: "క్యాలెండర్ ముద్రించండి"
    },
    hi: {
      navTools: "उपकरण", navGuides: "मार्गदर्शिकाएँ", navAbout: "परिचय", eyebrow: "मुफ़्त कैलेंडर टूलकिट",
      heroTitle: "हर तारीख को समझना आसान बनाएँ।", heroCopy: "कार्य दिवस, सही आयु, तारीखों का अंतर, सप्ताह के दिन और प्रिंट करने योग्य कैलेंडर की गणना करें।",
      featured: "मुख्य उपकरण", openTool: "उपकरण खोलें", allTools: "तारीखों के लिए सभी उपकरण", toolsCopy: "दैनिक जीवन, पढ़ाई और पेशेवर योजना के लिए तेज़ गणना।",
      workingTitle: "कार्य दिवस कैलकुलेटर", workingCopy: "सप्ताहांत और छुट्टियों के नियमों के साथ कार्य दिवस गिनें।", weekdayTitle: "सप्ताह-दिन खोजक", weekdayCopy: "1583 से किसी ग्रेगोरियन तारीख का दिन खोजें।",
      ageTitle: "आयु कैलकुलेटर", ageCopy: "वर्ष, महीने और दिनों में सही आयु निकालें।", differenceTitle: "तारीखों का अंतर", differenceCopy: "दो तारीखों के बीच की अवधि निकालें।",
      addTitle: "तारीख जोड़ें या घटाएँ", addCopy: "दिन, सप्ताह, महीने या वर्ष से तारीख बदलें।", specificTitle: "विशिष्ट सप्ताह-दिन", specificCopy: "किसी महीने में चुने हुए दिन की सभी तारीखें पाएँ।",
      countdownTitle: "काउंटडाउन कैलकुलेटर", countdownCopy: "महत्वपूर्ण तारीख तक बचा समय देखें।", weekTitle: "सप्ताह संख्या", weekCopy: "ISO सप्ताह संख्या और वर्ष खोजें।",
      leapTitle: "लीप-वर्ष जाँच", leapCopy: "जाँचें कि कोई वर्ष लीप वर्ष है या नहीं।", calendarTitle: "मासिक कैलेंडर", calendarCopy: "किसी भी महीने का कैलेंडर बनाएँ और प्रिंट करें।",
      calculate: "गणना करें", reset: "रीसेट", chooseDate: "तारीख चुनें", startDate: "आरंभ तारीख", endDate: "अंतिम तारीख", asOfDate: "इस तारीख पर आयु", birthDate: "जन्म तारीख",
      monthYear: "महीना और वर्ष", chooseWeekday: "सप्ताह का दिन", amount: "संख्या", unit: "इकाई", operation: "क्रिया", targetDate: "लक्ष्य तारीख", year: "वर्ष", empty: "परिणाम यहाँ दिखाई देगा।",
      result: "परिणाम", days: "दिन", weeks: "सप्ताह", months: "महीने", years: "वर्ष", working: "कार्य दिवस", weekends: "सप्ताहांत", holidays: "छुट्टियाँ", total: "कुल दिन",
      includeEnd: "अंतिम तारीख शामिल करें", weekendRule: "सप्ताहांत नियम", state: "राज्य छुट्टी प्रीसेट", customHolidays: "अतिरिक्त छुट्टी तारीखें", print: "कैलेंडर प्रिंट करें"
    }
  };

  const tools = {
    "weekday-finder": { title: "weekdayTitle", description: "weekdayCopy", use: "Use it for historical timelines, forms, anniversaries and calendar learning.", audience: "Useful for students, teachers, researchers and anyone checking a date." },
    "age-calculator": { title: "ageTitle", description: "ageCopy", use: "Use it when forms require an exact age or to measure a completed period of life.", audience: "Useful for students, schools, HR teams and families." },
    "date-difference": { title: "differenceTitle", description: "differenceCopy", use: "Compare project dates, contracts, trips, employment periods or personal milestones.", audience: "Useful for project teams, legal administration and personal planning." },
    "working-days": { title: "workingTitle", description: "workingCopy", use: "Plan business deadlines by excluding weekends, fixed-date presets and your custom official holidays.", audience: "Useful for HR, payroll, logistics, legal and project teams.", featured: true },
    "date-add-subtract": { title: "addTitle", description: "addCopy", use: "Calculate delivery dates, renewal dates, due dates and schedules.", audience: "Useful for operations teams, contractors and everyday planning." },
    "weekday-in-month": { title: "specificTitle", description: "specificCopy", use: "List all Mondays, Fridays or any other weekday in a chosen month.", audience: "Useful for schools, offices, events and recurring schedules." },
    countdown: { title: "countdownTitle", description: "countdownCopy", use: "Measure the days remaining until an exam, birthday, deadline or event.", audience: "Useful for students, event planners and families." },
    "week-number": { title: "weekTitle", description: "weekCopy", use: "Use ISO week numbering for reports, production schedules and weekly planning.", audience: "Useful for teams, logistics and international reporting." },
    "leap-year": { title: "leapTitle", description: "leapCopy", use: "Understand whether February has 28 or 29 days in a selected year.", audience: "Useful for students, developers, testers and researchers." },
    "monthly-calendar": { title: "calendarTitle", description: "calendarCopy", use: "Create a clean calendar for home, class or office planning.", audience: "Useful for families, teachers, students and teams." }
  };

  function currentLanguage() {
    return localStorage.getItem("dayfinder-language") || "en";
  }

  function t(key) {
    const lang = currentLanguage();
    return (copy[lang] && copy[lang][key]) || copy.en[key] || key;
  }

  function applyTranslations() {
    document.documentElement.lang = currentLanguage();
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      element.textContent = t(element.dataset.i18n);
    });
    if (language) language.value = currentLanguage();
  }

  function todayISO() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  }

  function monthISO() {
    return todayISO().slice(0, 7);
  }

  function field(label, id, type, value, extras) {
    const minimum = type === "date" ? ' min="1583-01-01"' : type === "month" ? ' min="1583-01"' : "";
    return `<div class="field"><label for="${id}">${label}</label><input id="${id}" type="${type}" value="${value || ""}"${minimum} ${extras || ""}></div>`;
  }

  function weekdayOptions() {
    return weekdays[currentLanguage()].map((name, index) => `<option value="${index}">${name}</option>`).join("");
  }

  function toolForm(id) {
    const date = todayISO();
    if (id === "weekday-finder") return `<div class="form-grid">${field(t("chooseDate"), "date", "date", date, "required")}</div>`;
    if (id === "age-calculator") return `<div class="form-grid">${field(t("birthDate"), "birth", "date", "2000-01-01", "required")}${field(t("asOfDate"), "asof", "date", date, "required")}</div>`;
    if (id === "date-difference") return `<div class="form-grid">${field(t("startDate"), "start", "date", date, "required")}${field(t("endDate"), "end", "date", date, "required")}<label class="checkbox"><input id="inclusive" type="checkbox">${t("includeEnd")}</label></div>`;
    if (id === "working-days") return `<div class="form-grid">${field(t("startDate"), "start", "date", date, "required")}${field(t("endDate"), "end", "date", date, "required")}<div class="field"><label for="weekend">${t("weekendRule")}</label><select id="weekend"><option value="sat-sun">Saturday & Sunday</option><option value="sun">Sunday only</option><option value="fri-sat">Friday & Saturday</option></select></div><div class="field"><label for="state">${t("state")}</label><select id="state"><option value="none">National fixed dates only</option><option value="telangana">Telangana</option><option value="andhra">Andhra Pradesh</option><option value="karnataka">Karnataka</option><option value="tamilnadu">Tamil Nadu</option><option value="maharashtra">Maharashtra</option><option value="kerala">Kerala</option><option value="gujarat">Gujarat</option><option value="westbengal">West Bengal</option></select></div><div class="field full"><label for="custom">${t("customHolidays")}</label><textarea id="custom" placeholder="2026-10-20, 2026-10-21"></textarea><span class="help">Use official YYYY-MM-DD dates separated by commas or new lines.</span></div><label class="checkbox"><input id="inclusive" type="checkbox" checked>${t("includeEnd")}</label></div>`;
    if (id === "date-add-subtract") return `<div class="form-grid">${field(t("chooseDate"), "date", "date", date, "required")}${field(t("amount"), "amount", "number", "30", "required min=\"0\" step=\"1\"")}<div class="field"><label for="unit">${t("unit")}</label><select id="unit"><option value="days">${t("days")}</option><option value="weeks">${t("weeks")}</option><option value="months">${t("months")}</option><option value="years">${t("years")}</option></select></div><div class="field"><label for="operation">${t("operation")}</label><select id="operation"><option value="add">Add</option><option value="subtract">Subtract</option></select></div></div>`;
    if (id === "weekday-in-month") return `<div class="form-grid">${field(t("monthYear"), "month", "month", monthISO(), "required")}<div class="field"><label for="weekday">${t("chooseWeekday")}</label><select id="weekday">${weekdayOptions()}</select></div></div>`;
    if (id === "countdown") return `<div class="form-grid">${field(t("targetDate"), "target", "date", date, "required")}</div>`;
    if (id === "week-number") return `<div class="form-grid">${field(t("chooseDate"), "date", "date", date, "required")}</div>`;
    if (id === "leap-year") return `<div class="form-grid">${field(t("year"), "year", "number", new Date().getFullYear(), "required min=\"1583\" step=\"1\"")}</div>`;
    if (id === "monthly-calendar") return `<div class="form-grid">${field(t("monthYear"), "month", "month", monthISO(), "required")}</div>`;
    return "";
  }

  function renderTool(id) {
    const root = document.getElementById("tool-root");
    if (!root || !tools[id]) return;
    const info = tools[id];
    root.innerHTML = `<section class="page-title"><a class="back-link" href="index.html">← ${t("navTools")}</a><p class="eyebrow">DayFinder by Avyuha</p><h1>${t(info.title)}</h1><p>${t(info.description)}</p></section><section class="tool-shell"><article class="calculator"><div class="calculator-header">${info.featured ? `<span class="featured-badge">${t("featured")}</span>` : ""}<h2>${t(info.title)}</h2><p>${t(info.description)}</p></div><form id="calculator-form">${toolForm(id)}<div class="actions"><button class="primary" type="submit">${t("calculate")}</button><button class="text-button" type="reset">${t("reset")}</button>${id === "monthly-calendar" ? `<button class="secondary" id="print-calendar" type="button">${t("print")}</button>` : ""}</div></form><div class="result" id="result" aria-live="polite"><p>${t("empty")}</p></div></article><aside class="info-stack"><article class="info-card"><span class="mini-label">HOW TO USE IT</span><h3>Practical purpose</h3><p>${info.use}</p></article><article class="info-card"><span class="mini-label">WHO USES IT</span><h3>Suitable users</h3><p>${info.audience}</p></article><div class="notice">DayFinder applies proleptic Gregorian rules from 1583 onward. Historical regions adopted the Gregorian calendar at different times, so confirm local calendar transitions for formal research.</div></aside></section>`;
    bindTool(id);
  }

  function result(html, isError) {
    const box = document.getElementById("result");
    box.classList.toggle("error", Boolean(isError));
    box.innerHTML = html;
  }

  function longDate(date) {
    return DayCore.formatLong(date, localeMap[currentLanguage()]);
  }

  function fixedHolidays(startYear, endYear, state) {
    const holidays = new Set();
    const national = ["01-26", "08-15", "10-02"];
    const stateDates = {
      telangana: ["06-02"], andhra: ["11-01"], karnataka: ["11-01"], tamilnadu: ["04-14"],
      maharashtra: ["05-01"], kerala: ["11-01"], gujarat: ["05-01"], westbengal: ["04-15"]
    };
    for (let year = startYear; year <= endYear; year += 1) {
      national.forEach((date) => holidays.add(`${year}-${date}`));
      (stateDates[state] || []).forEach((date) => holidays.add(`${year}-${date}`));
    }
    return holidays;
  }

  function bindTool(id) {
    const form = document.getElementById("calculator-form");
    if (!form) return;
    form.addEventListener("reset", () => setTimeout(() => result(`<p>${t("empty")}</p>`), 0));
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      try {
        if (id === "weekday-finder") {
          const answer = DayCore.dayOfWeek(document.getElementById("date").value);
          result(`<span class="mini-label">${t("result")}</span><strong>${weekdays[currentLanguage()][answer.index]}</strong><p>${longDate(answer.date)}</p>`);
        } else if (id === "age-calculator") {
          const answer = DayCore.ageBetween(document.getElementById("birth").value, document.getElementById("asof").value);
          result(`<span class="mini-label">${t("result")}</span><strong>${answer.years} ${t("years")}, ${answer.months} ${t("months")}, ${answer.days} ${t("days")}</strong><p>${answer.totalDays.toLocaleString()} ${t("total")}</p>`);
        } else if (id === "date-difference") {
          const answer = DayCore.daysBetween(document.getElementById("start").value, document.getElementById("end").value, document.getElementById("inclusive").checked);
          result(`<span class="mini-label">${t("result")}</span><strong>${answer.totalDays.toLocaleString()} ${t("days")}</strong><p>${answer.weeks} ${t("weeks")} + ${answer.remainingDays} ${t("days")}</p>`);
        } else if (id === "working-days") {
          const start = DayCore.parseISO(document.getElementById("start").value);
          const end = DayCore.parseISO(document.getElementById("end").value);
          const firstYear = Math.min(start.getUTCFullYear(), end.getUTCFullYear());
          const lastYear = Math.max(start.getUTCFullYear(), end.getUTCFullYear());
          const holidaySet = fixedHolidays(firstYear, lastYear, document.getElementById("state").value);
          document.getElementById("custom").value.split(/[\s,]+/).filter(Boolean).forEach((value) => holidaySet.add(DayCore.formatISO(DayCore.parseISO(value))));
          const weekendValue = document.getElementById("weekend").value;
          const weekendDays = weekendValue === "sun" ? [0] : weekendValue === "fri-sat" ? [5, 6] : [0, 6];
          const answer = DayCore.workingDays(start, end, { weekendDays, holidays: [...holidaySet], includeEnd: document.getElementById("inclusive").checked });
          result(`<span class="mini-label">${t("result")}</span><strong>${answer.working} ${t("working")}</strong><div class="result-grid"><div class="metric"><b>${answer.total}</b><span>${t("total")}</span></div><div class="metric"><b>${answer.weekends}</b><span>${t("weekends")}</span></div><div class="metric"><b>${answer.holidays}</b><span>${t("holidays")}</span></div></div><p>Holiday presets contain fixed reference dates only. Add festival, bank and official gazette holidays manually.</p>`);
        } else if (id === "date-add-subtract") {
          const amount = Number(document.getElementById("amount").value) * (document.getElementById("operation").value === "subtract" ? -1 : 1);
          const answer = DayCore.addToDate(document.getElementById("date").value, amount, document.getElementById("unit").value);
          if (answer.getUTCFullYear() < DayCore.MIN_YEAR) throw new Error(`The result must be in ${DayCore.MIN_YEAR} or later.`);
          result(`<span class="mini-label">${t("result")}</span><strong>${longDate(answer)}</strong><p>${DayCore.formatISO(answer)}</p>`);
        } else if (id === "weekday-in-month") {
          const [year, month] = document.getElementById("month").value.split("-").map(Number);
          const weekday = Number(document.getElementById("weekday").value);
          const matches = DayCore.findWeekdays(year, month, weekday);
          result(`<span class="mini-label">${t("result")}</span><strong>${matches.length} ${weekdays[currentLanguage()][weekday]}s</strong><div class="chips">${matches.map((date) => `<span class="chip">${date.getUTCDate()}</span>`).join("")}</div>`);
        } else if (id === "countdown") {
          const target = DayCore.parseISO(document.getElementById("target").value);
          const today = DayCore.parseISO(todayISO());
          const raw = Math.round((target - today) / DayCore.DAY_MS);
          const direction = raw < 0 ? "since this date" : "remaining";
          result(`<span class="mini-label">${t("result")}</span><strong>${Math.abs(raw).toLocaleString()} ${t("days")}</strong><p>${direction} · ${longDate(target)}</p>`);
        } else if (id === "week-number") {
          const value = document.getElementById("date").value;
          const answer = DayCore.getISOWeek(value);
          result(`<span class="mini-label">${t("result")}</span><strong>Week ${answer.week}</strong><p>ISO week-year ${answer.isoYear}</p>`);
        } else if (id === "leap-year") {
          const year = Number(document.getElementById("year").value);
          if (!Number.isInteger(year) || year < DayCore.MIN_YEAR) throw new Error(`Enter a year from ${DayCore.MIN_YEAR} onward.`);
          const leap = DayCore.isLeapYear(year);
          result(`<span class="mini-label">${t("result")}</span><strong>${year} is ${leap ? "a leap year" : "not a leap year"}.</strong><p>${leap ? "February has 29 days." : `The next leap year is ${DayCore.nextLeapYear(year)}.`}</p>`);
        } else if (id === "monthly-calendar") {
          const [year, month] = document.getElementById("month").value.split("-").map(Number);
          if (year < DayCore.MIN_YEAR) throw new Error(`Choose a month from ${DayCore.MIN_YEAR} onward.`);
          const grid = DayCore.monthGrid(year, month);
          const rows = [];
          for (let i = 0; i < grid.cells.length; i += 7) rows.push(`<tr>${grid.cells.slice(i, i + 7).map((day) => `<td class="${day ? "" : "empty"}">${day || ""}</td>`).join("")}</tr>`);
          result(`<span class="mini-label">${t("result")}</span><strong>${new Intl.DateTimeFormat(localeMap[currentLanguage()], { month: "long", year: "numeric", timeZone: "UTC" }).format(DayCore.makeDate(year, month, 1))}</strong><div class="calendar-wrap"><table class="calendar"><thead><tr>${weekdays[currentLanguage()].map((day) => `<th>${day.slice(0, 3)}</th>`).join("")}</tr></thead><tbody>${rows.join("")}</tbody></table></div>`);
        }
      } catch (error) {
        result(`<strong>Check your input</strong><p>${error.message}</p>`, true);
      }
    });
    const printButton = document.getElementById("print-calendar");
    if (printButton) printButton.addEventListener("click", () => window.print());
  }

  if (language) {
    language.value = currentLanguage();
    language.addEventListener("change", () => {
      localStorage.setItem("dayfinder-language", language.value);
      applyTranslations();
      if (document.body.dataset.tool) renderTool(document.body.dataset.tool);
    });
  }

  applyTranslations();
  if (document.body.dataset.tool) renderTool(document.body.dataset.tool);
  if ("serviceWorker" in navigator && location.protocol !== "file:") navigator.serviceWorker.register("sw.js").catch(() => {});
})();
