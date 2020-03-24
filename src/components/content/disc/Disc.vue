<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
  import MusicList from "components/content/musicList/MusicList";

  import { mapGetters } from 'vuex'
  import { getSongList} from "api/recommend";

  export default {
    components: {
      MusicList
    },
    computed: {
      ...mapGetters([
        'disc'
      ]),
      title() {
        return this.disc.name
      },
      bgImage() {
        return this.disc.picUrl
      }
    },
    data() {
      return {
        songs: []
      }
    },
    created() {
      this._getSongList(this.disc.id)
    },
    methods: {
      _getSongList(id){
        if (!this.disc.id) {
          this.$router.push('/recommend') // 在歌单详情页强制刷新后，即没有获得id时，回退到推荐页面
          return
        }
        getSongList(id).then(res => {
          this.songs = res.playlist.tracks
        })
      }
    }
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

