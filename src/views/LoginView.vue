<template>
<v-app>
    <div class="background">
    <v-container>
    <v-row>

    <v-card 
    max-width="344" class="login-form mx-auto">
       <v-card-title class="login-title">
        Login
       </v-card-title>
       <v-card-subtitle>
        ユーザー情報をご入力ください。
       </v-card-subtitle>
      
        <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        >
        <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        prepend-inner-icon="mdi-email-box"
        required
        ></v-text-field>

        <v-text-field
        v-model="password"
        label="Password"
        :type="passwordShow?'password':'text'"
        prepend-inner-icon="mdi-key"
        :append-icon="passwordShow? 'mdi-eye-off':'mdi-eye'"
        @click:append="passwordShow=!passwordShow"
        ></v-text-field>

        <v-btn 
        color="success"
        class="login-btn"
        @click="submit"
        :disabled="isValid"
        >LOGIN</v-btn>
    
        <v-btn @click="clear">CLEAR</v-btn>
        <v-btn text color="green lighten-1" to="signup" class="to-signup">
        新規登録はこちら
        </v-btn>
    
        <v-alert
        dense
        text
        type="success"
        class="success-message"
        v-if="message"
        >
        {{ message }}
        </v-alert>
        <v-alert
        dense
        outlined
        type="error"
        class="error-message"
        v-if="errorMessage"
        >
        {{ errorMessage }}
        </v-alert>
        </v-form>
    </v-card>
 
    </v-row>
    </v-container>
    </div>
</v-app>
</template>
<style>
  nav{
    padding: 0;
  }
  .background{
    background:#89d58d;
    height: 300px;
    width: 100%;
    display:block;
    position:absolute;
    top:0;
    background-size:cover;
  }
  .login-form{
    margin: 150px;
    padding: 30px;
  }
 
  .login-title{
    display: inline-block;
  }
  .login-btn{
    margin-right: 20px;
  }
  .success-message{
    margin-top: 20px;
  }
  .error-message{
    margin-top: 20px;
  }
  .to-signup{
    margin-top: 20px;
  }
</style>
<script>
import firebase from "@/firebase/firebase"

  export default {
    data: () => ({
      valid: true,
      email: '',
      emailRules: [
        v => !!v || 'メールアドレスを入力してください。',
        v => /.+@.+\..+/.test(v) || 'メールアドレスを入力してください。',
      ],
      password:'',
      passwordShow:"false",
      message:'',
      errorMessage:'',
    }),
    mounted(){
     if(localStorage.message){
        this.message=localStorage.message
        localStorage.message=''
     }
    },
    computed:{
      
      isValid(){
        return !this.valid;
      },
    },
    methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      submit(){
       firebase.auth().signInWithEmailAndPassword(this.email,this.password)
       .then((result)=>{
        console.log("uesr",result.user)
         const auth ={
            displayName:result.user.displayName,
            email:result.user.email,
            uid:result.user.uid,
            refreshToken:result.user.refreshToken,
            photoURL:result.user.photoURL
         }
         sessionStorage.setItem('user',JSON.stringify(auth))
         this.$router.push('/')
       })
       .catch((error)=>{
        console.log(error)
         this.errorMessage="ログインに失敗しました。"
       })
      },
      clear(){
        this.email = ''
        this.password = ''
      },  
    },
  }
</script>
