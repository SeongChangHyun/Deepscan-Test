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
      itemSelected: ['campaigns']
    }
  },
  methods: {
    onSelectedItem(item) {
      this.itemSelected = item
      this.onSelectItem(item, this.type)
    }
  }
}
