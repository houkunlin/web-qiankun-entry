module.exports = {
  mode: 'jit',
  content: ['./src/pages/**/*.tsx', './src/components/**/*.tsx', './src/layouts/**/*.tsx'],
  darkMode: false,
  theme: {},
  variants: {},
  plugins: [],
  corePlugins: {
    preflight: false, // 添加这一行解决与 AntDesign 样式冲突问题
  },
};
