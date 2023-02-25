<template>
  <div class="background">
    <v-app>
        <v-container>
       <v-row>
        <v-card max-width="344" class="login-form mx-auto">
        <v-card-title class="login-title">
            SignUp
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
            v-model="name"
            :rules="nameRules"
            label="UserName"
            required
            prepend-inner-icon="mdi-account"
        ></v-text-field>

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
            >SIGNUP
        </v-btn>
        <v-btn @click="clear">CLEAR</v-btn>
        <v-btn text color="green lighten-1" to="login"
            class="to-login">
            ログイン画面はこちら
        </v-btn>
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
    </v-app>
  </div>
</template>
<style>
      .login-form{
        margin: 150px;
        padding: 30px;
      }
      .login-box{
        width: 700px;
        margin: 0px auto;
        padding: 10px;
      }
      .login-title{
        display: inline-block;
      }
      .login-btn{
        margin-right: 20px;
      }
      .error-message{
        margin-top: 20px;
      }
      .to-login{
        margin-top: 20px;
      }

</style>
<script lang="ts">
import firebase from "@/firebase/firebase"
export default {
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
        v => !!v || '名前を入力してください。',
        v => (v && v.length <= 10) || '名前を10文字以内で入力してください。',
      ],
    email: '',
    emailRules: [
      v => !!v || 'メールアドレスを入力してください。',
      v => /.+@.+\..+/.test(v) || 'メールアドレスを入力してください。',
    ],
    password:'',
    passwordShow:'false',
    errorMessage:'',
    
  }),
  computed:{
    isValid(){
      return !this.valid;
    }
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
    submit() {
        console.log("called")
        firebase.auth()
        .createUserWithEmailAndPassword(this.email,this.password)
        .then(async (result)=>{
           console.log("successed",result)
           await result.user.updateProfile(
            {displayName:this.name}
           );
           console.log("update user",result.user)
           localStorage.message="新規作成に成功しました。"
        //    TOPにリダイレクト処理
           this.$router.push('/login')
        })
        .catch((error)=>{
            console.log("failed",error)
        // エラーメッセージを表示
          this.errorMessage="ユーザーの新規作成に失敗しました。"
        })
    },
    clear(){
        this.name = ''
        this.email = ''
        this.password = ''
    },
  },
}
</script>
