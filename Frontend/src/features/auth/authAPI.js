// A mock function to mimic making an async request for data
export function createUser(data) {
  return new Promise(async (resolve,reject) =>{
    console.log("data sync: ", data )
    const response = await fetch('https://soefia-production.onrender.com/auth/signup',{
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'content-type': 'application/json' },
  })
    const result = await response.json()
    if(result.status){
      resolve(result.user)
    }else{
      reject(result.message)
    }
    
});
}

export function loginVerify(data){
  return new Promise(async (resolve,reject) => {
    console.log("checkingdata: ",data);
    const response = await fetch('https://soefia-production.onrender.com/auth/login',{
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'content-type': 'application/json' },
  })
    const result = await response.json()
    console.log("login response: ", result)
    if(result.status){
      resolve(result.user)
    }else{
      reject(result.message)
    }
  })
}

export function fetchUser(){
  return new Promise(async (resolve,reject)=>{
    const response = await fetch('https://soefia-production.onrender.com/auth/login/success', {
      method: 'GET', 
      credentials: 'include'
    });
    const result = await response.json()
    console.log("google", result)
    if(result.status){
      resolve(result.user)
    }else{
      reject(result.message)
    }
  })
}

export function signOut(userId) {
  return new Promise(async (resolve) => {
    // TODO: on server we will remove user session info
    resolve({ data: 'success' });
  });
}