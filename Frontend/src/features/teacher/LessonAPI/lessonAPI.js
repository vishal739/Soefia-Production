const SERVER_URL=import.meta.env.VITE_REACT_APP_SERVER_URL;

export function fetchLesson(data) {
    return new Promise(async (resolve) =>{
      const response = await fetch(`${SERVER_URL}/api/lesson`)
      const result = await response.json()
      resolve(({result}))
  });
  }

  export function createLesson(data) {
    return new Promise(async (resolve, reject) => {
      console.log("createLesson: ", data);
      const response = await fetch(`${SERVER_URL}/api/lesson`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' },
      });
      const result = await response.json();
      if (result.status) {
        resolve(result.data);
      } else {
        reject(result.message);
      }
    });
  }
  
  export function updateLesson(data) {
    return new Promise(async (resolve, reject) => {
      console.log("updateLesson: ", data);
      const response = await fetch(`${SERVER_URL}/api/lesson`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' },
      });
      const result = await response.json();
      if (result.status) {
        resolve(result.data);
      } else {
        reject(result.message);
      }
    });
  }