<script>
import {defineComponent} from 'vue'
import SearchSelector from "@/pages/Search/searchSelector/index.vue";
import PageNation from "@/components/PageNation/index.vue";

export default defineComponent({
  name: "index",
  data(){
    // 排序方式
    // 排序类型(type)   1: 综合     2: 价格
    // 排序标识(flag)  asc: 升序  desc: 降序
    // 示例: "1:desc"
    let type = 1;
    let flag = 'desc';
    if(this.$route.query.order){
      [type,flag] = this.$route.query.order.split(':');
    }
    return{
      type,
      flag
    }
  },
  components: {PageNation, SearchSelector},
  methods:{
    //切换排序方式
    changeUpOrDown(type){
      if(this.type === type){
        this.flag === 'desc' ? this.flag = 'asc' : this.flag ='desc'
      }else{
        this.type = type;
        this.flag = 'desc'
      }
      // this.$router.push({
      //   path:'/search',
      //   query:{
      //     ...this.$route.query,
      //     order:this.type + ':' + this.flag
      //   }
      // })
      this.$router.goToSearch({order:this.type + ':' + this.flag})
    },

    //移除类别
    moveCategoryName(){
      // const {keyword} = this.$route.query;
      //   this.$router.push({
      //     path:'/search',
      //     query:{
      //       keyword
      //       // ...this.$route.query,
      //       // categoryName : null
      //     }
      //   })
      this.$router.goToSearch({
        categoryName:undefined,
        category3Id:undefined,
        category2Id:undefined,
        category1Id:undefined,
      })
    },
    moveKeyWord(){
      // const query = {...this.$route.query}
      // delete query.keyword
      // this.$router.push({
      //   path:'/search',
      //   query
      //
      // });
      this.$router.goToSearch({
        keyword: undefined
      })
      this.$bus.$emit('clearKeyWord')
    },

    //移除品牌
    movetrademark(){
      // this.$router.push({
      //   path:'/search',
      //   query:{
      //     ...this.$route.query,
      //     trademark:undefined
      //   }
      // })
      this.$router.goToSearch({trademark:undefined})
    },

    // moveprops(item){
    //
    //   this.$router.push({
    //     path:'/search',
    //     query:{
    //       ...this.$route.query,
    //       props:this.$route.query.props.filter(v=>v !== item)
    //     }
    //   })
    // },

    //分页器自定义事件
    changeSorte(pageNo){
      // console.log("changePageNo",pageNo);
      // this.$router.push({
      //   path:"/search",
      //   query:{
      //     ...this.$route.query,
      //     pageNo
      //   }
      // })
      this.$router.goToSearch({pageNo})
    }
  },
  watch:{
    '$route.query':{
      handler(query){
        if(query.props && (typeof query.props === 'string')){
          query.props = [query.props]
        }
        const {pageNo,pageSize} = this.$store.state.product.searchList;
        this.$store.dispatch('product/getSearchData',{
          // ...query,
          pageNo,
          pageSize,
          ...query,
        })
      },
      immediate:true
    }
  },
  beforeDestroy(){
    this.$bus.$emit('moveKeyWord')
  },
  computed:{
    isShowResult(){
      // const query = {...this.$route.query};
      // delete query.pageNo;
      // if(query.props && (query.props.length === 0)){
      //   delete query.props
      // }
      // return Object.values(this.$route.query).filter(v=>v).length > 0
      const query = {...this.$route.query};
      delete query.pageNo;
      delete query.order;
      if(query.props && query.props.length===0)
        delete query.props;
      return Object.values(query).filter(v=>{
        // v的值是undefined,key的属性名为pageNo
        return v;
      }).length>0;
    },

    // iconfont icon-icon_up 渲染升降序图标
    upOrDown(){
      return this.flag === 'desc' ? 'iconfont icon-icon_down' : 'iconfont icon-icon_up'
    }
  }
})
</script>

<template>
  <div class="main">
    <div class="py-container">
      <!--bread-->
      <div class="bread"  v-show="isShowResult">
        <ul class="fl sui-breadcrumb">
          <li>
            <a href="#">全部结果</a>
          </li>
        </ul>
        <ul class="fl sui-tag">
          //无类别时不渲染，有类别时点击li删除类别
          <li v-if="$route.query.categoryName" class="with-x">
            {{$route.query.categoryName}} <i @click="moveCategoryName">x</i>
          </li>
          <li v-if="$route.query.keyword" class="with-x">
            {{$route.query.keyword}} <i @click="moveKeyWord">x</i>
          </li>
          <li v-if="$route.query.trademark" class="with-x">
            {{$route.query.trademark.split(':')[1]}} <i @click="movetrademark">x</i>
          </li>
          <li v-for="item in $route.query.props" class="with-x">
            {{item.split(':')[1]}}
