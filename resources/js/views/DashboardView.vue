<template>
<router-link to="/">Home</router-link> &nbsp;
  <router-link to="/userlist">User</router-link> &nbsp;
  <router-link to="/login">Login</router-link> &nbsp;
  <router-link to="/purcheses">Purcheses</router-link> &nbsp;
<h1>this is dash board</h1>
<button @click="logout">logout</button>
<button @click="getUser">getuser</button>
</template>

<script>
import { mapActions } from 'vuex';
export default {

// data: ()=>{

// },
computed:{
loggedIn:{
    get(){
        const d= this.$store.state.CurrentUser
        console.log(d)
    }
}
},
methods: {
logout(){
    this.$store.dispatch("CurrentUser/logout")
},
getUser() {
    this.$store.dispatch("CurrentUser/getUser")
            },
}
    }
</script>
