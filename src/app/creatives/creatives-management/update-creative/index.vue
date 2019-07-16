<template>
  <component
    ref="editCreativeComponent"
    :creative="creative"
    :is="currentComponent"
    @submit-creative-form="actionSubmit"
  />
</template>
<script>
import updateCreativeController from './UpdateCreative.js'
export default updateCreativeController
</script>
