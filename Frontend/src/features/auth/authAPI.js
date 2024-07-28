// A mock function to mimic making an async request for data
export function createUser(data) {
  return new Promise(async (resolve) =>{
    console.log("data sync: ", data )
    const response = await fetch('http://localhost:8080/users/',{
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'content-type': 'application/json' },
  })
    const result = await response.json()
    resolve(({data}))
});
}

export function checkUser(data){
  return new Promise(async (resolve,reject) => {
    console.log("checkingdata: ",data);
    const loginMail= data.email;
    const loginPass= data.password;
    const response = await fetch('http://localhost:8080/users?email='+loginMail);
    const result = await response.json()
    console.log("response: ",result);

    if(result.length!=0){
      if(result[0].password==loginPass){
        console.log("password matched",result[0]);
        resolve({data: result[0]})
      }else{
        reject("Invalid Password");
      }
    }else{
      reject("user not found");
    }
  })
}

export function signOut(userId) {
  return new Promise(async (resolve) => {
    // TODO: on server we will remove user session info
    resolve({ data: 'success' });
  });
}