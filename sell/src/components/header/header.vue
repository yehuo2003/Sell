<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
        <div v-if="seller.supports" class="support-count" @click="showDetail">
          <span class="count">{{seller.supports.length}}个</span>
          <i class="icon-keyboard_arrow_right">></i>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right">></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <div v-show="detailShow" class="detail" transition="fade">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <img src="../star/star36_on@3x.png">
            <img src="../star/star36_on@3x.png">
            <img src="../star/star36_on@3x.png">
            <img src="../star/star36_on@3x.png">
            <img src="../star/star36_half@3x.png">
          <!-- <star :size="48" score="3.6"></star> -->
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li class="support-item" v-for="(item,$index) in seller.supports">
              <span class="icon" :class="classMap[seller.supports[$index].type]"></span>
              <span class="text">{{seller.supports[$index].description}}</span>
            </li>
            <!-- <li>{{seller.supports[$index]}}</li> -->
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>            
          </div>
          <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="hideDetail">
        <b class="icon-close">x</b>
      </div>
    </div>
  </div>
</template>
<script>
  // import star from 'components/star/star'
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        detailShow: false
      }
    },
    methods: {
      showDetail() {
        this.detailShow = true;
      },
      hideDetail() {
        this.detailShow = false;
      }
    },
    created() {
      this.classMap = ['decrease','discount','guarantee','invoice','special']
    },
    components: {
      // star
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin";
 .header{
   position: relative;
   overflow hidden;
   color:#fff;
   background: rgba(7,17,27,.4);
 }   
 .header .content-wrapper{
   padding : 24px 12px 18px 24px;
   font-size: 0;
 }
 .header .content-wrapper .avatar{
   display: inline-block;
   vertical-align: top;   
 }
 .header .content-wrapper .avatar img{
   border-radius: 2px;
 }
 .header .content-wrapper .content{
   position: relative;
   display: inline-block;
   margin-left: 16px;
 }
 .header .content-wrapper .content .title{
   margin: 2px 0 8px 0
 }
 .header .content-wrapper .content .title .brand{
   display: inline-block;
   vertical-align: top; 
   width: 30px;
   height: 18px;
   background-image:url("brand@3x.png");
   background-size: 30px 18px;
   background-repeat:no-repeat;
 }
 .header .content-wrapper .content .title .name{
   margin-left: 6px;
   font-size: 16px;
   line-height: 18px;
   font-weight: bold;
 }
 .header .detail .bulletin{
   width: 80%;
   margin: 0 auto; 
 }
 .header .detail .bulletin .content{
   padding: 0 12px;
   line-height: 24px;
   font-size: 12px;  
 }
 .header .detail .star-wrapper{
   margin-top: 18px;
   padding: 2px 0;
   text-align: center; 
 }
 .header .star-wrapper img{
   width: 30px;
   margin: 0 5px;
 }
 .header .detail .title{
   display: flex; 
   width: 80%;
   margin: 28px auto 24px auto; 
 }
 .header .detail .title .line{
   flex: 1;
   position: relative;
   top: -6px;
   border-bottom: 1px solid rgba(255,255,255,.2); 
 }
 .header .detail .title .text{
   padding: 0 12px;
   font-weight: 700;
   font-size: 14px;    
 }
 .header .detail .supports{
   width: 80%;
   margin: 0 auto; 
 }
 .header .detail .supports .support-item{
   padding: 0 12px;
   margin-bottom: 12px;
   font-size: 0;
 }
 .header .detail .supports .support-item:last-child{
   margin-bottom: 0; 
 }
 .header .detail .supports .icon{
   display: inline-block;
   width: 16px;
   height: 16px;
   vertical-align: top;
   margin-right: 6px; 
   background-size: 16px 16px;
   background-repeat: no-repeat;
 }
 .header .detail .supports .decrease{
   background-image:url('decrease_2@3x.png')
 }
 .header .detail .supports .discount{
   background-image:url('discount_2@3x.png')
 }
 .header .detail .supports .guarantee{
   background-image:url('guarantee_2@3x.png')
 }
 .header .detail .supports .invoice{
   background-image:url('invoice_2@3x.png')
 }
 .header .detail .supports .special{
   background-image:url('special_2@3x.png')
 }
 .header .detail .supports .text{
   line-height: 16px;
   font-size: 12px;  
 }
 .header .content-wrapper .content .description{
   margin-bottom: 10px;
   line-height: 12px;
   font-size: 12px; 
 }
 .header .content-wrapper .content .support .icon{
   display: inline-block;
   vertical-align: top;
   width: 12px;
   height: 12px;
   margin-right: 4px;
   background-size: 12px;
   background-repeat:no-repeat; 
 }
 .header .content-wrapper .content .support .decrease{
   background-image:url('decrease_1@3x.png')
 }
 .header .content-wrapper .content .support .discount{
   background-image:url('discount_1@3x.png')
 }
 .header .content-wrapper .content .support .guarantee{
   background-image:url('guarantee_1@3x.png')
 }
 .header .content-wrapper .content .support .invoice{
   background-image:url('invoice_1@3x.png')
 }
 .header .content-wrapper .content .support .special{
   background-image:url('special_1@3x.png')
 }
 .header .content-wrapper .content .support .text{
   line-height: 12px;
   font-size: 10px;
 }
 .header .content-wrapper .content .support-count{
   position: absolute;
   right: -64px;
   bottom: 0;
   padding: 0 8px;
   height: 24px;
   line-height: 24px;
   border-radius: 14px;
   background: rgba(0,0,0,.2);
   text-align: center; 
 }
 .header .content-wrapper .content .support-count .count{
   vertical-align: top;
   font-size: 10px;
 }
 .header .content-wrapper .content .icon-keyboard_arrow_right{
   margin-left: 2px;
   line-height: 24px; 
   font-size: 10px;
 }
 .header .bulletin-wrapper{
   position: relative;
   height: 28px; 
   line-height: 28px;
   padding: 0 22px 0 12px;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
   background: rgba(7,17,27,.2); 
 }
 .header .bulletin-wrapper .bulletin-title{
   display: inline-block;
   vertical-align: top;
   margin-top: 8px;
   width: 22px;
   height: 12px;
   background-image:url('bulletin@3x.png');
   background-size: 22px 12px;
   background-repeat: no-repeat;
 }
 .header .bulletin-wrapper .bulletin-text{
   vertical-align: top;
   margin: 0 4px;   
   font-size: 10px;
 }
 .header .bulletin-wrapper .icon-keyboard_arrow_right{
   position: absolute;
   font-size: 10px;
   right: 12px;
   top: 8px;
 }
 .background{
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   z-index: -1; 
   filter: blur(10px);
 }
 .header .detail{
   position: fixed;
   z-index: 100;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   overflow: auto;
   background: rgba(7,17,27,.8);
   backdrop-filter: blur(10px); 
 }
 .detail-wrapper{
   width: 100%
   min-height: 100%;  
 }
 .header .detail-wrapper .detail-main{
   margin-top: 64px;
   padding-bottom: 64px; 
 }
 .header .detail-wrapper .detail-main .name{
   line-height: 16px;
   text-align: center;
   font-size: 16px;
   font-weight: 700;
 }
 .header .detail .detail-close{
   position: relative;
   width: 32px;
   height: 32px;
   margin: -64px auto 0 auto;
   clear: both;
   font-size: 32px;
 }
</style>