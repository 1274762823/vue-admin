<script>
import {defineComponent} from 'vue'
import vuePhotoZoomPro from 'vue-photo-zoom-pro'
import 'vue-photo-zoom-pro/dist/style/vue-photo-zoom-pro.css'
import ImageList from "@/pages/Details/ImageList/index.vue";

export default defineComponent({
  name: "Preview",
  components: {ImageList, vuePhotoZoomPro},
  data() {
    return {
      // 配置项
      swiperOption: {
        // 显示多少屏
        slidesPerView: 1,
        // 屏之间的间隔
        spaceBetween: 1,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  computed:{
    // eslint-disable-next-line vue/return-in-computed-property
    getChangePic(){
      const pic = this.$store.state.product.productInfo.skuInfo.skuImageList.find(v=>v.isDefault==='1');
      if(pic)return pic.imgUrl
    }
  }
})
</script>

<template>
  <div class="previewWrap">
    <div class="preview">
      <vue-photo-zoom-pro
          :out-zoomer="true"
          :width="200"
          :height="200"
          :high-url="getChangePic"
      >
        <img :src="getChangePic"/>
      </vue-photo-zoom-pro>
    </div>
    <ImageList></ImageList>
  </div>
</template>

<style lang="less">
.previewWrap {
  float: left;
  width: 400px;
  position: relative;

  .preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #DFDFDF;

    img {
      width: 100%;
    }

    .maxbox {
      width: 400px;
      height: 400px;
      position: absolute;
      left: 420px;
      top: 0px;
      overflow: hidden;
      z-index: 20;
      border: 1px solid #ddd;

      img {
        width: 800px;
        height: 800px;
        display: block;
      }
    }
  }

  .preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #DFDFDF;

    img {
      width: 100%;
      height: 100%;
    }

    .zoomer {
      z-index: 999;
      top: 0 !important;
      left: 10px !important;
    }

    .selector {
      background-color: rgba(255, 0, 0, 0.3);
    }
  }
}
</style>