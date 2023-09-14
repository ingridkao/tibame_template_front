<template>
  <h6>訂單記錄</h6>
  <div class="order">
    <table >
      <tr>
        <th>商品編號</th>
        <th>商品名稱</th>
        <th>小計</th>
        <th>訂單成立時間</th>
      </tr>
      <tr v-for="item in orderList" :key="item.ord_id">
        <td>{{ item.ord_id }}</td>
        <td>{{ item.prod_name }}</td>
        <td>{{ item.ord_sum }}元</td>
        <td>{{ item.ord_date }}</td>
      </tr>
    </table>
    <div>
      合計 {{ orderCount }} 筆訂單紀錄
    </div>
  </div>
</template>

<script>
export default {
  name: 'ＭemberView',
  data(){
    return {
      orderList: []
    }
  },
  computed:{
    orderCount(){
      return this.orderList.length
    },
  },
  mounted(){
    this.fetchOrder()
  },
	methods:{
    fetchOrder(){
      this.orderList = []
      this.$store.commit('updateSiteLoad', true)
      fetch(`${this.$store.state.baseURL}/postmemOrderlists.php`).catch(error=>{
        console.error(error)
      }).then(res=>{
        return res.json()
      }).then(json=>{
        if(json && json.status === 10010){
          alert(json.msg)
          this.$router.push('/login')
        }else if(json && json.list){
          this.orderList = json.list
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
</style>
