import { PageContainer } from "@ant-design/pro-components";
import { Link, useModel } from "@umijs/max";
import { Card, Empty, List, Typography } from "antd";
import { Icon } from "@/components/Icon/IconPanel";
import { useMemo } from "react";

export function AppList() {
  const { config } = useModel('Qiankun.model');

  const apps = useMemo(() => config?.apps ?? [], [config?.apps]);

  const appList = useMemo(() => {
    return <List
      grid={{
        gutter: 16,
        column: 4,
      }}
      dataSource={apps}
      renderItem={(item: any) => {
        // @ts-ignore
        const CustomIcon = Icon[item.key + 'Outlined'] ?? Icon['AppstoreOutlined'];
        return (
          <List.Item>
            <Link to={`/app/${item.name}`}>
              <Card hoverable>
                <div
                  style={{ fontWeight: 900, textAlign: 'center', fontSize: '40pt', color: 'red' }}
                >
                  <CustomIcon />
                </div>
                <Typography.Title style={{ textAlign: 'center' }}>{item.name}</Typography.Title>
              </Card>
            </Link>
          </List.Item>
        )
      }}
    />
  }, [apps]);

  return (
    <PageContainer title={'微前端应用列表'}>
      {apps.length > 0 && appList}
      {
        apps.length === 0 && <Empty
          description={<>
            暂无应用，请点击右下角设置按钮配置应用列表
          </>} />
      }
    </PageContainer>
  )
}

export default AppList;
