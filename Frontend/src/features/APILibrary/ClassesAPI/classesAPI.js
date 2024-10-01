const SERVER_URL = import.meta.env.VITE_REACT_APP_SERVER_URL;

export function fetchClasses(data) {
    return new Promise(async (resolve,reject) => {
        const response = await fetch(`${SERVER_URL}/api/class?teacherId=${data.teacherId}`)
      
        console.log(`${SERVER_URL}/api/class?teacherId=${data.teacherId}`)
        const result = await response.json()
        if (result.success) {
            resolve(result.data);
        } else {
            reject(result.message);
        }
    });
}

export function createClasses(data) {
    return new Promise(async (resolve, reject) => {
        console.log("createClasses: ", data);
        const response = await fetch(`${SERVER_URL}/api/class/`, {
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

export function updateClasses(data) {
    return new Promise(async (resolve, reject) => {
        console.log("updateClasses: ", data);
        const response = await fetch(`${SERVER_URL}/api/class/`, {
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

export function deleteClasses(id) {
    return new Promise(async (resolve, reject) => {
        console.log("Deleting sync: ", id)
        const response = await fetch(`${SERVER_URL}/api/class/` + id, {
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