<!--            <i @click="moveprops(item)">x</i>-->
            <i @click="$router.goToSearch({props:$route.query.props.filter(v=>v !== item)})">x</i>
          </li>
        </ul>
      </div>

      <SearchSelector></SearchSelector>

      //若无搜索结果则显示
      <div class="retry" v-if="$store.state.product.searchList.total===0">
        <h1>无搜索结果，请重试</h1>
      </div>

      <!--details-->
      <div v-else class="details clearfix">
        <div class="sui-navbar">
          <div class="navbar-inner filter">
            <ul class="sui-nav">
              <li :class="{active:type==1}" @click.prevent="changeUpOrDown(1)">
                <a href="#">综合<i v-show="type==1" :class="upOrDown"></i></a>
              </li>
              <li :class="{active:type==2}" @click.prevent="changeUpOrDown(2)">
                <a href="#">价格<i v-show="type==2" :class="upOrDown"></i></a>
              </li>
            </ul>
          </div>
        </div>

        <div  class="goods-list">
          <ul class="yui3-g">
            <li :key="item.id" v-for="item in $store.state.product.searchList.goodsList" class="yui3-u-1-5">
              <div class="list-wrap">
                <div class="p-img">
                  <router-link :to="'/details/'+ item.id +'.html'"><img :src="item.defaultImg" /></router-link>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i>{{item.price}}</i>
                  </strong>
                </div>
                <div class="attr">
                  <router-link :to="'/details/'+ item.id +'.html'" :title="item.title">{{item.title}}</router-link>
                </div>
                <div class="commit">
                  <i class="command">已有<span>{{item.hotScore}}</span>人评价</i>
                </div>
                <div class="operate">
                  <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                  <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <PageNation
            @changeSorte="(pageNo)=>$router.goToSearch({pageNo})"
            :continue="5"
            :total="$store.state.product.searchList.total"
            :pageNo="$store.state.product.searchList.pageNo"
            :pageSize="$store.state.product.searchList.pageSize"></PageNation>
      </div>
      <!--hotsale-->
      <div class="clearfix hot-sale">
        <h4 class="title">热卖商品</h4>
        <div class="hot-list">
          <ul class="yui3-g">
            <li class="yui3-u-1-4">
              <div class="list-wrap">
                <div class="p-img">
                  <img src="../../assets/images/search/like_01.png" />
                </div>
                <div class="attr">
                  <em>Apple苹果iPhone 6s (A1699)</em>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i>4088.00</i>
                  </strong>
                </div>
                <div class="commit">
                  <i class="command">已有700人评价</i>
                </div>
              </div>
            </li>
            <li class="yui3-u-1-4">
              <div class="list-wrap">
                <div class="p-img">
                  <img src="../../assets/images/search/like_03.png" />
                </div>
                <div class="attr">
                  <em>金属A面，360°翻转，APP下单省300！</em>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i>4088.00</i>
                  </strong>
                </div>
                <div class="commit">
                  <i class="command">已有700人评价</i>
                </div>
              </div>
            </li>
            <li class="yui3-u-1-4">
              <div class="list-wrap">
                <div class="p-img">
                  <img src="../../assets/images/search/like_04.png" />
                </div>
                <div class="attr">
                  <em>256SSD商务大咖，完爆职场，APP下单立减200</em>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i>4068.00</i>
                  </strong>
                </div>
                <div class="commit">
                  <i class="command">已有20人评价</i>
                </div>
              </div>
            </li>
            <li class="yui3-u-1-4">
              <div class="list-wrap">
                <div class="p-img">
                  <img src="../../assets/images/search/like_02.png" />
                </div>
                <div class="attr">
                  <em>Apple苹果iPhone 6s (A1699)</em>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i>4088.00</i>
                  </strong>
                </div>
                <div class="commit">
                  <i class="command">已有700人评价</i>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
h3{
  padding:50px;
  background: yellow;
}
.main{
  margin: 10px 0;
  .py-container{
    width: 1200px;
    margin: 0 auto;
    .bread{
      margin-bottom: 5px;
      overflow: hidden;
      .sui-breadcrumb{
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float:left;
        li{
          display: inline-block;
          line-height: 18px;
          a{
            color: #666;
            text-decoration: none;
            &:hover{
              color: #4cb9fc;
            }
          }
        }
      }
      .sui-tag{
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;
        .with-x{
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition:color 400ms;
          cursor: pointer;
          i{
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }
          &:hover{
            color: #28a3ef;
          }
        }
      }
    }

    .retry{
      margin: 20px auto;
      text-align: center;
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    //margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;

                  }
                }
              }
            }
          }
        }
      }
    }
    .hot-sale{
      margin-bottom: 5px;
      border: 1px solid #ddd;
      .title{
        font-weight: 700;
        font-size: 14px;
        line-height: 21px;
        border-bottom: 1px solid #ddd;
        background: #f1f1f1;
        color: #333;
        margin: 0;
        padding: 5px 0 5px 15px;
      }
      .hot-list{
        padding: 15px;
        ul{
          display:flex;
          li{
            width:25%;
            height: 100%;
            .list-wrap{
              .p-img,.price,.attr,.commit{
                padding-left: 15px;
              }
              .p-img{
                img{
                  max-width: 100%;
                  vertical-align: middle;
                  border: 0;
                }
              }
              .attr{
                width: 85%;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
              }
              .price{
                font-size: 18px;
                color: #c81623;
                strong{
                  font-weight: 700;
                  i{
                    //margin-left: -5px;
                  }
                }
              }
              .commit{
                height:22px;
                font-size: 13px;
                color: #a7a7a7;
              }
            }
          }
        }
      }
    }
  }
}
</style>