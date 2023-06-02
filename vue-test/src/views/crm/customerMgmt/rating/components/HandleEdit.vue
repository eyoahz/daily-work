<template>
  <div>
    <BasicDrawer
      v-bind="$attrs"
      @register="registerDrawer"
      showFooter
      :title="getTitle"
      width="500px"
      @ok="handleSubmit"
    >
      <Skeleton active :loading="loading">
        <BasicForm @register="registerForm">
          <template #avatar="{ model, field }">
            <Upload
              list-type="picture-card"
              class="avatar-uploader"
              :show-upload-list="false"
              action="/upload"
              :headers="headers"
              :before-upload="beforeUpload"
              @change="handleChange"
            >
              <img v-if="model[field]" :src="model[field]" alt="image" class="imgDiv" />
              <div v-else>
                <LoadingOutlined v-if="imgLoading" />
                <PlusOutlined v-else />
                <div class="ant-upload-text">上传</div>
              </div>
            </Upload>
          </template>
        </BasicForm>
      </Skeleton>
    </BasicDrawer>
  </div>
</template>
<script lang="ts" setup>
  import { message, Skeleton, Upload, UploadChangeParam, UploadProps } from 'ant-design-vue';
  import { LoadingOutlined, PlusOutlined } from '@ant-design/icons-vue';
  import { cloneDeep } from 'lodash-es';
  import { nextTick, ref, Ref, toRaw, unref } from 'vue';
  import { handleEditFormSchema } from '../data';
  import { getDetails, insert, update } from '/@/api/customerMgmt/rating';

  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useUserStore } from '/@/store/modules/user';

  const emit = defineEmits(['success']);
  const getTitle = ref('');
  const record: Ref<Partial<{ id: number }>> = ref({});
  const loading = ref(true);
  const imgLoading = ref(false);
  const type = ref('add');
  const { createMessage } = useMessage();
  const userStore = useUserStore();
  const headers = { bearer: userStore.getToken };

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    type.value = data?.type;
    imgLoading.value = false;
    record.value.id = data.id;
    setDrawerProps({ confirmLoading: false });

    switch (unref(data?.type)) {
      case 'add': {
        getTitle.value = '新增';
        loading.value = false;
        await nextTick();
        resetFields();
        break;
      }
      case 'edit': {
        getTitle.value = '编辑';
        const { id } = data;
        if (!id) {
          return;
        }
        loading.value = true;
        const result = await getDetails({ id });
        loading.value = false;
        await nextTick();
        record.value = cloneDeep(result);

        setFieldsValue(unref(record));
        break;
      }
      default:
        console.log(`没有定义${unref(data?.type)}操作`);
        break;
    }
  });

  const [registerForm, { resetFields, setFieldsValue, validate, validateFields }] = useForm({
    labelWidth: 90,
    labelAlign: 'left',
    schemas: handleEditFormSchema(),
    showActionButtonGroup: false,
    baseColProps: { span: 24 },
  });

  // 文件上传各个状态处理
  function handleChange(info: UploadChangeParam) {
    switch (info?.file?.status) {
      case 'uploading':
        imgLoading.value = true;
        break;
      case 'done':
        // 获取url
        imgLoading.value = false;
        setFieldsValue({ image: info.file.response?.data.filePath });
        setTimeout(() => {
          validateFields(['image']);
        }, 0);
        break;
      case 'error':
        imgLoading.value = false;
        createMessage.error('upload error');
        break;
      default:
        break;
    }
  }

  // 文件上传前的钩子进行格式、大小验证
  function beforeUpload(file: UploadProps['fileList'] | any) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      createMessage.error('只能上传jpeg、png格式!');
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      createMessage.error('图片大小必须小于2MB!');
    }

    return isJpgOrPng && isLt2M;
  }

  // 提交
  async function handleSubmit() {
    try {
      const values = await validate();
      setDrawerProps({ confirmLoading: true });

      switch (unref(type)) {
        case 'add': {
          const data = values;
          await insert(data);
          break;
        }
        case 'edit': {
          const data = { ...toRaw(unref(record)), ...values };
          await update(data);
          break;
        }
        default:
          break;
      }
      message.success('操作成功');
      emit('success');
      closeDrawer();
    } catch (error: any) {
      // console.log('err', error);
      message.info('操作失败，请联系管理员', error);
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>

<style lang="less">
  .avatar-uploader > .ant-upload {
    width: 128px;
    height: 128px;

    .imgDiv {
      width: 100%;
      height: 100%;
    }
  }

  .ant-upload-select-picture-card i {
    color: #999;
    font-size: 32px;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>
