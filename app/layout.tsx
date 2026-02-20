import './globals.css';
import { Metadata } from 'next';
import { Noto_Sans_SC, Noto_Serif_SC } from 'next/font/google';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/contexts/AuthContext';

// 修复：移除 chinese-simplified 子集，使用支持的 latin 子集（或留空）
// Noto Sans SC 本身就是中文简体字体，无需指定中文子集
const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'], // ✅ 使用支持的子集（latin 是基础必选）
  weight: ['400', '700'], // 按需指定字体权重
  variable: '--font-noto-sans-sc', // 可选：绑定 CSS 变量，方便全局使用
});

// 若使用思源宋体（Noto Serif SC），同理修复
const notoSerifSC = Noto_Serif_SC({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-serif-sc',
});

export const metadata: Metadata = {
  title: '豆香传 - 豆浆文化线上家园',
  description: '跨越语言与国界的豆浆文化平台',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className={`${notoSansSC.variable} ${notoSerifSC.variable}`}>
      <body className="font-sans">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

