<template>
  <modal @close="$emit('close')">
      <form style="margin-top: 130px;"  class="">
            <div class="container">
            <label><b>Playlist:</b></label>
            <select v-model="playlistsId">
                <option selected value=""></option>
                <option v-for="(playlist, index) in playlists" :key="index" :value="playlist.id">{{playlist.name}}</option>
            </select>

            <button type="button" @click="submit" class="registerbtn">Add</button>
        </div>
      </form>
  </modal>
</template>

<script>
import {post, get} from '../../request'
import Modal from '../Shared/Modal.vue';

export default {
    props:{
        visible: {
            type: Boolean,
            default: false,
        },
        trackId: {
            type: Number,
            default: null,
        },
    },
    data(){
        return {
            playlists: [],
            playlistsId: null,
        }
    },
    components:{
        Modal,
    },
    computed:{
        user(){
            return this.$store.state.user;
        }
    },
    created(){
        this.getAllPublicPlaylists();
    },
    methods:{
        submit(){
            let form = new FormData();
            form.append('trackId', this.trackId);
            form.append('playlistId', this.playlistsId);

            let url ='/playlist/add-track-to-playlist';

            post(url,form)
            .then(res => {
                if(res.data.success){
                    this.$emit('close');
                }
                else{
                    alert(res.data.message)
                }
            })
            .catch(e => {alert(e.message)})
        },
        getAllPublicPlaylists(){
          get('/playlist/get-all')
          .then(response => {
              if(response.data.success){
                this.playlists = response.data.data.filter(x => x.createdById == this.user.id);
          }
          })
      }
    },
}
</script>

<style>

</style>