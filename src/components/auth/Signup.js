import React, { useRef, useState } from "react"
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/authActions'
import { bindActionCreators } from 'redux'
import { Link, useHistory } from "react-router-dom"
import { storage } from "../../config/fbConfig"

import Header from "../../components/layout/Header"

const SignUp = (props) => {
  // const { authError, auth } = props;
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const avatarRef = useRef();
  // const [avatarUrl, setAvatarUrl] = useState('');



  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const [fileUpload, setFileUpload] = useState('')

  const [state, setState] = useState({
    email: '',
    firstname: '',
    lastname: '',
    avatar: ''
  })


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

      setFileUpload(file);
    }
  }

  function handleChange(e) {
    setState({
      ...state,
      [e.target.id]: e.target.value
    })
  }

 async function handleSubmit(e) {
    e.preventDefault()

    if(passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Password do not match')
    }

    try {
      setLoading(true)
      const newFname = state.email.split('@');
      const newFileUpload = renameFile(fileUpload, newFname[0]);

      const storageRef = storage.ref();
      const fileRef = storageRef.child(newFileUpload.name)
      await fileRef.put(newFileUpload)

      const fileUrl = await fileRef.getDownloadURL();

      const inputValues = {
        email: state.email,
        firstname: state.firstname,
        lastname: state.lastname,
        avatar: fileUrl,
        number: '',
        password: passwordRef.current.value
      }

      props.signUp(inputValues, (res) => {
        if(res) {
          history.push('/login')
        }
      });

    } catch(error) {
      if(error) {
        setError(error.message)
      } else {
        setError('Failed to create account')
      }

      setLoading(false)
    }

  }

  return (
    <div className="auth auth-signup">
      <Header text='Create An Account' class='auth'/>
      <div className="auth-inner">
        {error && <div className="auth-alert"><span>{error}</span></div>}
        <div className="form">
          <form action="" onSubmit={handleSubmit}>

            <div className="form-input-file">
              <div className="form-input-upload">
                <input type="file" name="avatar" id="avatar" onChange={onFileChange}/>
                <img id="avatar" ref={avatarRef} src="" alt=""/>
                <span>Upload photo</span>
              </div>
              <div className="form-input-name">
              <div className="form-inputbox">
                <input id="firstname" type="text" name="firstname" placeholder="Firstname"  onChange={handleChange} required/>
              </div>
              <div className="form-inputbox">
                <input id="lastname" placeholder="Lastname" name="lastname" type="text"  onChange={handleChange}  required/>
              </div>
              </div>
            </div>
            <div className="form-input">
              <div className="form-inputbox">
                <input id="email" type="email" name="email" placeholder="Email"  onChange={handleChange}  required/>
              </div>
            </div>

            <div className="form-input">
              <div className="form-inputbox">
                <input id="password" type="password" placeholder="Password" minLength="6" ref={passwordRef} required/>
              </div>
            </div>

            <div className="form-input">
              <div className="form-inputbox">
                <input id="password-configuration" placeholder="Confirm Password" minLength="6" type="password"  ref={passwordConfirmRef} required/>
              </div>
            </div>

            <div className="form-btn">
              <button disabled={loading} type="submit" className="cmn-btn cmn-btn-submit">
                <span>Sign Up</span>
              </button>
            </div>
          </form>
        </div>

        <div className="auth-other">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    signUp: bindActionCreators(signUp, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
