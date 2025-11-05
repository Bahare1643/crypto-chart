import jalaali from 'jalaali-js';

function persianToEnglish(str) {
  return str.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
}

function jalaaliToGregorian (theDay) {

  const englishNumbers = persianToEnglish(theDay);

  // splitting the year, month and day from each other. and then turning them into Number.
  const [jy, jm, jd] = englishNumbers.split("-").map(Number);

  // converting jalaali year, month and day into gregorian year, month and day
  const {gy, gm, gd} = jalaali.toGregorian(jy, jm, jd);

  let gregorianDate;

  // gm = 1 gd = 10
  if (gm < 10 && gd < 10) {
    gregorianDate = gy + '-' + 0 + gm + '-' + 0 + gd;
  } else if (gm >= 10 && gd >= 10) {
    gregorianDate = gy + '-' + gm + '-' + gd;
  } else if (gm < 10 && gd >= 10) {
    gregorianDate = gy + '-' + 0 + gm + '-' + gd;
  } else if (gm >= 10 && gd < 10) {
    gregorianDate = gy + '-' + gm + '-' + 0 + gd;
  };

  return gregorianDate

}

export default jalaaliToGregorian;