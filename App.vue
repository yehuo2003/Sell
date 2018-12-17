<template>
  <div>
    <div class="header">
      <v-header :seller="seller"></v-header>
    </div>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>      
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>      
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>      
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>
<script>
import header from './components/header/header.vue';
export default {
  data() {
    return {
      seller: {}
    }
  },
  created() {
    this.$http.get('http://127.0.0.1:3000/seller').then((result) => {
      this.seller = result.data;
    })
  },
  components:{
    'v-header':header
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"
  // .tab
  //   display:flex
  //   width: 100%
  //   height: 40px
  //   border-bottom: 1px solid rgba(7, 17, 27, .1)
   .tab{
    display:flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
    position: relative;
    left: 0;
    bottom: 0;
    width: 100%;
    border-top: 1px solid rgba(7, 17, 27, .1);
    content: '';
  }
  .tab .tab-item{
    flex:1;
    text-align: center;
  }
  .tab .tab-item a{
    display: block;
    text-decoration: none;
    font-size: 14px;
    color:rgb(77, 85, 93)
  }
  .tab .tab-item a.active{
    color:rgb(240,20,20)
  } 
</style>
