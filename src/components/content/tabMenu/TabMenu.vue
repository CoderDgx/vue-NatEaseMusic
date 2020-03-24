<template>
  <scroll id="tab-menu">
    <div class="menu-list">
      <div class="menu-list-item"
           :class="{active: index===currentIndex}"
           v-for="(item, index) in categories"
           :key="index"
           @click="itemClick(index)">
        {{item.name}}
      </div>
    </div>
  </scroll>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";

  export default {
    name: "TabMenu",
    components: {
      Scroll
    },
    props: {
      categories: Array
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
        this.$emit('selectItem', index)
      }
    }
  }
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import '~assets/stylus/variable'
  #tab-menu{
    background-color: $color-background;
    height: 100%;
    width: 100px;
    overflow hidden
    box-sizing: border-box;

      .menu-list-item{
        height: 60px;
        line-height: 60px;
        text-align: center;
        font-size: $font-size-medium;
        color $color-theme
      }

      .menu-list-item.active {
        font-weight: 700;
        color: $color-background;
        background-color: $color-theme;
        border-left: 3px solid $color-background;
      }
  }
</style>
