<template>
  <Scroll class="suggest"
          ref="suggest"
          :data="resultSongs&&resultSingers"
          :beforeScroll="beforeScroll"
          @beforeScroll="listScroll"
          >
    <ul class="suggest-list">
      <li class="suggest-item"
          v-for="item in resultSingers"
          @click="selectSinger(item)"
          v-show="showSinger"
      >
        <div class="icon">
          <i class="icon-mine"></i>
        </div>
        <div class="name">
          <p class="text">
            {{ item.name }}
          </p>
        </div>
      </li>
      <li class="suggest-item"
          v-for="item in resultSongs"
          @click="selectSong(item)"
          >
        <div class="icon">
          <i class="icon-music"></i>
        </div>
        <div class="name">
          <p class="text">
            {{ item.name }}-{{ item.artists[0].name }}
          </p>
        </div>
      </li>
    </ul>
    <div class="no-result-wrapper" v-show="!resultSingers.length && !resultSongs.length">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </Scroll>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";
  import NoResult from "components/common/noResult/NoResult";

  import { search, getSongDetail } from "api/search";
  import { mapMutations, mapActions } from 'vuex'

  export default {
    name: "Suggests",
    props: {
      query: {
        type: String,
        default: ''
      },
      showSinger: {
        type: Boolean,
        default: true
      }
    },
    components:{
      Scroll,
      NoResult
    },
    data() {
      return {
        resultSongs: [],
        resultSingers: [],
        beforeScroll: true,
      }
    },
    methods:{
      _search() {
        if(!this.query){
          return
        }
        search(this.query, 90, 1).then(res => {
          this.resultSongs = res.result.songs
        })
        if(this.showSinger) {
          search(this.query, 10, 100).then(res => {
            this.resultSingers = res.result.artists
          })
        }
      },
      selectSinger(singer) {
        this.$router.push({
          path: `/search/${singer.id}`
        })
        this.setSinger(singer)
        this.$emit('selectSinger')
      },
      selectSong(song) {
        getSongDetail(song.id).then(res => {
          this.insertSong(res.songs[0])
        })
        this.$emit('selectSong')
      },
      listScroll() {
        this.$emit('listScroll')
      },
      refresh() {
        this.$refs.suggest.refresh()
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      }),
      ...mapActions(['insertSong'])
    },
    watch: {
      query() {
        this._search()
      },
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/variable';
  @import '~assets/stylus/mixin';

  .suggest {
    height: 100%;
    overflow: hidden;

    .suggest-list {
      padding: 0 30px;

      .suggest-item {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
      }

      .icon {
        flex: 0 0 30px;
        width: 30px;

        [class^='icon-'] {
          font-size: 14px;
          color: $color-background;
        }
      }

      .name {
        flex: 1;
        font-size: $font-size-medium;
        color: $color-background;
        overflow: hidden;

        .text {
          no-wrap();
        }
      }
    }

    .no-result-wrapper {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
</style>
