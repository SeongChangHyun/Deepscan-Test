import { BusinessConstrainsSegment } from '@/common/businessConstrainsSegment'
export default {
  name: 'CampaignSegment',
  props: {
    onSelectItem: Function,
    type: ''
  },
  data() {
    return {
      options: BusinessConstrainsSegment,
      itemSeleted: ['none']
    }
  },
  methods: {
    onSeletecItem(item) {
      this.onSelectItem(item, this.type)
    }
  }
}
