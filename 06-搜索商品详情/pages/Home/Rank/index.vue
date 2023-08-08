<!--<script>-->
<!--import {defineComponent} from 'vue'-->
<!--import {mapActions} from "vuex";-->

<!--export default defineComponent({-->
<!--  name: "Rank",-->
<!--  methods:{-->
<!--    ...mapActions('rank',['getRankData'])-->
<!--  },-->
<!--  mounted(){-->
<!--    this.getRankData()-->
<!--  }-->
<!--})-->
<!--</script>-->

<!--<template>-->

<!--</template>-->

<!--<style scoped lang="less">-->

<!--</style>-->
<script>
import {defineComponent} from 'vue'
import {mapActions} from "vuex";

export default defineComponent({
  name: "Rank",
  data(){
    return{
      type:0
    }
  },
  methods:{
    ...mapActions('rank',['getRankData'])
  },
  mounted(){
    this.getRankData()
  }
})
</script>

<template>
  <!-- 商品排行 -->
  <div class="rank">
    <div  class="tab">
      <div  class="tab-tit clearfix">
        <a @click="type=index" v-for="(item,index) in $store.state.rank.rankList" :key="item.id" :class="{on:type===index}">
          <p class="img">
            <i></i>
          </p>
          <p class="text">{{ item.typeName }}</p>
        </a>
      </div>
    </div>
    <div class="content">
      <ul v-show="type===index" v-for="(item,index) in $store.state.rank.rankList" :key="item.id" >
        <li>
          <div v-for="product in item.productList" :key="product.id"  class="img-item">
            <div class="tab-pic">
              <a  href="#">
                <img :src="product.imgUrl" />
              </a>
            </div>
            <div class="tab-info">
              <div class="info-title">
                <a href="#">{{ product.name }}</a>
              </div>
              <div class="info-price">{{ product.price | currency(2)}}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>

</template>

<style lang="less" scoped>
.rank {
  width: 1200px;
  margin: 0 auto;

  .tab {
    margin: 0 auto;
    overflow: hidden;
    width: 312px;

    .tab-tit {
      text-align: center;

      a {
        display: block;
        padding: 0 18px;
        float: left;
        text-decoration: none;
        font-size: 16px;
        color: #999;

        p {
          margin: 5px 0;
        }

        .img {
          i {
            width: 35px;
            height: 35px;
            display: block;
            background: url(../../../assets/images/home/bg0.png);
            margin-left: 10px;
          }
        }

        .text {
          line-height: 28px;
        }
      }

      .on {
        color: #e60012;

        .img {
          i {
            background-position: -35px 0;
          }
        }
      }
    }
  }
  .content {
    overflow: hidden;
    padding: 10px;

    ul {
      li {
        overflow: hidden;
        list-style: none;
        line-height: 18px;

        .img-item {
          border: 1px solid #e1251b;
          width: 269px;
          float: left;
          overflow: hidden;
          margin: 0 12px 10px;
          background: #fff;

          .tab-pic {
            width: 100%;
            height: 277px;
            overflow: hidden;
            text-align: center;
            //margin: 5px auto 18px;

            a {
              img {
                //display: block;
                width: 100%;
                height: 200px;
              }
            }
          }

          .tab-info {
            background: #fafafa;
            //height: 150px;

            .info-title {
              height: 50px;
              line-height: 28px;
              overflow: hidden;
              margin: 0 auto;
              padding-left: 10px;
              text-align: center;

              a {
                color: #333;
                text-decoration: none;
              }
            }

            .info-price {
              text-align: center;
              font-size: 20px;
              color: #e1251b;
              height: 35px;
              padding-left: 10px;
              display: block;
              line-height: 24px;
              margin: 0 auto ;
            }
          }
        }
      }
    }
  }
}

</style>