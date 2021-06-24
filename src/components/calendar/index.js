import React, { useState } from "react";
import moment from "moment";

import Week from "./Week"
import DayNames from "./DayNames"

import { connect } from 'react-redux'


const Calendar = (props) => {
  const [showWeek, setShowWeek] = useState(true)
  const [state, setState] = useState({
    selectedMonthEvents: [],
    dateObject: moment(),
    selectedWeek:  moment().startOf("week").day("Sunday"),
    allmonths: moment.months(),
    selectedDay: moment().startOf("day"),
    currentDay: moment().startOf("day"),
    showEvents: false
  });

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));


  function handlePrev() {

    if(showWeek) {
      const currenWeek = state.selectedWeek

      setState({
        ...state,
        selectedWeek: currenWeek.day("Sunday").subtract(1, 'week')
      })

      if(state.selectedWeek.format('MMMM') !== state.dateObject.format('MMMM')) {
        setState({
          ...state,
          dateObject: state.selectedWeek,
        })
      }
    } else {
      const currentMonthView = state.dateObject

      setState({
        ...state,
        dateObject: currentMonthView.subtract(1, "month")
      })
    }
  }

  function handleNext() {
    if(showWeek) {
      const currentWeek = state.selectedWeek

      setState({
        ...state,
        selectedWeek: currentWeek.add(1, 'week')
      })

      if(state.selectedWeek.format('MMMM') !== state.dateObject.format('MMMM')) {
        setState({
          ...state,
          dateObject: state.selectedWeek.startOf('Month')
        })
      }
    } else {
      const currentMonthView = state.dateObject;

      setState({
        ...state,
        dateObject: currentMonthView.add(1, "month")
      })
    }

  }

  // function handleChangeMonth(event) {
  //   const selectedMonth = event.target.value;
  //   let dateObject = Object.assign({}, state.dateObject);
  //
  //   dateObject = moment(dateObject).month(selectedMonth);
  //
  //   setState({
  //     ...state,
  //     dateObject: dateObject,
  //     selectedWeek:  moment().month(selectedMonth).startOf("Month").day("Sunday"),
  //   })
  // }

  function handleChangeYear(event) {
    const selectedYear = event.target.value;
    setState({
      ...state,
      dateObject: moment().month(state.dateObject.format('MMMM')).year(selectedYear),
      selectedWeek:  moment().year(selectedYear).startOf("Month").day("Sunday")
    })
  }

  function handleShowWeek() {
    let currentMonth = state.dateObject;

    let week = null;


    if(currentMonth.format('MMMM') === "May") {
      week = moment().startOf("Week").day("Sunday");
    } else {
      week = currentMonth.clone().startOf("Month").startOf("Week").day("Sunday");
    }

    setState({
      ...state,
      selectedWeek: week
    })
    setShowWeek(!showWeek);
  }

  function handleGoTodaysDate() {
    setState({
      ...state,
      dateObject: moment(),
      selectedWeek: moment().startOf("week").day("Sunday"),
      selectedDay: moment().startOf("day"),
    })
  }

  const select = (day) => {
    setState({
      ...state,
      selectedMonth: day.date,
      selectedDay: day.date.clone()
    });

    props.getSelectedDateEvents(day.date.toDate())
  }

  const renderWeeks = () => {
    const currentMonthView = state.dateObject;
    const currentSelectedDay = state.selectedDay;
    const monthEvents = state.selectedMonthEvents;

    let weeks = [];
    let done = false;
    let counter = 1;
    let previousCurrentNextView = currentMonthView
      .clone()
      .startOf("month")
      .subtract(1, "d")
      .day("Sunday");
    let count = 0;
    let monthIndex = previousCurrentNextView.month();

    while (!done) {
      weeks.push(
        <Week
          previousCurrentNextView={previousCurrentNextView.clone()}
          currentMonthView={currentMonthView}
          monthEvents={monthEvents}
          selected={currentSelectedDay}
          select={day => select(day)}
          key= {`week-${counter}`}
        />
      );
      counter++;
      previousCurrentNextView.add(1, "w");
      done = count++ > 2 && monthIndex !== previousCurrentNextView.month();
      monthIndex = previousCurrentNextView.month();
    }
    return weeks;
  }

  const renderThisWeek = () => {
    const currentMonthView = state.dateObject;
    const previousCurrentNextView = state.selectedWeek;
    const currentSelectedDay = state.selectedDay;
    return (
      <Week
        previousCurrentNextView={previousCurrentNextView}
        currentMonthView={currentMonthView}
        monthEvents={[]}
        selected={currentSelectedDay}
        select={day => select(day)}
        key='week-1'
      />
    )
  }
  //
  // const renderMonthOptions = state.allmonths.map((month) => {
  //   return (
  // 			<option
  // 				className="calendar-option"
  //         key={month}
  //         value={month}
  //
  // 			>
  // 				{month}
  // 			</option>
  // 		)
  // });

  const renderYears = (back) => {
    const year = new Date().getFullYear();
    return Array.from({length: back}, (v, i) => {
      return (
        <option
  				className="calendar-option"
          key={`year-${i}`}
          value={year + i}

  			>
  				{year + i}
  			</option>
      )
    });
  }


  return (
    <div className={`calendar ${props.class}`}>
      <div className="calendar-top">
        <select className="calendar-year" name="calendar-month" id="calendar-month" onChange={handleChangeYear} value={state.dateObject.format("YYYY")}>
          {renderYears(10)}
        </select>
        <div className="calendar-today" onClick={handleGoTodaysDate}>
          {moment().format('ddd, MMMM DD')}
        </div>
      </div>

      <div className="calendar-header">
        <i className="calendar-arrow-left" onClick={handlePrev}/>

        <span>{state.dateObject.format("MMMM  YYYY")}</span>




        <i className="calendar-arrow-right" onClick={handleNext}/>
      </div>
      <div className="calendar-body">
        <DayNames/>
        {!showWeek ? renderWeeks() : renderThisWeek()}
      </div>
      <span className="calendar-minimize" onClick={handleShowWeek}>Show {showWeek? 'More': 'Less'}</span>
    </div>
  )
}

// export default Calendar

export default connect(null, null)(Calendar)
