// ClassListPage.jsx
import React, { useState } from 'react';
import './Classlist.scss';
import { Link } from 'react-router-dom';

const classes = [
  { name: "Class 1", id: 1 },
  { name: "Class 2", id: 2 },
  { name: "Class 3", id: 3 },
  { name: "Class 4", id: 4 },
  { name: "Class 5", id: 5 },
  { name: "Class 6", id: 6 },
  { name: "Class 7", id: 7 },
  { name: "Class 8", id: 8 },
  { name: "Class 9", id: 9 },
  { name: "Class 10", id: 10 }
];

const ClassListPage = () => {
  const [selectedClass, setSelectedClass] = useState(null);

  const toggleClass = (classId) => {
    if (selectedClass === classId) {
      setSelectedClass(null);
    } else {
      setSelectedClass(classId);
    }
  };

  return (
    <div className="class-list-page">
      <h1>Class List</h1>
      <ul className="class-list">
        {classes.map((classItem) => (
          <li key={classItem.id} className="class-item">
            <button onClick={() => toggleClass(classItem.id)} className="class-button">
              {classItem.name}
            </button>
            {selectedClass === classItem.id && (
              <div className="class-options">
                <Link to={`/class/${classItem.id}`}>Lesson</Link>
                <Link to={`/class/${classItem.id}/edit`}>Assingment</Link>
                <Link to={`/class/${classItem.id}/students`}>Students Analysis</Link>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassListPage;
