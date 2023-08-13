<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "PageNation",
  props:['continue','total','pageNo','pageSize'],
  computed:{
    totals(){
      return Math.ceil(this.total / this.pageSize)
    },
    countStartEnd(){
      let start = 0;
      let end = 0;
      if(this.continue>this.totals){
        start = 1;
        end=this.totals;
      }else{
        start = this.pageNo - (this.continue-1)/2; //14
        end = this.pageNo + (this.continue-1)/2;    //18
      }
      if(start<1){
        start=1;
        end = start + this.continue -1
      }
      if(end>this.totals){
        end=this.totals;
        start=this.totals-this.continue+1
      }
      return {start,end}
    },

  }
})
    
</script>

<template>
  <div class="pagination">
    <button @click="$emit('changeSorte',pageNo-1)" :disabled="pageNo===1">上一页</button>
    <button @click="$emit('changeSorte',1)" v-show="countStartEnd.start>1">1</button>
    <span v-show="countStartEnd.start>2">···</span>

    <button
        @click="$emit('changeSorte',countStartEnd.start+page-1)"
        v-for="page in (countStartEnd.end-countStartEnd.start+1)"
        :key="page"
        :class="{active:(pageNo === countStartEnd.start+page-1)}"
    >
      {{countStartEnd.start+page-1}}
    </button>
<!--    <button>15</button>-->
<!--    <button class="active">16</button>-->
<!--    <button>17</button>-->
<!--    <button>18</button>-->

    <span v-show="totals>countStartEnd.end+1">···</span>
    <button @click="$emit('changeSorte',totals)" v-show="totals>countStartEnd.end">{{totals}}</button>
    <button @click="$emit('changeSorte',pageNo-1)" :disabled="pageNo===countStartEnd.end">下一页</button>

    <span>共 {{ total }} 条</span>
  </div>
</template>

<style scoped lang="less" >
.pagination {
  text-align: center;

  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: gray;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #c81623;
      color: #fff;
    }
  }

  span {
    display: inline-block;
    line-height: 28px;
    font-size: 14px;
    color: gray;
    vertical-align: middle;
  }
}
</style>