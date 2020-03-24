<template>
  <div id="app">
    <Header/>
    <Tab/>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <player v-show="playlist.length"/>
  </div>
</template>

<script>
  import Header from "components/content/header/Header";
  import Tab from "components/content/tab/Tab";
  import Player from "components/content/player/Player";
  import { mapGetters } from 'vuex'
  export default {
    components: {
      Header,
      Tab,
      Player,
    },
    computed: {
      ...mapGetters([
        'playlist'
      ])
    },
  }
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>


</style>
