
export const getUser = (uid, callBack) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();

    firestore.collection('users').doc(uid).get().then((doc) => {
      if (doc.exists) {
        dispatch({ type: 'USER_SUCCESS', data: doc.data()});
        callBack({data: doc.data(), loading: false})
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
  }
}


export const updateUser = (data, callBack) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    const firebase = getFirebase();

    const user = firebase.auth().currentUser;
    const userdl = {
      firstname: data.data.firstname,
      lastname: data.data.lastname,
      number: data.data.number,
      avatar: data.data.avatar,
      email: data.data.email
    }

    user.updateProfile({
      displayName: data.data.displayName,
      photoURL: data.data.avatar
    })

    let usedata = {
      uid: data.uid,
      displayName: data.data.displayName,
      avatar: data.data.avatar,
      email: data.data.email
    }

    localStorage.setItem("currentUser", JSON.stringify(usedata));

    console.log("crash", data, user);

    firestore.collection('users').doc(data.uid).set(userdl)
    .then( resp => {
      console.log("resp", resp);
      callBack(true);
      dispatch({ type: 'USER_SUCCESS',data: data.data});
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
  }
}

export const deleteUser = (uid, callBack) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();

    firestore.collection('users').doc(uid).delete().then((doc) => {
      dispatch({ type: 'DELETE_SUCCESS'});
      callBack(true)
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
  }
}
