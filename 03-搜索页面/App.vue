<script>
import Header from "@/components/Header/index.vue";
import Footer from '@/components/Footer'
export default ({
  name: "App",
  components: {Footer, Header}
})
</script>

<template>
  <div>
    <div class="outer">
      <Header></Header>
      <router-view></router-view>
      <Footer></Footer>
    </div>
  </div>
</template>

<style lang="less" scoped>

</style>