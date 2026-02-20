import type { Config } from 'tailwindcss'

const config: Config = {
  // v4 推荐使用 content 配置扫描文件
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // v4 中 theme.extend 已经不需要了，因为我们用了 CSS 的 @theme
  theme: {
    extend: {},
  },
  plugins: [],
}
export default config
