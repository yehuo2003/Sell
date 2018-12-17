<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totaCount>0}">
            <span class="icon-shopping_cart" :class="{'highlight':totaCount>0}"></span>
          </div>
          <div class="num" v-show="totaCount>0" :class="{'bgnum':totaCount>0}">{{totaCount}}</div>
        </div>
        <div class="price" :class="{'highli':totaCount>0}">￥ {{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">
          {{payDese}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [
            {
              price: 10,
              count: 2
            }
          ];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {}
    },
    computed: {
      totalPrice() {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      totaCount() {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      payDese() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;
        }else if(this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}元起送`;
        }else{
          return '去结算';
        }
      },
      payClass() {
        if(this.totalPrice < this.minPrice) {
          return 'not';
        }else{
          return 'enough';
        }
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .shopcart{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
    background: #000;
  }
  .shopcart .content{
    display: flex;
    background: #141d27;
    font-size: 0;
    color: rgba(255,255,255,.4);
  }
// 左边样式
  .shopcart .content-left{
    flex: 1;
  }
  .shopcart .content-left .logo-wrapper{
    display: inline-block;
    vertical-align: top;
    position: relative;
    top: -8px;
    margin: 0 5px;
    padding: 6px;
    width: 50px;
    height: 50px;
    box-sizing: border-box;
    border-radius: 50%;
    background: #141d27;
  }
  .shopcart .content-left .logo{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #2b343c;
  }
  .shopcart .content-left .highlight{
    background: rgb(0,160,220);
  }
  .shopcart .content-left .num{
    position absolute;
    top: 0;
    right: 0;
    width: 24px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    border-radius: 16px;
    font-size: 9px;
    font-weight: 700;
    color: #fff;
    background: rbb(240,20,20);
    box-shadow: 0 4px 8px 0 rgba(0,0,0,.4);
  }
  .shopcart .content-left .bgnum{
    background: red;
  }
  .shopcart .content-left .icon-shopping_cart{
    font-size: 24px;
    line-height: 44px;
    color: #80858a;  
  }
  .shopcart .icon-shopping_cart::after{
    color: #fff;
  }
  .shopcart .content-left .price{
    display: inline-block;
    vertical-align: top;
    line-height: 24px;
    margin-top: 12px;
    padding-right: 12px;
    box-sizing: border-box;
    border-right: 1px solid rgba(255,255,255,.1);
    font-size: 16px;
    font-weight: 700;
  }
  .shopcart .content-left .highli{
    color: #fff;
  }
  .shopcart .content .desc{
    display: inline-block;
    vertical-align: top;    
    margin: 12px 0 0 12px;
    line-height: 24px;
    font-size: 10px;
    position: absolute;
  }
  .shopcart .content-right{
    flex: 0 0 105px;
    width: 105px;
  }

// 右边样式
  .shopcart .content-right .pay{
    height: 48px;
    line-height: 48px;
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    background: #2b343c; 
  }
  .shopcart .content-right .not{
    background #2b333b;
  }
  .shopcart .content-right .enough{
    background #00b43c;
    color: #fff;
  }
</style>