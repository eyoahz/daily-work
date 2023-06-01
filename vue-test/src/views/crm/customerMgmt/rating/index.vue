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
          v-auth="'platform:customGrade:insertCustomGrade'"
        >
          新增
        </a-button>
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
                auth: 'platform:customGrade:updateCustomGrade',
                icon: 'ant-design:form-outlined',
                label: '编辑',
                onClick: () => handleEdit('edit', record?.id),
                // disabled: record.status === 'FALSE' ? false : true,
              },
              {
                auth: 'platform:customGrade:deleteCustomGrade',
                icon: 'ant-design:delete-outlined',
                label: '删除',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  confirm: () => handleDelete([record?.id]),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>

    <!-- 新增、编辑合并抽屉 -->
    <HandleEdit @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>

<script lang="ts" setup>
  // import { Image } from 'ant-design-vue';
  import { reactive } from 'vue';
  import { getColumns, searchCreate } from './data';
  import { deleteList, listPage } from '/@/api/customerMgmt/rating';

  import HandleEdit from './components/HandleEdit.vue';
  import { BasicTable, TableAction, useTable } from '/@/components/Table';
  import { Avatar } from 'ant-design-vue';
  import { useDrawer } from '/@/components/Drawer';
  import { useMessage } from '/@/hooks/web/useMessage';

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
    title: '客户等级',
    api: listPage,
    columns: getColumns(),
    useSearchForm: true,
    formConfig: {
      labelWidth: 80,
      baseColProps: { span: 6 },
      schemas: searchCreate(),
      fieldMapToTime: [['registerDate', ['startTime', 'endTime'], 'YYYY-MM-DD']],
    },
    bordered: true,
    showTableSetting: true,
    showIndexColumn: true,
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
      reload();
    } catch (err: any) {
      // Message.info('操作失败', err);
      createMessage.info('操作失败', err);
      // console.log(err);
    }
  }

  function handleSuccess() {
    reload();
  }
</script>
