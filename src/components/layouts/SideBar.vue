<template>
<v-navigation-drawer
v-model="drawer"
app
>
<v-sheet
  color="grey lighten-4"
  class="pa-4"
>
    <v-avatar color="indigo">
      <input type="file" 
             ref="fileInput"
             style="display:none"
             accept="image/jpeg,image/jpg,image/png"
             @change="updateIcon">
            
      <v-icon dark
              v-if="!photoUrl"
              @click="changeIcon">
        mdi-account-circle
      </v-icon>

      <img :src="photoUrl"
            alt=""
            v-if="photoUrl"
            @click="changeIcon">

    </v-avatar>
  <div class="username">{{ auth && auth.displayName }}</div>
 
</v-sheet>

<v-divider></v-divider>

<v-list>
  <v-list-item
    v-for="[icon, text,to] in links"
    :key="icon"
    :to="to"
    link
  >
    <v-list-item-icon>
      <v-icon>{{ icon }}</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>{{ text }}</v-list-item-title>
    </v-list-item-content>
  </v-list-item>

  <v-list-item @click="logout" class="logout-btn">
    <v-list-item-icon>
      <v-icon>
        mdi-logout
      </v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>Logout</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
  
</v-list>
</v-navigation-drawer>
</template>
<style>
.logout-btn{
  font-weight: bold;
}
</style>
<script lang="ts">
  import firebase from "@/firebase/firebase"
  export default {
    mounted(){
      this.auth=JSON.parse(sessionStorage.getItem('user'))

      this.photoUrl=this.auth.photoURL

    },
    data: () => ({
      drawer: null,
      links: [
        ['mdi-chat', 'Chat room','/'],
        // ['mdi-send', 'Send','about'],
        // ['mdi-delete', 'Trash','about'],
        // ['mdi-alert-octagon', 'Spam','about'],
      ],
      auth:null,
      photoUrl:"",
    }),
    methods:{
      logout(){
        firebase.auth() 
        .signOut()
        .then(()=>{ 
          localStorage.message="ログアウトに成功しました。"
          this.$router.push('/login')
        })
      },
      changeIcon(){
        this.$refs.fileInput.click()
      },
      updateIcon(){
        console.log("updateIcon call")
        const user=this.getAuth()
        console.log(user)
        if(!user){
          sessionStorage.removeItem('user')
          this.$router.push('/login')
        }
        const file =this.$refs.fileInput.files[0]
        const filePath=`user/${file.name}`
        console.log(file)
        firebase.storage().ref()
        .child(filePath)
        .put(file).then(async snapshot=>{
          // console.log("snapshot",snapshot)

          const photoUrl =await snapshot.ref.getDownloadURL()
          console.log("photo",photoUrl)
          firebase.auth().onAuthStateChanged((user)=>{
            if(user){
              user.updateProfile({
                photoURL:photoUrl
            })

              this.auth.photoURL=photoUrl
              sessionStorage.setItem('user',JSON.stringify(this.auth))

              this.photoUrl=photoUrl
            }  

          })
        });

      },
      getAuth(){
        return firebase.auth().onAuthStateChanged((user)=>{
          return user
        })
      }
    }
  }
</script>