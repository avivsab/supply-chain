import React, { useState, useEffect } from 'react';
// import { useHistory } from "react-router-dom";
import { Alert, UncontrolledCollapse, Button, Progress, ToastHeader } from 'reactstrap';

export const AlertsList = (props) => {
  // let history = useHistory()
  const warehouses = props.initialWarehouses;

  const [details, toggleDetails] = useState(false);
  const [counter, setcounter] = useState(2);

  function removeAutomaticCredential() {
    sessionStorage.removeItem('validOnSession');
    sessionStorage.removeItem('loaded');
    //history.push('/');
    props.passVirtulRoute('base');
  }
  useEffect(() => {
    const collapseInt = setInterval(() => {
      if (counter >= 0) {
        setcounter(counter - 1);
      } else return;
      if (counter <= 0) {
        toggleDetails(true);
        sessionStorage.setItem('loaded', 'whatever');
      }

    }, 1000);
    return () => {
      clearInterval(collapseInt)
    }
  }, [counter])

  const dynamicText = {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'teal'
  }
  return (
    <div>
      <ToastHeader
        icon="secodary"
        style={dynamicText}
      >
        welcome {props.currentUser}
      </ToastHeader>
      <Alert color="info" className="font-weight-bold">
        Currntly
        <span className="p-1" style={dynamicText}>
          {warehouses.length}
        </span>
        active warehouses
        <Button
          color="warning"
          id="toggler"
          className="ml-5 badge-pill badge-warning"
          onClick={() => toggleDetails(!details)}
          disabled={counter >= 0}
        >
          {details ? "Hide" : "Show"} Logs
        </Button>
      </Alert>
      {counter >= 0 &&
        <>
          <Progress striped color="info" value={100 / (counter + 1)} />
        </>
      }
      <UncontrolledCollapse toggler="#toggler" isOpen={details}>
        <Alert color="success">
          Warhouse <span style={dynamicText}>north</span> has stable quantity for 12 monthes.
      </Alert>
        <Alert color="danger">
          Warhouse <span style={dynamicText}>west</span> had zero quantity on january
      </Alert>
        <Alert color="warning">
          Warhouse <span style={dynamicText}>east</span> don't has data history
      </Alert>
        <Alert color="warning">
          Warhouse <span style={dynamicText}>south</span> don't has data history
      </Alert>
        <div className="mt-5">
          <Alert
            color="dark"
            className="w-50 m-auto font-weight-bold shadow badge bg-info border-secondary"
            onClick={removeAutomaticCredential}
            style={{ cursor: 'pointer' }}
          >
            Dissmis automatic credentials <br /> <hr /> and back to Home page
      </Alert>
          <Alert color="light">
            Later on you should dismiss the credentials or close the browser  <br />
            To keep credentials navigate from the navbar menu
      </Alert>
        </div>
      </UncontrolledCollapse>
    </div>
  );
};

export default AlertsList;