<template>
  <div class="home">
    首頁
    <div>
      <div v-for="item in videos">
        <p>{{ item.name }} | {{ item.musician }}</p>
        <audio controls>
          <source :src="getSrc(item.video)" type="audio/mpeg">
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    // HelloWorld
  },
  data(){
    return {
      //https://pixabay.com/music/search/music%20demo/?__cf_chl_tk=seZhgpAt5sLYS9DvzS.dDOmbGDTHkJ..cIV5NvgwOnc-1694698491-0-gaNycGzNC1A
      videos: [
        {name: 'Miracle', musician: 'spoot', video: 'miracle-11151.mp3'},
        {name: 'Vlog Hip-Hop', musician: 'Anton_Vlasov', video: 'vlog-hip-hop-18447.mp3'},
      ]
    }
  },
  methods:{
    getSrc(src) {
      return require("../assets/video/" + src)
    }
  }
}
</script>
