<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs" :rank="rank"></music-list>
  </transition>
</template>

<script>
  import MusicList from "components/content/musicList/MusicList";
  import { mapGetters } from 'vuex'

  export default {
    name: 'TopList',
    components: {
      MusicList
    },
    created() {
      this.getMusicList()
    },
    methods: {
      getMusicList() {
        if (!this.topList.id) {
          this.$router.push('/rank')
          return
        }
        this.songs = this.topList.tracks
      }
    },
    data() {
      return {
        songs: [],
        rank: true
      }
    },
    computed: {
      title() {
        return this.topList.name
      },
      bgImage() {
        if (this.topList.tracks) {
          return this.topList.tracks[0].al.picUrl
        }
        return this.topList.coverImgUrl
      },
      ...mapGetters(['topList'])
    },
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/variable';

  .top-list {
    position: fixed;
    z-index: 100; // 子路由将之前的页面层盖住
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: $color-background;
  }

  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s;
  }

  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0); // 100% 完全移动到屏幕右侧 动画开始后向左滑入
  }
</style>

