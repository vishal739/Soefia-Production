const SERVER_URL = import.meta.env.VITE_REACT_APP_SERVER_URL;

export function fetchAdmin(data) {
    return new Promise(async (resolve) => {
        const response = await fetch(`${SERVER_URL}/api/admin/`)
        const result = await response.json()
        resolve(({ result }))
    });
}

export function createAdmin(data) {
    return new Promise(async (resolve, reject) => {
        console.log("createAdmin: ", data);
        const response = await fetch(`${SERVER_URL}/api/admin/`, {
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

export function updateAdmin(data) {
    return new Promise(async (resolve, reject) => {
        console.log("updateAdmin: ", data);
        const response = await fetch(`${SERVER_URL}/api/admin/`, {
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

export function deleteAdmin(id) {
    return new Promise(async (resolve,reject) => {
        console.log("Deleting sync: ", id)
        const response = await fetch(`${SERVER_URL}/api/admin/` + id, {
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