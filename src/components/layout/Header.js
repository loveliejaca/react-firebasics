import React  from "react"
import { useHistory } from "react-router-dom"
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import Avatar from "../profile/Avatar"


const Header = (props) => {
  let history = useHistory()
  const currentClass = 'header-' + props.class;
  const pathname = useHistory().location.pathname.replace(/\//g, "");

  return (
    <header className="l-header">
      <div className={`header ${currentClass}`}>
        <button className='header-back' onClick={() => history.goBack()}>
          <i className="header-ico-back"></i>
        </button>
        {pathname !== 'update-profile' && props.class !== 'auth'   && <Avatar /> }

        {props.class === 'auth' && <h1 className='header-title'>{props.text}</h1>}
      </div>
    </header>
  )
}

const mapStateToProps = (state) => {
  return{
    user: state.firebase.profile,
  }
}
//
// const mapDispatchToProps = (dispatch)=> {
//   return {
//     signOut: bindActionCreators(signOut, dispatch)
//   }
// }

export default connect(mapStateToProps, null)(Header)
