<template>
  <div id="app">
    <nav>
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    </nav>

    <!-- <SideBar /> -->
    <!-- 指定路由展示位置 -->
    <router-view/>

  </div>

</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.username{
  padding-top: 10px;
}
.grey.darken-1 {
    background-color: #757575!important;
    border-color: #757575!important;
}
</style>

<script>
//  import SideBar from '@/components/layouts/SideBar'
//  export default{
//   components:{
//     SideBar
//   }
//  }



</script>
