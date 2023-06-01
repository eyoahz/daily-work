<template>
  <div>
    <BasicTable
      rowKey="id"
      @register="registerTable"
      :loading="booleanFlag.tableLoading"
      :rowSelection="booleanFlag.delBatch ? { type: 'checkbox' } : null"
    >
      <template #toolbar>
        <a-button
          color="primary"
          @click="() => handleEdit('add')"
          v-auth="'dealer:customContract:add'"
        >
          新增
        </a-button>
      </template>
      <template #expandedRowRender="{ record }">
        <Description :schema="descSchema()" :bordered="false" :data="record" :column="4" />
      </template>
      <template #bodyCell="{ column, record, text }">
        <!-- 头像 -->
        <template v-if="column?.dataIndex == 'avatar'">
          <Avatar :size="60" :src="text" />
        </template>
        <template v-else-if="column?.dataIndex == 'action'">
          <TableAction
            :actions="[
              {
                auth: 'dealer:customContract:edit',
                icon: 'ant-design:form-outlined',
                label: '编辑',
                onClick: () => handleEdit('edit', record?.id),
              },
              {
                icon: 'ant-design:file-sync-outlined',
                label: '附件',
                onClick: () => openModal(true, { id: record?.id, type: 'KHHT' }),
              },
            ]"
            :dropDownActions="[
              {
                auth: '',
                icon: 'ant-design:stop-outlined',
                label: '删除',
                fontColor: 'red',
                popConfirm: {
                  title: '是否确认删除',
                  confirm: () => handleDelete([record?.id]),
                },
                ifShow: false,
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>

    <!-- 新增、编辑合并抽屉 -->
    <HandleEdit @register="registerDrawer" @success="handleSuccess" />
    <Attachment @register="registerAttachmentModal" />
  </div>
</template>

<script lang="ts" setup name="CustomerContract">
  // import { Image } from 'ant-design-vue';
  import { reactive } from 'vue';
  import { getColumns, searchCreate, descSchema } from './data';
  import { deleteList, listPage } from '/@/api/customerMgmt/contract';

  import HandleEdit from './components/HandleEdit.vue';
  import Attachment from './components/Attachment.vue';
  import { BasicTable, TableAction, useTable } from '/@/components/Table';
  import { Description } from '/@/components/Description';
  import { Avatar } from 'ant-design-vue';
  import { useDrawer } from '/@/components/Drawer';
  import { useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const { createMessage } = useMessage();

  interface BooleanFlag {
    delBatch: boolean;
    tableLoading: boolean;
  }

  const booleanFlag: BooleanFlag = reactive({
    delBatch: false,
    tableLoading: false,
  });

  const [registerTable, { reload }] = useTable({
    title: '客户合同',
    api: listPage,
    columns: getColumns(),
    searchInfo: { customerOpportunitiesId: route?.query?.customerOpportunitiesId },
    useSearchForm: true,
    formConfig: {
      labelWidth: 80,
      baseColProps: { span: 6 },
      schemas: searchCreate(),
      fieldMapToTime: [['registerDate', ['startTime', 'endTime'], 'YYYY-MM-DD']],
    },
    bordered: true,
    showTableSetting: true,
    showIndexColumn: false,
    actionColumn: {
      width: 140,
      title: '操作',
      dataIndex: 'action',
    },
  });

  // 新增编辑
  const [registerDrawer, { openDrawer }] = useDrawer();
  type handleType = 'add' | 'edit';

  function handleEdit(type: handleType, id?: string) {
    openDrawer(true, {
      type,
      id,
    });
  }

  // 状态修改
  async function handleDelete(ids: (number | string)[]) {
    try {
      // ids = ids.filter((item) => isNumber(item) || isString(item));
      if (ids.length === 0) {
        return;
      }
      await deleteList(ids);
      createMessage.success('操作成功');
      handleSuccess();
    } catch (err: any) {
      // Message.info('操作失败', err);
      createMessage.info('操作失败', err);
      // console.log(err);
    }
  }

  // 附件操作
  const [registerAttachmentModal, { openModal }] = useModal();

  function handleSuccess() {
    reload();
  }
</script>
