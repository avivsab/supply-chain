import React from 'react'
import { CompanyDashboard } from './CompanyDashbord'
export const Alerts = (props) => {
    const passRouter = (props)
    return (
        <div>
             <CompanyDashboard rest={passRouter} />
            <h1 className="brand-name text-primary">Company Stocks Managment</h1>
        </div>
    )
}
