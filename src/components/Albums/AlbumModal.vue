<template>
    <modal @close="$emit('close')">
        <h1>{{album.name}} - {{album.duration}}</h1>
        <img :src="album.imageUrl" class="album-cover" alt="">
        <section class="album-tracks-wrapper">
            <div v-for="(track, index) in album.tracks" 
            style="display: flex; justify-content: space-between; margin: 15px;border-bottom: 2px solid #cccc;" :key="index">
                <p>{{track.name}}</p>
                <p>{{track.duration}}</p>
            </div>
        </section>
    </modal>
</template>

<script>
import Modal from '../Shared/Modal.vue';

export default {
     props:{
        visible: {
            type: Boolean,
            default: false,
        },
        album: {
            type: Object,
            default: null,
        },
    },
    components:{
        Modal,
    }
}
</script>

<style>
    .album-cover{
        border-radius: 10px;
        max-width: 400px;
        margin: 0 auto;
    }
</style>