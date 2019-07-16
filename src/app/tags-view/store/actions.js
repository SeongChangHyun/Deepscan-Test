import { TagsViewMutationTypes } from './mutationTypes'

export default {
  addView({ commit }, view) {
    commit(TagsViewMutationTypes.ADD_VISITED_VIEW, view)
    commit(TagsViewMutationTypes.ADD_CACHED_VIEW, view)
  },
  addVisitedView({ commit }, view) {
    commit(TagsViewMutationTypes.ADD_VISITED_VIEW, view)
  },
  addCachedView({ commit }, view) {
    commit(TagsViewMutationTypes.ADD_CACHED_VIEW, view)
  },

  delView({ commit, state }, view) {
    return new Promise(resolve => {
      commit(TagsViewMutationTypes.DEL_VISITED_VIEW, view)
      commit(TagsViewMutationTypes.DEL_CACHED_VIEW, view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delVisitedView({ commit, state }, view) {
    return new Promise(resolve => {
      commit(TagsViewMutationTypes.DEL_VISITED_VIEW, view)
      resolve([...state.visitedViews])
    })
  },
  delCachedView({ commit, state }, view) {
    return new Promise(resolve => {
      commit(TagsViewMutationTypes.DEL_CACHED_VIEW, view)
      resolve([...state.cachedViews])
    })
  },

  delOthersViews({ commit, state }, view) {
    return new Promise(resolve => {
      commit(TagsViewMutationTypes.DEL_OTHERS_VISITED_VIEWS, view)
      commit(TagsViewMutationTypes.DEL_OTHERS_CACHED_VIEWS, view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delOthersVisitedViews({ commit, state }, view) {
    return new Promise(resolve => {
      commit(TagsViewMutationTypes.DEL_OTHERS_VISITED_VIEWS, view)
      resolve([...state.visitedViews])
    })
  },
  delOthersCachedViews({ commit, state }, view) {
    return new Promise(resolve => {
      commit(TagsViewMutationTypes.DEL_OTHERS_CACHED_VIEWS, view)
      resolve([...state.cachedViews])
    })
  },

  delAllViews({ commit, state }, view) {
    return new Promise(resolve => {
      commit(TagsViewMutationTypes.DEL_ALL_VISITED_VIEWS, view)
      commit(TagsViewMutationTypes.DEL_ALL_CACHED_VIEWS, view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delAllVisitedViews({ commit, state }) {
    return new Promise(resolve => {
      commit(TagsViewMutationTypes.DEL_ALL_VISITED_VIEWS)
      resolve([...state.visitedViews])
    })
  },
  delAllCachedViews({ commit, state }) {
    return new Promise(resolve => {
      commit(TagsViewMutationTypes.DEL_ALL_CACHED_VIEWS)
      resolve([...state.cachedViews])
    })
  },

  updateVisitedView({ commit }, view) {
    commit(TagsViewMutationTypes.UPDATE_VISITED_VIEW, view)
  }
}
