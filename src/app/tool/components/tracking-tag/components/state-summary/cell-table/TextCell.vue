<template>
  <div>{{ data }}</div>
</template>

<script>
export default {
  name: 'TextCell',
  props: {
    data: {
      type: String,
      default: ''
    }
  }
}
</script>
