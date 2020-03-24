export const singer = state => state.singer
export const playing = state => state.playing
export const fullScreen = state => state.fullScreen
export const playlist = state => state.playlist
export const sequenceList = state => state.sequenceList
export const mode = state => state.mode
export const currentIndex = state => state.currentIndex
export const currentSong = (state) => {
  return state.playlist[state.currentIndex] || {}
}
export const currentSongUrl = (state) => {
  return 'http://music.163.com/song/media/outer/url?id=' + state.playlist[state.currentIndex].id + '.mp3' || ''
}
export const currentSongArtists = (state) => {
  let ar = state.playlist[state.currentIndex].ar
  if(ar.length>5){
    return '群星'
  }
  let ars = []
  for(let i = 0; i < ar.length; i++){
    ars.push(ar[i].name)
    ars.push('/')
  }
  ars.pop()
  return ars.join('')
}
export const disc = state => state.disc
export const topList = state => state.topList
export const searchHistory = state => state.searchHistory
export const playHistory = state => state.playHistory
export const favoriteList = state => state.favoriteList
