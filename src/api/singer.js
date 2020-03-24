import axios from "./axios";

export function getSingerList(cat, limit) {
  return axios({
    url: '/artist/list',
    params:{
      cat,
      limit,
    }
  })
}

export function getSong(id) {
  return axios({
    url: '/artists',
    params: {
      id
    }
  })
}

export function getLyric(id) {
  return axios({
    url: '/lyric',
    params: {
      id
    }
  })
}
