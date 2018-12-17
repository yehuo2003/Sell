<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,$index) of goods" :key="item.id" class="menu-item" :class="{'current':currentIndex===$index}" @click="selectMenu($index,$event)">
          <span class="text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]">
            </span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item of goods" :key="item.id" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food of item.foods" :key="food.id" class="food-item">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>    
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcon-wrapper">
                  <v-cartcon :food="food"></v-cartcon>
                </div>
              </div>    
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <v-shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></v-shopcart>
  </div>
</template>
<script>
  import BScroll from 'better-scroll';
  import shopcart from '../../components/shopcart/shopcart.vue';
  import cartcon from '../../components/cartcon/cartcon.vue';

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0
      };
    },
    computed: {
      currentIndex() {
        for(let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      }
    },
    created() {
      this.classMap = ['decrease','discount','guarantee','invoice','special'];
      this.$http.get('http://127.0.0.1:3000/goods').then((result)=>{
        this.goods = result.data; 
         this.$nextTick(() => {
          //初始化滚动条
          this._initScroll();
          this._calculateHeight();                 
        })              
      })    
    },
    methods: {
      selectMenu(index, event) {
        if(!event._constructed){
          return;
        }
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      },
      _initScroll() {
        this.meunScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        });

        this.foodsScroll.on('scroll',(pos)=>{
          this.scrollY = Math.abs(Math.round(pos.y));
        })
      },
      _calculateHeight() {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for(let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      }
    },
    components:{
    'v-shopcart':shopcart,
    'v-cartcon':cartcon
   }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin";
 
  .goods{
    display: flex;
    position: absolute;
    top: 174px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
  }
// 左边菜单栏
  .goods .menu-wrapper{
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;
  }
  .goods .menu-item{
    display: table;
    height: 54px;
    width: 56px;
    padding: 0 12px;
    line-height: 14px;   
  }
  .goods .current{
    position: absolute;
    z-index: 10;
    margin-top: -1px;
    background: #fff;
    font-weight: 700;   
  }
  .goods .current>.text{
    border: 0;
  }
  .goods .menu-wrapper .icon{
    display: inline-block;
    vertical-align: top;
    width: 12px;
    height: 12px;
    margin-right: 2px;
    background-size: 12px;
    background-repeat:no-repeat; 
  }
  .goods .menu-wrapper .text{
    display: table-cell;
    width: 56px;
    vertical-align: middle;
    padding-left: 5px; 
    font-size: 12px; 
    border-bottom:1px solid rgba(7,17,27,.1);

  }
  .goods .menu-wrapper .decrease{
    background-image:url('img/decrease_3@3x.png')
  }
  .goods .menu-wrapper .discount{
    background-image:url('img/discount_3@3x.png')
  }
  .goods .menu-wrapper .guarantee{
    background-image:url('img/guarantee_3@3x.png')
  }
  .goods .menu-wrapper .invoice{
    background-image:url('img/invoice_3@3x.png')
  }
  .goods .menu-wrapper .special{
    background-image:url('img/special_3@3x.png')
  }

// 右边主内容  

  .goods .foods-wrapper{
    flex: 1;
  }
  .goods .foods-wrapper .title{
    padding-left: 14px;
    height: 26px;
    line-height: 26px;
    border-left: 2px solid #d9dde1;
    font-size: 12px;
    color: rgb(147,153,159);
    background: #f3f5f7; 
  }
  .goods .foods-wrapper .food-item{
    display: flex;
    margin: 18px;
    padding-bottom: 18px; 
    border:1px solid rgba(7,17,27,.1);
    margin-bottom: 0; 
  }
  .goods .foods-wrapper .icon{
    flex: 0 0 57px;
    margin-right: 10px;
  }
  .goods .foods-wrapper .content{
    position: relative;
    flex: 1;
  }
  .goods .foods-wrapper .content .name{
    margin: 2px 0 8px 0;
    height: 14px; 
    line-height: 14px; 
    font-size: 14px;
    color: rgb(7,17,27);
  }
  .goods .foods-wrapper .content .desc{
    margin-bottom: 8px;
    line-height: 12px;
    font-size: 10px;
    color: rgb(147,153,159);
  }
  .goods .foods-wrapper .content .extra{
    line-height: 10px;
    font-size: 10px;
    color: rgb(147,153,159);
  }
  .goods .foods-wrapper .count{
    margin-right: 12px; 
  }
  .goods .foods-wrapper .price{
    font-weight: 700;
    line-height: 24px;
  }
  .goods .foods-wrapper .now{
    margin-right: 8px;
    font-size: 14px;
    color: rgb(240,20,20); 
  }
  .goods .foods-wrapper .old{
    text-decoration: line-through; 
    font-size: 10px;
    color: rgb(147,153,159); 
  }
  .goods .content .cartcon-wrapper{
    position: absolute;
    right: 0;
    bottom: -2px;
  }
</style>