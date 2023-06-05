<template>
  <div>
    <BasicModal
      v-bind="$attrs"
      @register="registerModal"
      title="附件列表"
      width="60%"
      :showOkBtn="false"
      destroyOnClose
    >
      <BasicTable rowKey="id" @register="registerTable" :loading="booleanFlag.tableLoading">
        <template #toolbar>
          <BasicUpload
            :api="uploadApi"
            :showPreview="false"
            :maxSize="5"
            :accept="['image/*', '.doc,', 'docx', '.xls', 'xlsx', '.ppt', '.pptx', '.pdf', '.txt']"
            @change="uploadFile"
          />
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
                  auth: '',
                  label: '下载',
                  onClick: () => handleDownload(record),
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
  import { getAnnexList, insertAttachment } from '/@/api/customerMgmt/contract';

  import { BasicTable, useTable, BasicColumn, FormSchema, TableAction } from '/@/components/Table';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Avatar } from 'ant-design-vue';
  import { BasicUpload } from '/@/components/Upload';
  import { uploadApi, downloadApi } from '/@/api/system/upload';
  import { downloadByData } from '/@/utils/file/download';
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

  const searchInfo: { sourceId: string; type: string } = {
    sourceId: '',
    type: '',
  };
  const [registerModal] = useModalInner((data: any) => {
    searchInfo.sourceId = data?.id;
    searchInfo.type = data?.type;
  });

  function getColumns(): BasicColumn[] {
    return [
      {
        title: '附件名称',
        dataIndex: 'name',
      },
      {
        title: '最后修改人员',
        dataIndex: 'createBy',
      },
      {
        title: '最后修改时间',
        dataIndex: 'createTime',
      },
    ];
  }

  function searchCreate(): FormSchema[] {
    return [
      {
        label: '客户编码',
        field: 'customCode',
        component: 'Input',
        colProps: {
          span: 8,
        },
      },
      {
        label: '客户名称',
        field: 'customName',
        component: 'Input',
      },
    ];
  }

  const [registerTable, { reload }] = useTable({
    api: getAnnexList,
    // beforeFetch: (params: Record<string, any>) => {
    //   params.
    // },
    searchInfo,
    ellipsis: false,
    columns: getColumns(),
    useSearchForm: false,
    formConfig: {
      labelWidth: 80,
      baseColProps: { span: 6 },
      schemas: searchCreate(),
      fieldMapToTime: [['registerDate', ['startTime', 'endTime'], 'YYYY-MM-DD']],
    },
    pagination: true,
    bordered: true,
    showIndexColumn: true,
    canResize: false,
    actionColumn: {
      width: 60,
      title: '操作',
      dataIndex: 'action',
    },
  });

  function handleDownload({ url, name }) {
    downloadApi(url).then((res) => {
      downloadByData(res, name);
    });
  }

  async function uploadFile(list: string[]) {
    try {
      await insertAttachment(
        list.map((item: any) => ({
          name: item?.fileName,
          url: item?.url,
          ...searchInfo,
        })),
      );
      createMessage.info('操作成功');
      handleSuccess();
    } catch (err) {
      createMessage.error('操作失败', err);
    }
  }

  function handleSuccess() {
    reload();
  }
</script>
