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
          @click="() => go('/customerMgmt/tianyan')"
          v-auth="'dealer:custom:insertCustom'"
        >
          新增
        </a-button>
        <div v-auth="'platform:annex:batchImportCustoms'">
          <a-select
            style="min-width: 80px; margin-right: 2px"
            :options="options"
            v-model:value="ASelectValue"
          />
          <view v-show="ASelectValue === 'leadIn'">
            <ImpExcel
              style="display: inline-block"
              @success="loadDataSuccess"
              dateFormat="YYYY-MM-DD"
            >
              <a-button color="primary" class="m-3" style="margin: 0"> 确认导入</a-button>
            </ImpExcel>
          </view>
          <a-button
            color="primary"
            class="m-3"
            style="margin: 0"
            v-show="ASelectValue === 'leadOut'"
            @click="handleLeadOut"
          >
            确认导出
          </a-button>
          <a-button
            color="primary"
            class="m-3"
            style="margin: 0"
            v-show="ASelectValue === 'temp'"
            @click="downTemplate"
          >
            确认下载
          </a-button>
        </div>
      </template>
      <template #expandedRowRender="{ record }">
        <Description :schema="descSchema()" :bordered="false" :data="record" :column="3" />
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
                auth: 'dealer:custom:updateCustom',
                icon: 'ant-design:form-outlined',
                label: '编辑',
                onClick: () => handleEdit('edit', record?.id),
                // disabled: record.status === 'FALSE' ? false : true,
              },
              {
                auth: 'dealer:custom:updateCustom',
                label: record.status === '0' ? '停用' : '启用',
                icon: 'clarity:note-edit-line',
                color: record.status === '0' ? 'error' : 'success',
                popConfirm: {
                  title: `是否确认${record.status === '0' ? '停用' : '启用'}`,
                  confirm: () => handleUpdate(record),
                },
              },
            ]"
            :dropDownActions="[
              {
                icon: 'ant-design:eye-outlined',
                label: '拜访记录',
                onClick: () =>
                  go({
                    name: 'CustomerVisit',
                    query: { customName: record?.name },
                  }),
              },
              {
                icon: 'ant-design:eye-outlined',
                label: '商机记录',
                onClick: () =>
                  go({
                    name: 'CustomerOpportunities',
                    query: { customName: record?.name },
                  }),
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

<script lang="ts" setup name="CustomerFile">
  // import { Image } from 'ant-design-vue';
  import { reactive, ref } from 'vue';
  import { getColumns, searchCreate, descSchema } from './data';
  import { modifyStatus, listPage, leadIn } from '/@/api/customerMgmt/file';
  import { updateParam } from '/@/api/customerMgmt/file/model';

  import HandleEdit from './components/HandleEdit.vue';
  import { BasicTable, TableAction, useTable } from '/@/components/Table';
  import { Description } from '/@/components/Description';
  import { ImpExcel, ExcelData, aoaToSheetXlsx } from '/@/components/Excel';
  import { Avatar, Select as ASelect } from 'ant-design-vue';
  import type { SelectProps } from 'ant-design-vue';
  import { useDrawer } from '/@/components/Drawer';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useGo } from '/@/hooks/web/usePage';
  import { downloadApi } from '/@/api/system/upload';
  import { downloadByData } from '/@/utils/file/download';

  const { createMessage } = useMessage();
  const go = useGo();

  const ASelectValue = ref<string>('leadIn');
  const options = reactive<SelectProps['options']>([
    {
      value: 'leadIn',
      label: '导入',
    },
    {
      value: 'leadOut',
      label: '导出',
    },
    {
      value: 'temp',
      label: '模板下载',
    },
  ]);

  /* 导入 */
  let tableList: Array<Record<string, any>> = [];

  async function loadDataSuccess(excelDataList: ExcelData[]) {
    try {
      tableList = [];
      for (const excelData of excelDataList) {
        const { results } = excelData;
        tableList = results;
        await leadIn(tableList);
        createMessage.success('操作成功');
        handleSuccess();
      }
    } catch (err) {
      createMessage.error('操作失败', err);
    }
  }

  /* 导入 */

  /* 导出 */

  function handleLeadOut() {
    const arrHeader = getColumns().map((column) => column.title);
    arrHeader.push(...descSchema().map((column) => column.label));
    const arrData = getDataSource().map((item) => {
      const reply: any[] = [];
      getColumns().forEach((headItem) => {
        reply.push(item[headItem.dataIndex as any]);
      });
      descSchema().forEach((headItem) => {
        reply.push(item[headItem.field]);
      });
      return reply;
    });
    // 保证data顺序与header一致
    aoaToSheetXlsx({
      data: arrData,
      header: arrHeader,
      filename: '二维数组方式导出excel.xlsx',
    });
  }

  /* 导出 */

  /* Region 模板下载 */
  function downTemplate() {
    // http://162.14.107.42:9888/tangbutian/2023/05/31/f8066c3111eb4deba78e3ed952bab8ce.xlsx
    downloadApi(
      'http://162.14.107.42:9888/tangbutian/2023/05/31/f8066c3111eb4deba78e3ed952bab8ce.xlsx',
    ).then((res) => {
      downloadByData(res, 'CRM客户模板.xlsx');
    });
  }

  /* End 模板下载 */

  interface BooleanFlag {
    delBatch: boolean;
    tableLoading: boolean;
  }

  const booleanFlag: BooleanFlag = reactive({
    delBatch: false,
    tableLoading: false,
  });

  const [registerTable, { reload, getDataSource }] = useTable({
    title: '客户档案',
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
    showIndexColumn: false,
    actionColumn: {
      width: 180,
      title: '操作',
      dataIndex: 'action',
    },
  });

  // const [registerDesc] = useDescription({});

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
  async function handleUpdate(record: updateParam) {
    try {
      record.status = record?.status === '0' ? '1' : '0';
      await modifyStatus({ id: record?.id, status: record?.status });
      createMessage.success('操作成功');
    } catch (err) {
      reload();
      console.log(err);
    }
  }

  function handleSuccess() {
    reload();
  }
</script>
