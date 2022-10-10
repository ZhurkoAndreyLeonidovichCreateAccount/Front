<template>
<div class="d-flex justify-content-center flex-direction: center">
    <h1 class="text-success">{{success}}</h1>
</div>  
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    computed:{
        ...mapGetters('concerts',['success'])
    }
}
</script>
<style scoped>


</style>