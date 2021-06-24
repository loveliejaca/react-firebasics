import React from "react"


const  MonsterLala = ({scale}) => {

  return (
    <div className="monster-lala" style={{  transform: `scale(${scale})` }}>
     <div className="monster-lala-inner">
       <div className="monster-lala-horn">
       <div className="horn -left"></div>
       <div className="horn -right"></div>
     </div>
     <div className="monster-lala-body">
       <span></span>
     </div>
     <div className="monster-lala-feet"></div>
     <div className="monster-lala-hands">
       <div className="hands -left">
         <span></span>
       </div>
       <div className="hands -right">
         <span></span>
       </div>
     </div>
     <div className="monster-lala-eyes">
       <div className="eye -left">
         <span></span>
       </div>
       <div className="eye -right">
         <span></span>
       </div>
     </div>
     <div className="monster-lala-mouth">
       <span></span>
       <div className="tounge"></div>
       <div className="teeth">
         <span></span>
         <span></span>
         <span></span>
         <span></span>
         <span></span>
         <span></span>
         <span></span>
       </div>
     </div>

     <div className="monster-lala-freckles"></div>
     </div>
    </div>
  )
}

export default MonsterLala
