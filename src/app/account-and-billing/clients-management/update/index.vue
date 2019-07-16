<template>
  <div class="bg-light">
    <create-client :client-detail="clientDetail">
      <update-clients-form :client-detail="clientDetail"/>
    </create-client>
  </div>
</template>

<script>
import updateClientsManagementController from './UpdateClientsManagement'
export default updateClientsManagementController
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
@import './updateClientsmanagement.scss'
</style>
