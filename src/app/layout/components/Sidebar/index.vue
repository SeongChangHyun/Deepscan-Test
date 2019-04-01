<template>
  <div>
    <logo />
    <user-information />
    <el-scrollbar class="route-item" wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="$route.path"
        :collapse="isCollapse"
        mode="vertical"
      >
        <sidebar-item v-for="route in permissionRouters" :key="route.path" :item="route" :base-path="route.path"/>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import SidebarItem from './SidebarItem'
import Logo from './Logo'
import UserInformation from './UserInformation'
import variables from '@/styles/variables.scss'

export default {
  components: {
    SidebarItem,
    UserInformation,
    Logo
  },
  computed: {
    permissionRouters() {
      return this.$store.state.permission.routers
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
  }
}
</script>
