import { useEffect, useRef } from 'react';
// @ts-ignore
import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';
import { useControllableValue } from 'ahooks';

export default (props: any) => {
  const jsonEditorRef = useRef<HTMLDivElement>(null);
  const editor = useRef<any>(null);
  const [value, setValue] = useControllableValue(props);

  useEffect(() => {
    if (jsonEditorRef.current) {
      editor.current = new JSONEditor(
        jsonEditorRef.current,
        {
          name: 'qiankun',
          onEditable: function (node: any) {
            // console.log(node);
            if (node.path?.length === 1 && node.field === 'apps') {
              return {
                field: false,
                value: true,
              };
            } else if (node.path?.[0] === 'apps') {
              return true;
            }
            return false;
          },
          onChangeJSON: (json: any) => {
            // console.log('onChangeJSON', json);
            setValue(JSON.stringify(json, null, 2));
          },
        },
        {},
      );
    }
  }, []);
  useEffect(() => {
    // console.log('props', props, context, value, setValue);
    try {
      if (JSON.stringify(editor.current?.get(), null, 2) !== value) {
        editor.current?.update(JSON.parse(value));
      }
    } catch (e) {
      try {
        editor.current?.update(value ? JSON.parse(value) : { apps: [{ name: '', entry: '' }] });
      } catch (e) {
      }
    }
    editor.current?.expandAll();
  }, [value]);
  return <div id="jsoneditor" style={{ height: 230 }} ref={jsonEditorRef}></div>;
};
