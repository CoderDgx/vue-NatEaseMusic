<template>
  <div id="singer">
    <div class="content" :class="{'player': isPlayer === true}">
      <tab-menu :categories="categories"
                @selectItem="selectItem"/>
      <scroll id="tab-content"
              ref="scroll"
              :data="singers"
             >
        <div>
          <tab-content-singer :subcategories="singers" @selectSinger="selectSinger"/>
        </div>
      </scroll>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import {getSingerList} from "api/singer";
  import {playlistMixin} from "assets/js/mixin";

  import TabMenu from "components/content/tabMenu/TabMenu";
  import Scroll from "components/common/scroll/Scroll";
  import TabContentSinger from "components/content/tabContentSinger/TabContentSinger";
  import { mapMutations } from 'vuex'

  export default {
    name: "Singer",
    components: {
      TabMenu,
      Scroll,
      TabContentSinger
    },
    mixins:[playlistMixin],
    data() {
      return {
        categories: [
          {name: '入驻歌手', cat: '5001'},
          {name: '华语男歌手', cat: '1001'},
          {name: '华语女歌手', cat: '1002'},
          {name: '华语组合/乐队', cat: '1003'},
          {name: '欧美男歌手', cat: '2001'},
          {name: '欧美女歌手', cat: '2002'},
          {name: '欧美组合/乐队', cat: '2003'},
          {name: '日本男歌手', cat: '6001'},
          {name: '日本女歌手', cat: '6002'},
          {name: '日本组合/乐队', cat: '6003'},
          {name: '韩国男歌手', cat: '7001'},
          {name: '韩国女歌手', cat: '7002'},
          {name: '韩国组合/乐队', cat: '7003'}],
        singers: [],
        currentIndex: 0,
        id: 0,
        isPlayer: false
      }
    },
    activated() {
      this.$refs.scroll.refresh()
    },
    created() {
      this._getList(5001, 90)
    },
    methods: {
      handlePlaylist(playlist) {
        if(playlist.length > 0) {
          this.isPlayer = true
        }
      },
      _getList(cat, limit) {
        getSingerList(cat, limit).then(res =>{
          //console.log(res);
          this.singers = res.artists
        })
      },
      selectItem(index) {
        this.currentIndex = index
        this._getList(this.categories[this.currentIndex].cat, 90)
      },
      selectSinger(singer) {
        //console.log(singer);
        this.$router.push({
          path: `/singer/${singer.id}`
        })
        this.setSinger(singer)
      },

      ...mapMutations({
        setSinger: 'SET_SINGER'
      }),
    }
  }
</script>

<style scoped  lang='stylus' rel='stylesheet/stylus'>
  @import '~assets/stylus/variable'

  #singer {
    height: 100vh;

    .content {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 88px;
      display: flex;

      &.player {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 60px;
        top: 88px;
        display: flex;
      }

        #tab-content {
          height: 100%;
          flex: 1;
          overflow: hidden;
        }
    }
  }
</style>
