import { BasicColumn, FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description';
import { uploadApi } from '/@/api/system/upload';

import { Tag } from 'ant-design-vue';
import dicts, { dictionary } from '/@/utils/dictionary';

export function getColumns(): BasicColumn[] {
  const dict: Record<string, dictionary> = {
    visitType: () => [null, [null]], // 拜访类型
    visitWay: () => [null, [null]], // 拜访方式
    saleStage: () => [null, [null]], // 销售阶段
  };
  dicts('crm_bflx').then((res) => (dict.visitType = res));
  dicts('crm_bffs').then((res) => (dict.visitWay = res));
  dicts('crm_xsjd').then((res) => (dict.saleStage = res));

  return [
    {
      title: '拜访编码',
      dataIndex: 'code',
    },
    {
      title: '客户名称',
      dataIndex: 'customName',
    },
    {
      title: '商机名称',
      dataIndex: 'customOpportunitiesName',
    },
    {
      title: '拜访类型',
      dataIndex: 'visitType',
      customRender({ value }) {
        return (
          <div>
            {value === 'RC' && <Tag>日常拜访</Tag>}
            {value === 'SJ' && <Tag>商机拜访</Tag>}
          </div>
        );
      },
    },
    {
      title: '拜访方式',
      dataIndex: 'visitingMethods',
      customRender({ value }) {
        const [present] = dict.visitWay(value);
        return <Tag color={present?.listClass}>{present?.dictLabel ?? value}</Tag>;
      },
    },
    {
      title: '销售阶段',
      dataIndex: 'saleStage',
      customRender({ value }) {
        const [present] = dict.saleStage(value);
        return <Tag color={present?.listClass}>{present?.dictLabel ?? value}</Tag>;
      },
    },
  ];
}

export function descSchema(): DescItem[] {
  return [
    {
      label: '客户编码',
      field: 'customCode',
    },
    {
      label: '我方拜访人',
      field: 'ourVisitor',
    },
    {
      label: '客户方接待人',
      field: 'customerReception',
    },
    {
      label: '拜访日期',
      field: 'visitTime',
    },
    {
      label: '签到时间',
      field: 'signInTime',
    },
    {
      label: '签到地址',
      field: 'signInAddress',
    },
    {
      label: '下次拜访日期',
      field: 'nextVisitDate',
    },
    {
      label: '商谈事项',
      field: 'negotiateMatters',
      span: 3,
    },
    {
      label: '结果评价',
      field: 'resultEvaluation',
      span: 3,
    },
    {
      label: '下次拜访事项',
      field: 'nextVisitMatters',
      span: 3,
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
      field: 'visitType',
      component: 'ApiSelect',
      label: '拜访类型',
      componentProps: {
        options: [
          {
            label: '日常拜访',
            value: 'RC',
          },
          {
            label: '商机拜访',
            value: 'SJ',
          },
        ],
        // api: async () => {
        //   const [_, source] = (await dicts('crm_bflx'))();
        //   return source.map((item: any) => {
        //     return {
        //       label: item?.dictLabel,
        //       value: item?.dictValue,
        //     };
        //   });
        // },
      },
    },
    {
      field: 'visitingMethods',
      component: 'ApiSelect',
      label: '拜访方式',
      componentProps: {
        api: async () => {
          const [_, source] = (await dicts('crm_bffs'))();
          return source.map((item: any) => {
            return {
              label: item?.dictLabel,
              value: item?.dictValue,
            };
          });
        },
      },
    },
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
    // {
    //   label: '所属商机',
    //   field: 'productId',
    //   component: 'Input',
    //   required: true,
    //   componentProps: {
    //     disabled: true,
    //   },
    // },
    {
      label: '拜访类型',
      field: 'visitType',
      component: 'Select',
      required: true,
      componentProps: ({ formActionType }) => {
        return {
          options: [
            {
              label: '日常拜访',
              value: 'RC',
            },
            {
              label: '商机拜访',
              value: 'SJ',
            },
          ],
          onSelect(value) {
            switch (value) {
              case 'RC':
                formActionType.updateSchema({ field: 'customOpportunitiesName', required: false });
                break;
              case 'SJ':
                formActionType.updateSchema({ field: 'customOpportunitiesName', required: true });
                break;
            }
          },
        };
      },
    },
    {
      label: '所属商机',
      field: 'customOpportunitiesName',
      component: 'Input',
      slot: 'customOpportunitiesName',
    },
    {
      label: '商机ID',
      field: 'customOpportunitiesId',
      component: 'Input',
      required: false,
      show: false,
    },
    {
      label: '拜访方式',
      field: 'visitingMethods',
      component: 'ApiSelect',
      required: true,
      componentProps: {
        api: async () => {
          const [_, source] = (await dicts('crm_bffs'))();
          return source.map((item: any) => {
            return {
              label: item?.dictLabel,
              value: item?.dictValue,
            };
          });
        },
      },
    },
    {
      label: '销售阶段',
      field: 'saleStage',
      component: 'ApiSelect',
      required: true,
      componentProps: {
        api: async () => {
          const [_, source] = (await dicts('crm_xsjd'))();
          return source.map((item: any) => {
            return {
              label: item?.dictLabel,
              value: item?.dictValue,
            };
          });
        },
      },
    },
    {
      label: '我方拜访人',
      field: 'ourVisitor',
      component: 'Input',
      required: true,
    },
    {
      label: '客户方接待人',
      field: 'customerReception',
      component: 'Input',
      required: true,
    },
    {
      label: '拜访日期',
      field: 'visitTime',
      component: 'DatePicker',
      required: true,
      componentProps: {
        showTime: true,
      },
    },
    {
      label: '签到时间',
      field: 'signInTime',
      component: 'DatePicker',
      componentProps: {
        showTime: true,
      },
    },
    {
      label: '签到地址',
      field: 'signInAddress',
      component: 'Input',
    },
    {
      label: '下次拜访日期',
      field: 'nextVisitDate',
      component: 'DatePicker',
      componentProps: {
        showTime: true,
      },
    },
    {
      label: '商谈事项',
      field: 'negotiateMatters',
      component: 'InputTextArea',
    },
    {
      label: '结果评价',
      field: 'resultEvaluation',
      component: 'InputTextArea',
    },
    {
      label: '下次拜访事项',
      field: 'nextVisitMatters',
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
    // {
    //   field: 'status',
    //   component: 'RadioButtonGroup',
    //   label: '状态',
    //   required: true,
    //   defaultValue: '0',
    //   componentProps: {
    //     options: [
    //       {
    //         label: '正常',
    //         value: '0',
    //       },
    //       {
    //         label: '停用',
    //         value: '1',
    //       },
    //     ],
    //   },
    // },
  ];
}
