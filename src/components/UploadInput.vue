<template>
  <div class="container">
    <input ref="inputFile" class="file-custom" type="file" @change="onSelectFile">
    <p>{{ value || dataFile.name || '' }}</p>
    <button
      v-if="!dataFile.name && !value"
      slot="append"
      type="primary"
      @click="clickItem"
    >{{ $t('btnUpload') }}</button>
    <button v-else slot="append" class="btn_del" @click="delFile">{{ $t('btnDel') }}</button>
  </div>
</template>

<script>
export default {
  props: {
    onChange: {
      type: Function,
      default: () => {}
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dataFile: {
        name: ''
      }
    }
  },
  methods: {
    clickItem(event) {
      event.preventDefault()
      this.$refs.inputFile.click()
    },
    onSelectFile(e) {
      this.dataFile = e.target.files[0]
      this.onChange(this.dataFile.name)
    },
    delFile(event) {
      event.preventDefault()
      this.dataFile = { name: '' }
      this.onChange('')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.container {
  display: flex;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  align-items: center;
  overflow: hidden;
  width: 100%;
  height: 36px;
  input.file-custom {
    display: none;
  }
  p {
    flex: 1;
    margin: 0;
    padding: 0;
    padding-left: 10px;
    max-width: calc(100% - 80px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  button {
    width: 80px;
    cursor: pointer;
    border: none;
    height: 100%;
    background: #1d93cf;
    color: #fff;
    font-size: 0.9em;
    font-weight: bold;
  }
  button:focus {
    outline: none;
  }
  button.btn_del {
    background: #ced3d9;
    color: #4b5054;
  }
}
</style>
