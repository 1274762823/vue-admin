<script>
import {defineComponent} from 'vue'
import {mapActions} from "vuex";

export default defineComponent({
  name: "FootAdv",
  methods:{
    ...mapActions('focus',['getFootAdvList'])
  },
  mounted(){
    this.getFootAdvList();
  }
})
</script>

<template>
  <div class="brand">
    <div class="py-container">
      <ul class="brand-list">
        <li v-for="item in $store.state.focus.footAdvList" :key="item.id" class="brand-item">
          <img :src="item.imgUrl" />
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="less">
.brand {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .brand-list {
      overflow: hidden;
      //padding: 15px 0;
      background: #f7f7f7;
      line-height: 18px;

      .brand-item {
        width: 120px;
        float: left;
        height: 100px;

        img {
          border-left: 1px dotted #ccc;
          //padding: 0 10px;
          width: 100%;
          height: 100%;
        }

        &:first-child {
          img {
            border-left: 0;
          }
        }
      }
    }
  }
}
</style>