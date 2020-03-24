import axios from "./axios";

export function searchHot() {
  return axios({
    url: '/search/hot',
  })
}

export function search(keywords, limit, type) {
  return axios({
    url: '/search',
    params: {
      keywords,
      limit,
      type
    }
  })
}

export function getSongDetail(ids) {
  return axios({
    url: '/song/detail',
    params: {
      ids
    }
  })
}
