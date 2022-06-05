<template>
  <div class="home">
    <img style="width: 70px;" alt="Vue logo"
    src="../assets/logo-alpha-theta-02-new-46x40.png">
    <h1>Tracks</h1>
    <div v-if="!tracks.length">
      No Tracks :( please add from <a @click="editTrack(null)" style="color: #42b983; cursor: pointer;">here</a>
    </div>
    <div v-if="tracks.length" style="display: flex; width: 800px; margin: 0 auto; background: #CCC;
    padding: 20px 0px; color: white">
      <div class="w-115">Name</div>
      <div class="w-115">Duration</div>
      <div class="w-115">Perfromer</div>
      <div class="w-115">Writer</div>
      <div class="w-115">Arranged by</div>
      <div class="w-115">Type</div>
    </div>
    <div class="tracks-wrapper">
      <div v-for="(track, index) in tracks" :style="{'background': index % 2 == 0 ? '#dbdbdb' : '#f0eded'}" class="single-track-row" :key="index">
        <b class="w-150">{{track.name}}</b>
        <div class="w-150">{{track.duration}}</div>
        <div class="w-150">{{track.performedBy}}</div>
        <div class="w-150">{{track.writtenBy}}</div>
        <div class="w-150">{{track.arrengedBy}}</div>
         <div class="w-150">{{track.trackType}}</div>
         <img v-if="user && track.createdById == user.id" @click="editTrack(track)"
         src="../assets/Edit_icon_(the_Noun_Project_30184).png"
         style="width:20px; cursor: pointer; margin-left: 10px; height: 20px;"/>
         <img v-if="user && track.createdById == user.id" @click="openDeleteModal(track)"
         src="../assets/icon-delete-16.jpg"  style="width:20px; cursor: pointer;
         margin-left: 10px; height: 20px;"/>
          <img v-if="user" @click="addTrackToPlaylist(track.id)"
         src="../assets/plus-321.png"  style="width:20px; cursor: pointer;
         margin-left: 10px; height: 20px;"/>
      </div>
    </div>
    <delete-modal :visible="isDeleteModalVisible" v-show="isDeleteModalVisible"
    @close="isDeleteModalVisible=false" @success='getAllTracks' :item="deleteItem"></delete-modal>
  </div>
    <add-to-playlist :visible="isAddToPlaylistModalVisible"
    v-show="isAddToPlaylistModalVisible"
    @close="isAddToPlaylistModalVisible=false" :trackId="trackId"></add-to-playlist>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import Modal from '../components/Shared/Modal.vue';
import DeleteModal from '../components/Shared/DeleteModal.vue';
import AddToPlaylist from '../components/Tracks/AddTrackToPlaylistModal.vue';

import{get} from '../request'

export default {
  name: 'HomeView',
   data() {
      return {
        isAddToPlaylistModalVisible: false,
        trackId: null,
        isModalVisible: false,
        deleteItem: null,
        isDeleteModalVisible: false,
        tracks: [],
      };
    },
   components: {
    HelloWorld,
    Modal,
    DeleteModal,
    AddToPlaylist,
    },
  computed:{
    user(){
      return this.$store.state.user;
    },
  },
  created(){
    this.getAllTracks();
  },
  mounted() { 
    this.emitter.on("updateTracks", tracks => {
      this.tracks = tracks;
    });
  },
  methods: {
    addTrackToPlaylist(id){
      this.isAddToPlaylistModalVisible = true;
      this.trackId = id;
    },
      openDeleteModal(track){
        let item = {
          id: track.id,
          name: 'track',
          url: '/track/delete'
        }

        this.deleteItem = item;
        this.isDeleteModalVisible = true;
      },
      editTrack(track){
         this.emitter.emit("editTrack", track);
      },
      getAllTracks(){
        get('/track/get-all')
        .then(res => {
          if(res.data.success){
            this.tracks = res.data.data;
          }
        })
      },
      showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      }
    },
}
</script>
<style >
.tracks-wrapper{
  max-width: 800px;
  margin: 0 auto;
}
.single-track-row{
  display: flex;
  padding: 15px;
}
.w-150{
  width: 150px;
  max-width: 150px;

}
.w-115{
   width: 115px;
  max-width: 115px;
}
</style>
