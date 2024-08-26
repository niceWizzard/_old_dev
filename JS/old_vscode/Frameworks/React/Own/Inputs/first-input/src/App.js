import React, { useState } from 'react';
import InputGroup from './components/FormInput'
import FormButton from './components/FormSubmitBtn'

function App() {

  const [isValidForm, setIsValidForm] = useState(false);

  const handleValidation = (_validation) => {
    setIsValidForm(_validation);
  }

  const handleSubmit = (e) => {
    if (!isValidForm) {
      e.preventDefault();
    } else if (isValidForm) {
      window.location.reload(true)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit(e);
    }
  }

  return (
    <React.Fragment>
      <form
        className="form-group m-5 p-2 w-50 border border-info shadow d-flex flex-column"
        onSubmit={handleSubmit}
        onKeyDown={handleKeyDown}
      >
        <InputGroup changeIsValid={handleValidation} labelName="Name" inputType="text" />
        <InputGroup changeIsValid={handleValidation} labelName="Email" inputType="email" />
        <InputGroup changeIsValid={handleValidation} labelName="Password" inputType="password" />
        <FormButton />
      </form>
    </React.Fragment>
  );
}

export default App; 
