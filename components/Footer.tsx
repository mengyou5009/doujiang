// components/Footer.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import type { ImageProps } from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useCallback } from "react";

// 补充 AuthContext 中 user 类型的默认定义（避免 TS 报错）
interface User {
  email: string;
  [key: string]: any; // 扩展其他用户属性
}

export default function Footer() {
  // 修复：指定 user 类型，避免解构时类型未知
  const { user } = useAuth() as { user: User | null };
  const [email, setEmail] = useState<string>("");
  const [subscribed, setSubscribed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // 修复：使用 useCallback 缓存函数，避免依赖警告；补充 FormEvent 泛型
  const handleSubscribe = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!email.trim()) return; // 增强：过滤空邮箱

      setLoading(true);
      // 模拟API调用
      await new Promise<void>((resolve) => setTimeout(resolve, 1000));

      setSubscribed(true);
      setEmail("");
      setLoading(false);

      // 修复：清除定时器，避免组件卸载后 setState 内存泄漏
      const timer = setTimeout(() => setSubscribed(false), 3000);
      return () => clearTimeout(timer);
    },
    [email],
  );

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-ancient-brown to-ancient-brown/90 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 主要页脚内容 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* 品牌信息 */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/resources/logo.png"
                alt="豆香传"
                fill={true} // 填充父容器（替代 width/height）
                sizes="48px" // 声明图片展示尺寸（h-12/w-12 = 48px）
                loading="lazy" // 懒加载（符合 Next.js 规范）
                priority={false} // 非首屏关键图，关闭优先级
                className="object-contain" // 保持图片比例，避免拉伸
              />
              <div>
                <span className="font-serif-cn text-2xl font-bold">豆香传</span>
                <p className="font-sans-cn text-sm opacity-90">
                  Bean Aroma Legacy
                </p>
              </div>
            </Link>
            <p className="text-sm opacity-80 leading-relaxed">
              跨越语言与国界的豆浆文化线上家园，连接全球华人及国际中华文化爱好者。
            </p>
          </div>

          {/* 快速链接 */}
          <div>
            <h3 className="font-serif-cn text-lg font-semibold mb-4">
              快速链接
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm opacity-80 hover:opacity-100 hover:text-white transition-colors"
                >
                  首页
                </Link>
              </li>
              <li>
                <Link
                  href="/culture"
                  className="text-sm opacity-80 hover:opacity-100 hover:text-white transition-colors"
                >
                  文化溯源
                </Link>
              </li>
              <li>
                <Link
                  href="/encyclopedia"
                  className="text-sm opacity-80 hover:opacity-100 hover:text-white transition-colors"
                >
                  知豆百科
                </Link>
              </li>
              <li>
                <Link
                  href="/workshop"
                  className="text-sm opacity-80 hover:opacity-100 hover:text-white transition-colors"
                >
                  巧手工坊
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm opacity-80 hover:opacity-100 hover:text-white transition-colors"
                >
                  关于我们
                </Link>
              </li>
            </ul>
          </div>

          {/* 联系我们 */}
          <div>
            <h3 className="font-serif-cn text-lg font-semibold mb-4">
              联系我们
            </h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li className="flex items-start space-x-2">
                <span>📍</span>
                <span>北京市朝阳区文化创意园区</span>
              </li>
              <li className="flex items-start space-x-2">
                <span>📧</span>
                <span>contact@douxiangchuan.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <span>📱</span>
                <span>+86 10 8888 9999</span>
              </li>
            </ul>
            <div className="mt-4 flex space-x-4">
              {/* Instagram 图标 */}
              <a
                href="https://instagram.com/yourhandle"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon hover:opacity-100 opacity-80 transition-opacity"
                aria-label="Instagram"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
                </svg>
              </a>

              {/* Facebook 图标 */}
              <a
                href="https://facebook.com/yourhandle"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon hover:opacity-100 opacity-80 transition-opacity"
                aria-label="Facebook"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>
            </div>
          </div>

          {/* 邮件订阅 */}
          <div>
            <h3 className="font-serif-cn text-lg font-semibold mb-4">
              订阅资讯
            </h3>
            <p className="text-sm opacity-80 mb-4">
              订阅我们的通讯，获取最新的豆浆文化和活动信息。
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="输入您的邮箱"
                  className="flex-1 px-4 py-2 text-gray-900 rounded-l-lg focus:outline-none text-sm"
                  required
                  // 修复：补充 input 的 aria 标签，增强可访问性
                  aria-label="订阅邮箱输入框"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-r-lg text-sm font-medium disabled:opacity-70 transition-colors"
                  // 修复：补充按钮的 aria 状态
                  aria-disabled={loading}
                >
                  {loading ? "订阅中..." : "订阅"}
                </button>
              </div>
              {subscribed && (
                <p className="text-green-500 text-xs animate-fade-in">
                  ✓ 感谢订阅！我们将发送最新的豆浆文化资讯给您。
                </p>
              )}
            </form>
            <p className="text-xs opacity-60 mt-4">
              我们承诺不会发送垃圾邮件，您可以随时退订。
            </p>
          </div>
        </div>

        {/* 分隔线 */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm opacity-80">
              <p>© {currentYear} 豆香传 (Bean Aroma Legacy). 保留所有权利。</p>
            </div>

            <div className="flex space-x-6 text-sm opacity-80">
              <Link
                href="/privacy"
                className="hover:opacity-100 hover:text-white transition-colors"
              >
                隐私政策
              </Link>
              <Link
                href="/terms"
                className="hover:opacity-100 hover:text-white transition-colors"
              >
                服务条款
              </Link>
              <Link
                href="/sitemap"
                className="hover:opacity-100 hover:text-white transition-colors"
              >
                网站地图
              </Link>
              <Link
                href="/about#contact"
                className="hover:opacity-100 hover:text-white transition-colors"
              >
                帮助中心
              </Link>
            </div>
          </div>

          {/* 用户状态信息 */}
          {user && (
            <div className="mt-6 text-center text-xs opacity-70">
              <p>
                您已登录为：<span className="text-green-500">{user.email}</span>
                <span className="mx-2">•</span>
                上次登录时间：{new Date().toLocaleDateString("zh-CN")}
              </p>
            </div>
          )}

          {/* 备案信息 */}
          <div className="mt-8 text-center text-xs opacity-60">
            <p>一杯豆浆，敬过往，连世界，创未来</p>
            <p className="mt-1">
              A Cup of Soy Milk: Honoring the Past, Connecting the World
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
