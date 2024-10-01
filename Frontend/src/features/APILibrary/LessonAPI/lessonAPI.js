const SERVER_URL = import.meta.env.VITE_REACT_APP_SERVER_URL;

export function fetchUpcomingLesson(data) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`${SERVER_URL}/api/lesson/upcoming?teacherId=${data._id}`)
    console.log(`${SERVER_URL}/api/lesson/upcoming?teacherId=${data._id}`)
    const result = await response.json()
    if (result.success) {
      resolve(result.data);
    } else {
      reject(result.message);
    }
  });
}
export function fetchCompletedLesson(data) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`${SERVER_URL}/api/lesson/completed?teacherId=${data._id}`)
    console.log(`${SERVER_URL}/api/lesson/completed?teacherId=${data._id}`)
    const result = await response.json()
    if (result.success) {
      resolve(result.data);
    } else {
      reject(result.message);
    }
  });
}

export function fetchCompletedLessonByClass(data) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`${SERVER_URL}/api/lesson/completeByClass?teacherId=${data._id}&classId=${data.classId}`);
    console.log(`${SERVER_URL}/api/lesson/completeByClass?teacherId=${data._id}&classId=${data.classId}`)
    const result = await response.json()
    if (result.success) {
      resolve(result.data);
    } else {
      reject(result.message);
    }
  });
}

export function createLesson(data) {
  return new Promise(async (resolve, reject) => {
    console.log("createLesson: ", data);
    const response = await fetch(`${SERVER_URL}/api/lesson/`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'content-type': 'application/json' },
    });
    const result = await response.json();
    if (result.success) {
      resolve(result.data);
    } else {
      reject(result.message);
    }
  });
}

export function updateLesson(data) {
  return new Promise(async (resolve, reject) => {
    console.log("updateLesson: ", data);
    const response = await fetch(`${SERVER_URL}/api/lesson/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: { 'content-type': 'application/json' },
    });
    const result = await response.json();
    if (result.success) {
      resolve(result.data);
    } else {
      reject(result.message);
    }
  });
}

export function deleteLesson(id) {
  return new Promise(async (resolve) => {
    console.log("Deleting sync: ", id)
    const response = await fetch(`${SERVER_URL}/api/lesson/` + id, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    })
    console.log("delete updated,", id);
    const result = await response.json()
    resolve({ data: { id: id } })
  });
}