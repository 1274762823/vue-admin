<template>
  <!-- 项目的最外层 -->
  <div class="outer">
    <!-- 头部 -->
    <Header></Header>

    <router-view></router-view>

    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header/index.vue";
import Footer from "@/components/Footer";
// import getSphRes from "@/products";


export default {
  name: "App",
  components: {Header, Footer},
  // mounted(){
  //   getSphRes().then(body=>{
  //         console.log(body)
  //       })
  //
  // }

}
</script>

<style lang="less" scoped>
</style>