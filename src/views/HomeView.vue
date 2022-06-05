<template>
  <div class="home">
    <img style="width: 70px;" alt="Vue logo"
    src="../assets/logo-alpha-theta-02-new-46x40.png">
    <h1>Tracks</h1>
    <div v-if="!tracks.length">
      No Tracks :( please add from <a @click="editTrack(null)" style="color: #42b983; cursor: pointer;">here</a>
    </div>

    <article>
      <div class="wrap">
        <div style="left: 37em;" class="search">
            <input type="text" v-model="nameSearch" class="searchTerm"
            placeholder="Name" autocomplete="off">
            <button type="submit" class="searchButton">
              <img style="width: 20px;" src="../assets/322497_search_icon.png" alt="">
          </button>
        </div>
        <div style="left: 37em;" class="search">
            <input type="number" v-model.number="durationSerach" class="searchTerm"
            placeholder="Duration" autocomplete="off">
            <button type="submit" class="searchButton">
              <img style="width: 20px;" src="../assets/322497_search_icon.png" alt="">
          </button>
        </div>
        <div style="left: 37em;" class="search">
            <input type="text" v-model="performerSearch" class="searchTerm"
            placeholder="Performer" autocomplete="off">
            <button type="submit" class="searchButton">
              <img style="width: 20px;" src="../assets/322497_search_icon.png" alt="">
          </button>
        </div>
        <div style="left: 37em;" class="search">
            <input type="text" v-model="arrangerSearch" class="searchTerm"
            placeholder="Arranger" autocomplete="off">
            <button type="submit" class="searchButton">
              <img style="width: 20px;" src="../assets/322497_search_icon.png" alt="">
          </button>
        </div>
        <div style="left: 37em;" class="search">
            <input type="text" v-model="typeSearch" class="searchTerm"
            placeholder="Type" autocomplete="off">
            <button type="submit" class="searchButton">
              <img style="width: 20px;" src="../assets/322497_search_icon.png" alt="">
          </button>
        </div>
    </div>
   </article>

    <div v-if="filteredTracks.length" style="display: flex; width: 800px; margin: 0 auto; background: #CCC;
    padding: 20px 0px; color: white">
      <div class="w-150">Name</div>
      <div class="w-150">Duration</div>
      <div class="w-150">Perfromer</div>
      <div class="w-150">Writer</div>
      <div class="w-150">Arranged by</div>
      <div class="w-150">Type</div>
    </div>
    <div class="tracks-wrapper">
      <div v-for="(track, index) in filteredTracks" :style="{'background': index % 2 == 0 ? '#dbdbdb' : '#f0eded'}" class="single-track-row" :key="index">
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
        nameSearch: null,
        durationSerach: null,
        performerSearch: null,
        arrangerSearch: null,
        typeSearch: null,
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
    filteredTracks(){
      var res = this.tracks;
      if(!this.nameSearch && !this.durationSerach && !this.performerSearch && !this.arrangerSearch && !this.typeSearch){
        return this.tracks;
      }

      if(this.nameSearch){
         res = res.filter(x => x.name.toLowerCase()
      .includes(this.nameSearch.toLowerCase()))
      }
      if (this.durationSerach){
          res = res.filter(x => x.duration == this.durationSerach)
      }
      if(this.performerSearch){
         res = res.filter(x => x.performedBy?.toLowerCase()
      .includes(this.performerSearch.toLowerCase()))
      }
      if(this.arrangerSearch){
        res = res.filter(x => x.arrengedBy?.toLowerCase()
    .includes(this.arrangerSearch.toLowerCase()))
      }
      if(this.typeSearch){
        res = res.filter(x => x.trackType?.toLowerCase()
    .includes(this.typeSearch.toLowerCase()))
      }

      return res;
      
    }
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
<style>

body{
  background: #f2f2f2;
  font-family: 'Open Sans', sans-serif;
}

.search {
  width: 45%;
  position: relative;
  display: flex;
  margin-right: 10px;
}

.searchTerm {
  width: 100%;
  border: 3px solid #42b983 !important;
  border-right: none;
  padding: 5px !important;
  height: 20px;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: #9DBFAF;
  margin: unset !important;
}

.searchTerm:focus{
  color: #00B4CC;
}

.searchButton {
  width: 40px;
  height: 36px;
  border: 1px solid #42b983;
  background: #42b983;
  text-align: center;
  color: #fff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;
}

/*Resize the wrap to see the search bar change!*/
.wrap{
  width: max-content;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  margin: 0 auto;
}
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
