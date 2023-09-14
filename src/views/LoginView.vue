<template>
	<input type="email" v-model="email"/>
	<input type="password" v-model="pswdddv"/>
	<button @click.prevent="emailSignin">登入</button>
    <hr>
    <button @click.prevent="googleSignin">Google登入</button>
</template>

<script>
export default {
  	name: 'login',
	data () {
		return {
			email:'',
			pswdddv:'',
		}
	},
	methods:{
    	emailSignin(){
            this.$store.commit('updateSiteLoad', true)
            fetch(`${this.$store.state.baseURL}/getConfirmMember.php`,{
                method:'POST',
                credentials: "include",
                body: new URLSearchParams({
                    mem_account: this.email,
                    mem_psw: this.pswdddv
                })
            }).catch(error=>{
                console.error(error)
            }).then(res=>{
                return res.json()
            }).then(json=>{
                if(json){
                    if(json.code == 1){
                        this.$store.commit('updateUseInfo', json.memInfo)
                        this.$router.push('/')
                    }
                    alert(json.msg)
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