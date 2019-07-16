export default {
  users: state => state.listUsers,
  clientUsers: state => state.listClientUsers,
  clients: state => state.listClients,
  currentUser: state => state.currentUser,
  settlementTableTop: state => state.listTableTop,
  settlementTableBottom: state => state.listTableBottom,
  getListService: state => state.listService
}
