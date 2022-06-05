<template>
    <modal @close="$emit('close')" >
        <form @submit.prevent="submit" class="">
            <div class="container">
            <h1>Create Album</h1>
            <hr>

            <label for=""><b>Name</b></label>
            <input type="text" v-model="name" placeholder="Name" required>

            <label for=""><b>Year</b></label>
            <input type="number" v-model="year" placeholder="Year"  required>

            <label for=""><b>Image</b></label>
            <input type="url" v-model="imageUrl" placeholder="Url"  required>

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
        year: null,
        imageUrl: null,
      };
    },
    props:{
        visible: {
            type: Boolean,
            default: false,
        },
        editAlbum: {
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
            if(this.editAlbum)
            {
                this.id = this.editAlbum.id;
                this.name = this.editAlbum.name;
                this.year = this.editAlbum.year;
                this.imageUrl = this.editAlbum.imageUrl;
            }
            else{
                this.name = null;
                this.year = null;
                this.imageUrl = null;
            }
            
        },
        submit(){
            let obj = {
                id: this.id,
                name: this.name,
                year: parseInt(this.year),
                imageUrl: this.imageUrl,
            }

            let url = this.editAlbum ? '/album/edit-album' :'/album/create-album';

            post(url,obj)
            .then(res => {
                if(res.data.success){
                    this.$emit('close');
                    this.$emit("updateAlbums", res.data.data);
                    this.$router.push({name: 'albums'});
                }
            })
            .catch(e => {alert(e.message)})
        },
    }
}
</script>

<style>

</style>