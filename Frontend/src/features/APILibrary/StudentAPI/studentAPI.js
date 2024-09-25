const SERVER_URL = import.meta.env.VITE_REACT_APP_SERVER_URL;

export function fetchStudent(data) {
    return new Promise(async (resolve) => {
        const response = await fetch(`${SERVER_URL}/api/student/`)
        const result = await response.json()
        resolve(({ result }))
    });
}

export function createStudent(data) {
    return new Promise(async (resolve, reject) => {
        console.log("createStudent: ", data);
        const response = await fetch(`${SERVER_URL}/api/student/`, {
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

export function updateStudent(data) {
    return new Promise(async (resolve, reject) => {
        console.log("updateStudent: ", data);
        const response = await fetch(`${SERVER_URL}/api/student/`, {
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

export function deleteStudent(id) {
    return new Promise(async (resolve,reject) => {
        console.log("Deleting sync: ", id)
        const response = await fetch(`${SERVER_URL}/api/student/` + id, {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' },
        })
        console.log("delete updated,", id);
        const result = await response.json()
        if (result.status) {
            resolve(result.data);
        } else {
            reject(result.message);
        }
    });
}