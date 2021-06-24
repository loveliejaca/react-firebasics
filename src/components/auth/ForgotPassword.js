import React, { useRef, useState } from "react"
import { Link } from "react-router-dom"

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { resetPassword } from '../../store/actions/authActions'

import Header from "../../components/layout/Header"

const ForgotPassword = (props) => {
  const emailRef = useRef()
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    props.resetPassword(emailRef.current.value, (res) => {
      console.log("res", res);
      setError('')
      setLoading(true)
      setMessage('')
    })

    setLoading(false)
  }


  return (
    <div className="auth auth-signup">
    <Header text='Password Reset' class='auth'/>
      <div className="auth-inner">
        {message && <div className="auth-alert-msg"><span>{message}</span></div>}

        {error && <div className="auth-alert"><span>{error}</span></div>}
        <div className="form">
          <form action="" onSubmit={handleSubmit}>
            <div className="form-input">
              <label htmlFor="email">Email</label>
              <div className="form-inputbox">
                <input id="email" type="email" ref={emailRef} required/>
              </div>
            </div>

            <div className="form-btn">
              <button disabled={loading} type="submit" className="cmn-btn cmn-btn-submit">
                <span>Reset Password</span>
              </button>
            </div>
          </form>



        </div>
        <div className="auth-other">
           <Link to="/login">Login</Link>
        </div>
        <div className="auth-other">
          Need an account? <Link to="/signup">Sing Up</Link>
        </div>
      </div>
    </div>
  )
}


// export default ForgotPassword

const mapStateToProps = (state) => {
  return{
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetPassword: bindActionCreators(resetPassword, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
