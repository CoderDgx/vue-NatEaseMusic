<template>
  <div class="rank" ref="rank">
    <scroll class="toplist" :data="topList" ref="toplist">
      <ul>
        <li class="item" v-for="(item, index1) in topList" :key="index1" @click="selectItem(item)">
          <div class="icon">
            <img width="100" height="100" v-lazy="item.coverImgUrl" />
          </div>
          <ul class="songlist">
            <li class="song" v-for="(song, index2) in topSongs[index1]" :key="index2">
              <span>{{index2 + 1}}</span>
              <span>{{song.name}}--{{song.ar[0].name}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="loading-container" v-show="!topList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
  import { getRank } from "api/rank";
  import { mapMutations } from 'vuex'
  import Scroll from "components/common/scroll/Scroll";
  import Loading from "components/common/loading/Loading";
  import { playlistMixin } from 'assets/js/mixin'

  export default {
    name: "Rank",
    mixins: [playlistMixin],
    components: {
      Scroll,
      Loading
    },
    data() {
      return{
        categories:[
          {name: '云音乐新歌榜', idx: '0'},
          {name: '云音乐热歌榜', idx: '1'},
          {name: '网易原创歌曲榜', idx: '2'},
          {name: '云音乐飙升榜', idx: '3'},
          {name: '云音乐电音榜', idx: '4'},
          {name: 'UK排行榜周榜', idx: '5'},
          {name: '美国Billboard周榜', idx: '6'},
        ],
        topList: [],
        topSongs: [],
      }
    },
    created() {
      for(let i = 0; i < 7; i++){
        this._getRank(i)
      }
    },
    methods: {
      handlePlaylist(playlist) {
        const bottom = playlist.length ? '60px' : ''
        this.$refs.rank.style.bottom = bottom
        this.$refs.toplist.refresh()
      },
      _getRank(idx) {
        getRank(idx).then(res => {
          this.topList.push(res.playlist)
          let topSong = []
          for(var i = 0; i < 3; i++){
            topSong.push(res.playlist.tracks[i])
          }
          this.topSongs.push(topSong)
        })
      },
      selectItem(item) {
        this.$router.push({
          path: `/rank/${item.id}`
        })
        this.setTopList(item)
      },
      ...mapMutations({
        setTopList: 'SET_TOP_LIST'
      })
    },
    computed:{
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/variable';
  @import '~assets/stylus/mixin';

  .rank {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;

    .toplist {
      height: 100%;
      overflow: hidden;

      .item {
        display: flex;
        margin: 0 20px;
        padding-top: 20px;
        height: 100px;

        &:last-child {
          padding-bottom: 20px;
        }

        .icon {
          flex: 0 0 100px;
          width: 100px;
          height: 100px;
        }

        .songlist {
          display: flex;
          flex: 1;
          flex-direction: column;
          justify-content: center;
          padding: 0 20px;
          height: 100px;
          overflow: hidden;
          background: $color-highlight-background;
          color: $color-theme;
          font-size: $font-size-small;

          .song {
            no-wrap();
            line-height: 26px;
          }
        }
      }

      .loading-container {
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
</style>
