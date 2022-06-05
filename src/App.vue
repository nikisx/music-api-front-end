<template>
  <nav-bar></nav-bar>
  <router-view/>
</template>
<script>
import NavBar from './components/Navigation/Navbar.vue';

export default({
 components: {
   NavBar,
 },
  created(){
    this.$store.dispatch('setCurrentUser');
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-family: Arial, Helvetica, sans-serif;
}

nav {
  padding: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.app-page {
  max-width: 700px;
}
</style>
