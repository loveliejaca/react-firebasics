import React, { useState } from "react"
import moment from "moment";

const  UpdateEvent = (props) => {
  const data = props.selectedEvent.data
  const date =  moment(data.startDate.seconds * 1000);

  console.log("date", date);

  const [dateInput, setDateInput] = useState(moment(date).format('YYYY-MM-DD'))

  const [state, setState] = useState({
    startDate: moment(dateInput).startOf('day').toDate(),
    endDate: moment(dateInput).endOf('day').toDate(),
    time: data.time,
    name: data.name,
    description: data.description,
    alarm: data.alarm,
    alarmDuration: data.alarmDuration
  })

  console.log("state", state);


  function onDateChange(event) {
    console.log("event", event.target.value);
    setDateInput(moment(event.target.value).format('YYYY-MM-DD'));
  }

  function onInputchange(event) {

    let time = state.time.split(":");
    let hour = time[0];
    let minutes = time[1];

    setState({
      ...state,
      startDate: moment(dateInput).set('hour', hour).set('minutes', minutes).toDate(),
      endDate: moment(dateInput).endOf('day').toDate(),
      [event.target.name]: event.target.value
    });
  }

 function handleSubmit(e) {
    e.preventDefault()

    console.log("submit");
  }
 function handleClose(e) {
    e.preventDefault()
    props.handleChangeState(false)
    console.log("submit");
  }

  return (
    <div className="modal">
      <div className="modal-inner">
        <div className="modal-head">
          <h3>Update Event</h3>
          <i className="modal-close" onClick={handleClose}></i>
        </div>
        <div className="modal-body">
          <div className="form form-event">
            <form action="" onSubmit={handleSubmit}>
              <div className="form-input">
                <label htmlFor="name">Date</label>
                <div className="form-inputbox">
                  <input id="startDate" type="date" name="startDate" value={dateInput} onChange={onDateChange} required/>
                </div>
              </div>
              <div className="form-input">
                <label htmlFor="name">Time</label>
                <div className="form-inputbox">
                  <input id="time" name="time" type="time" value={state.time} onChange={onInputchange} required/>
                </div>
              </div>
              <div className="form-input">
                <label htmlFor="name">Name</label>
                <div className="form-inputbox">
                  <input id="name" name="name" value={state.name} onChange={onInputchange} type="text" required/>
                </div>
              </div>

              <div className="form-input">
                <label htmlFor="name">Description</label>
                <div className="form-textareabox">
                  <textarea name="description" value={state.description} onChange={onInputchange}  id="description"></textarea>
                </div>
              </div>
              <div className="form-btn">
                <button type="submit" className="cmn-btn cmn-btn-submit">
                  <span>Submit</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default UpdateEvent
