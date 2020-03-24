import axios from "./axios";


export function getRecommendBanners(type) {
  return axios({
    url: '/banner',
    params: {
      type
    }
  })
}

export function getRecommendList(limit) {
  return axios({
    url: '/personalized',
    params: {
      limit
    }
  })
}

export function getSongList(id) {
  return axios({
    url: '/playlist/detail',
    params: {
      id
    }
  })
}
