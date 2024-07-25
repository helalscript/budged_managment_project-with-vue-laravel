import axios from "axios";
import router from "@/routes";

const mutations = {};
export default {
    namespaced: true,
    state: {
        user: {},
        token: "",
        authenticated: false,
        profile: {},
        api: "http://127.0.0.1:8000/api",
        validationErrors: {}
    },
    getters: {
        authenticated(state) {
            return state.authenticated;
        },
        profile(state) {
            return state.profile;
        },
    },
    actions: {
        loginUser({ commit, state }, user) {
            axios
                .post(`${state.api}/login`, {
                    email: user.email,
                    password: user.password
                })
                .then(response => {
                    //const htoken=response.data.data.token
                    //sessionStorage.setItem('redhelal', htoken);
                    commit("SET_PROFILE", response.data.data);
                    commit("SET_AUTHENTICATED", true);
                    //window.location.replace('/purcheses')
                    // const redirectPath = (routes.query.redirect || '/');
                    // router.push(redirectPath);

                    router.push({ name: "purcheses" });
                })
        },

        getUser({ commit, state }) {
            return axios
                .get(`${state.api}/user`, {
                    headers: { Authorization: `Bearer ${state.token}` },
                })
                .then(({ data }) => {
                    console.log(data);
                })
                .catch(({ response: { data } }) => {
                    if (response.status === 422) {
                        state.validationErrors = response.data.data;
                    } else {
                        state.validationErrors = {};
                        commit("SET_PROFILE", {});
                        commit("SET_AUTHENTICATED", false);
                        router.push({ name: "home" });
                    }
                });
        },

        logout({ commit, state }) {
            axios.post(`${state.api}/logout`, null, {
                headers: { Authorization: `Bearer ${state.token}` },
            })
                .then((response) => {
                    commit("SET_PROFILE", {});
                    commit("SET_AUTHENTICATED", false);
                    sessionStorage.clear()
                    localStorage.clear()
                    function deleteCookie(laravel_session) {
                        document.cookie = `${laravel_session}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
                    };
                    router.push({ name: "login" })
                })
        },

    },
    mutations: {
        SET_AUTHENTICATED(state, value) {
            state.authenticated = value;
        },
        SET_PROFILE(state, value) {
            state.profile = value.profile;
            state.token = value.token;
        },
    }
}
