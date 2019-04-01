
<template>
  <div class="user-information">
    <el-row>
      <el-col :span="24">
        <div class="user-name">Account Name</div>
      </el-col>
      <el-col :span="24">
        <el-dropdown class="user-option" trigger="click">
          <div class="avatar-wrapper">
            <span>All account</span>
            <i class="el-icon-caret-bottom"/>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <span style="display:block;" @click="goToMyInformation">{{ $t('navbar.infor') }}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    goToMyInformation() {
      this.$router.push({ path: '/account-and-billing/my-information' })
    }
  }
}
</script>
