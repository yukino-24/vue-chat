<template>
    <!-- V-app是Vuetify的必用API -->
     <v-app id="inspire">
        <SideBar />
     <v-app-bar
        app
        shrink-on-scroll
      >

      <v-toolbar-title>ルーム一覧
      
      </v-toolbar-title>
      <CreateRoom />

      <v-spacer></v-spacer>

      <v-btn icon>
      <!-- <v-icon>mdi-dots-vertical</v-icon> -->
      </v-btn>
    
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col
            v-for="room in rooms"
            :key="room.id"
            cols="3"
          >
           <!-- router-link实现切换 -->
            <!-- 带查询参数，下面的结果为 /register?plan=private -->
          <router-link :to="{ path: '/chat', query: { room_id: room.id }}">
            <v-avatar color="grey lighten-2" size="68">
            <img
            src="https://cdn.vuetifyjs.com/images/john.jpg"
            alt="John"
            v-if="!room.thumbnailUrl"
            >
            <img
            :src="room.thumbnailUrl"
            alt="John"
            v-if="room.thumbnailUrl"
            >
            </v-avatar>
            <div v-if="!room.name" class="roomname">Room</div>
            <div v-if="room.name" class="roomname">{{room.name}}</div>
          </router-link>
            
          </v-col> 
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
  
 <style>
a{  
    text-decoration: none;
}
.roomname{
    color:black;
}
</style>
  <script>
  // @ is an alias to /src
  // import ChatApp from '@/components/ChatApp.vue'
  import firebase from "@/firebase/firebase"
  import SideBar from '@/components/layouts/SideBar'
  import CreateRoom from '@/components/model/CreateRoom'
  export default {
    name: 'UserList',
    components: {
        SideBar,
        CreateRoom
    },
    data:()=>({
        rooms:[]
    }),
    mounted() {
            this.getRooms()
    },
    methods:{
            async getRooms(){
            this.rooms=[]
            const roomRef=firebase.firestore().collection("rooms")
            const snapshot= await roomRef.get()
            // console.log("snapshot",snapshot)
            snapshot.forEach(doc=>{
                // const data={
                //     name:doc.data().name,
                //     thumbnailUrl:doc.data().thumbnailUrl,
                //     createdAt:doc.data().createdAt
                // }
                const data={...doc.data()}
                data.id=doc.id
                console.log(data)
            
                this.rooms.push(data)
            })
        }
    }
  }
  </script>