<template>

    <div class=" offset-md-2  col-md-2">
        <form @submit.prevent="submit" id="form" >
            <div class="form-group">
                <label class="control-label mb-1" for="EventName"> EventName</label>
                <input v-model="eventName" class="form-control" type="text" id="EventName" >
            </div>
            <div class="form-group">
                <label class="control-label mb-1" for="NamePerformer">NamePerformer</label>
                <input v-model="namePerformer" class="form-control" type="text" id="NamePerformer" >
            </div>
             <div class="form-group mt-2">
                <select  v-model="eventType" class="my-select btn btn-secondary">
                    <option v-for="(item, index) in  typeArray" :key="index" :value ="index" >{{item}}</option>         
                </select> 
            </div>
            <div class="form-group">
                <label class="control-label mb-1" for="AmountOfTickets"> AmountOfTickets</label>
                <input v-model="amountOfTickets" class="form-control" type="number" id="AmountOfTickets" >
            </div>
             <div class="form-group">
                <label class="control-label mb-1" for="DateConcert">DateConcert</label>
                <input v-model="dateConcert" class="form-control" type="text" id="DateConcert" >
            </div>
            <div class="form-group">
                <label  class="control-label mb-1" for="Image">Image</label>
                <input name="Image" @change="onchange" class="form-control" type="file" id="Image" >
            </div>
            <div class="form-group">
                <label class="control-label mb-1" for="LocationConcert">LocationConcert</label>
                <input v-model="locationConcert" class="form-control" type="text" id="LocationConcert" >
            </div>
            <div class="form-group" v-if="boolParty">
                <label class="control-label mb-1" for="Age">Age</label>
                <input v-model="age" class="form-control" type="number" id="Age" >
            </div>
            <div class="form-group" v-if="boolOpenAir">
                <label class="control-label mb-1" for="Headliner">Headliner</label>
                <input v-model="headliner" class="form-control" type="text" id="Headliner" >
            </div>
            <div class="form-group" v-if="boolOpenAir">
                <label class="control-label mb-1" for="Headliner">HowToGet</label>
                <input v-model="howToGet" class="form-control" type="text" id="Headliner" >
            </div>
            <div class="form-group" v-if="boolClassic">
                <label class="control-label mb-1" for="Voicetype">Voicetype</label>
                <input v-model="voicetype" class="form-control" type="text" id="Voicetype" >
            </div>
            <div class="row mt-4" >
                <input type="submit" value="Send" class="col-md-4 btn btn-secondary" />
                <a class="col-md-5 offset-md-3 btn btn-secondary">back</a>
            </div>
        </form>
    </div>  


  
</template>


<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
    data() {
    return {
      
      typeArray:[
        'Choose type of event...', 'OpenAir', 'Classic', 'Party'         
      ],
      eventName:'',
      namePerformer:'',
      eventType: "0",
      amountOfTickets:0,
      dateConcert:'',
      image:"",
      locationConcert:'',
      age:0,
      headliner:'',
      howToGet:'',
      voicetype:''
      
    }
  },
  computed:{
    ...mapGetters("concerts",['errorsArray']),
  boolParty(){
    return this.typeArray[this.eventType]==="Party"
  },
   boolOpenAir(){
    return this.typeArray[this.eventType]==="OpenAir"
  },
   boolClassic(){
    return this.typeArray[this.eventType]==="Classic"
  },
   

  },
  methods:{
    ...mapMutations("concerts",['setError','setSuccess']),
    onchange(e) { 
        this.image = e.target.files[0]    
    },
    async submit() {
     
        let form = new FormData()
        if(this.$route.params.id!=0){
         form.append("id", this.$route.params.id) 
        }
        form.append("eventName", this.eventName)
        form.append("eventType", this.typeArray[this.eventType])
        form.append("namePerformer", this.namePerformer)
        form.append("dateConcert", this.dateConcert) 
        form.append("image", this.image)
        form.append("locationConcert", this.locationConcert)
        form.append("amountOfTickets", this.amountOfTickets)
        if(this.typeArray[this.eventType]==="Party")
        {
            form.append("age", this.age) 
        }
        else if(this.typeArray[this.eventType]==="OpenAir") {
            form.append("howToGet", this.howToGet)
            form.append("headliner", this.headliner)
        }
        else {
            form.append("voicetype", this.voicetype)
        }
       
        
        if(this.$route.params.id!=0){
            try{
                let response = await fetch('https://localhost:7090/api/Concerts',{
                method: 'PUT',
                headers: {
                     Authorization: 'Bearer '+localStorage.getItem('token')
                },
                body: form })
                console.log(response)
                if(response.status===200){
                     console.log("Success")
                    this.setSuccess('Update is successful')
                    this.$router.push('/success')
                }
            }
            catch {
                //console.log("Edit")
                this.setError(this.errorsArray[0])
                this.$router.push('/myError')
            }
            
        }
        else {
            try{
                let response = await fetch('https://localhost:7090/api/Concerts',{
                method: 'POST',
                 headers: {
                    Authorization: 'Bearer '+localStorage.getItem('token')
                },
                body: form }).then(r=>r.json())
                console.log(response)
                this.$store.dispatch('concerts/load')
                this.$router.push('/')

            }
            catch(e) {
                console.log(e)
            }
           
        }
        
    }
  },
  async created() {
    if(this.$route.params.id!=0){
      let concert = await fetch(`https://localhost:7090/api/concerts/${this.$route.params.id}`).then(r=>r.json())
      this.eventName = concert.eventName
      this.namePerformer = concert.namePerformer
      this.eventType = this.typeArray.indexOf(concert.eventType) 
      this.amountOfTickets = concert.amountOfTickets
      this.dateConcert = concert.dateConcert
      this.image = concert.image
      this.locationConcert = concert.locationConcert
      if(concert.eventType==="Party"){
         this.age = concert.age
      }
      else if(concert.eventType==="OpenAir"){
         this.headliner = concert.headliner
         this.howToGet = concert.howToGet
      }
      else {
        this.voicetype = concert.voicetype
      }
           
    }

      //console.log()
  }
}
</script>