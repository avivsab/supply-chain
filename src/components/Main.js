import React, { useState } from 'react'
import { Button } from 'reactstrap';
import './main.css'
import WhouseDetails from './WhouseDetails'
import WhouseDetailsGraph from './WhouseDetailsGraph'
import CompanyDashboard from './CompanyDashbord'
export const Main = (props) => {
    const passRouter = (props);
    const [warehouses, setActive] = useState([
        { name: 'north', active: false, useCase: 'normal data' },
        { name: 'west', active: false, useCase: 'big numbers data' },
        { name: 'east', active: false, useCase: 'violate contract properties' },
        { name: 'south', active: false, useCase: 'duplicate data' }
    ])
    const [showGraph, toggleGraph] = useState(false);
    const toggleView = () => toggleGraph(!showGraph);
    return (
        <div>
            <CompanyDashboard warehouses={warehouses} passActiveWarehouse={setActive} rest={passRouter} />
            <h1 className="brand-name text-primary">Company Stocks Managment</h1>
            {warehouses.map(wh => {
                return (
                    wh.active &&
                    <div key={wh.name}>
                        <h2 style={{textTransform: 'capitalize'}}>warehouse {wh.name}</h2>
                        {
                            !showGraph ?
                                <>
                                    <WhouseDetails activeWarehouse={warehouses} />
                                    <Button color="success" className="view-button" onClick={toggleView}>Graphic View</Button>
                                </>
                                :
                                <>
                                    <WhouseDetailsGraph activeWarehouse={warehouses} />
                                    <Button color="info" className="view-button" onClick={toggleView}>Display Details</Button>
                                </>
                        }
                    </div>
                );
            })
            }
        </div>
    )
}
