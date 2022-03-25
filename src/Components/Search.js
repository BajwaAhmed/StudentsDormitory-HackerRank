import React, { useEffect } from 'react';
import { STUDENTS } from '../studentsList';
// `joiningDate` && `validityDate` format "yyyy-mm-dd"

function checkValidity(joiningDate, validityDate) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const [year, month, day] = joiningDate.split('-');
  const [yyyy, mm, dd] = validityDate.split('-');
  const maxValid = new Date(yyyy, mm - 1, dd);
  const selected = new Date(year, month - 1, day);
  return maxValid >= selected && maxValid >= today;
}

const isStudentFoundValid = (name, joiningDate) => {
  const index = STUDENTS.findIndex(
    (student) => student.name.toLowerCase() === name
  );
  return index !== -1 &&
    checkValidity(joiningDate, STUDENTS[index].validityDate)
    ? [
        { value: name, validity: true },
        { value: joiningDate, validity: true },
      ]
    : index == -1
    ? [
        { value: name, validity: false },
        { value: joiningDate, validity: true },
      ]
    : [
        { value: name, validity: true },
        { value: joiningDate, validity: false },
      ];
};

function Search({ addStudent }) {
  const handleSubmit = () => {
    addStudent(
      isStudentFoundValid(
        document.getElementById('studentName').value.toLowerCase(),
        document.getElementById('joiningDate').value
      )
    );
  };

  return (
    <div className='my-50 layout-row align-items-end justify-content-end'>
      <label htmlFor='studentName'>
        Student Name:
        <div>
          <input
            id='studentName'
            data-testid='studentName'
            type='text'
            className='mr-30 mt-10'
          />
        </div>
      </label>
      <label htmlFor='joiningDate'>
        Joining Date:
        <div>
          <input
            id='joiningDate'
            data-testid='joiningDate'
            type='date'
            className='mr-30 mt-10'
          />
        </div>
      </label>
      <button
        onClick={handleSubmit}
        type='button'
        data-testid='addBtn'
        className='small mb-0'
      >
        Add
      </button>
    </div>
  );
}

export default Search;
