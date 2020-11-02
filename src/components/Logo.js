import React from 'react'
import { UncontrolledTooltip } from 'reactstrap';


export default function Logo() {
  return (
    <svg width="61" height="57" id="brand-svg">
      <rect x="5" y="5" rx="20" ry="20" width="55" height="50"
      className="regular-brand"  style={{stroke: 'black',strokeWidth:5,opacity:0.5}} />
          <text x="10" y="35" fontFamily="Verdana" fontSize="15" fill="yellow">Brand</text>
      Sorry, your browser does not support inline SVG.
      <UncontrolledTooltip placement="bottom" target="brand-svg">
        Company Home Page
      </UncontrolledTooltip>
      <style>{"\
        .regular-brand {\
          fill: red;\
          }\
        .regular-brand:hover {\
          fill: oldlace;\
        }\
        "}
      </style>
    </svg>
    
  )
}


