import React, { useState } from 'react';
import './App.css';
import ResidentsList from './Components/ResidentsList';
import Search from './Components/Search';
import Error from './Components/Error';
import 'h8k-components';

const title = 'Hacker Dormitory';
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function App() {
  const [residentsList, setResidentsList] = useState([]);
  const [error, setError] = useState(false);
  const addStudent = (status) => {
    const [name, joiningDate] = status;
    return name.validity && joiningDate.validity
      ? (() => {
          setError(false);
          setResidentsList((prevState) => [...prevState, name.value]);
          document.getElementById('studentName').value = null;
          document.getElementById('joiningDate').value = null;
        })()
      : !joiningDate.validity
      ? setError(
          `Sorry, ${capitalizeFirstLetter(name.value)}'s validity has Expired!`
        )
      : setError(
          `Sorry, ${capitalizeFirstLetter(
            name.value.toUpperCase()
          )} is not a verified student!`
        );
  };

  return (
    <div className='App'>
      <h8k-navbar header={title}></h8k-navbar>
      <div className='layout-column justify-content-center align-items-center w-50 mx-auto'>
        <Search addStudent={addStudent} />
        {error && <Error error={error} />}
        {residentsList?.length > 0 && (
          <ResidentsList residentsList={residentsList} />
        )}
      </div>
    </div>
  );
}

export default App;
