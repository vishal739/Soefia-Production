import React, { useState, useEffect } from "react";
import mic from "../../../assets/mic.png";
import "./Group.scss";
import Navbar from "../Navbar/Navbar";
// Define the data as a constant
const data = {
  groups: [
    {
      name: "Group 1",
      members: ["Alice", "Bob", "Charlie", "Mallory"],
    },
    {
      name: "Group 2",
      members: ["Dave", "Eve", "Frank", "Judy"],
    },
    {
      name: "Group 3",
      members: ["Grace", "Heidi", "Ivan", "Peggy"],
    },
    {
      name: "Group 4",
      members: ["Judy", "Mallory", "Niaj", "Charlie"],
    }
  ],
};

// const GroupDisplay = () => {
//   return (
//     <div className="group-container">
//       {data.groups.map((group, index) => (
//         <div key={index} className="group">
//           <h3>{group.name}</h3>
//           <ul>
//             {group.members.map((member, idx) => (
//               <li key={idx}>{member}</li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

const Group = () => {
  // const [groupData, setGroupData] = useState(null);

  // useEffect(() => {
  //   // Instead of fetching, directly use the constant data
  //   setGroupData(data);
  // }, []);

  return (
    <div className="group-container">
      <Navbar />
      <div className="grp-main">
        <div className="grp-left-pane">
          <p>Proposed Lesson Groups</p>
          <div className="groups-box">
            {data.groups.map((item, index) => {
              return (
                <div className="circle-container" key={index}>
                  <div className="name top">{item.members[0]}</div>
                  <div className="name left">{item.members[1]}</div>
                  <div className="circle">{item.name}</div>
                  <div className="name right">{item.members[2]}</div>
                  <div className="name bottom">{item.members[3]}</div>
                </div>
              );
            })}
          </div>
          <div className="grp-buttons">
            <button className="btn">CONFIRM</button>
            <button className="btn">Save for Later</button>
            <button className="btn">Let's Try Again</button>
          </div>
        </div>
        <div className="grp-right-pane">
          <section>
            <div className="headings">
              <img className="mic-icon" src={mic} alt="failed to load" />
              <h3>My Introduction and Reference Framework</h3>
            </div>
            <div>
              <textarea className="grp-text-area"></textarea>
            </div>
          </section>
          <section>
            <div className="headings">
              <img className="mic-icon" src={mic} alt="failed to load" />
              <h3>Exercise Proposed Progress</h3>
            </div>
            <div>
              <textarea className="grp-text-area"></textarea>
            </div>
          </section>
          <section>
            <div className="headings">
              <img className="mic-icon" src={mic} alt="failed to load" />
              <h3>Key Concepts to Teach</h3>
            </div>
            <div>
              <textarea className="grp-text-area"></textarea>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Group;
