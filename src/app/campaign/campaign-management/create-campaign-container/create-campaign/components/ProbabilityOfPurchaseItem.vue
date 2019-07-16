<template>
  <tr>
    <td>
      <input v-model="data.item.gradeBid" type="number" placeholder="-">
    </td>
    <td class="bg-gray">
      <span>KRW</span>
    </td>
    <td>
      <span>{{ data.k }}</span>
    </td>
    <td>
      <!-- <input type="text" placeholder="-"> -->
      <span>{{ data.item.targetUV }}</span>
    </td>
    <td>
      <div class="convrate w-100">
        <span>{{ data.item.convRate }}</span>
        <el-tooltip placement="right-end" effect="light">
          <div slot="content"/>
          <div class="info">
            <span class="label">i</span>
          </div>
        </el-tooltip>
      </div>
    </td>
    <td>
      <span>{{ data.item.visitUV }}</span>
    </td>
    <td>
      <span>{{ data.item.convUV }}</span>
    </td>
    <td>
      <span>{{ data.item.appearedUser }}</span>
    </td>
  </tr>
</template>

<script>
import _ from 'lodash'
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    probabilityOfPurchase(state) {
      return this.data.item
    },
    gradeBid() {
      return this.probabilityOfPurchase.gradeBid
    }
  },
  watch: {
    gradeBid() {
      this.calcEstimate()
    }
  },
  methods: {
    genI18n(params) {
      return this.$t(
        `createCampaign.stepCreateCampaign.probabilityOfPurchase.${params}`
      )
    },
    calcEstimate: _.debounce(function() {
      this.$store.dispatch('campaign/probabilityOfPurchaseEstimate', {
        value: this.probabilityOfPurchase.gradeBid,
        type: this.data.k
      })
    }, 500)
  }
}
</script>

<style lang="scss" scoped>
.h-form-input {
  border-bottom: 1px dotted #ddd;
  padding: 10px 0;
  .h-title {
    margin-top: 0px;
  }
  .container-table {
    overflow: scroll;
    .h-table {
      min-width: 650px;
      font-family: arial, sans-serif;
      border-collapse: collapse;
      .bg-gray {
        background: #eee;
      }
      td,
      th {
        border: 1px solid #dddddd;
        text-align: center;
        span {
          margin: 0 10px;
          font-weight: bold;
        }
      }
      input {
        border: none;
        text-align: right;
        height: 20px;
        margin: 10px 0;
        padding: 0 10px;
      }
      input:focus {
        outline: none;
      }
      td.disable {
        background: #efefef;
      }
      .convrate {
        align-items: center;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .info {
          padding: 0 5px;
        }
        .info:hover {
          .label {
            color: #1d93cf;
          }
        }
      }
    }
  }
}
.flex-1{
  flex: 1
}
</style>

