import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import moment from "moment";
// import { useHistory } from "react-router-dom"
import { connect, useSelector } from 'react-redux'
import { getEvents } from '../../store/actions/eventActions'
import { bindActionCreators } from 'redux'

import Calendar from "../calendar"
import Avatar from "./Avatar"
import EventList from "../event/EventList"
import ModalEvent from "../event/ModalEvent"
import NoData from "../layout/NoData"

const Profile = (props) => {
  const [selectedDate, setSelectedDate] = useState(moment().toDate())
  // const [incomingEvent, setIncomingEvent] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [showModal, setShowModal] = useState(false)
  const eventList = useSelector((state) => state.events.eventList)

  function getSelectedDateEvents(date = moment().toDate()) {
    setSelectedDate(date)
    // props.getEvents(currentUser.uid, date)
  }

  function handleChangeState(stat) {
    setShowModal(stat)
  }

  useEffect(() => {
    getSelectedDateEvents()


    console.log("selectedDate----", selectedDate);
  }, [])

  return (
    <div className="l-main profile">
      <div className="profile-head">
        <Avatar/>
      </div>
      <div className="profile-body">

        <span  className="profile-name ">Welcome {currentUser.displayName}</span>
        <h2 className="profile-heading">Schedule</h2>
        <div className="calendar-container calendar-container-profile">
          <Calendar class='calendar-profile' getSelectedDateEvents={getSelectedDateEvents}/>
        </div>

        <EventList selectedDate={selectedDate} />

      </div>
    </div>
  )
}


const mapDispatchToProps = (dispatch) => {
  return {
    getEvents: bindActionCreators(getEvents, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Profile)
