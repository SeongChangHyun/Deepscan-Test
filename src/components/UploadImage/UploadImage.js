import some from 'lodash/some'
import BrowseImage from './BrowseImage'

export default {
  name: 'UploadImageController',
  components: { BrowseImage },
  props: {
    uploadElementId: String,
    imageAcceptSizes: Array,
    imageAcceptTypes: Array,
    imagesPerRow: {
      type: Number,
      required: true
    },
    importedImages: {
      type: Array,
      required: true
    },
    clickUploadFile: Function,
    uploadFileHandler: Function
  },
  data() {
    return {
      fileName: ''
    }
  },
  methods: {
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })
    },
    deleteFile(id) {
      this.$emit('delete-image', id)
    },
    onUploadFile(event) {
      const files = event.target.files
      const filesLength = files.length
      if (filesLength < 1) {
        return
      }
      const errors = new Set()
      for (let i = 0; i < filesLength; i++) {
        this.getBase64(files[i]).then(
          data => {
            const img = document.createElement('img')
            img.onload = () => {
              const type = files[i].name ? files[i].name.split('.').pop() : ''
              const imageSize = {
                width: img.naturalWidth || img.width,
                height: img.naturalHeight || img.height
              }
              if (!some(this.imageAcceptSizes, imageSize)) {
                errors.add(7)
              }
              if (!this.imageAcceptTypes.includes(type)) {
                errors.add(4)
              }
              if (errors.size > 0) {
                this.$emit('on-upload-error', Array.from(errors))
              } else {
                const image = {
                  id: `${i}`,
                  src: data,
                  size: imageSize,
                  fileName: files[i].name
                }
                this.$emit('upload-handler', image)
              }
            }
            img.src = data
          }
        )
      }
    }
  }
}
