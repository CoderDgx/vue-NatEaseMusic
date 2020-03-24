import axios from "./axios";

export function getRank(idx) {
  return axios({
    url: '/top/list',
    params:{
      idx
    }
  })
}
