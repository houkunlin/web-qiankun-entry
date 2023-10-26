import { MicroApp, useAppData, useLocation, useParams, useRouteData, useSearchParams } from "@umijs/max";
import { useContext } from "react";
import { RouteContext } from "@ant-design/pro-layout";

export function AppPage() {
  const params = useParams();

  console.debug('AppPage.tsx', params, 'useAppData', useAppData());
  console.debug('AppPage.tsx', params, 'useRouteData', useRouteData());
  console.debug('AppPage.tsx', params, 'useContext(RouteContext)', useContext(RouteContext));
  console.debug('AppPage.tsx', params, 'useSearchParams', useSearchParams());
  console.debug('AppPage.tsx', params, 'useLocation', useLocation());

  return (
    <>
      <MicroApp name={params.appId} base={`/app/${params.appId}`} />
      {/*<MicroAppWithMemoHistory name={params.appId ?? ''} url="/" />*/}
    </>
  )
}

export default AppPage;
