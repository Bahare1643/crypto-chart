function dayPicker({day, getDay}) {

  return(
    <>
    <input 
      type='date' 
      min="2024-01-01" 
      max="2024-01-09"
      value={day}
      onChange={getDay}
      className="bg-[#1b1b1b] text-[#1b1b1b]" />
      </>
  )
};

export default dayPicker;