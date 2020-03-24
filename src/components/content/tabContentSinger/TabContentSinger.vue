<template>
  <div>
    <grid-view :cols="3" :lineSpace="15" :v-margin="20" v-if="subcategories.length">
      <div class="item" v-for="(item, index) in subcategories" :key="index" @click="selectSinger(item)">
        <img class="item-img" v-lazy="item.picUrl" alt="">
        <div class="item-text">{{item.name}}</div>
      </div>
    </grid-view>
  </div>
</template>

<script>
  import GridView from "components/common/gridView/GridView";
  export default {
    name: "TabContentSinger",
    components:{
      GridView
    },
    props: {
      subcategories: Array
    },
    methods: {
      selectSinger(singer) {
        this.$emit('selectSinger', singer)
      }
    }
  }
</script>

<style scoped>
  .panel img {
    width: 100%;
  }

  .item {
    text-align: center;
    font-size: 12px;
  }

  .item-img {
    width: 80%;
  }

  .item-text {
    margin-top: 15px;
  }
</style>
