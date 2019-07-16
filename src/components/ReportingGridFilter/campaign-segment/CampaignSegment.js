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
      itemSelected: []
    }
  },
  methods: {
    onSelectedItem(item) {
      this.onSelectItem(item, this.type)
    }
  }
}
