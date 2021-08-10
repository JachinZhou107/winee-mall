<template>
  <a-header :title="'地址管理'" :backTo="'/'+from" />
  <div class="address__box">
    <div class="addres__item">
      <van-address-list
        v-if="from != 'mine'"
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        @select="select"
      />
      <van-address-list
        v-else
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
      />
    </div>
    <!-- <div class="pagination">
      <van-pagination
        v-model="page"
        :page-count="totalPage"
        mode="simple"
        @change="paging"
      />
    </div> -->
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import aHeader from '../../components/aHeader'
import { get } from '../../utils/request'

export default {
  name: 'Address',
  components: {
    aHeader
  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      chosenAddressId: '1',
      list: [],
      from: route.query.from,
      page: 1,
      totalPage: 0
    })

    onMounted(() => {
      init()
    })

    const init = async () => {
      const { data } = await get('/ship/list', {
        pageNum: state.page,
        pageSize: 10
      })
      if (!data) {
        state.list = []
        return
      }
      state.totalPage = data.pages
      state.list = data.list.map((item, index) => {
        return {
          id: item.id,
          name: item.receiverName,
          tel: item.receiverMobile,
          address: `${item.receiverProvince} ${item.receiverCity} ${item.receiverDistrict} ${item.receiverAddress}`,
          isDefault: item.isDefault
        }
      })
    }

    const onAdd = () => {
      router.push({ path: '/edit-address', query: { type: 'add', from: state.from } })
    }

    const onEdit = (item) => {
      router.push({ path: '/edit-address', query: { type: 'edit', addressId: item.id, from: state.from } })
    }

    const select = (item) => {
      router.push({ path: '/create-order', query: { addressId: item.id } })
    }

    // const paging = () => {
    //   init()
    // }
    return {
      ...toRefs(state),
      onAdd,
      onEdit,
      select
    }
  }
}
</script>

<style lang="scss">
@import '../../style/viriables.scss';

.address__box {
  .addres__item {
    .van-address-item {
      height: .6rem;
    }
    .van-radio__icon {
      display: none !important;
    }
    .van-button {
      background: $primary-color;
      border-color: $primary-color;
    }
  }
}
</style>

<style lang="scss" scoped>
.address__box {
  position: absolute;
  left: 0;
  top: .5rem;
  bottom: .5rem;
  right: 0;
  background-color: #f8f8f8;
  padding: 0 .08rem .2rem .08rem;
  overflow-y: auto;
  .pagination {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
}

</style>
