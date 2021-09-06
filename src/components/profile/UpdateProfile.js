import React, { useState, useRef, useEffect } from "react"
import { useHistory } from "react-router-dom"
// import { useUser } from "./../../hooks/useUser.js";
import { connect, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUser, updateUser } from '../../store/actions/userActions'
import { storage } from "../../config/fbConfig"

import Header from "../../components/layout/Header"
import Loading from "../../components/layout/Loading"
const UpdateProfile = (props) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const avatarRef = useRef(currentUser.avatar);
  const [fileUpload, setFileUpload] = useState('')
  const [loading, setLoading] = useState(true)
  const userDtl = useSelector((state) => state.user.currentUser)
  const history = useHistory()

  const [state, setState] = useState({
    displayName: '',
    email: '',
    firstname: '',
    lastname: '',
    number: '',
    avatar: '',
    email: ''
  });

  function renameFile(originalFile, newName) {
    return new File([originalFile], newName, {
      type: originalFile.type,
      lastModified: originalFile.lastModified,
    });
  }

  const onFileChange = (e) => {
    const file = e.target.files[0]

    if(file) {
      avatarRef.current.src = URL.createObjectURL(file);
      avatarRef.current.onload = function() {
        URL.revokeObjectURL(avatarRef.src) // free memory
      }

      console.log("file", file);

      setFileUpload(file);
    }
  }

  function handleChange(e) {
    setState({
      ...state,
      [e.target.id]: e.target.value
    })
  }

  function handleLoading(val) {
    console.log("val", val);
    // setLoading(val)
  }

  async function handleSubmit(e) {
     e.preventDefault()

     try {
       const newFname = currentUser.email.split('@');
       const newFileUpload = renameFile(fileUpload, newFname[0]);

       const storageRef = storage.ref();
       const fileRef = storageRef.child(newFileUpload.name)
       await fileRef.put(newFileUpload)

       const fileUrl = await fileRef.getDownloadURL();


       console.log("fileUrl",fileUrl );

       setState({
         ...state,
         avatar: fileUrl,
         email: currentUser.email
       })

       props.updateUser({data: state, uid: currentUser.uid }, (res) => {
         if(res) {
           history.push('/profile')
         }
       });

     } catch(error) {
       console.log("error", error);
     }


   }


  useEffect(() => {
    console.log("useEffect", currentUser.uid);
    props.getUser(currentUser.uid, (res) => {
      setState({
        displayName: currentUser.displayName,
        email: res.data.email,
        firstname: res.data.firstname,
        lastname: res.data.lastname,
        number: res.data.number,
        avatar: res.data.avatar
      })
      setLoading(res.loading)
    })
  }, [])




  function renderLayout() {
    return (
      <div>
        <Header/>
        <div className="l-main subpage subpage-profile">
          <div className="subpage-inner">
            <form action="" onSubmit={handleSubmit}>
              <div className="avatar">
                <div className='avatar-img avatar-img-big'>
                <div className="avatar-img-box"><img src={state.avatar} alt="" ref={avatarRef}/></div>
                </div>
              </div>

              <div className="form-input-upload-btn">
                <input type="file" name="avatar" id="avatar" onChange={onFileChange}/>
                <span>Upload photo</span>
              </div>

              <div className="form-input">
                <label htmlFor="firstname">Dsiplay name</label>
                <div className="form-inputbox">
                  <input id="displayName" type="text" value={state.displayName} name="displayName" onChange={handleChange} required/>
                </div>
              </div>

              <div className="form-input">
                <label htmlFor="firstname">Firstname</label>
                <div className="form-inputbox">
                  <input id="firstname" type="text" name="firstname" onChange={handleChange} value={state.firstname} required/>
                </div>
              </div>
              <div className="form-input">
                <label htmlFor="lastname">Lastname</label>
                <div className="form-inputbox">
                  <input id="lastname" type="text" name="lastname" onChange={handleChange} value={state.lastname} required/>
                </div>
              </div>


              <div className="form-input">
                <label htmlFor="number">Number</label>
                <div className="form-inputbox">
                  <input id="number" type="text" name="number" value={state.number} onChange={handleChange} required/>
                </div>
              </div>

              <div className="form-btn">
                <button type="submit" className="cmn-btn cmn-btn-submit">
                  <span>Update</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
    {!loading ? renderLayout(): <Loading />}

    </>
  )
}


const mapDispatchToProps = (dispatch) => {
  return {
    getUser: bindActionCreators(getUser, dispatch),
    updateUser: bindActionCreators(updateUser, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(UpdateProfile)
