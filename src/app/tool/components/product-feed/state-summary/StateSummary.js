import { mapGetters } from 'vuex'
import Pagination from '@/components/Pagination'
import { Common } from '@/common/constants'
import { StateSummary } from '@/common/product-feed/feedSetting.js'
import moment from 'moment'
import isEmpty from 'lodash/isEmpty'
import debounce from 'lodash/debounce'
import ReportingGraph from '../../../../campaign/campaign-reporting/campaign-reporting-container/reporting-graph'
import { ContentLoader } from 'vue-content-loader'
const formatDate = Common.FORMAT_DATE_YYYY_MM_DD
export default {
  name: 'StateSummary',
  components: { Pagination, ReportingGraph, ContentLoader },
  data() {
    return {
      searchText: '',
      radioSearchLabel: ['all', 'id', 'name'],
      radioDefaultActive: 'all',
      rowSelected: '100 rows',
      listRow: [{ key: '100 rows', value: 100 }, { key: '200 rows', value: 200 }, { key: '300 rows', value: 300 }],
      numPageMobile: 3,
      numPagePC: 5,
      deviceWidth: 0,
      currentPage: 1,
      suggestCurrentPage: 1,
      totalCount: 0,
      totalCountSuggest: 0,
      productListRequestParams: { search_type: 'all', keyword_id: '', keyword_name: '', offset: 0, limit: 100 },
      suggestListRequestParams: { search_type: 'all', keyword_id: '', keyword_name: '', offset: 0, limit: 10 },
      arrayDates: [],
      nthLastDay: 9,
      graphArea: 'graph area',
      feedSummaryTableColumn: StateSummary.feedSummaryTableColumn,
      productListTableColumns: StateSummary.productListTableColumns,
      feedSummaryData: [],
      graphData: [],
      productListData: [],
      listProduct: [],
      showEmpty: false,
      showList: false,
      showLoading: false,
      feedSummaryLoading: true,
      productListLoading: true,
      inputItem: '',
      startText: 2,
      endId: 1,
      zoom: true,
      dataChartConverted: {
        label: [],
        data: [],
        type: ''
      },
      loadMore: false,
      fullFeedColorCode: ['#0000FF', '#006400', '#DC143C', '#6495ED', '#5F9EA0'],
      addingFeedColorCode: ['#FF00FF', '#FF69B4', '#4B0082', '#DAA520', '#ADFF2F'],
      soldoutFeedColorCode: ['#90EE90', '#20B2AA', '#87CEFA', '#800000', '#9370DB'],
      noResult: 0
    }
  },
  computed: {
    ...mapGetters('tool', ['getFeedSummaryData', 'getProductListData', 'getSuggestListData']),
    paginationOptions() {
      return {
        total: this.totalCount,
        pagerCount: (this.deviceWidth < Common.DEVICE_WIDTH.MOBILE) ? this.numPageMobile : this.numPagePC,
        limit: this.productListRequestParams.limit,
        page: this.currentPage
      }
    }
  },
  watch: {
    getFeedSummaryData: {
      handler(newData) {
        if (newData instanceof Array && newData.length === 0) {
          this.feedSummaryData = []
          this.feedSummaryLoading = false
        } else {
          this.feedSummaryLoading = false
          this.feedSummaryData = []
          this.graphData = []
          const flagArray = this.createArrayFlag()
          let fullFeed = 0
          let addingFeed = 0
          let soldoutFeed = 0
          let sumFullFeed = 0
          let sumAddingFeed = 0
          let sumSoldoutFeed = 0
          const fullFeedName = []
          const addingFeedName = []
          const soldoutFeedName = []
          let arraySumFullFeed = {}
          let arraySumAddingFeed = {}
          let arraySumSoldoutFeed = {}
          for (let i = 0; i < this.nthLastDay; i++) {
            sumFullFeed = 0
            sumAddingFeed = 0
            sumSoldoutFeed = 0
            fullFeed = 0
            addingFeed = 0
            soldoutFeed = 0
            for (let j = 0; j < newData.length; j++) {
              if (newData[j].date === this.arrayDates[i] && flagArray[i] === 0) {
                flagArray[i]++
              }
              if (newData[j].date === this.arrayDates[i] && newData[j].url_type === 'full_feed') {
                fullFeed++
                sumFullFeed += newData[j].crawl_count
                if (fullFeedName.indexOf(newData[j].feed_name) === -1) {
                  fullFeedName.push(newData[j].feed_name)
                }
              }
              if (newData[j].date === this.arrayDates[i] && newData[j].url_type === 'adding_feed') {
                addingFeed++
                sumAddingFeed += newData[j].crawl_count
                if (addingFeedName.indexOf(newData[j].feed_name) === -1) {
                  addingFeedName.push(newData[j].feed_name)
                }
              }
              if (newData[j].date === this.arrayDates[i] && newData[j].url_type === 'soldout_feed') {
                soldoutFeed++
                sumSoldoutFeed += newData[j].crawl_count
                if (soldoutFeedName.indexOf(newData[j].feed_name) === -1) {
                  soldoutFeedName.push(newData[j].feed_name)
                }
              }
            }
            if (flagArray[i] !== 0) {
              if (fullFeed > 0) {
                arraySumFullFeed[this.arrayDates[i]] = sumFullFeed
              } else {
                arraySumFullFeed[this.arrayDates[i]] = '-'
              }
              if (addingFeed > 0) {
                arraySumAddingFeed[this.arrayDates[i]] = sumAddingFeed
              } else {
                arraySumAddingFeed[this.arrayDates[i]] = '-'
              }
              if (soldoutFeed > 0) {
                arraySumSoldoutFeed[this.arrayDates[i]] = sumSoldoutFeed
              } else {
                arraySumSoldoutFeed[this.arrayDates[i]] = '-'
              }
            } else {
              arraySumFullFeed[this.arrayDates[i]] = '-'
              arraySumAddingFeed[this.arrayDates[i]] = '-'
              arraySumSoldoutFeed[this.arrayDates[i]] = '-'
            }
          }
          arraySumFullFeed = { type: 'Full product feed', ...arraySumFullFeed }
          this.feedSummaryData.push(arraySumFullFeed)
          arraySumAddingFeed = { type: 'Adding product feed', ...arraySumAddingFeed }
          this.feedSummaryData.push(arraySumAddingFeed)
          arraySumSoldoutFeed = { type: 'Soldout product feed', ...arraySumSoldoutFeed }
          this.feedSummaryData.push(arraySumSoldoutFeed)
          fullFeedName.sort()
          addingFeedName.sort()
          soldoutFeedName.sort()
          let fullFeedColorCode = 0
          for (let k = 0; k < fullFeedName.length; k++) {
            let arrayFullFeed = {}
            var arrayFullFeedItem = []
            var dataFullFeed = {}
            for (let i = 0; i < this.nthLastDay; i++) {
              let fullFeed = 0
              for (let j = 0; j < newData.length; j++) {
                if (newData[j].date === this.arrayDates[i] && newData[j].url_type === 'full_feed' && newData[j].feed_name === fullFeedName[k]) {
                  fullFeed++
                  arrayFullFeed[this.arrayDates[i]] = newData[j].crawl_count
                  arrayFullFeedItem.push(newData[j].crawl_count)
                }
              }
              if (fullFeed === 0) {
                arrayFullFeed[this.arrayDates[i]] = '-'
                arrayFullFeedItem.push(this.noResult)
              }
            }
            if (fullFeedColorCode < this.fullFeedColorCode.length) {
              dataFullFeed.color = this.fullFeedColorCode[fullFeedColorCode]
              fullFeedColorCode++
            }
            dataFullFeed.data = arrayFullFeedItem
            dataFullFeed.name = 'Full feed ' + fullFeedName[k]
            this.graphData.push(dataFullFeed)
            arrayFullFeed = { type: 'Full feed ' + fullFeedName[k], ...arrayFullFeed }
            this.feedSummaryData.push(arrayFullFeed)
          }

          let addingColorCode = 0
          for (let k = 0; k < addingFeedName.length; k++) {
            let arrayAddingFeed = {}
            var arrayAddingFeedItem = []
            var dataAddingFeed = {}
            for (let i = 0; i < this.nthLastDay; i++) {
              let addingFeed = 0
              for (let j = 0; j < newData.length; j++) {
                if (newData[j].date === this.arrayDates[i] && newData[j].url_type === 'adding_feed' && newData[j].feed_name === addingFeedName[k]) {
                  addingFeed++
                  arrayAddingFeed[this.arrayDates[i]] = newData[j].crawl_count
                  arrayAddingFeedItem.push(newData[j].crawl_count)
                }
              }
              if (addingFeed === 0) {
                arrayAddingFeed[this.arrayDates[i]] = '-'
                arrayAddingFeedItem.push(this.noResult)
              }
            }
            if (addingColorCode < this.addingFeedColorCode.length) {
              dataAddingFeed.color = this.addingFeedColorCode[addingColorCode]
              addingColorCode++
            }
            dataAddingFeed.data = arrayAddingFeedItem
            dataAddingFeed.name = 'Adding feed ' + addingFeedName[k]
            this.graphData.push(dataAddingFeed)
            arrayAddingFeed = { type: 'Adding feed ' + addingFeedName[k], ...arrayAddingFeed }
            this.feedSummaryData.push(arrayAddingFeed)
          }
          let soldoutColorCode = 0
          for (let k = 0; k < soldoutFeedName.length; k++) {
            let arraySoldoutFeed = {}
            var arraySoldoutFeedItem = []
            var dataSoldoutFeed = {}
            for (let i = 0; i < this.nthLastDay; i++) {
              let soldoutFeed = 0
              for (let j = 0; j < newData.length; j++) {
                if (newData[j].date === this.arrayDates[i] && newData[j].url_type === 'soldout_feed' && newData[j].feed_name === soldoutFeedName[k]) {
                  soldoutFeed++
                  arraySoldoutFeed[this.arrayDates[i]] = newData[j].crawl_count
                  arraySoldoutFeedItem.push(newData[j].crawl_count)
                }
              }
              if (soldoutFeed === 0) {
                arraySoldoutFeed[this.arrayDates[i]] = '-'
                arraySoldoutFeedItem.push(this.noResult)
              }
            }
            if (soldoutColorCode < this.soldoutFeedColorCode.length) {
              dataSoldoutFeed.color = this.soldoutFeedColorCode[soldoutColorCode]
              soldoutColorCode++
            }
            dataSoldoutFeed.data = arraySoldoutFeedItem
            dataSoldoutFeed.name = 'Soldout feed ' + soldoutFeedName[k]
            this.graphData.push(dataSoldoutFeed)
            arraySoldoutFeed = { type: 'Soldout feed ' + soldoutFeedName[k], ...arraySoldoutFeed }
            this.feedSummaryData.push(arraySoldoutFeed)
          }
          this.convertDataChart(this.arrayDates, this.graphData)
        }
      },
      immediate: true
    },
    getProductListData: {
      handler(newData) {
        if (newData instanceof Object && !isEmpty(newData) && newData.data.length >= 0) {
          this.productListLoading = false
          this.productListData = newData.data
          this.totalCount = newData.total_count
          this.updateCurrentPage()
          var canvas = document.createElement('canvas')
          var ctx = canvas.getContext('2d')
          ctx.font = '14px Arial'
          for (const item in newData.data) {
            const product_name_length = Math.round((ctx.measureText(newData.data[item].product_name).width) * 100) / 100
            this.productListData[item].product_name_length = product_name_length
          }
        }
      },
      immediate: true
    },
    getSuggestListData: {
      handler(newData) {
        if (newData instanceof Object && !isEmpty(newData) && newData.data.length >= 0) {
          this.showLoading = false
          this.showList = true
          if (this.loadMore === true) {
            this.listProduct = [...this.listProduct, ...newData.data]
            this.loadMore = false
          } else {
            this.listProduct = newData.data
            if (this.listProduct.length === 0) {
              this.showEmpty = true
            }
          }
          this.totalCountSuggest = newData.total_count
        }
      },
      immediate: true
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
    this.showCurrentDateTime()
    this.getFeedSummaryLabel()
    this.$store.dispatch('tool/getFeedSummaryData')
    this.$store.dispatch('tool/getProductListData', this.productListRequestParams)
    document.getElementById('app').addEventListener('click', this.handleClickOut)
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
    document.getElementById('app').removeEventListener('click', this.handleClickOut)
  },
  methods: {
    convertDataChart(listLabel, data) {
      this.dataChartConverted = {
        label: listLabel,
        type: 'line',
        line: data
      }
    },
    createDataLine(data, color) {
      if (data) {
        const listValueLine = []
        for (const i in data) {
          const nameLine = 'test'
          const objectLine = {
            name: nameLine,
            data: data[i].crawl_count,
            color: color
          }
          listValueLine.push(objectLine)
        }
        return listValueLine
      }
    },
    handleResize() {
      this.deviceWidth = window.innerWidth
    },
    createArrayFlag() {
      const flagArray = []
      for (let i = 0; i < this.nthLastDay; i++) {
        const flag = 0
        flagArray.push(flag)
      }
      return flagArray
    },
    getFeedSummaryLabel() {
      for (let i = 0; i < this.nthLastDay; i++) {
        this.feedSummaryTableColumn[i + 1].label = this.arrayDates[i]
        this.feedSummaryTableColumn[i + 1].prop = this.arrayDates[i]
      }
    },
    showCurrentDateTime() {
      const today = new Date()
      const endDate = new Date(moment(today).format(formatDate))
      const startDate = new Date(moment(today).subtract(this.nthLastDay - 1, 'days').format(formatDate))
      this.arrayDates = this.getDateArray(startDate, endDate)
      const date = today.getFullYear() + '.' + ('0' + (today.getMonth() + 1)).slice(-2) + '.' + ('0' + today.getDate()).slice(-2)
      const time = ('0' + today.getHours()).slice(-2) + ':' + ('0' + today.getMinutes()).slice(-2) + ':' + ('0' + today.getSeconds()).slice(-2)
      const dateTime = date + ' ' + time
      return dateTime
    },
    getDateArray(start, end) {
      const arrayDate = []
      // eslint-disable-next-line no-unmodified-loop-condition
      while (start <= end) {
        arrayDate.push(moment(start).format(formatDate))
        start.setDate(start.getDate() + 1)
      }
      return arrayDate
    },
    handleClickItem(event) {
      this.searchText = event.target.innerHTML
      const position = this.searchText.search('-')
      const startText = position + this.startText
      const endId = position - this.endId
      const searchString = this.searchText.substr(startText, this.searchText.length)
      const searchId = this.searchText.substr(0, endId)
      this.suggestListRequestParams.keyword_id = searchId
      this.suggestListRequestParams.keyword_name = searchString
      this.productListRequestParams.keyword_id = searchId
      this.productListRequestParams.keyword_name = searchString
      this.showList = false
    },
    handleInput: debounce(function(value) {
      if (value) {
        this.showLoading = true
        this.showList = false
        this.showEmpty = false
        this.searchText = value
        if (this.searchText.search('-') >= 0) {
          const position = this.searchText.search('-')
          const startText = position + this.startText
          const endId = position - this.endId
          const searchString = this.searchText.substr(startText, this.searchText.length)
          const searchId = this.searchText.substr(0, endId)
          this.suggestListRequestParams.keyword_id = searchId
          this.suggestListRequestParams.keyword_name = searchString
          this.productListRequestParams.keyword_id = searchId
          this.productListRequestParams.keyword_name = searchString
        } else {
          this.productListRequestParams.keyword_id = value
          this.productListRequestParams.keyword_name = value
          this.suggestListRequestParams.keyword_id = value
          this.suggestListRequestParams.keyword_name = value
        }
        this.suggestListRequestParams.offset = 0
        this.suggestCurrentPage = 1
        this.$store.dispatch('tool/getListSuggestion', this.suggestListRequestParams)
      } else {
        this.showLoading = false
        this.showList = false
        this.showEmpty = false
      }
    }, 500),
    handleScroll({ target }) {
      const { scrollTop, clientHeight, scrollHeight } = target
      if (scrollTop + clientHeight >= scrollHeight && this.suggestCurrentPage * this.suggestListRequestParams.limit < this.totalCountSuggest) {
        this.showLoading = true
        this.loadMore = true
        this.suggestCurrentPage++
        this.suggestListRequestParams.offset = (this.suggestCurrentPage - 1) * this.suggestListRequestParams.limit
        this.$store.dispatch('tool/getListSuggestion', this.suggestListRequestParams)
      }
    },
    handleClickOut({ target }) {
      if (target !== this.inputItem) {
        this.showList = false
        this.showEmpty = false
      }
    },
    handlePagging(value) {
      this.productListLoading = true
      this.currentPage = value.page
      this.productListRequestParams.limit = value.limit
      this.productListRequestParams.offset = (this.currentPage - 1) * this.productListRequestParams.limit
      this.$store.dispatch('tool/getProductListData', this.productListRequestParams)
    },
    onSelectNumRow(value) {
      this.productListLoading = true
      this.productListRequestParams.limit = value
      this.updateCurrentPage()
      this.productListRequestParams.offset = (this.currentPage - 1) * this.productListRequestParams.limit
      this.$store.dispatch('tool/getProductListData', this.productListRequestParams)
    },
    updateCurrentPage() {
      if (this.productListRequestParams.limit * (this.currentPage - 1) >= this.totalCount) {
        this.currentPage = 1
      }
    },
    handleSearchType(value) {
      this.productListRequestParams.search_type = value
      this.suggestListRequestParams.search_type = value
    },
    handleSearchDataGrid() {
      this.productListLoading = true
      this.productListRequestParams.offset = 0
      this.$store.dispatch('tool/getProductListData', this.productListRequestParams)
    }
  }
}
