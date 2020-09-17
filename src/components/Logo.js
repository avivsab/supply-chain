import React from 'react'

export default function Logo() {
  return (
    <svg width="61" height="80">
      <rect x="5" y="5" rx="20" ry="20" width="55" height="50"
      style={{fill:'red',stroke:'black',strokeWidth:5,opacity:0.5}}  />
          <text x="10" y="35" fontFamily="Verdana" fontSize="15" fill="blue">Brand</text>
      Sorry, your browser does not support inline SVG.
    </svg>
  )
}

