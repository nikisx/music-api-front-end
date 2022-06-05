<template>
  <section class="home">
      <h1>{{playlist.name}} - {{playlist.duration}}</h1>
      <div style="display: flex; width: 800px; margin: 0 auto; background: #CCC;
    padding: 20px 0px; color: white">
      <div class="w-115">Name</div>
      <div class="w-115">Duration</div>
      <div class="w-115">Perfromer</div>
      <div class="w-115">Writer</div>
      <div class="w-115">Arranged by</div>
      <div class="w-115">Type</div>
    </div>
      <div class="tracks-wrapper">
      <div v-for="(track, index) in playlist.tracks" :style="{'background': index % 2 == 0 ? '#dbdbdb' : '#f0eded'}" class="single-track-row" :key="index">
        <b class="w-150">{{track.name}}</b>
        <div class="w-150">{{track.duration}}</div>
        <div class="w-150">{{track.performedBy}}</div>
        <div class="w-150">{{track.writtenBy}}</div>
        <div class="w-150">{{track.arrengedBy}}</div>
         <div class="w-150">{{track.trackType}}</div>
         <div>
             <img v-if="index != 0 && user && user.id == playlist.createdById" @click="changeTrackOrder(track.id, index - 1)" style="width: 8px; transform: rotate(-90deg); cursor: pointer" src="../../assets/pngegg.png" />
             <img v-if="index != playlist.tracks.length - 1 && user && user.id == playlist.createdById"  @click="changeTrackOrder(track.id, index + 1)" style="width: 8px;transform: rotate(90deg); cursor: pointer" src="../../assets/pngegg.png" />
         </div>
         <img v-if="user && playlist.createdById == user.id" @click="openDeleteModal(track)"
         src="../../assets/icon-delete-16.jpg"  style="width:20px; cursor: pointer;
         margin-left: 10px; height: 20px;"/>
      </div>
    </div>
     <delete-modal :isFormData="true" :visible="isDeleteModalVisible" v-show="isDeleteModalVisible" @close="isDeleteModalVisible=false" @success='getPlaylist' :item="deleteItem"></delete-modal>
  </section>
</template>

<script>
import {get, post} from '../../request'
import DeleteModal from '../../components/Shared/DeleteModal.vue'

export default {
    data(){
        return{
            playlist: null,
            isDeleteModalVisible: false,
            deleteItem: null,
        }
    },
    components:{
        DeleteModal
    },
    computed:{
        playlistId(){
            return this.$route.query.id;
        },
        user(){
            return this.$store.state.user;
        },
    },
    created(){
        this.getPlaylist();
    },
    methods:{
        openDeleteModal(track){
              let form = new FormData();
            form.append('trackId', track.id);
            form.append('playlistId', this.playlistId);

            let item = {
                    name: 'track',
                    url: '/playlist/remove-track',
                    data: form,
                }
           

            this.deleteItem = item;
            this.isDeleteModalVisible = true;
        },
        changeTrackOrder(trackId, position){
            let form = new FormData();
            form.append('trackId', trackId);
            form.append('position', position);
            form.append('playlistId', this.playlistId);
            
             post('/playlist/change-track-position', form)
                .then(res => {
                    if(res.data.success){
                        this.playlist = res.data.data;
                    }
                    else{
                        alert(res.data.message);
                    }
                })
        },
        getPlaylist(){
            get('/playlist/get-playlist' + '?id=' + this.playlistId)
                .then(res => {
                    if(res.data.success){
                        this.playlist = res.data.data;
                    }
                })
        }
    }
}
</script>

<style>

</style>