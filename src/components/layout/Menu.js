import React, { useState } from "react"
import { Link , useLocation, useHistory} from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

const Menu = () => {
  const location = useLocation();
  const pathname = location.pathname.replace(/^\/+/, '')
  const [isShow, setIsShow] = useState('')
  const [toggleShow, setToggleShow] = useState(false)
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    try {
      await logout()
      setToggleShow(false)
      history.push('/login')
    } catch(error) {
      console.log("Error", error);
    }
  }

  return (
    <React.Fragment>
      { toggleShow &&
        <div className="menu-account">
          <div className="menu-account-header">
            <span>My Account</span>
          </div>

          <ul className="menu-account-list">
            <li className="menu-account-item">
              {currentUser ?
                <Link to="/profile" onClick={() => setToggleShow(false)}>
                  <span>Profile</span>
                </Link>

                : <Link to="/login" onClick={() => setToggleShow(false)}>
                  <span>Login/Register</span>
                </Link>
              }

            </li>


            <li className="menu-account-item">
              <Link to="/about-us" onClick={() => setToggleShow(false)}>
                <span>FAQ</span>
              </Link>
            </li>
            <li className="menu-account-item">
              <Link to="/about-us" onClick={() => setToggleShow(false)}>
                <span>About Us</span>
              </Link>
            </li>
            <li className="menu-account-item">
              <Link to="/privacy-policy" onClick={() => setToggleShow(false)}>
                <span>Privacy Policy</span>
              </Link>
            </li>

            {currentUser &&
              <li className="menu-account-item"  onClick={handleLogout}>
                <span>Log out</span>
              </li>
            }
          </ul>
        </div>
      }

      <div className={`menu ${isShow}`}>
        <div className="menu-item">
          <Link className="menu-item-link" to="/" onClick={() => setToggleShow(false)}>
            <i className="cmn-ico cmn-ico-logo">TiG </i>
            <span className="menu-lbl">Home</span>
          </Link>

        </div>
        <div className="menu-item">
          <Link className="menu-item-link" to="/activity"  onClick={() => setToggleShow(false)}>
            <svg className="menu-ico-activity" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><title>71.list</title><g id="_71.list" data-name="71.list"><rect className="cls-1" x="1" y="1" width="22" height="22" rx="3" ry="3"/><line className="cls-1" x1="6" y1="7" x2="7" y2="7"/><line className="cls-1" x1="11" y1="7" x2="18" y2="7"/><line className="cls-1" x1="6" y1="12" x2="7" y2="12"/><line className="cls-1" x1="11" y1="12" x2="18" y2="12"/><line className="cls-1" x1="6" y1="17" x2="7" y2="17"/><line className="cls-1" x1="11" y1="17" x2="18" y2="17"/></g></svg>
            <span className="menu-lbl">Activity</span>
          </Link>
        </div>


        <div className="menu-item">
          <Link className="menu-item-link" to="/notification" onClick={() => setToggleShow(false)}>
            <svg className="menu-ico-notif" id="ico-notif" data-name="ico-notif 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>notice, notification, web, alarm, bell</title><path d="M22,19H21V11a9,9,0,0,0-8-8.94V1a1,1,0,0,0-2,0V2.06A9,9,0,0,0,3,11v8H2a1,1,0,0,0,0,2H8.14a4,4,0,0,0,7.72,0H22a1,1,0,0,0,0-2ZM12,22a2,2,0,0,1-1.72-1h3.44A2,2,0,0,1,12,22ZM5,19V11a7,7,0,0,1,14,0v8Z"/></svg>
            <span className="menu-lbl">Notifications</span>
          </Link>
        </div>
        <div className="menu-item">
          <div className="menu-item-link" onClick={() => setToggleShow(!toggleShow)}>
            <svg className="menu-ico-user" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title/><g id="about"><path d="M16,16A7,7,0,1,0,9,9,7,7,0,0,0,16,16ZM16,4a5,5,0,1,1-5,5A5,5,0,0,1,16,4Z"/><path d="M17,18H15A11,11,0,0,0,4,29a1,1,0,0,0,1,1H27a1,1,0,0,0,1-1A11,11,0,0,0,17,18ZM6.06,28A9,9,0,0,1,15,20h2a9,9,0,0,1,8.94,8Z"/></g></svg>
            <span className="menu-lbl">Account</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Menu

//  <div className="menu-item"> <Link className="menu-item-link" to="/services">
//       <svg className="menu-ico-service" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title/><g id="Contacts"><path d="M14,14a3,3,0,1,0-3-3A3,3,0,0,0,14,14Zm0-4a1,1,0,1,1-1,1A1,1,0,0,1,14,10Z"/><path d="M29,17a1,1,0,0,0,0-2H26V10h3a1,1,0,0,0,0-2H26V7a5,5,0,0,0-5-5H7A5,5,0,0,0,2,7V25a5,5,0,0,0,5,5H21a5,5,0,0,0,5-5V24h3a1,1,0,0,0,0-2H26V17Zm-5,8a3,3,0,0,1-3,3H7a3,3,0,0,1-3-3V7A3,3,0,0,1,7,4H21a3,3,0,0,1,3,3Z"/><path d="M15,15H13a5,5,0,0,0-5,5v1a3,3,0,0,0,3,3h6a3,3,0,0,0,3-3V20A5,5,0,0,0,15,15Zm3,6a1,1,0,0,1-1,1H11a1,1,0,0,1-1-1V20a3,3,0,0,1,3-3h2a3,3,0,0,1,3,3Z"/></g></svg>
//       <span className="menu-lbl">Services</span>
//     </Link>
//   </div>
