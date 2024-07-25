import axios from "axios";

const state ={
    user:{
    },
    token: "",
};
const getters={};
const actions={
    loginUser({},user){
        axios
        .post("/api/login",{
            email: user.email,
            password: user.password
        })
        .then(response=>{
            const token=response.data.data.token
            // console.log(response.data.data.token)

            if(token){
                sessionStorage.setItem('redhelal', token);
                 //localStorage.setItem('redhelal', token);
                console.log(response.data.data.user.name)
            }
            window.location.replace('/')
        })
    },
    // logout(user){
    //     axios
    //     .post("/api/logout",{
    //         email: user.email,
    //         password: user.password
    //     })
    //     .then(response=>{
    //         const token=response.data.data.token
    //         // console.log(response.data.data.token)

    //         if(token){
    //             sessionStorage.setItem('redhelal', token);
    //             // localStorage.setItem('redhelal', token);
    //             console.log(response.data.data.user.name)
    //         }
    //         window.location.replace('/')
    //     })
    // }
};
const mutations={};
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
