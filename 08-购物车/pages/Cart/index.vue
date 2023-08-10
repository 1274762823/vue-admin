<script>
import {defineComponent} from 'vue'
import {mapGetters} from "vuex";
import {mapActions} from "vuex";
import {checkAll} from "@/api/cart";

export default defineComponent({
  name: "Cart",
  data(){
    return{
      num:1
    }
  },
  computed:{
    ...mapGetters('cart',['countPrice'])
  },
  mounted() {
    this.addCart();
  },
  methods:{
    //全选
    chooseAllCheck(e){
      const isChecked = e.target.checked?1:0;
      this.$store.dispatch('cart/checkAllAsync',isChecked)
    },

    ...mapActions('cart',['addCart','goCartAccountAsync']),
    // 数量减
    changeAccountMins(skuId,skuNum){
       if(skuNum  <= 1) return
        this.goCartAccountAsync({
          skuId,
          skuNum:-1
        })
     // const info =  this.$store.state.cart.cartList.find(v=>v.skuId === skuId)
     //  console.log(info.skuNum)


    },
    // 数量加
    changeAccountPlus(skuId,skuNum){
      if(skuNum  >= 200) return
      this.goCartAccountAsync({
        skuId,
        skuNum:1
      })
    },

  }
})
</script>

<template>
  <!-- 购物车列表 -->
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th4">单价</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">


        <ul class="cart-list" v-for="item in $store.state.cart.cartList" :key="item.skuId">
          <li class="cart-list-con1">
            <input @change="$store.dispatch('cart/changeCartCheckedAsync',{
              skuID:item.skuId,
              isChecked:item.isChecked === 1 ? 0 : 1
            })" type="checkbox" name="chk_list" :checked="item.isChecked">
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl">
            <div class="item-msg">{{ item.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ item.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a  href="javascript:void(0)" class="mins" @click="changeAccountMins(item.skuId,item.skuNum)">-</a>
            <input  autocomplete="off" type="text" :value="item.skuNum" minnum="1" class="itxt">
            <a href="javascript:void(0)" class="plus" @click="changeAccountPlus(item.skuId,item.skuNum)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ item.skuPrice * item.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a @click="$store.dispatch('cart/defaultOneAsync',item.skuId)" href="#none" class="sindelet">删除</a>
            <br>
          </li>
        </ul>

      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input @click="chooseAllCheck" :checked="$store.state.cart.cartList.every(v=>v.isChecked)" class="chooseAll" type="checkbox">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="$store.dispatch('cart/deleteCheckedAsync')" href="#none">删除选中的商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{ $store.state.cart.cartList.reduce((pre,item)=>{
              return pre+item.isChecked
            },0)}}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ countPrice.price }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }


      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>