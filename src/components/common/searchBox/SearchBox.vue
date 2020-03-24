<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input class="box" ref="query" v-model="query" :placeholder="placeholder"/>
    <i class="icon-dismiss" v-show="query" @click="clear"></i>
  </div>
</template>

<script>
  import { debounce } from 'assets/js/util'
  export default {
    name: "SearchBox",
    props: {
      placeholder: {
        type: String,
        default: '搜索歌曲、歌手'
      }
    },
    data() {
      return {
        query: ''
      }
    },
    methods:{
      clear() {
        this.query = ''
      },
      setQuery(query) {
        this.query = query
      },
      blur() {
        this.$refs.query.blur()
      }
    },
    created() {
      this.$watch(
        'query',
        debounce(newQuery => {
          this.$emit('query', newQuery)
        }, 200)
      )
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/variable';

  .search-box {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    padding: 0 6px;
    height: 40px;
    background: $color-highlight-background;
    border-radius: 6px;

    .icon-search {
      font-size: 24px;
      color: $color-theme;
    }

    .box {
      flex: 1;
      margin: 0 5px;
      line-height: 18px;
      background: $color-highlight-background;
      color: $color-theme;
      font-size: $font-size-medium;

      &::placeholder {
        color: $color-theme-d;
      }
    }

    .icon-dismiss {
      font-size: 16px;
      color: $color-theme;
    }
  }
</style>
