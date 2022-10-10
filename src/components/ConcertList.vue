<template>
    <div class="container">
        <div class="row">                 
           <div class="col-lg-3 col-md-4 col-sm-6 mb-4" v-for="item in consertList" :key="item.Id">
                <div class="card" >
                     <router-link :to="{ name: 'concert', params: { id: item.id } }" >
                       <!--  <img :src="require(`../assets/${item.image}`)" class="card-img-top"  alt="No"> -->
                       <img :src="getImgUrl(item.image)" class="card-img-top" alt="No image"> 
                    </router-link>      
                  
                </div>
                <div class="text-block">
                <div class="cen" >   
                    <p>{{item.namePerformer}}</p>  
                </div>  
                </div>
                <div class="cen" >
                    <a class="btn btn-success my-btn " >
                            Подробнее
                    </a>
                </div>
            </div>    
        </div> 
    </div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';
    
	export default {
        data() {
            return{
                search: ''
            }
        },    
		computed: {
		...mapGetters('concerts', {consertList :'filteredEvent'}),
        },
           
		methods:{
           
          getImgUrl: function (img) { 
             try{ 
                return require('../assets/' + img);
             } catch {
               
             }
           
  }
        },
        
	}
     
</script>

<style>
.measure {
    width: 250px;
    height: 400px;
}
.cart {
    margin-right: 100px;
    margin-bottom: 10px;
}
.cen {
    text-align: center;
    font-size: 20px;
    width: 100%;
}
.text-block {
    background-color: rgb(8, 3, 37);
    color:white;
    padding: 5px;
    height: 100px;
    width: 100%;
    display: flex;
    align-items: center; /*Центрирование по вертикали*/
}
.my-btn {
    font-size: 20px;
    width: 100%;
    min-height: 50px;
}
</style>
