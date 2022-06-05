<template>
  <div class="home">
      <h1>Albums</h1>
      <a v-if="user" @click="showModal(null)" class="create-btn">Create
      Album</a>
      <div v-if="!albums.length">
      No Albums :( please add from <a @click="showModal(null)" style="color: #42b983; cursor: pointer;">here</a>
    </div>
      <section class="albums-wrapper">
        <div @click="openAlbumModal(album)" v-for="(album, index) in albums" :key="index" class="polaroid">
          <img :src="album.imageUrl" style="width:100%">
          <div class="container">
              <img v-if="user && album.createdById == user.id" @click.stop="showModal(album)"
              src="../../assets/Edit_icon_(the_Noun_Project_30184).png"
              style="width:20px; cursor: pointer; margin-left: 10px;"/>
            <p>{{album.name}} 
            <img v-if="user && album.createdById == user.id" @click.stop="openDeleteModal(album)"
            src="../../assets/icon-delete-16.jpg"  style="width:20px; cursor: pointer; margin-left: 10px;"/>
         </p>
         <p>{{album.tracks.length}}</p>
          </div>
        </div>
      </section>
  </div>
  <create-album-modal v-bind="isModalVisible" :editAlbum="editAlbum"
  :visible="isModalVisible" @updateAlbums="getAllAlbums"  @close="closeModal"
  v-show="isModalVisible"></create-album-modal>
 <delete-modal :visible="isDeleteModalVisible" v-show="isDeleteModalVisible"
    @close="isDeleteModalVisible=false" @success='getAllAlbums' :item="deleteItem"></delete-modal>
  <album-modal :visible="isAlbumModalVisible" v-if="isAlbumModalVisible"
    @close="isAlbumModalVisible=false" :album="currentAlbum"></album-modal>
</template>

<script>
import CreateAlbumModal from './CreateAlbumModal.vue';
import DeleteModal from '../../components/Shared/DeleteModal.vue'
import AlbumModal from './AlbumModal.vue'

import{get} from '../../request'

export default {
  data(){
    return {
      isModalVisible: false,
      isDeleteModalVisible: false,
      isAlbumModalVisible: false,
      deleteItem: null,
      editAlbum: null,
      albums: [],
      currentAlbum: null,
    }
  },
  components:{
    CreateAlbumModal,
    DeleteModal,
    AlbumModal,
  },
  computed:{
    user(){
      return this.$store.state.user;
    },
  },
  created(){
    this.getAllAlbums();
  },
  methods:{
    openAlbumModal(album){
      this.isAlbumModalVisible = true;
      this.currentAlbum = album;
    },
    openDeleteModal(album){
        let item = {
          id: album.id,
          name: 'album',
          url: '/album/delete'
        }

        this.deleteItem = item;
        this.isDeleteModalVisible = true;
      },
    getAllAlbums(){
      get('/album/get-all').then(res => {
          if(res.data.success){
            this.albums = res.data.data;
          }
        })
    },
    showModal(album) {
      if(!this.user)
      {
        this.$router.push({name: 'login'})
        return;
      }
        this.isModalVisible = true;
        this.editAlbum = album
      },
      closeModal() {
        this.isModalVisible = false;
        this.editAlbum = null;
      },
  },
}
</script>

<style>
  .create-btn{
    padding: 10px 20px;
    border-radius: 10px;
    background: #04AA6D;
    color: white;
    cursor: pointer;
  }
    .create-btn:hover{
      background: #3dedac;
    }
    div.polaroid {
  width: 250px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  text-align: center;
  cursor: pointer;
}

div.container {
  padding: 10px;
}
.albums-wrapper{
  max-width: 1200px;
    margin: 0 auto;
    margin-top: 40px;
    flex-wrap: wrap;
    display: flex;
    justify-content: space-around;
}
</style>