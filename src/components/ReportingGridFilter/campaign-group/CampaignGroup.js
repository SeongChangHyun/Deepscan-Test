export default {
  name: 'CampaignGroup',
  props: {
    onSelectItem: Function,
    type: ''
  },
  data() {
    return {
      options: [
        {
          value: 'accounts',
          label: 'Accounts'
        },
        {
          value: 'campaigns',
          label: 'Campaigns'
        },
        {
          value: 'adGroups',
          label: 'Ad Groups'
        }
      ],
      itemSeleted: ['campaigns']
    }
  },
  methods: {
    onSeletecItem(item) {
      this.itemSeleted = item
      this.onSelectItem(item, this.type)
    }
  }
}
