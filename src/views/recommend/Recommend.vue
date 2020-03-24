<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll"
            class="recommend-content"
            :data="distList"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <div>
        <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
          <slider>
            <div v-for="item in recommends">
              <img :src="item.pic">
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li @click="selectItem(item)"
                v-for="item in distList"
                class="item">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.picUrl">
              </div>
              <div class="text">
                <h2 class="name">{{ item.name }}</h2>
                <p class="desc">{{ item.copywriter }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!distList.length">
        <loading/>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
  import Slider from "components/common/slider/Slider";
  import Scroll from "components/common/scroll/Scroll";
  import Loading from "components/common/loading/Loading";

  import { mapMutations } from 'vuex'
  import { playlistMixin } from "assets/js/mixin";
  import { getRecommendBanners, getRecommendList } from 'api/recommend'


  export default {
    name: "Recommend",
    data() {
      return {
        type: 2,
        limit: 30,
        recommends: [],
        distList: []
      }
    },
    mixins: [playlistMixin],
    components: {
      Slider,
      Scroll,
      Loading
    },
    created() {
      this._getBanners(this.type)
      this._getDiscList(this.limit)
    },
    activated() {
      this.$refs.scroll.refresh()
    },
    methods: {
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.recommend.$el.style.bottom = bottom // 底部播放器适配
        this.$refs.recommend.refresh() // 强制scroll重新计算
      },
      _getBanners(type) {
        getRecommendBanners(type).then(res => {
          //console.log(res);
          this.recommends = res.banners
        })
      },
      _getDiscList(limit) {
        getRecommendList(limit).then(res => {
          //console.log(res);
          this.distList = res.result
          this.$refs.scroll.finishPullUp()
        })
      },
      loadMore() {
        this.limit += 30
        this._getDiscList(this.limit)
      },
      selectItem(item) {
        this.$router.push({
          path: `/recommend/${item.id}`
        })
        this.setDisc(item)
      },
      ...mapMutations({
        setDisc: 'SET_DISC'
      })
    }
  }
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import '~assets/stylus/variable'

  .recommend
    position fixed
    width 100%
    top 88px
    bottom 0
    .recommend-content
      height 100%
      overflow hidden
      .slider-wrapper
        position relative
        width 100%
        height 161px
      .recommend-list
        background-color: $color-background
        .list-title
          height 50px
          line-height 50px
          text-align center
          font-size $font-size-medium
          color $color-theme
        .item
          display flex
          box-sizing border-box
          align-items center
          padding 0 20px 20px 20px
          .icon
            flex 0 0 60px
            width 60px
            padding-right 20px
          .text
            display flex
            flex-direction column
            justify-content center
            flex 1
            line-height 20px
            overflow hidden
            font-size $font-size-medium
            .name
              margin-bottom 10px
              color $color-theme
            .desc
              color $color-theme-d
      .loading-container
        position absolute
        width 100%
        top 50%
        transform translateY(-50%)
</style>
