<template>
  <router-link to="/">Home</router-link> &nbsp;
  <router-link to="/userlist">User</router-link> &nbsp;
  <router-link to="/login">Login</router-link> &nbsp;
  <router-link to="/purcheses">Purcheses</router-link> &nbsp;
  <h1>Login VueSchool Rocks! 🤘</h1>
  <div class="container row">
    <div class="col-4"></div>
    <div class="col-4">
      <div>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            v-model="user.email"
          />
          <small id="emailHelp" class="form-text text-muted"
            >We'll never share your email with anyone else.</small
          >
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            v-model="user.password"
          />
        </div>

        <button type="submit" @click="login()" class="btn btn-primary">Submit</button>
      </div>
    </div>
    <div class="col-4"></div>
  </div>
  <button @click="getUser">getuser</button>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data: () => ({
    user: {
      email: "",
      password: "",
    },
  }),
  methods:{
// ...mapActions(

// ),
    login(){
        this.$store.dispatch('CurrentUser/loginUser', this.user)
    },
    getUser() {
    //const token=sessionStorage.getItem("redhelal")
            return axios
                .get('/api/user')
                .then(({ data }) => {
                    console.log(data);
                })
            },
  },
};
</script>
