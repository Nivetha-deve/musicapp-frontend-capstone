const baseUrl = import.meta.env.VITE_BE_URL;

const getToken = () => {
    return localStorage.getItem("token");
  }

    const userLogin = async(data) => {
           const response = await fetch(`${baseUrl}/api/auth/login`, {
            body: JSON.stringify(data),
            method: "POST",
           headers: {
               "Content-Type": "application/json; charset=utf-8",
            },
           });
        return  await response.json();
    
        };

const userRegister = async (data) => {
    const response = await fetch(`${baseUrl}/api/auth/register`, {
            body: JSON.stringify(data),
            method: "POST",
    headers: {
                 "Content-Type": "application/json; charset=utf-8",
             },
        });
        return await response.json();
};
const updateUser = async (userEmail,data) => {
    const response = await fetch (`${baseUrl}/api/user/${userEmail}`, {
         body:JSON.stringify(data),
         method: "PUT",
         headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization : getToken(),
         },
    });
    if (response.status !== 200 && response.status !== 204){
      throw new Error("Unauthorizes Entry")
    }
    return await response.json();
  };

export {userLogin,userRegister,updateUser};