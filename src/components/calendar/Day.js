import React  from "react"


const Day = (props) => {
  let day = props.day;
  let selected = props.selected;
  let select = props.select;

  return (
    <div
      className={
        "calendar-td" +
        (day.isToday ? " is-today" : "") +
        (day.isCurrentMonth ? "" : " is-next-month") +
        (day.date.isSame(selected) ? " is-selected" : "") +
        (day.hasEvents ? " has-events" : "")
      }
      onClick={() => select(day)}
    >
      <span>{day.number}</span>
    </div>
  )
}

export default Day
