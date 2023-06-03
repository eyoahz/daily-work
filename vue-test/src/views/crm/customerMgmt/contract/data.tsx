import { BasicColumn, FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description';
import { uploadApi } from '@/api/system/upload';

export function getColumns(): BasicColumn[] {
  return [
    {
      title: '合同编码',
      dataIndex: 'code',
    },
    {
      title: '合同名称',
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
    {
      title: '商机名称',
      dataIndex: 'opportunitiesName',
    },
  ];
}

export function descSchema(): DescItem[] {
  return [
    {
      label: '合同记录描述',
      field: 'contractRecordDescription',
      span: 4,
    },
    {
      label: '创建人员',
      field: 'createBy',
    },
    {
      label: '创建时间',
      field: 'createTime',
    },
    {
      label: '最后修改人员',
      field: 'updateBy',
    },
    {
      label: '最后修改时间',
      field: 'updateTime',
    },
  ];
}

export function searchCreate(): FormSchema[] {
  return [
    {
      field: 'customName',
      component: 'Input',
      label: '客户名称',
    },
    {
      field: 'name',
      component: 'Input',
      label: '合同名称',
    },
    // {
    //   field: 'registerDate',
    //   component: 'RangePicker',
    //   label: '注册时间',
    //   colProps: {
    //     span: 7,
    //   },
    // },
  ];
}

export function handleEditFormSchema(): FormSchema[] {
  return [
    // {
    //   field: 'avatar',
    //   component: 'Input',
    //   label: '会员头像',
    //   slot: 'avatar',
    // },
    {
      label: '合同名称',
      field: 'name',
      component: 'Input',
      required: true,
    },
    {
      label: '客户编码',
      field: 'customCode',
      component: 'Input',
      required: true,
      show: false,
    },
    {
      label: '客户名称',
      field: 'customName',
      component: 'Input',
      required: true,
      componentProps: {
        disabled: true,
      },
      slot: 'customer',
    },
    {
      label: '所属商机',
      field: 'opportunitiesName',
      component: 'Input',
      required: true,
      slot: 'customOpportunitiesName',
    },
    {
      label: '商机ID',
      field: 'customerOpportunitiesId',
      component: 'Input',
      required: false,
      show: false,
    },
    {
      label: '合同记录描述',
      field: 'contractRecordDescription',
      component: 'InputTextArea',
    },
    {
      label: '附件',
      field: 'annexList',
      component: 'Upload',
      defaultValue: [],
      componentProps: ({ formModel }) => {
        return {
          api: uploadApi,
          onChange: (fileList) => {
            formModel.annexList.splice(0);
            fileList?.forEach((item) => {
              item.name = item?.fileName;
            });
            formModel.annexList.push(...fileList);
          },
        };
      },
    },
  ];
}
