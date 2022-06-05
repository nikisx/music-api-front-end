<template>
  <div class="home">
      <h1>Playlists</h1>
      <a v-if="user" @click="showModal(null)" class="create-btn">Create
      playlist</a>
      <div v-if="!playlists.length">
      No playlists :( please add from <a @click="showModal(null)" style="color: #42b983; cursor: pointer;">here</a>
    </div>
      <div v-if="playlists.length" style="display: flex; width: 500px; margin: 0 auto; background: #CCC;
    padding: 20px 0px; color: white ; margin-top: 20px;">
      <div class="w-150">Name</div>
      <div class="w-150">Duration</div>
      <div class="w-115">Tracks</div>
    </div>
     <div style=" width: 500px;" class="tracks-wrapper">
      <div v-for="(playlist, index) in playlists"
      @click="$router.push({name:'playlist', query: { id: playlist.id } })" 
      style="cursor: pointer" :style="{'background':
      index % 2 == 0 ? '#dbdbdb' : '#f0eded'}" class="single-track-row"
      :key="index">
        <b class="w-150">{{playlist.name}}</b>
        <div class="w-150">{{playlist.duration}}</div>
        <div class="w-150">{{playlist.trackCount}}</div>
         <img v-if="user && playlist.createdById == user.id" @click.stop="editPlaylist(playlist)"
         src="../../assets/Edit_icon_(the_Noun_Project_30184).png"
         style="width:20px; cursor: pointer; margin-left: 10px; height: 20px;"/>
         <img v-if="user && playlist.createdById == user.id" @click.stop="openDeleteModal(playlist)"
         src="../../assets/icon-delete-16.jpg"  style="width:20px; cursor: pointer;
         margin-left: 10px; height: 20px;"/>
      </div>
    </div>
    <create-playlist-modal :visible="isModalVisible" v-show="isModalVisible"
    @close="isModalVisible=false" @getAllPlaylists='getAllPublicPlaylists' :editPlaylist="currentPlaylist"></create-playlist-modal>
    <delete-modal :visible="isDeleteModalVisible" v-show="isDeleteModalVisible" @close="isDeleteModalVisible=false" @success='getAllPublicPlaylists' :item="deleteItem"></delete-modal>
  </div>
</template>

<script>
import {get} from '../../request'
import CreatePlaylistModal from './CreatePlaylist.vue'
import DeleteModal from '../../components/Shared/DeleteModal.vue'

export default {
    data(){
        return {
            playlists: [],
            currentPlaylist: null,
            isModalVisible: false,
            deleteItem: null,
            isDeleteModalVisible: false,
        }
    },
    components:{
        CreatePlaylistModal,
        DeleteModal,
    },
    computed:{
    user(){
      return this.$store.state.user;
    },
  },
  created(){
      this.getAllPublicPlaylists();
  },
  methods:{
      openDeleteModal(playlist){
           let item = {
                id: playlist.id,
                name: 'playlist',
                url: '/playlist/delete'
            }

        this.deleteItem = item;
        this.isDeleteModalVisible = true;
      },
      editPlaylist(playlist){
           this.isModalVisible = true;
           this.currentPlaylist = playlist
      },
      showModal(playlist) {
          if(!this.user)
        {
            this.$router.push({name: 'login'})
            return;;
        }
        this.isModalVisible = true;
        this.currentPlaylist = playlist
      },
      closeModal() {
        this.isModalVisible = false;
        this.editAcurrentPlaylistlbum = null;
      },
      getAllPublicPlaylists(){
          get('/playlist/get-all')
          .then(response => {
              if(response.data.success){
            this.playlists = response.data.data;
          }
          })
      }
  },
}
</script>

<style>

</style>