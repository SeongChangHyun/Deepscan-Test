
<template>
  <div>
    <user-information />
    <el-scrollbar class="route-item" wrap-class="scrollbar-wrapper">
      <el-menu :default-active="$route.path" mode="vertical">
        <sidebar-item
          v-for="route in permissionRouters"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
        <action-icon
          v-if="$store.state.layout.device === Common.MOBILE"
          class="mobile-action-btn px-10px"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import SidebarItem from './SidebarItem'
import UserInformation from './UserInformation'
import variables from '@/styles/variables.scss'
import ActionIcon from '@/app/layout/components/Sidebar/ActionBtn'
import { Common } from '@/common/constants'
import { filterAsyncRouter } from '@/app/permission/store/actions'

export default {
  components: {
    SidebarItem,
    ActionIcon,
    UserInformation
  },
  data() {
    return {
      listInvalid: [],
      Common: Common
    }
  },
  computed: {
    permissionRouters() {
      const notAllowMenuService = this.$store.getters.getServiceManage
        ? this.$store.getters.getServiceManage.not_allow_menu_services
        : {}
      return filterAsyncRouter(
        this.$store.state.permission.routers,
        this.$store.getters.rolesRouter,
        this.$store.getters.getRoutersLevel,
        notAllowMenuService
      )
    },
    sidebar() {
      return this.$store.state.layout.sidebar
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.$store.state.layout.sidebar.opened
    }
  },
  methods: {
    initData(value) {}
  }
}
</script>
