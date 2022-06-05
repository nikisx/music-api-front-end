<template>
    <modal @close="$emit('close')" >
        <form @submit.prevent="submit" class="">
            <div class="container">
            <h1>Create Playlist</h1>
            <hr>

            <label for=""><b>Name</b></label>
            <input type="text" v-model="name" placeholder="Name" required>

            <label for="psw"><b>Public:</b></label>
            <select v-model="isPublic">
                <option :value="true">Public</option>
                <option :value="false">Private</option>
            </select>

            <button type="button" @click="submit" class="registerbtn">{{editAlbum ? 'Edit' : 'Create'}}</button>
        </div>
        
        </form>
    </modal>
</template>

<script>
import {post} from '../../request'
import Modal from '../Shared/Modal.vue';

export default {
    data() {
      return {
        id:0,
        name: null,
        duration: null,
        isPublic: null,
      };
    },
    props:{
        visible: {
            type: Boolean,
            default: false,
        },
        editPlaylist: {
            type: Object,
            default: null,
        },
    },
    watch:{
      
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
        resetData(){
            if(this.editPlaylist)
            {
                this.id = this.editPlaylist.id;
                this.name = this.editPlaylist.name;
                this.isPublic = this.editPlaylist.isPublic;
            }
            else{
                this.name = null;
                this.isPublic = true;
            }
            
        },
        submit(){
            let obj = {
                id: this.id,
                name: this.name,
                isPublic: this.isPublic,
            }

            let url = this.editPlaylist ? '/playlist/edit-playlist' :'/playlist/create-playlist';

            post(url,obj)
            .then(res => {
                if(res.data.success){
                    this.$emit('close');
                    this.$emit("getAllPlaylists", res.data.data);
                    this.$router.push({name: 'playlists'});
                }
            })
            .catch(e => {alert(e.message)})
        },
    }
}
</script>

<style>

</style>