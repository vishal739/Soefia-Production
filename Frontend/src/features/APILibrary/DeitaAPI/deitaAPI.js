const SERVER_URL = import.meta.env.VITE_REACT_APP_SERVER_URL;

export function fetchPreviewLesson(data) {
    return new Promise(async (resolve,reject) => {
        const response = await fetch(`${SERVER_URL}/api/deita?lessonId=${data.lessonId}`)
        console.log(`${SERVER_URL}/api/deita?lessonId=${data.lessonId}`)
        const result = await response.json()
        if (result.success) {
            resolve(result.data);
        } else {
            reject(result.message);
        }
    });
}

export function createPreviewLesson(data) {
    return new Promise(async (resolve, reject) => {
        console.log("createPreviewLesson: ", data);
        const response = await fetch(`${SERVER_URL}/api/deita/`, {
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

export function updateDeita(data) {
    return new Promise(async (resolve, reject) => {
        console.log("updateDeita: ", data);
        const response = await fetch(`${SERVER_URL}/api/deita/`, {
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

export function deleteDeita(id) {
    return new Promise(async (resolve, reject) => {
        console.log("Deleting sync: ", id)
        const response = await fetch(`${SERVER_URL}/api/deita/` + id, {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' },
        })
        console.log("delete updated,", id);
        const result = await response.json()
        if (result.success) {
            resolve(result.data);
        } else {
            reject(result.message);
        }
    });
}