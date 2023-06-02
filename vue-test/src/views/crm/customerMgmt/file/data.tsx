import { BasicColumn, FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description';
import { formatToDate } from '/@/utils/dateUtil';
import { Tag, Tooltip } from 'ant-design-vue';
import dicts, { dictionary } from '/@/utils/dictionary';
import { getTeamList, getRegionList, getCustomGradeList } from '/@/api/customerMgmt/file';

export function getColumns(): BasicColumn[] {
  const dict: Record<string, dictionary> = {
    battlefield: () => [null, [null]], // 战场
    trade: () => [null, [null]], // 所属行业
    businessType: () => [null, [null]], // 企业类型
    businessScale: () => [null, [null]], // 企业规模
  };
  dicts('crm_zc').then((res) => (dict.battlefield = res));
  dicts('crm_hy').then((res) => (dict.trade = res));
  dicts('crm_qylx').then((res) => (dict.businessType = res));
  dicts('crm_qygm').then((res) => (dict.businessScale = res));

  return [
    {
      title: '客户编码',
      dataIndex: 'code',
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '公海客户',
      dataIndex: 'isHighSeas',
      width: 75,
      customRender({ value }) {
        return (
          <div>
            {value === '0' && <Tag color="green">是</Tag>}
            {value === '1' && <Tag color="red">否</Tag>}
          </div>
        );
      },
    },
    {
      title: '战场',
      dataIndex: 'battlefield',
      width: 80,
      customRender({ value }) {
        const [present] = dict.battlefield(value);
        return <Tag color={present?.listClass}>{present?.dictLabel ?? value}</Tag>;
      },
    },
    {
      title: '所属行业',
      dataIndex: 'industry',
      width: 160,
      customRender({ value }) {
        const [present] = dict.trade(value);
        return (present?.dictLabel ?? value).length > 10 ? (
          <Tooltip title={present?.dictLabel ?? value}>
            <Tag>{`${(present?.dictLabel ?? value).slice(0, 10)}...`}</Tag>
          </Tooltip>
        ) : (
          <Tag color={present?.listClass}>{present?.dictLabel ?? value}</Tag>
        );
      },
    },
    {
      title: '企业类型',
      dataIndex: 'enterpriseType',
      width: 160,
      customRender({ value }) {
        const [present] = dict.businessType(value);

        return (present?.dictLabel ?? value).length > 10 ? (
          <Tooltip title={present?.dictLabel ?? value}>
            <Tag>{`${(present?.dictLabel ?? value).slice(0, 10)}...`}</Tag>
          </Tooltip>
        ) : (
          <Tag color={present?.listClass}>{present?.dictLabel ?? value}</Tag>
        );
      },
    },
    {
      title: '企业规模',
      dataIndex: 'scale',
      customRender({ value }) {
        const [present] = dict.businessScale(value);
        return <Tag color={present?.listClass}>{present?.dictLabel ?? value}</Tag>;
      },
    },
    // {
    //   title: '创建人员',
    //   dataIndex: 'createBy',
    // },
    // {
    //   title: '创建时间',
    //   dataIndex: 'createTime',
    // },
    // {
    //   title: '最后修改人员',
    //   dataIndex: 'updateBy',
    // },
    // {
    //   title: '最后修改时间',
    //   dataIndex: 'updateTime',
    // },
  ];
}

export function descSchema(): DescItem[] {
  return [
    {
      field: 'unifiedSocialCreditCode',
      label: '统一社会信用代码',
    },
    // {
    //   field: '',
    //   label: '所属团队',
    // },
    // {
    //   field: '',
    //   label: '所属大区',
    // },
    // {
    //   field: '',
    //   label: '所属等级',
    // },
    {
      field: 'province',
      label: '所在省',
    },
    {
      field: 'city',
      label: '所在市',
    },
    {
      field: 'officeAddress',
      label: '办公地址',
    },
    {
      field: 'companyRegisteredAddress',
      label: '注册地址',
    },
    {
      field: 'operator',
      label: '客户经营人',
    },
    {
      field: 'source',
      label: '信息来源',
    },
    {
      field: 'firstSigningYear',
      label: '首次签约年',
    },
    {
      field: 'informationInfrastructureStatus',
      label: '信息化基础设施状况',
      span: 4,
    },
    {
      field: 'description',
      label: '描述',
      span: 4,
    },
    {
      field: 'createBy',
      label: '创建人员',
    },
    {
      field: 'createTime',
      label: '创建时间',
    },
    {
      field: 'updateBy',
      label: '最后修改人员',
    },
    {
      field: 'updateTime',
      label: '最后修改时间',
    },
  ];
}

export function searchCreate(): FormSchema[] {
  return [
    {
      field: 'name',
      component: 'Input',
      label: '客户名称',
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
    {
      field: 'name',
      component: 'Input',
      label: '客户名称',
      required: true,
      // slot: 'customer',
    },
    {
      field: 'unifiedSocialCreditCode',
      component: 'Input',
      label: '统一社会信用代码',
      required: true,
      componentProps: {
        disabled: true,
      },
    },
    {
      field: 'industry',
      component: 'Input',
      label: '所属行业',
      required: true,
      // componentProps: {
      //   api: async () => {
      //     const [_, source] = (await dicts('crm_hy'))();
      //     return source.map((item: any) => {
      //       return {
      //         label: item?.dictLabel,
      //         value: item?.dictValue,
      //       };
      //     });
      //   },
      // },
    },
    {
      field: 'enterpriseType',
      component: 'Input',
      label: '企业类型',
      required: true,
      // componentProps: {
      //   api: async () => {
      //     const [_, source] = (await dicts('crm_qylx'))();
      //     return source.map((item: any) => {
      //       return {
      //         label: item?.dictLabel,
      //         value: item?.dictValue,
      //       };
      //     });
      //   },
      // },
    },
    {
      field: 'scale',
      component: 'Input',
      label: '企业规模',
      required: true,
      // componentProps: {
      //   api: async () => {
      //     const [_, source] = (await dicts('crm_qygm'))();
      //     return source.map((item: any) => {
      //       return {
      //         label: item?.dictLabel,
      //         value: item?.dictValue,
      //       };
      //     });
      //   },
      // },
    },
    {
      field: 'province',
      component: 'Input',
      label: '所在省',
      required: true,
    },
    {
      field: 'city',
      component: 'Input',
      label: '所在市',
      required: true,
    },
    {
      field: 'companyRegisteredAddress',
      component: 'Input',
      label: '注册地址',
      required: true,
    },
    {
      field: 'officeAddress',
      component: 'Input',
      label: '办公地址',
      required: true,
    },
    {
      field: 'battlefield',
      component: 'ApiSelect',
      label: '战场',
      required: true,
      componentProps: {
        api: async () => {
          const [_, source] = (await dicts('crm_zc'))();
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
      field: 'teamId',
      component: 'ApiSelect',
      label: '团队',
      required: true,
      componentProps: {
        api: getTeamList,
        labelField: 'name',
        valueField: 'id',
      },
    },
    {
      field: 'regionId',
      component: 'ApiTreeSelect',
      label: '大区',
      required: true,
      componentProps: {
        api: getRegionList,
        fieldNames: { label: 'name', value: 'id' },
      },
    },
    {
      field: 'gradeId',
      component: 'ApiSelect',
      label: '等级',
      required: true,
      componentProps: {
        api: getCustomGradeList,
        labelField: 'name',
        valueField: 'id',
      },
    },
    {
      field: 'operator',
      component: 'Input',
      label: '客户经营人',
      required: true,
    },
    {
      field: 'source',
      component: 'Input',
      label: '信息来源',
      required: true,
    },
    {
      field: 'firstSigningYear',
      component: 'DatePicker',
      label: '首次签约年',
      required: true,
      componentProps: {
        picker: 'year',
        valueFormat: 'YYYY',
      },
    },
    {
      field: 'informationInfrastructureStatus',
      component: 'InputTextArea',
      label: '信息化基础设施状况',
      required: true,
    },
    {
      field: 'description',
      component: 'InputTextArea',
      label: '描述',
      // required: true,
    },
  ];
}

//详情
export function tyDescSchema(): DescItem[] {
  return [
    {
      field: 'name',
      label: '企业名',
      render(val, data) {
        if (data.property3) {
          val = val + '(' + data.property3 + ')';
        }
        return val;
      },
    },
    {
      field: 'legalPersonName',
      label: '法人',
    },
    {
      field: 'regCapital',
      label: '注册资本',
    },
    {
      field: 'estiblishTime',
      label: '成立日期',
    },
    {
      field: 'regStatus',
      label: '经营状态',
    },
    {
      field: 'regNumber',
      label: '工商注册号',
    },
    {
      field: 'creditCode',
      label: '统一社会信用代码',
    },
    {
      field: 'orgNumber',
      label: '组织机构代码',
    },
    {
      field: 'taxNumber',
      label: '纳税人识别号',
    },
    {
      field: 'companyOrgType',
      label: '公司类型',
    },
    {
      field: 'fromTime',
      label: '营业期限',
      render: (_: any, data: Recordable) => {
        let val = '';
        if (data.fromTime && data.toTime) {
          val = `${formatToDate(data.fromTime)} 至 ${formatToDate(data.toTime)}`;
        }
        return val;
      },
    },
    {
      field: 'industry',
      label: '行业',
    },
    {
      field: 'approvedTime',
      label: '核准日期',
    },
    {
      field: 'actualCapital',
      label: '实缴资本',
    },
    {
      field: 'staffNumRange',
      label: '人员规模',
    },
    {
      field: 'socialStaffNum',
      label: '参保人数',
    },
    {
      field: 'regInstitute',
      label: '登记机关',
    },
    {
      field: 'historyNames',
      label: '曾用名',
    },
    {
      field: 'regLocation',
      label: '注册地址',
      span: 2,
    },
    {
      field: 'businessScope',
      label: '经营范围',
      span: 2,
    },
  ];
}
