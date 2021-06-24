import React, { useState, useEffect } from "react"
import { Link, useHistory} from "react-router-dom"

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { signOut, getUser } from '../../store/actions/authActions'


const Avatar = (props) => {
  const [showMenu, setShowMenu] = useState(false)
  const history = useHistory()
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));


  function handleLogout() {

    props.signOut((res) => {
      if(res) {
        history.push('/login');
      }
    });
  }

  return (
    <div className="avatar">
      <div className={`avatar-img ${props.class}`} onClick={() => {setShowMenu(!showMenu)}}>
      {currentUser ? <div className="avatar-img-box"><img src={currentUser.avatar} alt=""/></div>
        : <span className="avatar-img-initial">{}</span>
      }
      </div>


      <div className={`avatar-menu ${showMenu? 'is-show': ''}`}>
        <div className="avatar-menu-item" onClick={handleLogout}>
          <span>Logout</span>
        </div>
        <div className="avatar-menu-item">
          <Link className="avatar-menu-link" to='/update-profile'><span>Edit Profile</span></Link>

        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch)=> {
  return {
    signOut: bindActionCreators(signOut, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Avatar)
