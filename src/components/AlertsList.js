import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Alert, UncontrolledCollapse, Button } from 'reactstrap';

export const AlertsList = (props) => {
  let history = useHistory()
  const warehouses = props.initialWarehouses;

  const [details, toggleDetails] = useState(false);
  function removeAutomaticCredential() {
    sessionStorage.removeItem('validOnSession');
    history.push('/');
  }

  return (
    <div>
      <Alert color="info" className="font-weight-bold">
        Currntly {warehouses.length} active warehouses
        <Button color="primary" id="toggler" className="ml-5" onClick={()=> toggleDetails(!details)}>
          {details ? "Show" : "Hide" } 
        </Button>
      </Alert>
      <UncontrolledCollapse toggler="#toggler" defaultOpen={true}>
        <Alert color="success">
          Warhouse <span style={{ textTransform: "uppercase" }}>north</span> has stable quantity for 12 monthes.
      </Alert>
        <Alert color="danger">
          Warhouse <span style={{ textTransform: "uppercase" }}>west</span> had zero quantity on january
      </Alert>
        <Alert color="warning">
          Warhouses <span style={{ textTransform: "uppercase" }}>east & south</span> don't has data history
      </Alert>
        <div className="mt-5">
          <Alert color="dark" className="w-50 m-auto font-weight-bold"
            onClick={removeAutomaticCredential}
            style={{ cursor: 'pointer' }}
          >
            Dissmis automatic credentials <br /> and go back to Home page
      </Alert>
          <Alert color="light">
            Later on you should dismiss the credentials or to close the browser
      </Alert>
        </div>
      </UncontrolledCollapse>
    </div>
  );
};

export default AlertsList;