// app/about/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("story");
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // 修复：为 colorClasses 添加类型定义
  const colorClasses: Record<string, string> = {
    "ancient-brown": "text-ancient-brown",
    "health-green": "text-health-green",
    "sky-blue": "text-sky-blue",
    "lemon-yellow": "text-lemon-yellow",
  };

  const teamMembers = [
    {
      id: 1,
      name: "李思源",
      role: "文化研究员",
      specialty: "中国饮食文化史",
      description:
        "北京大学历史学博士，专注中国饮食文化研究15年，出版《豆浆文化发展史》等专著。",
      image: "/resources/team-member-1.jpg",
      color: "ancient-brown" as const,
      social: { weibo: "#", douyin: "#" },
    },
    {
      id: 2,
      name: "王明哲",
      role: "营养学专家",
      specialty: "食品营养与健康",
      description:
        "中国农业大学食品科学博士，国家一级营养师，专注于植物蛋白营养研究10年。",
      image: "/resources/team-member-2.jpg",
      color: "health-green" as const,
      social: { weibo: "#", zhihu: "#" },
    },
    {
      id: 3,
      name: "张雅文",
      role: "创意总监",
      specialty: "文化传播与设计",
      description:
        "中央美术学院硕士，文化创意产业专家，致力于将传统文化与现代设计融合。",
      image: "/resources/team-member-3.jpg",
      color: "sky-blue" as const,
      social: { xiaohongshu: "#", wechat: "#" },
    },
    {
      id: 4,
      name: "陈东升",
      role: "技术总监",
      specialty: "数字文化平台",
      description:
        "清华大学计算机硕士，拥有8年互联网产品开发经验，专注于文化数字化传播。",
      image: "/resources/team-member-4.jpg",
      color: "lemon-yellow" as const,
      social: { github: "#", twitter: "#" },
    },
  ];

  const values = [
    {
      title: "文化传承",
      icon: "📜",
      description:
        "我们致力于挖掘和传承豆浆文化的历史价值，让千年饮食智慧焕发新生。",
      details: [
        "系统整理豆浆历史文献",
        "数字化保护传统制作技艺",
        "创新传播豆浆文化故事",
      ],
    },
    {
      title: "科学严谨",
      icon: "🔬",
      description:
        "所有内容均基于科学研究和历史考证，确保信息的准确性和可靠性。",
      details: [
        "与高校研究机构合作",
        "邀请专家团队审核",
        "持续更新最新研究成果",
      ],
    },
    {
      title: "开放共享",
      icon: "🌐",
      description:
        "我们相信文化属于全人类，坚持开放共享的理念，连接全球豆浆爱好者。",
      details: ["多语言内容呈现", "开放合作平台", "社区共创模式"],
    },
    {
      title: "创新融合",
      icon: "💡",
      description: "传统与现代结合，东方与西方对话，创造豆浆文化的无限可能性。",
      details: ["传统工艺现代创新", "跨文化交流合作", "可持续文化生态"],
    },
  ];

  const milestones = [
    {
      year: "2023",
      title: "项目启动",
      description: "豆香传项目正式启动，团队组建完成",
      icon: "🚀",
    },
    {
      year: "2023",
      title: "文化研究",
      description: "完成豆浆文化历史文献的系统整理",
      icon: "📚",
    },
    {
      year: "2024",
      title: "平台开发",
      description: "网站架构设计和技术开发完成",
      icon: "💻",
    },
    {
      year: "2024",
      title: "内容建设",
      description: "完成核心内容模块的创作和审核",
      icon: "✍️",
    },
    {
      year: "2024",
      title: "公测上线",
      description: "豆香传网站正式对外公测",
      icon: "🎉",
    },
    {
      year: "2025",
      title: "国际扩展",
      description: "启动多语言版本和国际社群建设",
      icon: "🌍",
    },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section
        className="relative h-96 flex items-center justify-center pt-16 bg-cover bg-center"
        style={{ backgroundImage: "url('/resources/team-photo.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4 animate-fade-in">
          <h1 className="font-serif-cn text-4xl md:text-5xl font-bold text-white mb-4">
            关于我们
          </h1>
          <p className="font-sans-cn text-lg md:text-xl text-white/90 mb-2">
            一杯豆浆，连接世界
          </p>
          <p className="font-sans-cn text-base text-white/80">
            一群热爱豆浆文化的探索者，一个连接传统与现代的桥梁
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 团队故事与使命切换 */}
        <section className="mb-20">
          <div className="flex flex-wrap justify-center mb-12">
            <div className="flex bg-white/50 rounded-lg p-1 border border-ancient-brown/10">
              <button
                onClick={() => setActiveTab("story")}
                role="tab" // 显式声明tab角色
                id="tab-story" // 唯一标识
                aria-selected={activeTab === "story"} // 现在role支持该属性
                aria-controls="panel-story" // 关联对应的内容面板
                tabIndex={activeTab === "story" ? 0 : -1} // 仅激活的tab可聚焦
                className={`px-6 py-3 rounded-md text-lg font-medium transition-all duration-300 ${
                  activeTab === "story"
                    ? "bg-ancient-brown text-white"
                    : "text-gray-700 hover:bg-ancient-brown/10"
                }`}
              >
                我们的故事
              </button>
              <button
                onClick={() => setActiveTab("mission")}
                role="tab" // 显式声明tab角色
                id="tab-mission" // 唯一标识
                aria-selected={activeTab === "mission"} // 现在role支持该属性
                aria-controls="panel-mission" // 关联对应的内容面板
                tabIndex={activeTab === "mission" ? 0 : -1} // 仅激活的tab可聚焦
                className={`px-6 py-3 rounded-md text-lg font-medium transition-all duration-300 ${
                  activeTab === "mission"
                    ? "bg-ancient-brown text-white"
                    : "text-gray-700 hover:bg-ancient-brown/10"
                }`}
              >
                使命与愿景
              </button>
            </div>
          </div>

          {/* 我们的故事内容 */}
          <div
            id="panel-story"
            role="tabpanel"
            aria-labelledby="tab-story"
            className={`animate-fade-in ${activeTab === "story" ? "block" : "hidden"}`}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="text-center lg:text-left">
                  <h2 className="font-serif-cn text-3xl font-bold text-ancient-brown mb-4">
                    缘起：一杯豆浆的感动
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    2018年，我们几位创始人在不同国家游历，偶然间都发现了相同的现象：
                    无论是在纽约的唐人街，还是东京的中华料理店，抑或是巴黎的中餐馆，
                    一碗热腾腾的豆浆，总能唤起海外游子的思乡之情。
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    这份跨越国界的文化共鸣让我们深受触动。我们意识到，
                    豆浆不仅仅是一种饮品，它承载着中国人的集体记忆，
                    连接着全球华人的文化认同，更蕴含着独特的健康智慧。
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    于是，我们决定创建一个平台，记录豆浆的历史，
                    传播豆浆的文化，连接热爱豆浆的人们，
                    让这杯千年饮品焕发新的生命力。
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-ancient-brown/20 rounded-full flex items-center justify-center">
                      <span className="text-ancient-brown">📈</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">累计用户</p>
                      <p className="text-lg font-bold text-ancient-brown">
                        10,000+
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-health-green/20 rounded-full flex items-center justify-center">
                      <span className="text-health-green">📚</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">文化内容</p>
                      <p className="text-lg font-bold text-health-green">
                        500+
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-sky-blue/20 rounded-full flex items-center justify-center">
                      <span className="text-sky-blue">🌍</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">覆盖国家</p>
                      <p className="text-lg font-bold text-sky-blue">20+</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-ancient-brown/30 to-health-green/30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-8">
                      <span className="text-6xl mb-4 block">🥛</span>
                      <h3 className="font-serif-cn text-2xl text-white mb-2">
                        千年传承
                      </h3>
                      <p className="text-white/90">从西汉到现代</p>
                    </div>
                  </div>
                </div>

                {/* 装饰性元素 */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-health-green/20 rounded-full blur-xl" />
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-ancient-brown/20 rounded-full blur-xl" />
              </div>
            </div>
          </div>

          {/* 使命与愿景内容 */}
          <div
            id="panel-mission"
            role="tabpanel"
            aria-labelledby="tab-mission"
            className={`animate-fade-in ${activeTab === "mission" ? "block" : "hidden"}`}
          >
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-ancient-brown/10 to-white/90 p-8 rounded-2xl border border-ancient-brown/20">
                  <div className="w-16 h-16 bg-ancient-brown rounded-full flex items-center justify-center mb-6 mx-auto">
                    <span className="text-white text-2xl">🎯</span>
                  </div>
                  <h3 className="font-serif-cn text-2xl font-semibold text-ancient-brown text-center mb-4">
                    我们的使命
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed">
                    系统挖掘、整理和传播豆浆文化，让这杯承载千年智慧的饮品，
                    在现代社会中焕发新的生命力，成为连接传统与现代、
                    东方与西方的文化桥梁。
                  </p>
                </div>

                <div className="bg-gradient-to-br from-health-green/10 to-white/90 p-8 rounded-2xl border border-health-green/20">
                  <div className="w-16 h-16 bg-health-green rounded-full flex items-center justify-center mb-6 mx-auto">
                    <span className="text-white text-2xl">🔭</span>
                  </div>
                  <h3 className="font-serif-cn text-2xl font-semibold text-health-green text-center mb-4">
                    我们的愿景
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed">
                    成为全球最具影响力的豆浆文化平台，建立连接历史研究者、
                    营养专家、美食爱好者和普通消费者的文化生态系统，
                    让豆浆文化走向世界。
                  </p>
                </div>
              </div>

              <div className="mt-12 p-8 bg-gradient-to-br from-warm-beige to-white/90 rounded-2xl border border-ancient-brown/10">
                <h3 className="font-serif-cn text-2xl font-semibold text-ancient-brown text-center mb-6">
                  我们的价值观
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {values.map((value, index) => (
                    <div
                      key={index}
                      className="p-6 bg-white/50 rounded-xl hover:translate-y-[-3px] transition-all duration-300 cursor-pointer"
                      onClick={() =>
                        setExpandedSection(
                          expandedSection === value.title ? null : value.title,
                        )
                      }
                      role="button"
                      tabIndex={0}
                      aria-expanded={expandedSection === value.title}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="text-2xl">{value.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            {value.title}
                          </h4>
                          <p className="text-gray-600 text-sm mb-3">
                            {value.description}
                          </p>

                          {expandedSection === value.title && (
                            <ul className="text-sm text-gray-600 space-y-1 animate-fade-in">
                              {value.details.map((detail, idx) => (
                                <li key={idx} className="flex items-start">
                                  <span className="mr-2">•</span>
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          )}

                          <button
                            className="text-ancient-brown text-sm mt-2 hover:underline focus:outline-none"
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedSection(
                                expandedSection === value.title
                                  ? null
                                  : value.title,
                              );
                            }}
                          >
                            {expandedSection === value.title
                              ? "收起"
                              : "了解更多"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 团队介绍 */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-serif-cn text-3xl font-bold text-ancient-brown mb-4">
              核心团队
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              来自文化研究、营养科学、创意设计、技术开发等领域的专业人士，
              因对豆浆文化的热爱而相聚
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="team-card rounded-xl overflow-hidden hover:translate-y-[-8px] transition-all duration-300 hover:shadow-2xl"
              >
                {/* 头像区域 */}
                <div
                  className={`h-48 bg-gradient-to-br ${colorClasses[member.color]} to-white/80 relative`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-white/90 rounded-full flex items-center justify-center">
                      <span className="text-4xl">👤</span>
                    </div>
                  </div>
                </div>

                {/* 成员信息 */}
                <div className="p-6">
                  <h3 className="font-serif-cn text-xl font-semibold text-gray-800 mb-1">
                    {member.name}
                  </h3>
                  <p
                    className={`text-sm font-medium ${colorClasses[member.color]} mb-2`}
                  >
                    {member.role}
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    {member.specialty}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {member.description}
                  </p>

                  {/* 社交媒体链接 */}
                  <div className="flex space-x-2">
                    {Object.entries(member.social).map(([platform, link]) => (
                      <a
                        key={platform}
                        href={link}
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-ancient-brown/50"
                        title={platform}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="text-xs">
                          {platform === "weibo"
                            ? "微"
                            : platform === "douyin"
                              ? "音"
                              : platform === "zhihu"
                                ? "知"
                                : platform === "xiaohongshu"
                                  ? "书"
                                  : platform === "wechat"
                                    ? "信"
                                    : platform === "github"
                                      ? "G"
                                      : platform === "twitter"
                                        ? "X"
                                        : "社"}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 发展历程 */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-serif-cn text-3xl font-bold text-ancient-brown mb-4">
              发展历程
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              从构想到现实，豆香传的每一步都坚实而坚定
            </p>
          </div>

          <div className="relative">
            {/* 时间线 */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-ancient-brown to-health-green -translate-x-1/2 z-0 hidden md:block" />

            <div className="space-y-12 relative z-10">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row items-center ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* 时间节点 */}
                  <div className="w-24 h-24 flex-shrink-0 relative">
                    <div className="w-full h-full bg-gradient-to-br from-ancient-brown to-health-green rounded-full flex items-center justify-center text-white">
                      <div className="text-center">
                        <div className="text-2xl mb-1">{milestone.icon}</div>
                        <div className="text-lg font-bold">
                          {milestone.year}
                        </div>
                      </div>
                    </div>
                    {/* 连接点 */}
                    <div
                      className="hidden md:block absolute top-1/2 w-6 h-6 bg-white rounded-full border-4 border-ancient-brown -translate-y-1/2 z-20"
                      style={{
                        left: index % 2 === 0 ? "auto" : "calc(100% - 12px)",
                        right: index % 2 === 0 ? "calc(100% - 12px)" : "auto",
                      }}
                    />
                  </div>

                  {/* 内容卡片 */}
                  <div
                    className={`flex-1 ${index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"} mt-6 md:mt-0`}
                  >
                    <div className="bg-gradient-to-br from-warm-beige to-white/90 p-6 rounded-xl border border-ancient-brown/10 hover:translate-y-[-5px] transition-all duration-300">
                      <h3 className="font-serif-cn text-xl font-semibold text-ancient-brown mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 合作与支持 */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-serif-cn text-3xl font-bold text-ancient-brown mb-4">
              合作与支持
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              我们与多家机构建立合作关系，共同推动豆浆文化的传播与发展
            </p>
          </div>

          <div className="bg-gradient-to-br from-sky-blue/10 to-white/90 rounded-2xl p-8 border border-sky-blue/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-xl">🏛️</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">高校研究</h4>
                <p className="text-sm text-gray-600">与国内外高校合作研究</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-xl">🏥</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">医疗机构</h4>
                <p className="text-sm text-gray-600">营养与健康研究合作</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-xl">🏮</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">文化机构</h4>
                <p className="text-sm text-gray-600">传统文化保护与传承</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-xl">🌱</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">生态农业</h4>
                <p className="text-sm text-gray-600">优质大豆种植基地</p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <h3 className="font-serif-cn text-xl font-semibold text-ancient-brown mb-4">
                加入我们的合作网络
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                无论您是研究机构、文化组织、企业还是个人爱好者，
                只要您对豆浆文化充满热情，都欢迎与我们合作。
              </p>
              <Link
                href="#contact"
                className="inline-block bg-ancient-brown text-white px-8 py-3 rounded-lg font-medium text-lg hover:translate-y-[-2px] hover:bg-ancient-brown/90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ancient-brown/50"
                aria-label="了解合作机会"
              >
                了解合作机会
              </Link>
            </div>
          </div>
        </section>

        {/* 联系我们 */}
        <section id="contact" className="mb-16">
          <div className="text-center mb-12">
            <h2 className="font-serif-cn text-3xl font-bold text-ancient-brown mb-4">
              联系我们
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              有任何问题、建议或合作意向？欢迎随时联系我们
            </p>
          </div>

          {/* 联系信息卡片 */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="contact-card rounded-xl p-6 text-center hover:translate-y-[-5px] transition-all duration-300 border border-gray-100 hover:shadow-md">
              <div className="w-16 h-16 bg-ancient-brown/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-ancient-brown">📧</span>
              </div>
              <h3 className="font-semibold text-ancient-brown mb-2">
                电子邮箱
              </h3>
              <p className="text-gray-600 text-sm">contact@douxiangchuan.com</p>
              <p className="text-gray-500 text-xs mt-2">
                商务合作：business@douxiangchuan.com
              </p>
            </div>

            <div className="contact-card rounded-xl p-6 text-center hover:translate-y-[-5px] transition-all duration-300 border border-gray-100 hover:shadow-md">
              <div className="w-16 h-16 bg-health-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-health-green">📞</span>
              </div>
              <h3 className="font-semibold text-health-green mb-2">联系电话</h3>
              <p className="text-gray-600 text-sm">+86 10 8888 9999</p>
              <p className="text-gray-500 text-xs mt-2">
                工作时间：周一至周五 9:00-18:00
              </p>
            </div>

            <div className="contact-card rounded-xl p-6 text-center hover:translate-y-[-5px] transition-all duration-300 border border-gray-100 hover:shadow-md">
              <div className="w-16 h-16 bg-sky-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-sky-blue">📍</span>
              </div>
              <h3 className="font-semibold text-sky-blue mb-2">办公地址</h3>
              <p className="text-gray-600 text-sm">北京市朝阳区文化创意园区</p>
              <p className="text-gray-500 text-xs mt-2">欢迎预约参观交流</p>
            </div>
          </div>

          {/* 联系表单 */}
          <ContactForm />
        </section>
      </div>
    </main>
  );
}
