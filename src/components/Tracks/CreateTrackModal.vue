<template>
    <modal @close="$emit('close')" >
        <form @submit.prevent="submit" class="">
            <div class="container">
            <h1>Create Track</h1>
            <hr>

            <label for="email"><b>Name</b></label>
            <input type="text" v-model="name" placeholder="Name" name="text" id="Username" required>

            <label for="psw"><b>Written By</b></label>
            <input type="text" v-model="writtenBy" placeholder="Written By" name="psw" id="psw" >

            <label for="psw"><b>Performed By</b></label>
            <input type="text" v-model="performedBy" placeholder="Performed By" name="psw" id="psw" >

             <label for="psw"><b>Arranged By</b></label>
            <input type="text" v-model="arrangedBy" placeholder="Arranged By" name="psw" id="psw" >

            <label for="psw"><b>Duration</b></label>
            <input  type="number" min="0.3" step="0.01" v-model="duration" placeholder="Duration" name="psw" id="psw" >
            
            <label for="psw"><b>Type</b></label>
            <select v-model="type">
                <option value="0">Recording</option>
                <option value="1">Live perfromance</option>
                <option value="2">Film music</option>
                <option value="3">Background music</option>
            </select>

            <label for="psw"><b>Album</b></label>
            <select v-model="albumId">
                <option selected value=""></option>
                <option v-for="(album, index) in albums" :key="index" :value="album.id">{{album.name}}</option>
            </select>
            <hr>

            <button type="button" @click="submit" class="registerbtn">{{editTrack ? 'Edit' : 'Create'}}</button>
        </div>
        
        </form>
    </modal>
</template>

<script>
import {post, get} from '../../request'
import Modal from '../Shared/Modal.vue';

export default {
    data() {
      return {
        id:0,
        name: null,
        duration: null,
        writtenBy: null,
        arrangedBy: null,
        performedBy: null,
        type: null,
        albumId: null,
        albums: [],
      };
    },
    props:{
        visible: {
            type: Boolean,
            default: false,
        },
        editTrack: {
            type: Object,
            default: null,
        },
    },
    watch:{
      visible: function(){
          if(this.visible){
              this.getAllAlbums();
          }
      },
    },
    updated(){
        if(this.visible){
            this.resetData();
        }
    },
    components:{
        Modal,
    },
    methods:{
        getAllAlbums(){
            get('/album/get-all').then(res => {
                if(res.data.success){
                    this.albums = res.data.data;
                    }
                })
        },
        resetData(){
            if(this.editTrack)
            {
                this.id = this.editTrack.id;
                this.name = this.editTrack.name;
                this.duration = this.editTrack.duration;
                this.writtenBy = this.editTrack.writtenBy;
                this.arrangedBy = this.editTrack.arrengedBy;
                this.performedBy = this.editTrack.performedBy;
                this.type = this.editTrack.type;
                this.albumId = this.editTrack.albumId;
            }
            else{
                this.name = null;
                this.duration = null;
                this.writtenBy = null;
                this.arrangedBy = null;
                this.performedBy = null;
                this.type = null;
                this.albumId = null;
            }
            
        },
        submit(){
            let obj = {
                id: this.id,
                name: this.name,
                duration: this.duration,
                writtenBy: this.writtenBy,
                arrengedBy: this.arrangedBy,
                performedBy: this.performedBy,
                type: parseInt(this.type),
                albumId: parseInt(this.albumId),
            }

            let url = this.editTrack ? '/track/edit-track' :'/track/create-track';

            post(url,obj)
            .then(res => {
                if(res.data.success){
                    this.$emit('close');
                    this.emitter.emit("updateTracks", res.data.data);
                    this.$router.push({name: 'home'});
                }
            })
            .catch(e => {alert(e.message)})
        },
    }
}
</script>

<style>

</style>