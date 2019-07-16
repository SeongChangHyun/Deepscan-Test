
<template>
  <div class="user-information">
    <el-row class="user-information-content">
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <div class="user-name">{{ $t('navbar.accountName') }}</div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" class="dropdown-input">
        <a-tree-select
          :value="value"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          :filter-tree-node="false"
          :tree-node-filter-prop="'title'"
          show-search
          tree-default-expand-all
          allow-clear
          @search="remoteMethod"
          @change="handleNodeClick"
        >
          <a-tree-select-node
            v-for="(item, index) in listItem"
            :key="index"
            :value="index"
            :title="item.label"
          >
            <a-tree-select-node
              v-for="(itemlv2, indexlv2) in item.children"
              :key="index + ','+ indexlv2"
              :value="index + ','+ indexlv2"
              :title="itemlv2.label"
            />
          </a-tree-select-node>
        </a-tree-select>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { RoleSelectAccount, LevelRouter } from '@/common/selectAccount'
import { checkRolesHasExists } from '@/app/permission/store/actions'
import _ from 'lodash'
export default {
  data() {
    return {
      value: [this.$t('navbar.allAccount')],
      listItem: [],
      listItemSuperAdmin: [],
      listAllItem: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      isSuperAdmin: false,
      keywordSearch: '',
      roleSelectAccount: RoleSelectAccount,
      isFristLoad: true,
      isLoading: true
    }
  },
  computed: {
    ...mapGetters(['getListAccount']),
    ...mapGetters(['getListAccountProgress']),
    ...mapGetters(['roles'])
  },
  watch: {
    getListAccount: {
      handler(newData) {
        if (newData instanceof Array) {
          this.convertDataToDisplayTree(newData)
        }
      },
      immediate: false
    },
    getListAccountProgress: {
      handler(newData) {
        this.isLoading = newData
      },
      immediate: false
    }
  },
  created() {
    const routerInfo = this.$store.getters.getRoutersInfo
    if (routerInfo && routerInfo.label) {
      this.value = [routerInfo.label]
    }
    this.$store.dispatch('GetListAccount')
    this.isSuperAdmin = checkRolesHasExists(
      this.$store.getters.roles,
      'ROLE_SUPER_ADMIN'
    )
  },
  methods: {
    remoteMethod(value) {
      if (this.isSuperAdmin) {
        setTimeout(() => {
          const valueTrim = value.trim()
          if (Buffer.byteLength(valueTrim, 'shift_jis') >= 4) {
            this.keywordSearch = valueTrim
            this.$store.dispatch('SearchAccountByKeyword', value)
          }
        }, 1500)
      }
    },
    onClear() {
      this.listItem = this.listItemSuperAdmin
    },
    handleNodeClick(data) {
      const indexArr = data.toString().split(',')
      let itemSelected = {}
      const arrayLv1 = this.listItem[parseFloat(indexArr[0])]
      if (indexArr.length > 1) {
        const arrayLv2 = this.listItem[parseFloat(indexArr[0])].children[parseFloat(indexArr[indexArr.length - 1])]
        itemSelected = arrayLv2
      } else {
        itemSelected = arrayLv1
      }
      this.value = itemSelected.label
      if (itemSelected.value === 'all') {
        this.$store.dispatch('ComeBackHome', LevelRouter.comeback)
        return
      }
      this.$store.dispatch('UpdateRoles', itemSelected)
    },
    renderContent(h, { node, data, store }) {
      const btn = h('span', {
        props: { type: 'success' },
        domProps: {
          innerHTML: data.label
        },
        style: {
          fontSize: '14px'
        }
      })
      return btn
    },
    convertDataToDisplayTree(newData) {
      this.listItem = []
      const listConverted = []
      listConverted.push({
        label: this.$t('navbar.allAccount'),
        value: LevelRouter.all
      })
      for (const i in newData) {
        const subItem = newData[i].sub_items
        const listChildConverted = []
        const itemParentDetail = _.find(this.roleSelectAccount, {
          key: newData[i].permission
        })
        for (const j in subItem) {
          if (subItem[j].client_id) {
            const itemChildConverted = {
              index: i + j + '',
              accountId: subItem[j].account_id,
              accountParentId: newData[i].user_account_id,
              clientId: subItem[j].client_id,
              label: subItem[j].account_name + ` (${subItem[j].client_id})`,
              role: itemParentDetail.role,
              key: itemParentDetail.key,
              type: LevelRouter.client
            }
            listChildConverted.push(itemChildConverted)
          }
        }
        let labelParent = ''
        if (this.isSuperAdmin) {
          labelParent =
            this.isSuperAdmin && newData[i].email_address
              ? newData[i].email_address
              : itemParentDetail.label
        } else {
          if (itemParentDetail.key === 'CM' || itemParentDetail.key === 'CV') {
            labelParent = this.$t('navbar.inviteLabel')
          } else if (itemParentDetail.key === 'AG') {
            labelParent = this.$t('navbar.agencyLabel')
          } else {
            labelParent = this.$t('navbar.clientAdminLabel')
          }
        }
        const itemParentConverted = {
          userAccountId: newData[i].user_account_id,
          label: labelParent,
          type: LevelRouter.parent
        }
        if (itemParentDetail.key === 'CM' || itemParentDetail.key === 'CV') {
          itemParentConverted.key = 'CM'
          itemParentConverted.role = 'ROLE_CM'
          // Group into one only for menu check permission. Each client will have its account permission (CM or CV)
          const currentListInvite = listConverted.find(obj => obj.key === 'CM')
          const currentListInviteIndex = listConverted.findIndex(
            obj => obj.key === 'CM'
          )
          if (listConverted[currentListInviteIndex]) {
            itemParentConverted.children = [
              ...currentListInvite.children,
              ...listChildConverted
            ]
            listConverted[currentListInviteIndex].children =
              itemParentConverted.children
          } else {
            itemParentConverted.children = listChildConverted
            listConverted.push(itemParentConverted)
          }
        } else {
          itemParentConverted.role = itemParentDetail.role
          itemParentConverted.children = listChildConverted
          itemParentConverted.key = itemParentDetail.key
          listConverted.push(itemParentConverted)
        }
      }
      this.listItem = listConverted
    }
  }
}
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
@import "@/styles/variables.scss";
.user-information {
  padding: 8px;
  .user-information-content {
    .user-name {
      text-align: left;
      padding-top: 8px;
    }
    .ant-select {
      width: 100%;
      &.ant-select-open {
        position: relative;
        &:after {
          content: "";
          position: absolute;
          bottom: -5px;
          left: 10px;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-bottom: 10px solid #fff;
        }
      }
      /deep/ .ant-select-selection {
        background: transparent;
        color: #fff;
        border: none;
        .ant-select-selection__rendered {
          margin-left: 0px;
          font-size: 14px;
        }
        .ant-select-arrow {
          color: #fff;
        }
      }
    }
  }
}
@media (max-width: 767px) {
  .user-information {
    padding: 8px;
    .user-information-content {
      .user-name {
        text-align: center;
      }
    }
  }
}
</style>
<style>
@import "../../ant-tree-select.css";
</style>

