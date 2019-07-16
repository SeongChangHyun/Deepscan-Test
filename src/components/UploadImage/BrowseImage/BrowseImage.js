export default {
  name: 'BrowseImageController',
  props: {
    src: {
      type: String,
      required: true
    },
    fileName: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: false
    },
    size: {
      type: Object,
      require: true
    },
    volumn: {
      type: String,
      required: true
    }
  },
  data() {
    return {
    }
  },
  methods: {
    deleteBrowseImage(id) {
      this.$emit('delete-file', id)
    }
  }
}
