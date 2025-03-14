import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // นำเข้า plugin utc

dayjs.extend(utc); // ต่อขยาย dayjs ด้วยปลั๊กอิน utc

function numberFormat(num) {
  return num.toLocaleString("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  });
}

function formatitemdevice(date) {
  return dayjs(date).format("HH:mm");
}

function timeFormat(date) {
  return dayjs(date).format("HH");
}
function timeminuteFormat(date) {
  return dayjs(date).format("mm");
}

function datetimeFormat(date) {
  return dayjs(date).format("DD/MM/YYYY เวลา HH:mm:ss");
}

function datetimeFormatLimit(date) {
  return dayjs(date).format("YYYY-MM-DDT00:00:00");
}

function dateFormat(date) {
  return dayjs(date).format("DD/MM/YYYY");
}
function dateFormatValue(date) {
  return dayjs(date).format("YYYY-MM-DD");
}

function dateFormatValue2(date) {
  return dayjs(date).format("DD-MM-YYYY");
}

function dateFormatYear(date) {
  return dayjs(date).format("YYYY");
}
function dateFormatMonth(date) {
  return dayjs(date).format("MM");
}
function dateFormatDay(date) {
  return dayjs(date).format("DD");
}
function dateFormatDayandTime(date) {
  return dayjs(date).format("DD/MM/YYYY");
}

function dateObjectFormat(dateObj, time) {
  // แปลงวันที่เป็นสตริงในรูปแบบ ISO 8601
  const dateString = dateObj.toISOString();

  // สร้างวัตถุ Day.js และลบ 7 ชั่วโมง
  const newDate = dayjs(`${dateString.slice(0, 10)}T${time}:00.00Z`)
    .utc() // กำหนดให้เป็นเวลา UTC (ปรับได้ตามต้องการ)
    .subtract(7, "hour");

  // ฟอร์แมตผลลัพธ์
  return newDate.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
}

function dateFormatDefaultToTh(date) {
  let monthNames = [
    "มกราคม",
    "กุมภาพันธ์",
    "	มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  let year = date.getFullYear() + 543;
  let month = monthNames[date.getMonth()];

  return `${month} ${year}`;
}
function dateFormatDefaultToEn(date) {
  const deta = new Date(date);
  return toEnDateString(deta);
}

function FormatDayFullName(date) {
  let day = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสฯ", "ศุกร์", "เสาร์"];
  let days = day[date.getDay()];
  return `${days}`;
}

function toThaiDateString(date) {
  let day = ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."];
  let days = day[date.getDay()];
  return `${days}`;
}

function toThaiDateStringDay(date) {
  let numOfDay = date.getDate();
  return `${numOfDay}`;
}

function toEnDateString(date) {
  let monthNames = [
    "Jan",
    "Feb",
    "	Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  let days = day[date.getDay()];
  let year = date.getFullYear() + 543;
  let month = monthNames[date.getMonth()];
  let numOfDay = date.getDate();

  return `${days} ${numOfDay} ${month} ${year}`;
}

function toThDateString(date) {
  let monthNames = [
    "มกราคม",
    "กุมภาพันธ์",
    "	มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  let day = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสฯ", "ศุกร์", "เสาร์"];

  let days = day[date.getDay()];
  let year = date.getFullYear() + 543;
  let month = monthNames[date.getMonth()];
  let numOfDay = date.getDate();

  return `วัน${days} ที่ ${numOfDay} ${month} ${year}`;
}

export {
  toThDateString,
  FormatDayFullName,
  dateFormat,
  dateFormatDefaultToEn,
  dateFormatDefaultToTh,
  dateFormatValue,
  datetimeFormat,
  datetimeFormatLimit,
  dayjs,
  numberFormat,
  toEnDateString,
  toThaiDateString,
  timeFormat,
  timeminuteFormat,
  formatitemdevice,
  dateFormatYear,
  dateFormatMonth,
  toThaiDateStringDay,
  dateFormatDay,
  dateObjectFormat,
  dateFormatValue2,
  dateFormatDayandTime,
};
