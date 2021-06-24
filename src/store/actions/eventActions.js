import moment from "moment";

export const createEvent = (uid, data, callBack) => {

  return (dispatch, getState, { getFirestore}) => {
    const firestore = getFirestore();

    firestore.collection('users').doc(uid).collection('events')
     .add({
       ...data
     })
     .then(resp => {
       callBack(true)
       dispatch({ type: 'EVENT_SUCCESS'});
    }).catch((err) => {
      console.log("err", err);
      dispatch({ type: 'EVENT_ERROR', err });
    });


  }
}

export const updateEvent = (uid, data, callBack) => {

  return (dispatch, getState, { getFirestore}) => {
    const firestore = getFirestore();

    let updated = data.data


    console.log("crash", data);

    firestore.collection('users').doc(uid).collection('events').doc(data.id)
     .update({
       startDate: data.data.startDate,
       endDate: data.data.endDate,
       time: data.data.time,
       name: data.data.name,
       description: data.data.description,
       alarm: data.data.alarm,
       alarmDuration: data.data.alarmDuration
     })
     .then(resp => {
       callBack(true)
       dispatch({ type: 'EVENT_SUCCESS'});
    }).catch((err) => {
      console.log("err", err);
      dispatch({ type: 'EVENT_ERROR', err });
    });

  }
}

export const getEvents = (uid, date, callBack) => {

  let m1 = null, m2 = null;

  if(date) {
    m1 = moment(date).startOf('day').toDate();
    m2 = moment(date).endOf('day').toDate();
  } else {
    m1 = moment().startOf('day').toDate();
    m2 = moment().endOf('day').toDate();
  }


  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firestore.collection('users').doc(uid).collection('events')
    .where('startDate', '>=', m1)
    .where('startDate', '<=', m2)
    .get()
    .then(resp => {
      let events = [];

      resp.forEach((doc) => {
        const data = {
          id: doc.id,
          data: doc.data()
        }

        events.push(data)
      });
      callBack(true)
      dispatch({ type: 'EVENT_LIST', data: events });
    }).catch((err) => {
      console.log("err", err);
      dispatch({ type: 'NO_EVENT', err });
    });


  }
}

export const deleteEvent = (data, callBack) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    const eventId = data.eventId;
    const uid = data.uid
    let list = getState().events.eventList
    let cloneList = [...list]
    let filterList = list.filter(l => l.id !== eventId)


    firestore.collection('users').doc(uid).collection('events').doc(eventId).delete().then((doc) => {
      dispatch({ type: 'DELETE_SUCCESS', data: filterList});
      callBack(true)
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
  }
}
