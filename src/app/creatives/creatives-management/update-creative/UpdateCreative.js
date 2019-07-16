import { mapGetters } from 'vuex'
import { CreativeConstant } from '@/common/constants'
import EditDynamicAdsBatch1 from './edit-dynamic-ads-batch1'
import EditDynamicAdsBatch2 from './edit-dynamic-ads-batch2'
import EditDynamicAdsBatch3 from './edit-dynamic-ads-batch3'
import EditDynamicAdsBatch4 from './edit-dynamic-ads-batch4'
import EditDynamicAdsBatch5 from './edit-dynamic-ads-batch5'

export default {
  name: 'UpdateCreativeGeneralController',
  components: {
    EditDynamicAdsBatch1,
    EditDynamicAdsBatch2,
    EditDynamicAdsBatch3,
    EditDynamicAdsBatch4,
    EditDynamicAdsBatch5
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters('creative', ['creative']),
    currentComponent() {
      const { theme } = this.creative
      const { BATCH_THEME_1, BATCH_THEME_2, BATCH_THEME_3, BATCH_THEME_4, BATCH_THEME_5 } = CreativeConstant
      if (BATCH_THEME_1.includes(theme)) {
        return 'EditDynamicAdsBatch1'
      }
      if (BATCH_THEME_2.includes(theme)) {
        return 'EditDynamicAdsBatch2'
      }
      if (BATCH_THEME_3.includes(theme)) {
        return 'EditDynamicAdsBatch3'
      }
      if (BATCH_THEME_4.includes(theme)) {
        return 'EditDynamicAdsBatch4'
      }
      if (BATCH_THEME_5.includes(theme)) {
        return 'EditDynamicAdsBatch5'
      }
      return null
    }
  },
  methods: {
    actionSubmit() {}
  },
  created() {
    this.$store.dispatch(`creative/getCreative`)
  }
}
