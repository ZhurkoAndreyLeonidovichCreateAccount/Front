<template>
  <div class="d-flex justify-content-center flex-direction: center">
    <div class="container"> 
        <table class="table table-bordered" >
            <thead>
                <tr>
                    <th><p>Сектор</p></th>
                    <th><p>Стоимость</p></th>
                    <th><p>Статус</p></th>
                </tr>
            </thead>
            <tbody v-for="item in user.tickets" :key="item.id">
                <tr >
                    <td><p>{{item.sector}}</p></td>
                    <td><p>{{item.price}}</p></td>    
                    <td><button class="btn btn-success"  @click.prevent="cancelBook(item.id)">Отменить бронь</button></td>                                   
                </tr>
            </tbody>
        </table>
     </div>
</div> 
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    data(){
        return{

        }
    },
    computed:{
        ...mapGetters('concerts', ['user']),
        /*  bookedTickets(){
            return this.user.tickets.filter(item=>item.booked===true)
        },  */

    },
    methods:{
       async cancelBook(ticketId){
            let isBooked = confirm("Do you want to cancel booked ticket?")
            if(isBooked){
                let form = new FormData()
                form.append("id", ticketId)          
                let response = await fetch(`https://localhost:7090/api/Tickets/UnBook`, {
                headers:{
                    Authorization: "Bearer "+localStorage.getItem('token')
                },
                method: 'POST',
                body: form
            });
                location.reload()
            }
        }
    }
}
</script>

<style>

</style>
 