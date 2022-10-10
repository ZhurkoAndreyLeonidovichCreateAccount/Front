<template>
<div class="d-flex justify-content-center flex-direction: center">
    <h1>{{error}}</h1>
</div>  
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    computed:{
        ...mapGetters('concerts',['error'])
    }
}
</script>
<style scoped>


</style>