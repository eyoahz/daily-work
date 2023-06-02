<template>
  <div>
    <PageWrapper title="天眼查">
      <template #headerContent>
        <InputSearch
          placeholder="请输入完整企业名"
          :loading="loading"
          enter-button
          @search="(value) => getData(value)"
        />
      </template>
      <template #default>
        <Spin :spinning="loading">
          <Description class="m-b-45px" @register="registerBasic" />
        </Spin>
      </template>
      <template #rightFooter>
        <a-button v-auth="'platform:team:add'" type="primary" @click="() => next()">
          下一步
        </a-button>
      </template>
    </PageWrapper>

    <HandleEdit @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>

<script lang="ts" setup>
  import { ref, unref } from 'vue';
  import { InputSearch, Spin } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { getInformation } from '/@/api/customerMgmt/file';
  import { Description, useDescription } from '/@/components/Description/index';
  import { tyDescSchema } from './data';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useDrawer } from '/@/components/Drawer';
  import HandleEdit from './components/HandleEdit.vue';
  import { useTabs } from '/@/hooks/web/useTabs';

  const Message = useMessage();
  const { close } = useTabs();

  const loading = ref(false);
  const data = ref();
  async function getData(value) {
    try {
      if (!value) {
        return Message.createMessage.error('请输入完整企业名！');
      }
      loading.value = true;
      const res = await getInformation(value);
      data.value = res;
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  }

  const [registerBasic] = useDescription({
    title: '企业信息',
    data: data,
    column: 2,
    schema: tyDescSchema(),
    labelStyle: { width: '150px' },
  });

  const [registerDrawer, { openDrawer }] = useDrawer();

  function next() {
    if (!unref(data)?.id) {
      return Message.createMessage.error('请先确认目标企业');
    }
    const value = {
      ...unref(data),
      enterpriseType: data.value.companyOrgType,
      unifiedSocialCreditCode: data.value.creditCode,
      province: data.value.base,
      officeAddress: data.value.regLocation,
      companyRegisteredAddress: data.value.regLocation,
      scale: data.value.staffNumRange,
    };
    openDrawer(true, { data: value, type: 'add' });
  }

  function handleSuccess() {
    close();
  }
</script>
