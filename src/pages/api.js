const baseUrl = import.meta.env.VITE_BE_URL;

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

export {userLogin,userRegister};