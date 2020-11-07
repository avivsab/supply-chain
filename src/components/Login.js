import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Row, Button, UncontrolledTooltip } from 'reactstrap';

export const Login = (props) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    const inputName = e.target.name;
    const { value } = e.target;
    if (inputName === 'username') setUserName(value);
    if (inputName === 'password') setPassword(value);
  }

  const validateForm = () => {
    return userName.length > 5 && password.length > 2;
    
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return false;
    sessionStorage.setItem('validOnSession', 'true');   
    return (
      props.passValidityCheck(true), 
      props.passCurrentUser(userName)
      );
  }

  return (
    <Row xs="2" className="mt-5 h5">
      <Form className="container-md" onSubmit={handleSubmit}>
        <FormGroup className="position-relative">
          <Label>Your Username</Label>
          <Input
            onChange={handleChange}
            name="username"
            id="username"
            invalid={userName.length <= 5 && userName.length > 0}
            valid={userName.length > 5}
            value={userName}
          />
          <UncontrolledTooltip placement="right" target="username">
            Any Charactars...
          </UncontrolledTooltip>
          <FormFeedback valid tooltip>Valid!</FormFeedback>
          <FormText>Longer then 5 characters</FormText>
        </FormGroup>
        <FormGroup className="position-relative mb-5">
          <Label>Your Password</Label>
          <Input
            onChange={handleChange}
            name="password"
            id="password"
            invalid={password.length > 0 && password.length <= 2}
            valid={password.length > 2}
            value={password}
          />
          <UncontrolledTooltip placement="right" target="password">
            Just Type (3 or more)
          </UncontrolledTooltip>
          <FormFeedback tooltip>Not Valid Yet</FormFeedback>
          <FormFeedback valid tooltip>Valid!</FormFeedback>
          <FormText>At least 3 characters</FormText>
        </FormGroup>
        <Button 
        outline 
        color="primary" 
        className="w-25"
        disabled={!validateForm()}
        >
          Show Logs
        </Button>
      </Form>
    </Row>
  );
}

export default Login;