import { ref } from 'vue';
import { Tag } from 'ant-design-vue';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { dict } from '/@/api/system/dict';
import { ListDictResult } from '/@/api/system/dict/model';

export function getColumns(): BasicColumn[] {
  const statusMap = ref(new Map());
  dict('/sys_normal_disable').then((res: ListDictResult) => {
    res?.forEach((item) => {
      statusMap.value.set(item.dictValue, item);
    });
  });

  return [
    {
      title: '等级名称',
      dataIndex: 'name',
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 60,
      customRender: ({ value }) => {
        const target = statusMap.value?.get(value);
        return <Tag color={target?.listClass}>{target?.dictLabel}</Tag>;
      },
    },
    {
      title: '等级描述',
      dataIndex: 'description',
    },
    {
      title: '创建人员',
      dataIndex: 'createBy',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '最后修改人员',
      dataIndex: 'updateBy',
    },
    {
      title: '最后修改时间',
      dataIndex: 'updateTime',
    },
  ];
}

export function searchCreate(): FormSchema[] {
  return [
    {
      field: 'name',
      component: 'Input',
      label: '等级名称',
    },
    {
      field: 'status',
      label: '状态',
      component: 'ApiSelect',
      componentProps: {
        api: async () => {
          const res = await dict('/sys_normal_disable');
          return (
            res?.map((item) => ({
              label: item.dictLabel,
              value: item.dictValue,
            })) ?? []
          );
        },
      },
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
      field: 'name',
      component: 'Input',
      label: '等级名称',
      required: true,
    },
    {
      field: 'description',
      component: 'InputTextArea',
      label: '等级描述',
      required: true,
    },
    {
      field: 'status',
      label: '状态',
      component: 'ApiRadioGroup',
      defaultValue: '0',
      required: true,
      componentProps: {
        api: async () => {
          const res = await dict('/sys_normal_disable');
          return (
            res?.map((item) => ({
              label: item.dictLabel,
              value: item.dictValue,
            })) ?? []
          );
        },
      },
    },
  ];
}
