import React, { useState, useEffect } from 'react';
import "./Group.scss"
// Define the data as a constant
const data = {
  "groups": [
    {
      "name": "Group 1",
      "members": ["Alice", "Bob", "Charlie"]
    },
    {
      "name": "Group 2",
      "members": ["Dave", "Eve", "Frank"]
    },
    {
      "name": "Group 3",
      "members": ["Grace", "Heidi", "Ivan"]
    },
    {
      "name": "Group 4",
      "members": ["Judy", "Mallory", "Niaj"]
    },
    {
      "name": "Group 5",
      "members": ["Olivia", "Peggy", "Sybil"]
    }
  ]
};

const GroupDisplay = () => {
  return (
    <div className="group-container">
      {data.groups.map((group, index) => (
        <div key={index} className="group">
          <h3>{group.name}</h3>
          <ul>
            {group.members.map((member, idx) => (
              <li key={idx}>{member}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

const Group = () => {
  const [groupData, setGroupData] = useState(null);

  useEffect(() => {
    // Instead of fetching, directly use the constant data
    setGroupData(data);
  }, []);

  return (
    <div className="app">
      <h1>Proposed Lesson Groups</h1>
      {groupData ? <GroupDisplay data={groupData} /> : <p>Loading...</p>}
      <div className="actions">
        <button>CONFIRM</button>
        <button>Lets Try Again!</button>
      </div>
    </div>
  );
};

export default Group;
