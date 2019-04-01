import ReportingStatistics from './reporting-statistics'
import ReportingGraph from './reporting-graph'
import GraphFilter from '@/components/GraphFilter'
import DateFilterSelection from '@/components/DateFilterSelection'
export default {
  name: 'ReportingContainer',
  components: { ReportingStatistics, ReportingGraph, GraphFilter, DateFilterSelection },
  data() {
    return {
      graphReportingType: ''
    }
  },
  methods: {
    onSelectItemDateSelection(item) {
      // TO DO : change data graph
    },
    onSelectItemReportingType(item) {
      this.graphReportingType = item.type
    }
  }
}
