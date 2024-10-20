const SERVER_URL = import.meta.env.VITE_REACT_APP_SERVER_URL;

export function fetchLesson(data) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`${SERVER_URL}/api/lesson?teacherId=${data.teacherId}`)
    console.log(`${SERVER_URL}/api/lesson?teacherId=${data.teacherId}`)
    const result = await response.json()
    if (result.success) {
      resolve(result.data);
    } else {
      reject(result.message);
    }
  });
}

export function fetchCurrentLesson(data) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`${SERVER_URL}/api/lesson/current?lessonId=${data.lessonId}`)
    console.log(`${SERVER_URL}/api/lesson/current?lessonId=${data.lessonId}`)
    const result = await response.json()
    if (result.success) {
      resolve(result.data);
    } else {
      reject(result.message);
    }
  });
}

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

export function uploadAndCreateLesson(file) {
  return new Promise(async (resolve, reject) => {
      const formData = new FormData();
      formData.append('pdf', file); // Ensure field name matches 'pdf'

      try {
          const response = await fetch(
              `${SERVER_URL}/api/upload`, // URL
              {
                  method: 'POST',
                  body: formData,
                  headers: {
                      // 'Content-Type' should not be explicitly set for FormData with fetch
                      // It will automatically set the correct boundary for multipart form data
                  },
              }
          );
          const data = await response.json(); // Parse the response body
          if(data.success) {
              resolve(data.data); // Return the response data
          }else{
              reject(data.message);
          }
      } catch (error) {
          console.error('Error uploading and extracting PDFs:', error);
          throw error; // Rethrow the error to handle in the calling function
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

export function deleteLesson(data) {
  return new Promise(async (resolve,reject) => {
    console.log("Deleting sync: ", data)
    const response = await fetch(`${SERVER_URL}/api/lesson?lessonId=${data.lessonId}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    })
    console.log("delete updated,", data.lessonId);
    const result = await response.json()
    if (result.success) {
      resolve(result.data);
    } else {
      reject(result.message);
    }
  });
}