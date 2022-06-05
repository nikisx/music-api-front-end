<template>
   <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/albums">Albums</router-link>|
    <router-link to="/playlists">Playlists</router-link>|
    <router-link v-if="!user" to="/login">Login |</router-link>
    <router-link v-if="!user" to="/register">Register</router-link>
    <a v-if="user">Hello {{user.userName}} |</a>
    <a v-if="user" @click="showModal(null)">Create Track!|</a>
    <a v-if="user" @click="logout" >Logout</a>
  </nav>
   <create-track-modal v-bind="isModalVisible" :editTrack="editTrack" :visible="isModalVisible"  @close="closeModal" v-show="isModalVisible"></create-track-modal>
</template>

<script>
import CreateTrackModal from '../Tracks/CreateTrackModal.vue'
export default {
    data() {
      return {
        isModalVisible: false,
        editTrack: null,
      };
    },
    computed:{
    user(){
      return this.$store.state.user;
    }
  },
  created(){
    this.emitter.on("editTrack", track => {
       this.showModal(track);
    });
  },
  components:{
      CreateTrackModal,
  },
  methods:{
      showModal(track) {
         if(!this.user)
          {
            this.$router.push({name: 'login'})
            return;
          }
        this.isModalVisible = true;
        this.editTrack = track;
      },
      closeModal() {
        this.isModalVisible = false;
        this.editTrack = null;
      },
      logout(){
          this.$store.commit('setUser', null)
          localStorage.removeItem('user')
      }
  }
}
</script>

<style>

</style>