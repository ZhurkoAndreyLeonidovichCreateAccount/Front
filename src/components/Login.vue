<template>
    <div class="container " >
        <div class="row main-form ">
            <h3 class="cen">Login</h3>
            <form  method="post" @submit.prevent="submitHandle">
                <p v-if="errorServer.length">
                    <ul class="error">
                        <li>{{ errorServer }}</li>
                    </ul>
                </p>
                <div class="form-group">
                    <label for="email" class="cols-sm-2 control-label">Your Email</label>
                    <div class="cols-sm-10">    
                        <div class="input-group">                    
                            <input type="text" :class="'form-control'+ classEmail" v-model="email" @input="validEmail" name="email" id="email" placeholder="Enter your Email"/>
                        </div>
                        <h6 class="error" v-if="!checkEmail">{{emailError}}</h6>
                    </div>
                </div>

                <div class="form-group">
                    <label for="password" class="cols-sm-2 control-label">Password</label>
                    <div class="cols-sm-10">
                        <div class="input-group">           
                            <input v-model="password" type="password" :class="'form-control' + classPassword" @input="validPassword" name="password" id="password" placeholder="Enter your Password"/>
                        </div>
                         <h6 class="error" v-if="!checkPassword">{{passwordError}}</h6>
                    </div>
                </div>

                <div class="form-group cen">
                <button   type="submit" id="button" class="btn btn-primary btn-lg btn-block login-button">Sign In</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default { 
    data() {
        return {
            info:[
                {
                    label: 'Email',
                    value:'',
                    pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                }
               
            ],
            email:'',
            password:'',
            emailError: '',
            checkEmail: true,
            errorServer:'',
            passwordError:'',
            checkPassword: true
        }
    },
    computed:{
        classEmail(){
            if(this.checkEmail){
                return ''
            }
            else{
                return ' error-input'
            }
        },
        classPassword(){
            if(this.checkPassword){
                return ''
            }
            else{
                return ' error-input'
            }
        }
       
    },
    methods:{
       async submitHandle() {
            const responseData = {
                email: this.email,
                password: this.password
            }
          
                let response = await fetch('https://localhost:7090/api/Auth/Login',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(responseData) })
                if(response.ok){
                    let token = await response.text()
                    localStorage.setItem("token" ,token)
                     let user = await fetch('https://localhost:7090/api/Auth/User', {
                     headers: {
                        Authorization: 'Bearer '+localStorage.getItem('token')
                    }
                }).then(r=>r.json())
                this.$store.dispatch('concerts/setUser',user)
                  this.$router.push('/')
                }
                else{
                    this.errorServer = await response.text()
                }           
    
        },              
        validEmail(e) {
             var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!e.target.value.length){
                this.emailError = "This field is required"
                this.checkEmail=false;
                
            }
           
            else if(!re.test(e.target.value)){
                 console.log("Это поле должно содержать E-Mail в формате example@site.com")
                 this.emailError = 'Это поле должно содержать E-Mail в формате example@site.com'
                 this.checkEmail=false;
                 
            }
            else {
                this.checkEmail=true;
            }
           
          
        },

        validPassword(e){
             let re = /[0-9]{6}/
            if(!e.target.value.length){
                this.passwordError = "This field is required"
                this.checkPassword = false;
                
            }   
            else if(!re.test(e.target.value)){
                this.passwordError = "Поле должно состоять из 6 цифр"
                this.checkPassword = false;
                
            }
            else{
                this.checkPassword = true;
            }
           
        }
           
       
        
    }
}
</script>


    <style scoped>
    .error{
        font-size: 20;
        color: white;
        margin: 5px;
    }
    .error-input{
        border:3px solid red;
    }
    .cen {
        align-content: center;
    }
    .form-group{
    margin-bottom: 15px;
    }
    label{
    margin-bottom: 15px;
    }
    input,
    input::-webkit-input-placeholder {
    font-size: 15px;
    padding-top: 3px;
    }
    .form-control {
    height: auto!important;
    padding: 8px 12px !important;
    }
    .input-group {
    box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.21)!important;
    }
    #button {
    border: 1px solid #ccc;
    margin-top: 28px;
    padding: 6px 12px;
    color: #666;
    text-shadow: 0 1px #fff;
    cursor: pointer;
    border-radius: 3px 3px;
    box-shadow: 0 1px #fff inset, 0 1px #ddd;
    background: #f5f5f5;
    background: -moz-linear-gradient(top, #f5f5f5 0%, #eeeeee 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #f5f5f5), color-stop(100%, #eeeeee));
    background: -webkit-linear-gradient(top, #f5f5f5 0%, #eeeeee 100%);
    background: -o-linear-gradient(top, #f5f5f5 0%, #eeeeee 100%);
    background: -ms-linear-gradient(top, #f5f5f5 0%, #eeeeee 100%);
    background: linear-gradient(top, #f5f5f5 0%, #eeeeee 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#f5f5f5', endColorstr='#eeeeee', GradientType=0);
    }
    .main-form{
    margin-top: 30px;
    margin: 0 auto;
    max-width: 400px;
    padding: 10px 40px;
    background:#009edf;
    color: #FFF;
    text-shadow: none;
    box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.31);
    }
    span.input-group-addon i {
    color: #009edf;
    font-size: 17px;
    }
    .login-button{
    margin-top: 5px;
    }
    </style>