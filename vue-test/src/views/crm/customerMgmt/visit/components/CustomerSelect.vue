<template>
  <div>
    <BasicModal v-bind="$attrs">
      <BasicTable rowKey="id" @register="registerTable" :loading="booleanFlag.tableLoading">
        <template #bodyCell="{ column, record, text }">
          <!-- 头像 -->
          <template v-if="column?.dataIndex == 'avatar'">
            <Avatar :size="60" :src="text" />
          </template>
          <template v-else-if="column?.dataIndex == 'action'">
            <TableAction
              :actions="[
                {
                  auth: '',
                  label: '确认',
                  onClick: () => handleConfirm(record),
                },
              ]"
            />
          </template>
        </template>
      </BasicTable>
    </BasicModal>
  </div>
</template>

<script lang="ts" setup>
  // import { Image } from 'ant-design-vue';
  import { reactive } from 'vue';
  import { customerPage } from '/@/api/customerMgmt/visit';

  import { BasicTable, useTable, BasicColumn, FormSchema, TableAction } from '/@/components/Table';
  import { BasicModal } from '/@/components/Modal';
  import { Avatar } from 'ant-design-vue';
  // import { useMessage } from '/@/hooks/web/useMessage';

  // const { createMessage } = useMessage();

  const emits = defineEmits(['business-select']);

  interface BooleanFlag {
    delBatch: boolean;
    tableLoading: boolean;
  }

  const booleanFlag: BooleanFlag = reactive({
    delBatch: false,
    tableLoading: false,
  });

  function getColumns(): BasicColumn[] {
    return [
      {
        title: '商机名称',
        dataIndex: 'name',
      },
      {
        title: '客户编码',
        dataIndex: 'customCode',
      },
      {
        title: '客户名称',
        dataIndex: 'customName',
      },
    ];
  }

  function searchCreate(): FormSchema[] {
    return [
      {
        label: '客户编码',
        field: 'code',
        component: 'Input',
        colProps: {
          span: 8,
        },
      },
      {
        label: '客户名称',
        field: 'name',
        component: 'Input',
      },
    ];
  }

  const [registerTable] = useTable({
    title: '商机选择',
    api: customerPage,
    ellipsis: false,
    columns: getColumns(),
    useSearchForm: true,
    formConfig: {
      labelWidth: 80,
      baseColProps: { span: 6 },
      schemas: searchCreate(),
      fieldMapToTime: [['registerDate', ['startTime', 'endTime'], 'YYYY-MM-DD']],
    },
    pagination: true,
    bordered: true,
    showTableSetting: true,
    showIndexColumn: true,
    actionColumn: {
      width: 60,
      title: '操作',
      dataIndex: 'action',
    },
  });

  function handleConfirm(data: Record<string, any>) {
    emits('handle-select', data);
  }
</script>
