<template>
  <a-header :title="`${type == 'add' ? '新增地址' : '编辑地址'}`"></a-header>
  <div class="address-edit-box">
    <van-address-edit
      class="address"
      show-set-default
      show-search-result
      :area-list="areaList"
      :address-info="addressInfo"
      :show-delete="type === 'edit'"
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from 'vue'
import { Toast } from 'vant'

import aHeader from '../../components/aHeader'
import { post, get } from '../../utils/request'
import { areaList } from '@vant/area-data'
import { useRoute, useRouter } from 'vue-router'
export default {
  name: 'edit-address',
  components: {
    aHeader
  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      searchResult: [],
      type: 'add',
      addressId: '',
      addressInfo: {},
      from: route.query.from
    })

    onMounted(async () => {
      const { addressId, type, from } = route.query
      state.addressId = addressId
      state.type = type
      state.from = from || ''
      if (type === 'edit') {
        const { data } = await get('/ship/detail', { shippingId: addressId })
        const addressDetail = data
        state.addressInfo = {
          id: addressDetail.id,
          name: addressDetail.receiverName,
          tel: addressDetail.receiverMobile,
          province: addressDetail.receiverProvince,
          city: addressDetail.receiverCity,
          county: addressDetail.receiverDistrict,
          addressDetail: addressDetail.receiverAddress,
          areaCode: addressDetail.areaCode,
          isDefault: addressDetail.isDefault
        }
      }
    })

    const onSave = async (content) => {
      const params = {
        receiverName: content.name,
        receiverMobile: content.tel,
        receiverProvince: content.province,
        receiverCity: content.city,
        receiverDistrict: content.county,
        receiverAddress: content.addressDetail,
        areaCode: content.areaCode,
        isDefault: content.isDefault
      }
      if (state.type === 'edit') {
        params.id = state.addressId
      }
      Toast.loading({
        message: '保存中',
        forbidClick: true
      })
      state.type === 'add'
        ? await post('/ship/add', {}, { params })
        : await post('/ship/update', {}, { params })
      Toast.clear()
      Toast.success('保存成功')
      setTimeout(() => {
        router.back()
      }, 1000)
    }

    const onDelete = async () => {
      Toast.loading({
        message: '删除中',
        forbidClick: true
      })
      await post('/ship/del', {}, { params: { shippingId: state.addressId } })
      Toast.clear()
      Toast.success('删除成功')
      setTimeout(() => {
        router.back()
      }, 1000)
    }

    return {
      ...toRefs(state),
      onSave,
      onDelete,
      areaList
    }
  }
}
</script>

<style lang="scss">
@import '../../style/viriables.scss';

.address {
  .van-field__body {
    textarea {
      height: .26rem!important;
    }
  }
}
.address-edit-box {
  position: absolute;
  top: .48rem;
  left: 0;
  right: 0;
  bottom: 0;
  .van-address-edit {
    .van-button--danger {
      background: $primary-color;
      border-color: $primary-color;
    }
    .van-switch--on {
      background: $primary-color;
    }
  }
}
</style>
