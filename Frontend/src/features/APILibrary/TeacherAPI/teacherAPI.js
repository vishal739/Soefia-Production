const SERVER_URL = import.meta.env.VITE_REACT_APP_SERVER_URL;

export function fetchTeacher(data) {
    return new Promise(async (resolve) => {
        const response = await fetch(`${SERVER_URL}/api/teacher/`)
        const result = await response.json()
        resolve(({ result }))
    });
}

export function createTeacher(data) {
    return new Promise(async (resolve, reject) => {
        console.log("createTeacher: ", data);
        const response = await fetch(`${SERVER_URL}/api/teacher/`, {
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

export function updateTeacher(data) {
    return new Promise(async (resolve, reject) => {
        console.log("updateTeacher: ", data);
        const response = await fetch(`${SERVER_URL}/api/teacher/`, {
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

export function deleteTeacher(id) {
    return new Promise(async (resolve,reject) => {
        console.log("Deleting sync: ", id)
        const response = await fetch(`${SERVER_URL}/api/teacher/` + id, {
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