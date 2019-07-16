import { dataMocking } from './data/listTableSettlement'
export default {
  getDataTableTop: config => {
    return dataMocking.dataTop
  },
  getDataTableBottom: config => {
    return dataMocking.dataBottom
  }
}
