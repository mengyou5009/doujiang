import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero 区域 */}
      <section
        className="relative h-[60vh] md:h-96 flex items-center justify-center pt-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/resources/hero-bg.jpg')" }}
      >
        {/* 遮罩层 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        
        {/* 内容区 */}
        <div className="relative z-10 text-center px-4 animate-fade-in max-w-4xl">
          <h1 className="font-serif-cn text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            豆香客厅
          </h1>
          <p className="font-sans-cn text-lg md:text-xl text-white/95 mb-2">
            探索豆浆文化，连接全球华人
          </p>
          <p className="font-sans-cn text-base md:text-lg text-white/85 max-w-2xl mx-auto">
            让每一滴豆浆承载历史记忆、健康价值与社群温情
          </p>
          
          {/* 添加行动号召按钮 */}
          <Link
            href="/culture"
            className="inline-block mt-6 px-6 py-3 bg-ancient-brown text-white rounded-lg font-medium hover:bg-ancient-brown/90 transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            开始探索
          </Link>
        </div>
      </section>

      {/* 快速入口 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 animate-slide-up">
        <h2 className="font-serif-cn text-2xl md:text-3xl font-bold text-ancient-brown text-center mb-8 md:mb-10">
          快速入口
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {/* 发新帖 */}
          <Link
            href="/login"
            className="category-card p-5 md:p-6 rounded-xl text-center hover:-translate-y-[5px] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ancient-brown/50"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 bg-ancient-brown rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <svg
                className="w-6 h-6 md:w-8 md:h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-ancient-brown mb-1 md:mb-2 text-sm md:text-base">发新帖</h3>
            <p className="text-xs md:text-sm text-gray-600">分享你的豆浆故事</p>
          </Link>

          {/* 学教程 */}
          <Link
            href="/workshop"
            className="category-card p-5 md:p-6 rounded-xl text-center hover:-translate-y-[5px] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ancient-brown/50"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 bg-health-green rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <svg
                className="w-6 h-6 md:w-8 md:h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-health-green mb-1 md:mb-2 text-sm md:text-base">学教程</h3>
            <p className="text-xs md:text-sm text-gray-600">DIY豆浆制作指南</p>
          </Link>

          {/* 逛商城 */}
          <Link
            href="/login"
            className="category-card p-5 md:p-6 rounded-xl text-center hover:-translate-y-[5px] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ancient-brown/50"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 bg-sky-blue rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <svg
                className="w-6 h-6 md:w-8 md:h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-sky-blue mb-1 md:mb-2 text-sm md:text-base">逛商城</h3>
            <p className="text-xs md:text-sm text-gray-600">精选豆浆相关产品</p>
          </Link>

          {/* 查订单 */}
          <Link
            href="/login"
            className="category-card p-5 md:p-6 rounded-xl text-center hover:-translate-y-[5px] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ancient-brown/50"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 bg-lemon-yellow rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <svg
                className="w-6 h-6 md:w-8 md:h-8 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-700 mb-1 md:mb-2 text-sm md:text-base">查订单</h3>
            <p className="text-xs md:text-sm text-gray-600">跟踪你的购买记录</p>
          </Link>
        </div>

        {/* 文化精选部分 */}
        <div className="mt-12 md:mt-16">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h2 className="font-serif-cn text-2xl md:text-3xl font-bold text-ancient-brown">
              文化精选
            </h2>
            <Link
              href="/culture"
              className="text-sm md:text-base text-ancient-brown hover:text-ancient-brown/80 hover:underline font-medium transition-colors"
            >
              查看更多 →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* 卡片1：刘安与豆浆的传说 */}
            <Link
              href="/culture"
              className="category-card rounded-xl overflow-hidden hover:-translate-y-[5px] transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-ancient-brown/50"
            >
              <div className="h-40 md:h-48 bg-gradient-to-br from-ancient-brown to-health-green opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="p-5 md:p-6">
                <h3 className="font-serif-cn text-lg md:text-xl font-semibold text-ancient-brown mb-2 md:mb-3">
                  刘安与豆浆的传说
                </h3>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-3 md:mb-4 line-clamp-3">
                  探寻西汉时期淮南王刘安发明豆浆的历史典故，了解豆浆从宫廷到民间的传播历程，感受中华饮食文化的博大精深。
                </p>
                <div className="flex items-center text-xs text-gray-500">
                  <span>历史文化</span>
                  <span className="mx-2">•</span>
                  <span>5分钟阅读</span>
                </div>
              </div>
            </Link>

            {/* 卡片2：豆浆的养生智慧 */}
            <Link
              href="/culture"
              className="category-card rounded-xl overflow-hidden hover:-translate-y-[5px] transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-ancient-brown/50"
            >
              <div className="h-40 md:h-48 bg-gradient-to-br from-health-green to-sky-blue opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="p-5 md:p-6">
                <h3 className="font-serif-cn text-lg md:text-xl font-semibold text-ancient-brown mb-2 md:mb-3">
                  豆浆的养生智慧
                </h3>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-3 md:mb-4 line-clamp-3">
                  从中医角度解析豆浆的食疗价值，结合现代营养学，教你如何根据体质搭配不同的豆浆配方。
                </p>
                <div className="flex items-center text-xs text-gray-500">
                  <span>养生知识</span>
                  <span className="mx-2">•</span>
                  <span>4分钟阅读</span>
                </div>
              </div>
            </Link>

            {/* 卡片3：全球豆浆文化差异 */}
            <Link
              href="/culture"
              className="category-card rounded-xl overflow-hidden hover:-translate-y-[5px] transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-ancient-brown/50"
            >
              <div className="h-40 md:h-48 bg-gradient-to-br from-sky-blue to-lemon-yellow opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="p-5 md:p-6">
                <h3 className="font-serif-cn text-lg md:text-xl font-semibold text-ancient-brown mb-2 md:mb-3">
                  全球豆浆文化差异
                </h3>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-3 md:mb-4 line-clamp-3">
                  对比中日韩、东南亚及欧美国家的豆浆饮用习惯，发现不同文化背景下豆浆的独特演绎。
                </p>
                <div className="flex items-center text-xs text-gray-500">
                  <span>文化对比</span>
                  <span className="mx-2">•</span>
                  <span>6分钟阅读</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
