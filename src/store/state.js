import { playMode } from "assets/js/config";
import { loadSearch, loadPlay, loadFavorite } from 'assets/js/cache'


const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  disc: {},
  topList: {},
  searchHistory: loadSearch(), // 获取本地缓存中的数据
  playHistory: loadPlay(),
  favoriteList: loadFavorite()
}

export default state
