import React, { useState, useEffect } from "react";
import mic from "../../../assets/mic.png";
import "./Group.scss";
import Navbar from "../Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeitaAsync, selectDeita, selectDeitaLoader } from "../../APILibrary/DeitaAPI/deitaSlice";
import { useLocation } from "react-router-dom";
import Loader from "../../../pages/Loader/Loader"
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
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const lessonId = queryParams.get("lessonId");
  const dispatch = useDispatch();
  const deita = useSelector(selectDeita);
  const isLoading = useSelector(selectDeitaLoader);
  const [textInput1, setTextInput1] = useState(deita?.previewLesson.myIntroduction );
  const [textInput2, setTextInput2] = useState(deita?.previewLesson.
    academicLearning );
  const [textInput3, setTextInput3] = useState(deita?.previewLesson.socialLearning );
  const [textInput4, setTextInput4] = useState(deita?.previewLesson.keyConcepts );
  // dispatch(fetchCurrentLessonAsync({ lessonId: lessonId }))
  //     .then((result) => {
  //       const lesson = result.payload;
  //       setTextInput1(lesson?.lessonStructureOverview || "");
  //       setTextInput2(lesson?.learningGoals || "");
  //       setTextInput3(lesson?.socialCollaborationGoal || "");
  //       setTextInput4(lesson?.lessonMaterials || "");
  //       setTextInput5(lesson?.lessonExercise || "");
  //       setTitle(lesson?.title || "");
  //       setStartDate(lesson?.date ? new Date(lesson.date) : new Date());
  //     });
  // useEffect(() => {

  //   // if (lessonId) {
  //   //   dispatch(fetchDeitaAsync({ lessonId: lessonId })).then((result) => {
  //   //     const deita = result.payload;
  //   //     setTextInput1(deita?.previewLesson.myIntroduction );
  //   //     setTextInput2(deita?.previewLesson.academicLearning );
  //   //     setTextInput3(deita?.previewLesson.socialLearning );
  //   //     setTextInput4(deita?.previewLesson.keyConcepts );
  //   //   });
  //   // }
  // }, [dispatch, lessonId]);

  return (
    <div className="group-container">
      {isLoading == "loading" ? (
        <Loader />
      ) : (
        <>
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
                  <textarea className="grp-text-area" value={textInput1}></textarea>
                </div>
              </section>
              <section>
                <div className="headings">
                  <img className="mic-icon" src={mic} alt="failed to load" />
                  <h3>Proposed Progress: Academic Learning</h3>
                </div>
                <div>
                  <textarea className="grp-text-area" value={textInput2}></textarea>
                </div>
              </section>
              <section>
                <div className="headings">
                  <img className="mic-icon" src={mic} alt="failed to load" />
                  <h3>Proposed Progress: Social Learning</h3>
                </div>
                <div>
                  <textarea className="grp-text-area" value={textInput3}></textarea>
                </div>
              </section>
              <section>
                <div className="headings">
                  <img className="mic-icon" src={mic} alt="failed to load" />
                  <h3>Key Concepts to Teach</h3>
                </div>
                <div>
                  <textarea className="grp-text-area" value={textInput4}></textarea>
                </div>
              </section>
            </div>
          </div>
        </>
      )}
    </div>

  );
};

export default Group;
