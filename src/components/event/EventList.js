import React, { useEffect, useState }  from "react"
import moment from "moment";

import { connect, useSelector } from 'react-redux'
import { getEvents, deleteEvent } from '../../store/actions/eventActions'
import { bindActionCreators } from 'redux'

import NoData from "../layout/NoData"
import UpdateEvent from "./UpdateEvent"
import ModalEvent from "./ModalEvent"
import Alert from "../../components/alert/Alert"

const EventList = (props) => {
  const selectedDate = props.selectedDate
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [loading, setLoading] = useState(true)
  const eventList = useSelector((state) => state.events.eventList)
  const [selectedEvent, setSelectedEvent] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [eventType, setEventType] = useState('')


  const [alert, setAlert] = useState({
    show: false,
    type:'',
    message: ''
  });


  useEffect(() => {
    getEvents()
  }, [selectedDate])

  function getEvents() {
    props.getEvents(currentUser.uid, selectedDate, (res) => {
      if(res) {
        setLoading(false)
      }
    })
  }


  function handleClick (eventId) {
    setSelectedEvent(eventId)

    setAlert({
      ...alert,
      show: true,
      type:'warning',
      message: 'Are you sure you want to delete?',
      btn: [
        {
          link: '',
          txt: 'Yes',
          color: 'aqua',
          action: 'delete'
        },
        {
          link: '',
          txt: 'Cancel',
          color: 'default',
          action: 'close'
        },
      ]
    })
  }

  function handleCreateEvent () {
    setShowModal(true)
    setEventType('create')
  }

  function handleUpdate(data) {
    setEventType('')
    console.log("data", data);
    setSelectedEvent(data)
    setShowModal(true)
  }

  function handleDeleteEvent () {
    let data = {
      eventId: selectedEvent.id,
      uid: currentUser.uid
    }

    props.deleteEvent(data, (res) => {
      console.log("res", res);
    })

  }


  function handleCloseModal(status, type) {
    setEventType('')
    setShowModal(status)
  }


  function handleAlert(status, type) {
    if(type === 'create') {
        setAlert({
          ...alert,
          show: true,
          type:'success',
          message: 'Event successfully added!',
          btn: [
            {
              link: '',
              txt: 'Okay',
              color: 'default',
              action: 'okay'
            },
          ]
        })

      setShowModal(false)
    } else if (type === 'delete') {
      handleDeleteEvent()

      setAlert({
        ...alert,
        show: false
      })
    } else if (type === 'okay') {
      console.log("okay");
      getEvents()

      setAlert({
        ...alert,
        show: false
      })
    } else {
      setAlert({
        ...alert,
        show: false
      })
    }
  }

  return (
    <div className="event">
      <Alert alert={alert} handleAlert={handleAlert}/>
      {showModal &&  <ModalEvent
        handleCloseModal={handleCloseModal}
        selectedEvent={selectedEvent}
        selectedDate={selectedDate}
        handleAlert={handleAlert} type={eventType}
      /> }

      <div className="event-add" onClick={handleCreateEvent}></div>
      { loading ? <div className="loading-data">
        <span>Loading...</span>
        <div className="loading-data-spinner"></div>
      </div>
      : eventList.length === 0 ?
        <NoData msg='No Scheduled Events!!'/>
      : (
        <div className="event-list">

          <h3 className="event-title"></h3>

          <div className="event-inner">
            {
              eventList.map((event, index) => {
                let date = moment(event.data.startDate.seconds * 1000)
                let notify = event.data.alarm ? 'is-on' : ''

                return (
                  <div className="event-item" key={index}>
                    <div className="event-item-inner">
                      <div className="event-datetime">
                        <span className="event-datetime-month">{date.format('MMM')} </span>
                        <span className="event-date">{date.format('DD')}</span>

                      </div>
                      <div className="event-dtl">
                        <h3>{event.data.name}</h3>
                        <span>{event.data.description}</span>

                      </div>
                    </div>

                    <div className="event-bottom">
                      <div className="event-time-wrap">
                        <span className="event-datetime-time">
                          {date.format('h:mm')}
                        </span>
                        <span className="event-datetime-type">{date.format('a')}</span>
                      </div>
                      <i className={`event-notify ${notify}`} onClick={() => handleClick(event.id)}></i>
                      <i className="event-edit" onClick={() => handleUpdate(event)}></i>
                      <i className="event-trash" onClick={() => handleClick(event)}></i>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      )
      }
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    getEvents: bindActionCreators(getEvents, dispatch),
    deleteEvent: bindActionCreators(deleteEvent, dispatch),
  }
}

export default connect(null, mapDispatchToProps)(EventList)
