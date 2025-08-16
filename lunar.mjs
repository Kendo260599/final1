// ===== LUNAR CALENDAR CONVERSION =====
// Based on Vietnamese lunar calendar conversion algorithms

// *** Jd*** Numeric date to day,month,year
function jdToDate(jd) {
  let a, b, c, d, e, m, day, month, year;
  a = jd + 32044;
  b = Math.floor((4 * a + 3) / 146097);
  c = a - Math.floor((146097 * b) / 4);
  d = Math.floor((4 * c + 3) / 1461);
  e = c - Math.floor((1461 * d) / 4);
  m = Math.floor((5 * e + 2) / 153);
  day = e - Math.floor((153 * m + 2) / 5) + 1;
  month = m + 3 - 12 * Math.floor(m / 10);
  year = 100 * b + d - 4800 + Math.floor(m / 10);
  return [day, month, year];
}

// *** Date*** day,month,year to Numeric date
function dateToJd(dd, mm, yy) {
  let a = Math.floor((14 - mm) / 12);
  let y = yy + 4800 - a;
  let m = mm + 12 * a - 3;
  return dd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
}

// *** SUN*** LONGITUDE
function SunLongitude(jdn) {
  const T = (jdn - 2451545.0) / 36525;
  const T2 = T * T;
  const dr = Math.PI / 180;
  const M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
  const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
  let DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
  DL = DL + (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.000290 * Math.sin(dr * 3 * M);
  let L = L0 + DL;
  L = L * dr;
  L = L - Math.PI * 2 * (Math.floor(L / (Math.PI * 2)));
  return Math.floor(L / Math.PI * 6);
}

function NewMoon(k) {
  const T = k / 1236.85;
  const T2 = T * T;
  const T3 = T2 * T;
  const dr = Math.PI / 180;
  let Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
  Jd1 = Jd1 + 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
  const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
  const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
  const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
  let C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
  C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
  C1 = C1 - 0.0004 * Math.sin(dr * 3 * Mpr);
  C1 = C1 + 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
  C1 = C1 - 0.0074 * Math.sin(dr * (M - Mpr)) + 0.0004 * Math.sin(dr * (2 * F + M));
  C1 = C1 - 0.0004 * Math.sin(dr * (2 * F - M)) - 0.0006 * Math.sin(dr * (2 * F + Mpr));
  C1 = C1 + 0.0010 * Math.sin(dr * (2 * F - Mpr)) + 0.0005 * Math.sin(dr * (2 * Mpr + M));
  let deltat;
  if (T < -11) {
    deltat = 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3;
  } else {
    deltat = -0.000278 + 0.000265 * T + 0.000262 * T2;
  }
  const JdNew = Jd1 + C1 - deltat;
  return JdNew;
}

function getSunLongitude(dayNumber, timeZone) {
  return SunLongitude(dayNumber - 0.5 - timeZone / 24.0);
}

function getNewMoonDay(k, timeZone) {
  return Math.floor(NewMoon(k) + 0.5 + timeZone / 24.0);
}

function getLunarMonth11(yy, timeZone) {
  const off = dateToJd(31, 12, yy) - 2415021.076998695;
  const k = Math.floor(off / 29.530588853);
  let nm = getNewMoonDay(k, timeZone);
  const sunLong = getSunLongitude(nm, timeZone);
  if (sunLong >= 9) {
    nm = getNewMoonDay(k - 1, timeZone);
  }
  return nm;
}

function getLeapMonthOffset(a11, timeZone) {
  const k = Math.floor((a11 - 2415021.076998695) / 29.530588853 + 0.5);
  let last, i, arc;
  last = 0;
  i = 1;
  arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
  do {
    last = arc;
    i++;
    arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
  } while (arc != last && i < 14);
  return i - 1;
}

function convertSolar2Lunar(dd, mm, yy, timeZone) {
  let lunarDay, lunarMonth, lunarYear, lunarLeap;
  const dayNumber = dateToJd(dd, mm, yy);
  const k = Math.floor((dayNumber - 2415021.076998695) / 29.530588853);
  let monthStart = getNewMoonDay(k + 1, timeZone);
  if (monthStart > dayNumber) {
    monthStart = getNewMoonDay(k, timeZone);
  }
  let a11 = getLunarMonth11(yy, timeZone);
  let b11 = a11;
  if (a11 >= monthStart) {
    lunarYear = yy;
    a11 = getLunarMonth11(yy - 1, timeZone);
  } else {
    lunarYear = yy + 1;
    b11 = getLunarMonth11(yy + 1, timeZone);
  }
  lunarDay = dayNumber - monthStart + 1;
  const diff = Math.floor((monthStart - a11) / 29);
  lunarLeap = 0;
  lunarMonth = diff + 11;
  if (b11 - a11 > 365) {
    const leapMonthDiff = getLeapMonthOffset(a11, timeZone);
    if (diff >= leapMonthDiff) {
      lunarMonth = diff + 10;
      if (diff == leapMonthDiff) {
        lunarLeap = 1;
      }
    }
  }
  if (lunarMonth > 12) {
    lunarMonth = lunarMonth - 12;
  }
  if (lunarMonth >= 11 && diff < 4) {
    lunarYear -= 1;
  }
  return { lunarDay, lunarMonth, lunarYear, lunarLeap };
}

function convertLunar2Solar(lunarDay, lunarMonth, lunarYear, lunarLeap, timeZone) {
  let a11, b11;
  if (lunarMonth < 11) {
    a11 = getLunarMonth11(lunarYear - 1, timeZone);
    b11 = getLunarMonth11(lunarYear, timeZone);
  } else {
    a11 = getLunarMonth11(lunarYear, timeZone);
    b11 = getLunarMonth11(lunarYear + 1, timeZone);
  }
  const k = Math.floor(0.5 + (a11 - 2415021.076998695) / 29.530588853);
  let off = lunarMonth - 11;
  if (off < 0) {
    off += 12;
  }
  if (b11 - a11 > 365) {
    const leapOff = getLeapMonthOffset(a11, timeZone);
    let leapMonth = leapOff - 2;
    if (leapMonth < 0) {
      leapMonth += 12;
    }
    if (lunarLeap != 0 && lunarMonth != leapMonth) {
      return { day: 0, month: 0, year: 0 };
    } else if (lunarLeap != 0 || off >= leapOff) {
      off += 1;
    }
  }
  const monthStart = getNewMoonDay(k + off, timeZone);
  const [day, month, year] = jdToDate(monthStart + lunarDay - 1);
  return { day, month, year };
}

// Public API
function solarToLunar(dateObj) {
  const d = dateObj.day !== undefined ? dateObj.day : dateObj.getDate();
  const m = dateObj.month !== undefined ? dateObj.month : dateObj.getMonth() + 1;
  const y = dateObj.year !== undefined ? dateObj.year : dateObj.getFullYear();
  const res = convertSolar2Lunar(d, m, y, 7);
  return { day: res.lunarDay, month: res.lunarMonth, year: res.lunarYear, leap: res.lunarLeap };
}

function lunarToSolar(dateObj) {
  const d = dateObj.day;
  const m = dateObj.month;
  const y = dateObj.year;
  const leap = dateObj.leap ? 1 : 0;
  const res = convertLunar2Solar(d, m, y, leap, 7);
  return { day: res.day, month: res.month, year: res.year };
}

export default { solarToLunar, lunarToSolar };
export { solarToLunar, lunarToSolar };

// Simple debug helper (not exported by default runtime) for manual verification
if (process.env.DEBUG_LUNAR === '1') {
  const sample = { day: 19, month: 2, year: 2024 };
  const l = solarToLunar(sample);
  const s = lunarToSolar(l);
  // eslint-disable-next-line no-console
  console.log('[DEBUG_LUNAR] roundtrip', { sample, lunar: l, back: s });
}
