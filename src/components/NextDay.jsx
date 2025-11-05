function nextDate(day) {
  const dayDate = day.split('-');
  const d1 = Number(dayDate[2]);
  const m1 = Number(dayDate[1]);
  const y1 = Number(dayDate[0]);

  let d2 = 0;
  let m2 = 0;
  let y2 = 0;
  if (m1 === 1 || m1 === 3 || m1 === 5 || m1 === 7 || m1 === 8 || m1 === 10) {
    if (d1 === 31) {
      y2 = y1;
      m2 = m1 + 1;
      d2 = 1;
    } else {
      y2 = y1;
      m2 = m1;
      d2 = d1 + 1;
    }
  } else if (m1 === 4 || m1 === 6|| m1 === 9|| m1 === 11) {
    if (d1 === 30) {
      y2 = y1;
      m2 = m1 + 1;
      d2 = 1;
    } else {
      y2 = y1;
      m2 = m1;
      d2 = d1 + 1;
    }
  } else if (m1 === 2) {
    if (d1 === 29) {
      y2 = y1;
      m2 = m1 + 1;
      d2 = 1;
    } else {
      y2 = y1;
      m2 = m1;
      d2 = d1 + 1;
    }
  } else if (m1 === 12) {
    if (d1 === 31) {
      y2 = y1 + 1;
      m2 = 1;
      d2 = 1;
    } else {
      y2 = y1;
      m2 = m1;
      d2 = d1 + 1;
    }
  }

  const yy = String(y2);
  
  let mm = "";
  if (m2 < 10) {
    mm = "0" + String(m2);
  } else {
    mm = String(m2);
  }

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