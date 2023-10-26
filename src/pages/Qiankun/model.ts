import { useLocalStorageState } from "ahooks";
import { useMemo } from "react";
import { isNil } from "lodash";

const QianKunConfigKey = 'QianKunConfigKey';


export type QiankunConfigProps = {
  apps?: {
    name: string;
    entry: string;
    key: string;

    [key: string]: any;
  }[];
}

export function getQiankunConfigObj(): QiankunConfigProps {
  const value = localStorage.getItem(QianKunConfigKey);
  const config = isNil(value) || value.trim().length === 0 ? undefined : value;
  console.log('乾坤微前端配置', config);
  let obj
  try {
    obj = isNil(config) ? {} : JSON.parse(config);
  } catch (e) {
  }
  return obj ?? {};
}

export default function () {
  const [config, setConfig] = useLocalStorageState<QiankunConfigProps | undefined>(QianKunConfigKey, {
    defaultValue: {},
    serializer: value => JSON.stringify(value, null, 2),
    deserializer: value => JSON.parse(value),
  });

  const currentValue = useMemo(() => ({ qiankunConfig: JSON.stringify(config, null, 2) }), [config]);

  return { config, setConfig, currentValue }
}
