<template>
<nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div class="container-fluid" >
      <router-link to="/" class="navbar-brand">Home</router-link>
      <div v-if="user">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item me-2">
              <select  v-model="selected" class="my-select">
                  <option v-for="(item, index) in  typeArray" :key="index" :value ="index" >{{item}}</option>         
              </select> 
          </li>
          <li class="nav-item me-2">
              <input class="form-control " type="search" placeholder="Search" aria-label="Search" @input="setSearch">
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
             {{ user.username}}
            </a>
            <ul class="dropdown-menu" v-if="isAdmin">
              <li><router-link to="/addEvent/0" class="dropdown-item" >Add event</router-link></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a  @click="logout" href="#" class="dropdown-item">Logout</a></li>
            </ul>
            <ul class="dropdown-menu" v-else>
              <router-link to="/personalCab" class="dropdown-item" >Personal cabinet</router-link>
              <li><a  @click="logout" href="#" class="dropdown-item">Logout</a></li>
            </ul>
          </li>
        </ul>
          
      </div>

      <div v-else>
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item me-2">
              <select  v-model="selected" class="my-select">
                  <option v-for="(item, index) in  typeArray" :key="index" :value ="index" >{{item}}</option>         
              </select> 
          </li>
          <li class="nav-item me-2">
              <input class="form-control " type="search" placeholder="Search" aria-label="Search" @input="setSearch">
          </li>
       
          <li class="nav-item">
              <router-link to="/login" class="nav-link">Login</router-link>
          </li>
          <li class="nav-item">
              <router-link to="/register" class="nav-link">Register</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view/>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data() {
    return {
      selected: "0",
      typeArray:[
        'all type of event...', 'OpenAir', 'Classic', 'Party'         
      ]
    }
  },
  computed:{
   ...mapGetters('concerts', [ 'user' ,'error']),
    isAdmin(){
      return this.user.role==="admin"
    },
    isError(){
      return this.error.length>0
    }

   
  },

  watch:{
  selected() {
        let i = +this.selected 
        if(i===0){
          this.$store.commit("concerts/setFilterType", '')
        } else {
          this.$store.commit("concerts/setFilterType", this.typeArray[i])
        }  
        
        
      },
  },  
  methods: {
    setSearch(e) {
      //console.log(e.target.value)
      this.$store.commit("concerts/setSearch",e.target.value)
    },
   logout(){
    localStorage.setItem("token", "")
    this.$store.dispatch("concerts/setUser", null)
   }
  },
  async created() {
     if(this.isError){
      //console.log("App")
      this.$router.push('/myError')
    } 
    try{
        let user = await fetch('https://localhost:7090/api/Auth/User', {
          headers: {
            Authorization: 'Bearer '+localStorage.getItem('token')
        }
    }).then(r=>r.json())
    this.$store.dispatch('concerts/setUser',user)
    }
    catch(e){
     
    }
   
  }
}
</script>

<style>
.my-select{
    max-width: 200px;
    min-height: 30px;
   /*  margin-right: 10px;*/
    margin-top: 3px; 
}
</style>
