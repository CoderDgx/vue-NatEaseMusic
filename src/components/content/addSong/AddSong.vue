<template>
  <transition name="slide">
    <div class="add-song" v-show="showFlag" @click.stop>
      <div class="header">
        <h1 class="title">添加歌曲到列表</h1>
        <div class="close" @click="hide">
          <i class="icon-close"></i>
        </div>
      </div>
      <div class="search-box-wrapper">
        <search-box ref="searchBox" @query="onQueryChange" placeholder="搜索歌曲"></search-box>
      </div>
      <div class="shortcut" v-show="!query">
        <switches :switches="switches" :currentIndex="currentIndex" @switch="switchItem"></switches>
        <div class="list-wrapper">
          <scroll ref="songList" class="list-scroll" v-if="currentIndex===0" :data="playHistory">
            <div class="list-inner-b">
              <song-list :songs="playHistory" @select="selectSong"></song-list>
            </div>
          </scroll>
          <scroll
            ref="searchList"
            class="list-scroll"
            v-if="currentIndex===1"
            :data="searchHistory"
            :refreshDelay="refreshDelay"
          >
            <div class="list-inner">
              <search-list
                @delete="deleteSearchHistory"
                @select="addQuery"
                :searches="searchHistory"
              ></search-list>
            </div>
          </scroll>
        </div>
      </div>
      <div class="search-result" v-show="query">
        <suggests :query="query" :showSinger="showSinger" @select="selectSuggest" @listScroll="blurInput"></suggests>
      </div>
      <top-tip ref="topTip">
        <div class="tip-title">
          <i class="icon-ok"></i>
          <span class="text">1首歌曲已经添加到播放队列</span>
        </div>
      </top-tip>
    </div>
  </transition>
</template>

<script>
  import SearchBox from "components/common/searchBox/SearchBox";
  import Suggests from "components/content/suggests/Suggests";
  import Switches from "components/common/switches/Switches";
  import Scroll from "components/common/scroll/Scroll";
  import SongList from "components/common/songList/SongList";
  import SearchList from "components/common/searchList/SearchList";
  import TopTip from "components/common/topTip/TopTip";

  import { mapGetters, mapActions } from 'vuex'

  import { searchMixin } from "assets/js/mixin";

  export default {
    name: "AddSong",
    mixins: [searchMixin],
    components: {
      SearchBox,
      Suggests,
      Switches,
      Scroll,
      SongList,
      SearchList,
      TopTip
    },
    computed: {
      ...mapGetters(['playHistory'])
    },
    data() {
      return {
        showFlag: false,
        showSinger: false,
        currentIndex: 0,
        switches: [{ name: '最近播放' }, { name: '搜索历史' }]
      }
    },
    methods: {
      show() {
        this.showFlag = true
        setTimeout(() => {
          if (this.currentIndex === 0) {
            this.$refs.songList.refresh()
          } else {
            this.$refs.searchList.refresh()
          }
        }, 20)
      },
      hide() {
        this.showFlag = false
      },
      selectSuggest() {
        this.saveSearch()
        this.showTip()
      },
      switchItem(index) {
        this.currentIndex = index
      },
      selectSong(song, index) {
        if (index !== 0) {
          this.insertSong(song)
          this.showTip()
        }
      },
      showTip() {
        this.$refs.topTip.show()
      },
      ...mapActions(['insertSong'])
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/variable';
  @import '~assets/stylus/mixin';

  .add-song {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 200;
    background: $color-background;

    &.slide-enter-active, &.slide-leave-active {
      transition: all 0.3s;
    }

    &.slide-enter, &.slide-leave-to {
      transform: translate3d(100%, 0, 0);
    }

    .header {
      position: relative;
      height: 44px;
      text-align: center;

      .title {
        line-height: 44px;
        font-size: $font-size-large;
        color: $color-theme;
      }

      .close {
        position: absolute;
        top: 0;
        right: 8px;

        .icon-close {
          display: block;
          padding: 12px;
          font-size: 20px;
          color: $color-theme;
        }
      }
    }

    .search-box-wrapper {
      margin: 20px;
    }

    .shortcut {
      .list-wrapper {
        position: absolute;
        top: 165px;
        bottom: 0;
        width: 100%;

        .list-scroll {
          height: 100%;
          overflow: hidden;

          .list-inner {
            padding: 20px 30px;
            background-color: $color-theme;
          }

          .list-inner-b {
            padding: 20px 30px;
          }
        }
      }
    }

    .search-result {
      position: fixed;
      top: 124px;
      bottom: 0;
      width: 100%;
    }

    .tip-title {
      text-align: center;
      padding: 18px 0;
      font-size: 0;

      .icon-ok {
        font-size: $font-size-medium;
        color: $color-theme;
        margin-right: 4px;
      }

      .text {
        font-size: $font-size-medium;
        color: $color-theme;
      }
    }
  }
</style>
