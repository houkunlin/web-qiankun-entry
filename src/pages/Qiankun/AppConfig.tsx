import { Button, FloatButton, Modal } from "antd";
import { DrawerForm, ProFormInstance, ProFormItem, ProFormTextArea } from "@ant-design/pro-components";
import JsonEditor from "./JsonEditor";
import { useCallback, useRef } from "react";
import { DeploymentUnitOutlined, HomeOutlined, SettingOutlined } from "@ant-design/icons";
import { useBoolean } from "ahooks";
import { history } from "@@/exports";
import { nanoid } from "nanoid";
import { useModel } from "@umijs/max";


export function AppConfig(props: any) {
  const formRef = useRef<ProFormInstance>();
  const [visible, { toggle }] = useBoolean();

  const { setConfig, currentValue } = useModel('Qiankun.model');

  const onOpenChange = useCallback((visible: boolean) => {
    if (!visible) {
      return;
    }
    formRef.current?.setFieldsValue(currentValue);
  }, [currentValue]);

  const onFinish = useCallback(async (values: any) => {
    // console.log('onFinish', values);
    try {
      const config = JSON.parse(values.qiankunConfig);
      const apps = config.apps ?? [];
      for (const app of apps) {
        app.key = nanoid();
      }

      config['apps'] = apps;

      setConfig(config);
    } catch (e) {
    }
    toggle();
    Modal.confirm({
      title: '是否刷新？',
      content: '微前端配置已经发生变更，需要刷新页面使配置生效，是否需要刷新页面？',
      centered: true,
      onOk: () => window.location.reload()
    })
    return true;
  }, [toggle, setConfig]);

  return (
    <>
      <DrawerForm
        formRef={formRef}
        title={'微前端运行时配置'}
        trigger={
          <>
            <FloatButton.Group
              shape="square"
              style={{
                right: 24,
              }}
              icon={<DeploymentUnitOutlined />}
            >
              <FloatButton
                icon={<HomeOutlined />}
                tooltip={<div>返回主应用</div>}
                onClick={() => {
                  history.push('/')
                }} />
              <FloatButton icon={<SettingOutlined />} tooltip={<div>微前端运行时配置</div>} onClick={toggle} />
            </FloatButton.Group>
          </>
        }
        initialValues={currentValue}
        onOpenChange={onOpenChange}
        open={visible}
        onFinish={onFinish}
        drawerProps={{ destroyOnClose: false, onClose: toggle }}
      >
        <ProFormItem
          label={'微前端运行时配置'}
          name={'qiankunConfig'}
          rules={[{ required: true, message: '请输入微前端运行时配置', type: 'string' }]}
          extra={<>请参考
            <Button
              type={'link'}
              size={'small'}
              href={'https://umijs.org/docs/max/micro-frontend#%E8%BF%90%E8%A1%8C%E6%97%B6%E6%B3%A8%E5%86%8C%E5%AD%90%E5%BA%94%E7%94%A8'}
              target={'_blank'}>微前端运行时配置</Button>
            配置格式
          </>}
        >
          <JsonEditor />
        </ProFormItem>
        <ProFormTextArea
          label={'微前端运行时配置'}
          name={'qiankunConfig'}
          rules={[{ required: true, message: '请输入微前端运行时配置', type: 'string' }]}
          fieldProps={{ rows: 10 }}
        />
        <ProFormItem label={'参考格式'}>
<pre>{`{
  "apps": [
    {
      "name": "app1",
      "entry": "//localhost:8002",
      "key": "0OVHIrwmaQVAsQhjl4IXf"
    }
  ]
}`}</pre>
        </ProFormItem>
      </DrawerForm>
    </>
  );
}

export default AppConfig;
