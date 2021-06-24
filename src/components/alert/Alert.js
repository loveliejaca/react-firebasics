import React from "react"
import { Link } from "react-router-dom"

const Alert = (props) => {
  const alert = props.alert

  function handleClick(action) {
    props.handleAlert(false, action)
  }


  // const [closeAlert, setCloseAlert] = useState(props.alert.type.show)

  return (
    alert.show &&
    <div className={`alert alert-${alert.type}`}>
      <div className='alert-inner'>
        <div className={`alert-ico alert-ico-${alert.type}`}>
          <div className="alert-ico-ring">
            <span></span>
            <span></span>
          </div>
          <div className='alert-ico-inner'></div>
        </div>
        <h2>{alert.type}</h2>
        <p>{alert.message}</p>


        <div className="alert-btn-wrap">
         {
           alert.btn && alert.btn.map((btn, index) => {
             if(btn.link) {
              return (
                <Link key={index} className={`alert-btn alert-btn-${btn.color}`} to={btn.link}>
                 <span>{btn.txt}</span>
               </Link>
               )
             } else {
               return (
                 <button key={index} className={`alert-btn alert-btn-${btn.color}`} onClick={() => handleClick(btn.action)}>
                   <span>{btn.txt}</span>
                 </button>
               )
             }
          })
         }

        </div>
      </div>
    </div>
  )
}

export default Alert
