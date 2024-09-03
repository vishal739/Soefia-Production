// A mock function to mimic making an async request for data
const SERVER_URL=import.meta.env.VITE_REACT_APP_SERVER_URL;
export function createUser(data) {
  return new Promise(async (resolve, reject) => {
    console.log("data sync: ", data);
    const response = await fetch(`${SERVER_URL}/api/auth/signup`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'content-type': 'application/json' },
    });
    const result = await response.json();
    if (result.status) {
      resolve(result.user);
    } else {
      reject(result.message);
    }
  });
}

export function loginVerify(data) {
  return new Promise(async (resolve, reject) => {
    console.log("checking data: ", data);
    const response = await fetch(`${SERVER_URL}/api/auth/login`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'content-type': 'application/json' },
    });
    const result = await response.json();
    console.log("login response: ", result);
    if (result.status) {
      resolve(result.user);
    } else {
      reject(result.message);
    }
  });
}

export function fetchUser() {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`${SERVER_URL}/api/auth/login/success`, {
      method: 'GET',
      credentials: 'include',
    });
    const result = await response.json();
    console.log("google", result);
    if (result.status) {
      resolve(result.user);
    } else {
      reject(result.message);
    }
  });
}

export function signOut(userId) {
  return new Promise(async (resolve) => {
    // TODO: on server we will remove user session info
    resolve({ data: 'success' });
  });
}
