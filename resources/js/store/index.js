
import { createStore } from "vuex";
import CurrentUser from "./modules/CurrentUser";
import createPersistedState from "vuex-persistedstate";
const store= createStore(
    {
    modules:{
        CurrentUser
    },
    plugins:[
        createPersistedState(
            {
                storage:window.sessionStorage
            }
        )
    ]
}
)
export default store
