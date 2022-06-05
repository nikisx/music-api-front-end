<template>
  <h1 style="text-align: center">Register Page</h1>
  <form @submit.prevent="submit" class="">
      <div class="container">
    <h1>Register</h1>
    <p>Please fill in this form to create an account.</p>
    <hr>

     <label for="email"><b>Username</b></label>
    <input type="text" v-model="username" placeholder="Username" name="text" id="Username" required>

    <label for="email"><b>Email</b></label>
    <input type="text" v-model="email" placeholder="Enter Email" name="email" id="email" required>

    <label for="psw"><b>Password</b></label>
    <input type="password" v-model="password" placeholder="Enter Password" name="psw" id="psw" required>

    <label for="psw-repeat"><b>Repeat Password</b></label>
    <input type="password" v-model="repeatedPass" placeholder="Repeat Password" name="psw-repeat" id="psw-repeat" required>
    <hr>
    <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>

    <button type="submit" class="registerbtn">Register</button>
  </div>
  
  <div class="container signin">
    <p>Already have an account? <router-link to="/login">Login</router-link>|.</p>
  </div>
  </form>
</template>

<script>
export default {
  data() {
    return{
      username: null,
      password: null,
      email: null,
      repeatedPass: null,
    }
  },
  methods:{
    submit(){
      if(this.password != this.repeatedPass){
        alert("Please confirm password!");
        return;
      }

      let obj = {
        username: this.username,
        password: this.password,
        email: this.email,
      }
        
        this.$http.post('https://localhost:44356/api/authenticate/register', obj).then((response) => {
        if(response.data.success){
          alert(response.data.message)
          this.$router.push({name:'login'})
        }
      })
    }
  }
}
</script>

<style scoped>
label{
  display: block;
}
/* Add padding to containers */
.container {
  padding: 16px;
  background-color: white;
  max-width: max-content;
  margin: 0 auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

/* Full-width input fields */
input[type=text], input[type=password] {
  width: 92%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type=text]:focus, input[type=password]:focus {
  background-color: #ddd;
  outline: none;
}

/* Overwrite default styles of hr */
hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

/* Set a style for the submit button */
.registerbtn {
  background-color: #04AA6D;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

.registerbtn:hover {
  opacity: 1;
}

/* Add a blue text color to links */
a {
  color: dodgerblue;
}

/* Set a grey background color and center the text of the "sign in" section */
.signin {
  background-color: #f1f1f1;
  text-align: center;
}
</style>