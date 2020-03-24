<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"/>
  </transition>
</template>

<script>
  import { getSong } from "api/singer";
  import { mapGetters } from 'vuex'

  import MusicList from "../musicList/MusicList";

  export default {
    name: "SingerDetail",
    components: {
      MusicList
    },
    data() {
      return {
        title: '',
        bgImage: '',
        songs: []
      }
    },
    computed: {
      ...mapGetters([
        'singer'
      ])
    },
    created() {
      this._getSong(this.singer.id)
    },
    methods: {
      _getSong(id) {
        if(!this.singer.id) {
          this.$router.push('/singer')
          return
        }
        getSong(id).then(res => {
          //console.log(res);
          this.title = res.artist.name
          this.bgImage = res.artist.img1v1Url
          this.songs = res.hotSongs
        })
      }
    },
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/variable';

  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s;
  }

  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
</style>
