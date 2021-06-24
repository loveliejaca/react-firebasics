import React, { useState }  from "react"
import moment from "moment";

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createEvent, updateEvent } from '../../store/actions/eventActions'

import Header from "../../components/layout/Header"
import Alert from "../../components/alert/Alert"

const ModalEvent = (props) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const uid = currentUser.uid

  const data = props.selectedEvent
  const date = props.type === 'create' ? props.selectedDate : moment(data.data.startDate.seconds * 1000);
  const [dateInput, setDateInput] = useState(moment(date).format('YYYY-MM-DD'))

  const title = props.type === 'create' ? 'Create Event' : 'Update Event'

  const [alert, setAlert] = useState({
    show: false,
    type:'',
    message: '',
    btn: []
  });


  const [state, setState] = useState({
    startDate: props.type === 'create' ? null : moment(dateInput).startOf('day').toDate(),
    endDate: props.type === 'create' ? null : moment(dateInput).endOf('day').toDate(),
    time: props.type === 'create' ? '08:00' : data.data.time,
    name: props.type === 'create' ? '' :  data.data.name,
    description: props.type === 'create' ? '' : data.data.description,
    alarm: props.type === 'create' ? false : data.data.alarm,
    alarmDuration: props.type === 'create' ? 0 : data.data.alarmDuration
  })


  function onDateChange(event) {
    let date = event.target.value;

    setDateInput(date);

    let time = state.time.split(":");
    let hour = time[0];
    let minutes = time[1];

    setState({
      ...state,
      startDate: moment(date).set('hour', hour).set('minutes', minutes).toDate(),
      endDate: moment(date).endOf('day').toDate()
    });
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

  function handleClose(e) {
     e.preventDefault()
     props.handleCloseModal(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()



    if(props.type === 'create') {
      props.createEvent(uid, state, (res) => {
        if(res) {
          console.log("new");
          props.handleAlert(false, 'create')
        }
      })
    } else {
      let id = props.selectedEvent ? props.selectedEvent.id : '';

      console.log("id", props.type);

      props.updateEvent(uid, {data: state, id: id}, (res) => {
        if(res) {
          console.log("new");
          props.handleAlert(false, 'create')
        }
      })
    }

  }

  return (
    <>
      <div className="modal">
        <div className="modal-inner">
          <div className="modal-head">
            <h3>{title}</h3>
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

    </>
  )
}

// const mapStateToProps = (state) => {
//   console.log("state", state);
//   return{
//     user: state.firebase.profile,
//     auth: state.firebase.auth
//   }
// }

const mapDispatchToProps = (dispatch) => {
  return {
    createEvent: bindActionCreators(createEvent, dispatch),
    updateEvent: bindActionCreators(updateEvent, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(ModalEvent)
