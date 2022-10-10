<template>
    <div class="container " >
        <div class="row main-form ">
            <h3 class="cen">Register</h3>
            <form  @submit.prevent="handleSubmit">
                <ul v-if="serverError.length">
                    <li>{{serverError}}</li>
                </ul>
                <div class="form-group">
                    <label for="email" class="cols-sm-2 control-label">Your Email</label>
                    <div class="cols-sm-10">
                        <div class="input-group">
                            <input v-model="email" @input="validEmail(email)" type="text" :class="'form-control'+ emailClass" name="email" id="email" placeholder="Enter your Email"/>
                        </div>
                        <p class="error" v-if="!checkEmail">{{emailError}}</p>
                    </div>
                </div>

                <div class="form-group">
                    <label for="password" class="cols-sm-2 control-label">Password</label>
                    <div class="cols-sm-10">
                        <div class="input-group">
                            <input v-model="password" @input="validPassword(password)" type="password" :class="'form-control'+passwordClass" name="password" id="password" placeholder="Enter your Password"/>
                        </div>
                        <p class="error" v-show="!checkPassword">{{passwordError}}</p>
                    </div>
                </div>

                <div class="form-group">
                    <label for="confirm" class="cols-sm-2 control-label">Confirm Password</label>
                    <div class="cols-sm-10">
                        <div class="input-group">
                            <input v-model="confirmPassword" @input="validConfirmPassword(confirmPassword)" type="password" :class="'form-control'+ confirmPasswordClass" name="confirm" id="confirm" placeholder="Confirm your Password"/>
                        </div>
                        <p class="error" v-show="!checkConfirmPassword">{{confirmPasswordError}}</p>
                    </div>
                </div>

                <div class="form-group cen">
                    <button  type="submit" id="button" class="btn btn-primary btn-lg btn-block login-button">Register</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
export default { 
    data() {
        return {
            email:'',
            password:'',
            confirmPassword:'',
            emailError: '',
            checkEmail: true,
            passwordError: '',
            checkPassword: true,
            confirmPasswordError: '',
            checkConfirmPassword: true,
            serverError: ''

        }
    },
    computed:{
        emailClass(){
            if(this.checkEmail){
                return ''
            }
            else{
                return ' error-input'
            }
        },
        passwordClass(){
            if(this.checkPassword){
                return ''
            }
            else{
                return ' error-input'
            }
        },
         confirmPasswordClass(){
            if(this.checkConfirmPassword){
                return ''
            }
            else{
                return ' error-input'
            }
        },
        ...mapGetters('concerts', ['errorsArray'])
    },
    methods: {
        //...mapActions(['setUser', 'success']),
        ...mapMutations('concerts', ['setSuccess']),
       async handleSubmit() {
            const responseData = {
                email: this.email,
                password: this.password,
                confirmPassword: this.confirmPassword
            }
        
            try{
                let response = await fetch('https://localhost:7090/api/Auth/Register',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(responseData) })
                if(response.ok){
                    this.setSuccess("Регистрация прошла успешно")
                    this.$router.push('/success')
                }
                else{
                    this.serverError = await response.text();
                }
            }
            catch{
                 this.setError(this.errorsArray[0])
                this.$router.push('/myError')
            }
                
                
               
           
        },
        validEmail(email){
            let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!email.length){
                this.emailError = 'Поле обязательно для заполнения'
                this.checkEmail = false
            }
            else if(!re.test(email)){
                 this.emailError = 'Это поле должно содержать E-Mail в формате example@site.com'
                 this.checkEmail=false;
            }
            else{
                this.checkEmail=true
            }
        },
        validPassword(password){
            let re = /[0-9]{6}/
            if(!password.length){
                this.passwordError = "Поле обязательно для заполнения"
                this.checkPassword = false;
            }
            else if(!re.test(password)){
                this.passwordError = "Поле должно состоять из 6 цифр"
                this.checkPassword = false
            }
            else{
                this.checkPassword = true
            }

        },
        validConfirmPassword(confirmPassword){
            if(!confirmPassword.length){
                this.confirmPasswordError = "Поле обязательно для заполнения"
                this.checkConfirmPassword = false;
            }
            else if(confirmPassword!==this.password){
                console.log("Пароли не совпадают")
                 this.confirmPasswordError = "Пароли не совпадают"
                 this.checkConfirmPassword = false;
            }
            else{
                this.checkConfirmPassword = true;
            }
        }
    }
}
</script>

    <style scoped>
    .error{
        font-size: 17px;
        color: white;
        margin: 5px;
    }
    .error-input{
        border: red solid 3px;
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
    font-size: 17px;
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