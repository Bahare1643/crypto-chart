function nextDate(day) {
  const dayDate = day.split('-');
  const d1 = Number(dayDate[2]);
  const m1 = Number(dayDate[1]);
  const yy = dayDate[0];

  let m2 = 0;
  let d2 = 0;
  if (m1 === 1 || m1 === 3 || m1 === 5 || m1 === 7 || m1 === 8 || m1 === 10 || m1 === 12) {
    if (d1 === 31) {
      m2 = m1 + 1;
      d2 = 1;
    } else {
      m2 = m1;
      d2 = d1 + 1;
    }
  } else if (m1 === 4 || m1 === 6|| m1 === 9|| m1 === 11) {
    if (d1 === 30) {
      m2 = m1 + 1;
      d2 = 1;
    } else {
      m2 = m1;
      d2 = d1 + 1;
    }
  } else if (m1 === 2) {
    if (d1 === 29) {
      m2 = m1 + 1;
      d2 = 1;
    } else {
      m2 = m1;
      d2 = d1 + 1;
    }
  }

  const mm = String(m2);
  let dd = "";
  if (d2 < 10) {
    dd = "0" + String(d2);
  } else {
    dd = String(d2);
  }
  const nextDay = yy + '-' + mm + '-' + dd;
  return nextDay;
};

export default nextDate;