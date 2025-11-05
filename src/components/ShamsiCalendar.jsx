import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

function ShamsiCalendar({theDay, getTheDay}) {
  return(
    <div>
      <DatePicker
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
        value={theDay}
        onChange={getTheDay} 
        format="YYYY-MM-DD"
        inputClass="datepicker"
      />
    </div>
  );
};

export default ShamsiCalendar;