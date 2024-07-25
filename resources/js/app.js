import "./bootstrap";
import { createApp } from "vue";
import router from './routes/index';
import  store  from './store'
const app=createApp()
app.use(router)
app.use(store)

app.mount("#app");

