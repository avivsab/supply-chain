import React, { useState, useEffect } from 'react'
import { Alert } from "reactstrap"

import { CompanyDashboard } from './CompanyDashbord'
import { Login } from './Login'
import { AlertsList } from './AlertsList'

export const Alerts = (props) => {
    const intialWarehouses = props.initialWarehouses;

    const [validForm, setValidForm] = useState(false);

    function checkSessionAllreadyValidtate() {
        if (sessionStorage.getItem('validOnSession') === 'true') {
            setValidForm(true);
        }
    }

    useEffect(() => {
        checkSessionAllreadyValidtate();
    }, [])

    return (
        <div>
            <CompanyDashboard warehouses={intialWarehouses} />
            <h1 className="brand-name text-primary">Company Stocks Managment</h1>
            <div className="container">
                {!validForm &&
                <>
                    <Alert color='primary' className="font-weight-bold">Currently OK
                    <br />
                        To see logs fill out the fields
                    </Alert>
                    <Login passValidityCheck={setValidForm} />
                </>
                }
                {validForm &&
                    <AlertsList {...props} />
                }
            </div>
        </div>
    )
}
