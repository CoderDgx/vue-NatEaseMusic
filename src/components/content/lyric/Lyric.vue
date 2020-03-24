<template>
  <scroll ref="scroll" class="middle-r" :data="lrcs">
    <div class="lyric-wrapper">
      <div v-if="hasLrc === 1"
           ref="lyricLine"
           class="text"
           v-for="(item, index) in lrcs"
           :class="{current: activeIndex === index}">
        {{item.lrc}}
      </div>
      <div class="text" v-if="hasLrc === 2">纯音乐，请欣赏</div>
      <div class="text" v-if="hasLrc === 0">歌词加载中, 请稍等...</div>
      <div class="text" v-if="hasLrc === 3">暂无歌词</div>
    </div>
  </scroll>
</template>

<script>
  import { getLyric } from "api/singer";
  import Scroll from "components/common/scroll/Scroll";
  export default {
    name: "Lyric",
    components: {
      Scroll
    },
    data() {
      return {
        lrcs: [],
        t: null,
        hasLrc: 0,
        lrcLists: null
      }
    },
    props: {
      songId: {
        type: Number,
        defalut: 0
      },
      currentT: {
        type: Number,
        defalut: 0
      }
    },
    created() {
      this.initLrc()
    },
    methods: {
      initLrc() {
        getLyric(this.songId).then(res => {
          if (res.nolyric) {
            this.hasLrc = 2
            return
          }
          if (res && res.lrc.lyric) {
            let lrcs = res.lrc.lyric
            this.hasLrc = 1
            this.lrcs = this.parseLrc(lrcs)
            return
          }
          this.hasLrc = 3
        })
      },
      parseLrc (lrc) {
        /* eslint-disable */
        if (!lrc) return ''
        const lyrics = lrc.split('\n')
        let lrcObj = []
        for (let i = 0; i < lyrics.length; i++) {
          // 解码
          const lyric = decodeURIComponent(lyrics[i])
          const timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g
          const timeRegExpArr = lyric.match(timeReg)
          if (!timeRegExpArr) continue
          const clause = lyric.replace(timeReg, '')
          for (let k = 0, h = timeRegExpArr.length; k < h; k++) {
            const t = timeRegExpArr[k]
            let min = Number(String(t.match(/\[\d*/i)).slice(1))
            let sec = Number(String(t.match(/\:\d*/i)).slice(1))
            const time = min * 60 + sec
            // lrcObj[time] = clause
            lrcObj.push({
              t: time,
              lrc: clause
            })
          }
        }
        return lrcObj
      },
      scrollLrc () {
        if (this.activeIndex < 0 ) return
        if (this.activeIndex > 7) {
          let LineEL = this.$refs.lyricLine[this.activeIndex - 7]
          this.$refs.scroll.scrollToElement(LineEL, 1000)
        } else {
          this.$refs.scroll.scrollTo(0, 0, 1000)
        }
        this.$emit('playingLrc', this.lrcs[this.activeIndex].lrc);
      }
    },
    computed: {
      activeIndex () {
        let activeIndex = -1
        for (let i = 0; i < this.lrcs.length; i++) {
          if (this.currentT > this.lrcs[i].t) {
            activeIndex = i
          } else {
            break
          }
        }
        return activeIndex
      }
    },
    watch: {
      songId: {
        immediate: true,
        handler: function (val, oldVal) {
          this.hasLrc = 0
          this.initLrc()
        }
      },
      activeIndex (n) {
        this.scrollLrc()
      }
    },

    mounted () {
      this.lrcLists = document.getElementsByClassName('lrc-list')
      this.scrollLrc()
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/variable';

  .middle-r {
    display: inline-block;
    vertical-align: top;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .lyric-wrapper {
      width: 80%;
      margin: 0 auto;
      overflow: hidden;
      text-align: center;

      .text {
        line-height: 32px;
        color: $color-theme-l;
        font-size: $font-size-medium;

        &.current {
          color: $color-theme;
          font-size: $font-size-large
        }
      }
    }
  }
</style>
