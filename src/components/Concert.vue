<template>
<div class="container" v-if="concert">
    <div class="wrapper">
         <div class="image">           
            <img :src="getImgUrl(concert.image)" > 
        </div> 
        <div class="content">
            <div class="title">
                <h3>{{ concert.eventName}}</h3>  
            </div>
            
                 <div class="col-md-10 col-sm-7 text" >
                    <h5 >{{concert.nameOfPerformer}}</h5>
                    <br />
                    <p >Дата проведения: {{concert.dateConcert}}</p>
                    <p >Место: {{concert.locationConcert}}</p>
                    <br />                  
                     <div v-if="concert.eventType==='Classic'">
                        <p>Тип голоса: {{concert.voicetype}}</p>
                    </div> 
                    <div v-else-if="concert.eventType==='OpenAir'">
                         <p>Как добраться: {{concert.howToGet}}</p>
                         <p> Хэдлайнер: {{concert.headliner}}</p>
                    </div> 
                    <div v-else>
                         <p>Возрастной ценз: {{concert.age}}</p>
                    </div> 
                    <div v-if="isAdmin">
                        <router-link :to="{name:'addEvent', params: {id: this.id}  }" class="link-dark">   
                            Редактировать
                        </router-link>
                         <div>
                            <a href="#" @click.prevent="remove()">Удалить</a>
                        </div>
                    </div>  
                </div>
          
                <div class="col-md-7 text" v-if="user!=null">
                    <p><b>Билеты:</b></p>
                    <router-link :to="{name:'addTicket', params:{id:0, concertId: this.id} }" class="link-dark">   
                                Добавить билет
                    </router-link>
                    <table class="table  table-striped text">
                        <thead>
                            <tr>
                                <th><p>Сектор</p></th>
                                <th><p>Стоимость</p></th>
                                <th><p>Покупка</p></th>
                                <th> </th>
                            </tr>
                        </thead>
                        <tbody v-for="item in concert.tickets" :key="item.id">                           
                                <tr v-if="isAdmin">
                                    <td><p>{{item.sector}}</p></td>
                                    <td><p>{{item.price}}</p></td>    
                                        <router-link :to ="{name: 'addTicket', params:{ id:item.id, concertId: concert.id } }">Редактировать</router-link>
                                        <a href="#" @click.prevent="removeTicket(item.id)">Удалить</a>                                   
                                </tr>
                                <template v-else>
                                <tr v-if="!item.booked">                  
                                    <td><p>{{item.sector}}</p></td>
                                    <td><p>{{item.price}}</p></td>
                                    <td><button @click="book(item.id)" class="btn btn-success but-mesasure">Забронировать</button></td>
                                </tr>
                                </template>                                 
                        </tbody>
                    </table>
            </div>
            
             
        </div>
    </div> 
</div>

</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
export default { 
   
    data() {
        return {
            concert:null,         
        }
    },
    methods:{
        ...mapMutations("concerts",["setError"]),
         async remove(){
             let isDelete = confirm("Are you sure you want to delete this event?")
             
            if(isDelete){
                try{
                     let response = await fetch(`https://localhost:7090/api/concerts/${this.id}`,{
                    headers: {
                        Authorization: 'Bearer '+localStorage.getItem('token')
                    },
                    method: 'DELETE'
                    });
                    if(response.ok){
                        console.log('I am here')
                        await this.$store.dispatch('concerts/load')
                        this.$router.push('/')
                    }
                    else{
                        this.setError(this.errorsArray[response.status])
                        this.$router.push('/myError')
                    }
                }
                catch{
                    this.setError(this.errorsArray[0])
                    this.$router.push('/myError')
                }               
            } 
          
          },
          async removeTicket(id){
           let isDelete = confirm("Are you sure you want to delete this ticket?")
            if(isDelete){
                try{
                    let response = await fetch(`https://localhost:7090/api/Tickets/${id}`,{
                    headers: {
                        Authorization: 'Bearer '+localStorage.getItem('token')
                    },
                    method: 'DELETE'
                    });
                    if(response.ok){
                        location.reload();
                    }
                    else{
                        this.setError(this.errorsArray[response.status])
                        this.$router.push('/myError')
                    }
                }
                catch {
                    this.setError(this.errorsArray[0])
                    this.$router.push('/myError')
                }
                
            }
          },
         async book(ticketId){
            let isBooked = confirm("Do you want book ticket?")
            if(isBooked){
                let form = new FormData()
                form.append("id", ticketId)
                form.append("userId", this.user.id)          
                let response = await fetch(`https://localhost:7090/api/Tickets/Book`, {
                headers:{
                    Authorization: "Bearer "+localStorage.getItem('token')
                },
                method: 'POST',
                body: form
            });
                location.reload()
            }
            
          },
          getImgUrl: function (img) { 
             try{ 
                return require('../assets/' + img);
             } catch {
               
             }
          }
    },
 async created() { 
    try {
        let response = await fetch(`https://localhost:7090/api/concerts/${this.id}`,{
        headers: {
            Authorization: 'Bearer '+localStorage.getItem('token')
        }
        });
        if(response.ok){
            this.concert = await response.json()
        }
        else{
            this.setError(this.errorsArray[response.status])
            this.$router.push('/myError')
        }
    } 
    catch {

        this.setError(this.errorsArray[0])
        this.$router.push('/myError')
    }
     
  }, 
     computed: {
        ...mapGetters('concerts', [ 'user', 'errorsArray']),
		id(){
            return this.$route.params.id
        },
        isAdmin(){
            if(this.user){
                return this.user.role==="admin"
            }
            return false
           
        }
	},
      
}
        

       
</script>

<style>
.wrapper{
    display: flex;
    margin: 40px;
  
}

.content{
    margin: 40px;
}

.text {
   font-size: 20px; 
   
}

.but-mesasure{
min-width: 200px;
}

.image{
    margin:20px;
}
</style>