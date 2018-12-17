<template>
  <div class="cartcon">
    <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0">-</div>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="addCart(event)">+</div>
  </div> 
</template>
<script>
  import Vue from 'vue';

  export default {
    props: {
      food: {
        type: Object
      }
    },
    mounted: {
      addCart(event) {        
        if(!event._constructed) {
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food,'count', 1);
        } else {
          this.food.count ++;
        }
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .cartcon .cart-decrease, .cart-add{
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px; 
    color: rgb(0,160,220);     
  }
  .cartcon .cart-count{
    display: inline-block;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
  .cartcon .cart-add{
    display: inline-block;

  }
</style>