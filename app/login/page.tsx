// app/login/page.tsx
"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

// 补充 AuthContext 返回值的类型定义（确保与实际 Context 一致）
interface AuthContextType {
  user: any | null; // 建议替换为实际的 User 类型
  loading: boolean;
  login: () => Promise<void>; // 假设 login 是异步函数
  error: string | null;
}

// 类型断言（如果 useAuth 未导出类型，需确保实际返回值匹配）
const useAuthTyped = useAuth as () => AuthContextType;

export default function LoginPage() {
  const { user, loading, login, error } = useAuthTyped();
  const router = useRouter();
  const [isLoggingIn, setIsLoggingIn] = useState(false); // 新增登录中状态

  // 如果用户已登录，重定向到首页（优化判断逻辑）
  useEffect(() => {
    if (!loading && user) {
      router.push("/");
    }
  }, [user, loading, router]);

  // 封装登录处理函数，防止重复点击
  const handleLogin = async () => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    try {
      await login();
    } catch (err) {
      console.error("登录失败:", err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ancient-brown mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <main>
      {/* Hero Section */}
      <section
        className="relative h-96 flex items-center justify-center pt-16 bg-cover bg-center"
        style={{
          backgroundImage: "url('/resources/hero-bg.jpg')",
          // 补充背景图降级样式
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-serif-cn text-4xl md:text-5xl font-bold text-white mb-4">
            豆香传
          </h1>
          <p className="font-sans-cn text-lg md:text-xl text-white/90 mb-2">
            一杯豆浆，敬过往，连世界，创未来
          </p>
          <p className="font-sans-cn text-base text-white/80">
            A Cup of Soy Milk: Honoring the Past, Connecting the World
          </p>
        </div>
      </section>

      {/* Login Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-md mx-auto">
          {/* Login Card */}
          <div className="glass-effect rounded-2xl p-8 shadow-2xl bg-gradient-to-br from-warm-beige/90 to-white/90">
            <div className="text-center mb-8">
              <h2 className="font-serif-cn text-2xl font-semibold text-ancient-brown mb-2">
                加入豆香传大家庭
              </h2>
              <p className="text-sm text-gray-600">
                使用Google账号登录，开启文化之旅
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div
                className={`mb-6 p-3 rounded-lg text-center ${
                  error.includes("成功")
                    ? "bg-health-green/20 text-health-green border border-health-green/30"
                    : "bg-red-50 text-red-600 border border-red-200"
                }`}
              >
                {error}
              </div>
            )}

            {/* Google Login Button */}
            {!user && (
              <div className="space-y-6">
                <button
                  onClick={handleLogin}
                  disabled={isLoggingIn} // 登录中禁用按钮
                  className="w-full flex items-center justify-center space-x-3 bg-white border border-gray-300 rounded-lg px-6 py-4 hover:bg-gray-50 hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoggingIn ? (
                    // 登录中加载动画
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-400"></div>
                  ) : (
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                  )}
                  <span className="text-gray-700 font-medium text-lg">
                    {isLoggingIn ? "登录中..." : "使用 Google 账号登录"}
                  </span>
                </button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-warm-beige/90 text-gray-500">
                      或继续浏览
                    </span>
                  </div>
                </div>

                {/* Continue as Guest */}
                <div className="text-center pt-4">
                  <Link
                    href="/"
                    className="inline-block px-8 py-3 rounded-lg font-medium text-lg hover:translate-y-[-2px] transition-all duration-300 bg-gray-100 hover:bg-gray-200 text-gray-800"
                    // 替换 btn-secondary（假设未定义），如需保留需确保全局样式中有该类名
                  >
                    继续浏览
                  </Link>
                  <p className="mt-3 text-sm text-gray-600">
                    无需登录，探索豆浆文化
                  </p>
                </div>
              </div>
            )}

            {/* Privacy Policy */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-600 text-center">
                继续使用即表示您同意我们的
                <Link
                  href="/privacy"
                  className="text-ancient-brown hover:underline mx-1"
                >
                  服务条款
                </Link>
                和
                <Link
                  href="/privacy"
                  className="text-ancient-brown hover:underline mx-1"
                >
                  隐私政策
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
