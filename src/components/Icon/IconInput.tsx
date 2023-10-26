import { EditOutlined } from '@ant-design/icons';
import { useControllableValue, useMemoizedFn } from 'ahooks';
import { AutoComplete, Button, Input, Modal, Space } from 'antd';
import type { MouseEvent } from 'react';
import { forwardRef, useState } from 'react';
import IconPanel, { Icon, IconKeys } from './IconPanel';

const defaultOptions = IconKeys.map((key) => {
  // @ts-ignore
  const CustomIcon = Icon[key];
  const value = key.replace('Outlined', '');
  return {
    value: value,
    label: (
      <Space>
        <CustomIcon />
        <span>{value}</span>
      </Space>
    ),
  };
});

export default forwardRef<any, any>((props: any, ref) => {
  const [value, setValue] = useControllableValue(props);
  const [showModal, setShowModal] = useState<boolean>(false);
  const onChange = useMemoizedFn((v) => {
    setShowModal(false);
    setValue(v);
  });

  const clickAction = useMemoizedFn((e: MouseEvent<any>) => {
    e.stopPropagation();
    setShowModal(true);
  });

  // @ts-ignore
  const CustomIcon = Icon[value + 'Outlined'];
  const AddonBefore = !CustomIcon ? <></> : <CustomIcon />;

  return (
    <>
      <Space size={8}>
        <AutoComplete
          id={props.id}
          ref={ref}
          style={{ width: 220 }}
          defaultActiveFirstOption
          value={value}
          options={defaultOptions}
          onChange={onChange}
          filterOption={(inputValue, option) =>
            option!.value.toLowerCase().includes(inputValue.toLowerCase())
          }
        >
          <Input
            value={value}
            addonBefore={AddonBefore}
            allowClear
            placeholder={'请输入图标名称'}
          />
        </AutoComplete>
        <Button
          type={'link'}
          icon={<EditOutlined />}
          onClick={clickAction}
          style={{ paddingLeft: 10, paddingRight: 10 }}
        >
          选择图标
        </Button>
      </Space>
      <Modal
        title={'选择图标'}
        width={815}
        open={showModal}
        centered={true}
        maskClosable={true}
        destroyOnClose={true}
        onCancel={() => setShowModal(false)}
        footer={false}
        styles={{ body: { height: 800, overflow: 'auto', paddingTop: 0 } }}
      >
        <IconPanel value={value} onChange={onChange} />
      </Modal>
    </>
  );
});
