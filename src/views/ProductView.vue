<template>
  <div class="store">
    <div class="cards">
      <div class="cardItem" v-for="item in productList" :key="item.id">
        <h6>{{ item.title }}</h6>
        <div class="cardImg">
          <img v-if="item.thumbnail" :src="item.thumbnail" :alt="item.title">
          <div v-else></div>
        </div>
      </div>
    </div>
    <div>
      商品總數：{{ total }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'StoreView',
  data(){
    return {
      productList: [],
      total: 0
    }
  },
  mounted(){
    this.fetchProduct()
  },
	methods:{
    fetchProduct(){
      this.productList = []
      this.$store.commit('updateSiteLoad', true)
      fetch(`${this.$store.state.publicURL}/data/products.json`).catch(error=>{
          console.error(error)
      }).then(res=>{
          return res.json()
      }).then(json=>{
          if(json){
            this.total = json.total
            this.productList = json.products
          }else{
              console.error('異常')
          }
      }).finally(()=>{
          this.$store.commit('updateSiteLoad', false)
      })
    }
  }
}
</script>

<style lang="scss">
  .cards{
    display: inline-flex;
    flex-wrap: wrap;
    gap: 1%;
    .cardItem{
      flex-basis: 32%;
      .cardImg{
        box-sizing: border-box;
        position: relative;
        >*{
          overflow: hidden;
          border-radius: 1rem;
        }
        >div{
          position: absolute;
          top:0;
          left: 0;
          width: 100%;
          padding-top: 100%;
          background-color: #ddd;
          &::before{
            content: 'No images';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
        img{
          width: 100%;
        }
      }
    }
  }
</style>
