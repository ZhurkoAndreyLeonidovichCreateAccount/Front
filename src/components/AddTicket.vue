<template>
    <div class=" offset-md-2  col-md-2">
        <form @submit.prevent="submit" id="form" >
            <div class="form-group">
                <label class="control-label mb-1" for="Price"> Price</label>
                <input v-model="price" class="form-control" type="number" id="Price" >
            </div>
            <div class="form-group">
                <label class="control-label mb-1" for="Sector">Sector</label>
                <input v-model="sector" class="form-control" type="text" id="Sector" >
            </div> 
             <div class="form-group mt-2">
                <select  v-model="booked" class="my-select btn btn-secondary">
                    <option v-for="(item, index) in  bookedArray" :key="index" :value ="index" >{{item}}</option>         
                </select> 
            </div>    
            <!-- <div class="form-group">          
                <input v-model="concertId" class="form-control" type="hidden"  >
            </div> -->
            <div class="row mt-4" >
                <input type="submit" value="Send" class="col-md-4 btn btn-secondary" />
                <a class="col-md-5 offset-md-3 btn btn-secondary">back</a>
            </div>
        </form>
    </div>  
 
</template>

<script>
import {mapMutations, mapGetters} from 'vuex'
export default {
    data(){
        return{
            price: 0,
            sector: '',
            booked: 0,
            bookedArray: ['Choose booked status',false,true],
            //concertId: this.id
        }
    },
    computed:{
      ...mapGetters('concerts', ['errorsArray']),
      id(){
        return this.$route.params.id
      },
      concertId(){
        return this.$route.params.concertId
      }
    },
    methods:{
        ...mapMutations('concerts', ['setError','setSuccess']),
       async submit(){
        console.log(this.$route.params.concertId+ "sssss")
         console.log(this.id)
            let form = new FormData()
            if(this.id!=0){
                 console.log("I am")
                form.append("id", this.id)
            }
            form.append("price",this.price)
            form.append("sector",this.sector)
            form.append("booked",this.bookedArray[this.booked])
            form.append("concertId",this.concertId)
            console.log(this.price)
            console.log(this.sector)
            console.log(this.bookedArray[this.booked]) 
            console.log(this.concertId)
            if(this.id==0){
                try{
                    let response = await fetch("https://localhost:7090/api/Tickets",{
                        method:'POST',
                        headers: {
                            Authorization: 'Bearer '+localStorage.getItem('token')
                        },
                        body: form
                    });
                    if(response.status==200){
                        /* this.setSuccess('Ticket added successfully')
                        this.$router.push('/mySuccess') */
                        this.$router.push(`/concert/${this.concertId}`)
                    }
                    else{
                        console.log("else")
                        console.log(response)
                        this.setError(this.errorsArray[response.status])
                        this.$router.push('/myError')
                    }
                } 
                catch{
                    console.log("catch")
                    console.log(response)
                    this.setError(this.errorsArray[0])
                    this.$router.push('/myError')
                }
            }
            else {
                try{
                   let response = await fetch("https://localhost:7090/api/Tickets", {
                    method: "PUT",
                    headers:{
                        Authorization: "Bearer "+ localStorage.getItem("token")
                    },
                    body: form
                   });
                    if(response.status==200){
                        //this.setSuccess('Ticket updated successfully')
                        this.$router.push(`/concert/${this.concertId}`)
                        //location.reload();
                    }
                }
                catch{
                    this.setError(this.errorsArray[0])
                    this.$router.push('/myError')
                }
            }
            
        }
    },
    async created(){
        
        //console.log(this.$route.params.id)
        //console.log("Редактирование")
        if(this.$route.params.id!= 0){
            try{
                let ticket = await fetch(`https://localhost:7090/api/Tickets/${this.$route.params.id}`,{
                headers: {
                    Authorization: 'Bearer '+localStorage.getItem('token')
                }
                }).then(t=>t.json())
                this.price = ticket.price
                this.sector = ticket.sector
                this.booked = this.bookedArray.indexOf(ticket.booked)
            }
            catch{

            }
        }
           
    }
}
</script>