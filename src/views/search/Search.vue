<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>
    <div class="shortcut-wrapper" v-show="!query" ref="shortcutWrapper">
      <scroll class="shortcut" :refreshDelay="refreshDelay" ref="shortcut" :data="shortcut">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li @click="addQuery(item.first)"
                  class="item"
                  v-for="item in hotKey">
                <span>{{ item.first }}</span>
              </li>
            </ul>
          </div>
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click="showConfirm">
                  <i class="icon-clear"></i>
              </span>
            </h1>
            <search-list :searches="searchHistory" @select="addQuery" @delete="deleteSearchHistory"></search-list>
          </div>
        </div>
      </scroll>
    </div>
    <div class="search-result" v-show="query" ref="searchResult">
      <suggests
        :query="query"
        ref="suggest"
        @listScroll="blurInput"
        @selectSinger="saveSearchSinger"
        @selectSong="saveSearchSong"></suggests>
    </div>
    <confirm ref="confirm" text="是否清空所有搜索历史" confirmBtnText="清空" @confirm="clearSearchHistory"></confirm>
    <router-view></router-view>
  </div>
</template>

<script>
  import SearchBox from "components/common/searchBox/SearchBox";
  import Suggests from "components/content/suggests/Suggests";
  import SearchList from "components/common/searchList/SearchList";
  import Confirm from "components/common/confirm/Confirm";
  import Scroll from "components/common/scroll/Scroll";

  import { searchHot } from "api/search";
  import { playlistMixin, searchMixin } from "assets/js/mixin";
  import { mapActions } from 'vuex'

  export default {
    name: "Search",
    components:{
      SearchBox,
      Suggests,
      SearchList,
      Confirm,
      Scroll
    },
    mixins: [playlistMixin , searchMixin],
    data() {
      return {
        hotKey: [],
      }
    },
    computed: {
      shortcut() {
        return this.hotKey.concat(this.searchHistory)
      },
    },
    created() {
      this._getHotKey()
    },
    methods:{
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.shortcutWrapper.style.bottom = bottom
        this.$refs.shortcut.refresh()
        this.$refs.searchResult.style.bottom = bottom
        this.$refs.suggest.refresh()
      },
      _getHotKey() {
        searchHot().then(res => {
          this.hotKey = res.result.hots
        })
      },
      showConfirm() {
        this.$refs.confirm.show()
      },
      ...mapActions([
        'clearSearchHistory'
      ]),
    },
    watch: {
      query(newQuery) {
        if (!newQuery) {
          setTimeout(() => {
            this.$refs.shortcut.refresh()
          }, 20)
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/variable';
  @import '~assets/stylus/mixin';

  .search {
    .search-box-wrapper {
      margin: 20px;
    }

    .shortcut-wrapper {
      position: fixed;
      top: 178px;
      bottom: 0;
      width: 100%;

      .shortcut {
        height: 100%;
        overflow: hidden;

        .hot-key {
          margin: 0 20px 20px 20px;

          .title {
            margin-bottom: 20px;
            font-size: $font-size-medium;
            color: $color-text-l;
          }

          .item {
            display: inline-block;
            padding: 5px 10px;
            margin: 0 20px 10px 0;
            border-radius: 6px;
            background: $color-highlight-background;
            font-size: $font-size-medium;
            color: $color-theme-d;
          }
        }

        .search-history {
          position: relative;
          margin: 0 20px;

          .title {
            display: flex;
            align-items: center;
            height: 40px;
            font-size: $font-size-medium;
            color: $color-text-l;

            .text {
              flex: 1;
            }

            .clear {
              extend-click();

              .icon-clear {
                font-size: $font-size-medium;
                color: $color-text-d;
              }
            }
          }
        }
      }
    }

    .search-result {
      position: fixed;
      width: 100%;
      top: 178px;
      bottom: 0;
    }
  }
</style>
