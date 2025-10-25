function dayPicker({day, getDay}) {

  return(
    <div className="rounded-full p-2 bg-[#292929]">
      <input 
        type='date' 
        min="2024-01-01" 
        max="2024-01-09"
        value={day}
        onChange={getDay}
        className="bg-[#292929] text-[#538e6a]" />
    </div>
  )
};

export default dayPicker;