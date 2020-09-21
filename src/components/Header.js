import React , { useState } from 'react'

import CompanyNavbarBrand from './Navbar'
export const Header = (params) => {
    const [warehouses, setActive] = useState([
        {name: 'north', active: false}, 
        {name: 'west', active: false}, 
        {name: 'east', active: false}, 
        {name: 'south', active: false}
    ])
    
   return (
    <div>
    <CompanyNavbarBrand warehouses={warehouses} passActiveWarehouse={setActive}/>
     <h1>Company</h1>
     {console.log(warehouses)}
         { warehouses.map(wh => {
             return(
                 
                 <h2>warehouse {wh.name} details: {wh.active.toString()} </h2>
                
                 )
                })    
        }
     
    </div>
    )
}
