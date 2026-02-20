"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

// 动态导入 Chart.js，避免服务器端渲染
const ChartComponent = dynamic(() => import("@/components/ChartComponent"), {
  ssr: false,
  loading: () => (
    <div className="bg-white rounded-xl p-6 shadow-lg flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ancient-brown mx-auto mb-2"></div>
        <p className="text-sm text-gray-600">加载图表中...</p>
      </div>
    </div>
  ),
});

interface QuizAnswer {
  question: number;
  value: string;
}

interface HealthTopic {
  id: number;
  title: string;
  description: string;
  details: string[];
  recommendation: string;
  icon: React.ReactNode;
  color: string;
  expanded: boolean;
}

export default function EncyclopediaPage() {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswer[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [healthTopics, setHealthTopics] = useState<HealthTopic[]>([
    {
      id: 1,
      title: "心血管健康",
      description:
        "豆浆中的大豆异黄酮和不饱和脂肪酸有助于降低胆固醇，保护心血管健康...",
      details: [
        "降低LDL（坏胆固醇）水平",
        "提高HDL（好胆固醇）水平",
        "减少心血管疾病风险",
        "改善血管弹性",
      ],
      recommendation: "建议：每天1-2杯，持续3个月以上可见效果",
      icon: (
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
      color: "health-green",
      expanded: false,
    },
    {
      id: 2,
      title: "乳糖不耐适应",
      description: "豆浆是牛奶的完美替代品，富含植物蛋白且不含乳糖...",
      details: [
        "优质植物蛋白（每100ml含3.5g）",
        "丰富的钙质（每100ml含15mg）",
        "零乳糖，零胆固醇",
        "易消化吸收",
      ],
      recommendation: "适合：乳糖不耐受者、素食主义者、牛奶过敏者",
      icon: (
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
      color: "sky-blue",
      expanded: false,
    },
    {
      id: 3,
      title: "体质调理",
      description:
        "不同体质的人群适合不同类型的豆浆，科学饮用才能达到最佳效果...",
      details: [
        "阳虚体质：适合红枣豆浆",
        "阴虚体质：适合百合豆浆",
        "气虚体质：适合黄芪豆浆",
        "湿热体质：适合绿豆豆浆",
      ],
      recommendation: "建议：根据季节和个人体质调整配方",
      icon: (
        <svg
          className="w-8 h-8 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      color: "lemon-yellow",
      expanded: false,
    },
  ]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleHealthTopic = (id: number) => {
    setHealthTopics((topics) =>
      topics.map((topic) =>
        topic.id === id ? { ...topic, expanded: !topic.expanded } : topic,
      ),
    );
  };

  const selectQuizOption = (questionNum: number, value: string) => {
    // 先过滤掉当前问题的已有答案，再添加新答案
    const newAnswers = quizAnswers.filter((a) => a.question !== questionNum);
    newAnswers.push({ question: questionNum, value });
    setQuizAnswers([...newAnswers]); // 修复：创建新数组触发更新

    // 启用下一题按钮 - 添加类型断言
    const nextBtn = document.getElementById(
      `nextBtn${questionNum}`,
    ) as HTMLButtonElement | null;
    if (nextBtn) {
      nextBtn.disabled = false;
      nextBtn.classList.remove("opacity-50", "cursor-not-allowed");
    }
  };

  const nextQuizQuestion = () => {
    if (currentQuestion < 5) {
      setCurrentQuestion((prev) => prev + 1);
      // 修复：使用更新后的currentQuestion值
      setTimeout(updateQuizProgress, 0);
    }
  };

  const updateQuizProgress = () => {
    // 添加类型断言
    const progressBar = document.getElementById(
      "progressBar",
    ) as HTMLDivElement | null;
    const progressText = document.getElementById(
      "progressText",
    ) as HTMLSpanElement | null;

    if (progressBar && progressText) {
      const progress = (currentQuestion / 5) * 100;
      progressBar.style.width = `${progress}%`;
      progressText.textContent = `${currentQuestion}/5`;
    }
  };

  const handleShowResult = () => {
    setShowResult(true);
    setCurrentQuestion(6);

    // 更新进度到100%
    const progressBar = document.getElementById(
      "progressBar",
    ) as HTMLDivElement | null;
    const progressText = document.getElementById(
      "progressText",
    ) as HTMLSpanElement | null;
    if (progressBar && progressText) {
      progressBar.style.width = "100%";
      progressText.textContent = "5/5";
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(1);
    setQuizAnswers([]);
    setShowResult(false);

    // 重置所有按钮状态
    for (let i = 1; i <= 5; i++) {
      const nextBtn = document.getElementById(
        `nextBtn${i}`,
      ) as HTMLButtonElement | null;
      if (nextBtn) {
        nextBtn.disabled = true;
        nextBtn.classList.add("opacity-50", "cursor-not-allowed");
      }
    }

    // 重置选项选中状态
    const options = document.querySelectorAll(".quiz-option");
    options.forEach((option) => {
      option.classList.remove("selected");
    });

    // 重置进度
    const progressBar = document.getElementById(
      "progressBar",
    ) as HTMLDivElement | null;
    const progressText = document.getElementById(
      "progressText",
    ) as HTMLSpanElement | null;
    if (progressBar && progressText) {
      progressBar.style.width = "0%";
      progressText.textContent = "0/5";
    }
  };

  const getQuizResult = () => {
    const answers = quizAnswers.reduce(
      (acc, curr) => {
        acc[curr.question] = curr.value;
        return acc;
      },
      {} as Record<number, string>,
    );

    if (answers[1] === "cold" && answers[3] === "poor") {
      return {
        title: "红枣桂圆豆浆",
        description: "根据您的体质特点，这款温性豆浆最适合您：",
        details: [
          "主料：黄豆 + 红枣 + 桂圆",
          "功效：温补气血，改善睡眠",
          "建议：早晨饮用，每周3-4次",
        ],
        advice: "这款配方有助于改善您的体质，让您更健康！",
      };
    } else if (answers[1] === "hot" && answers[4] === "sensitive") {
      return {
        title: "绿豆百合豆浆",
        description: "这款清凉豆浆非常适合您的体质：",
        details: [
          "主料：绿豆 + 百合 + 黄豆",
          "功效：清热解毒，养胃健脾",
          "建议：下午饮用，每周2-3次",
        ],
        advice: "这款配方能帮助您调节体质，更加舒适！",
      };
    } else {
      return {
        title: "经典黄豆豆浆",
        description: "这是最适合大众的经典配方：",
        details: [
          "主料：优质黄豆",
          "功效：均衡营养，增强体质",
          "建议：每日早晨饮用",
        ],
        advice: "这是最经典的配方，适合您的日常保健！",
      };
    }
  };

  const showLoginPrompt = () => {
    alert("请先登录后使用此功能");
  };

  if (!isClient) {
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
        style={{ backgroundImage: 'url("/resources/soybeans-nutrition.jpg")' }} // 修复：使用单引号避免转义问题
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-serif-cn text-4xl md:text-5xl font-bold text-white mb-4">
            知豆百科
          </h1>
          <p className="font-sans-cn text-lg md:text-xl text-white/90 mb-2">
            科学解读豆浆营养，专业守护健康生活
          </p>
          <p className="font-sans-cn text-base text-white/80">
            让每一滴豆浆都成为您健康生活的智慧选择
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Nutrition Database */}
        <section className="mb-20">
          <h2 className="font-serif-cn text-3xl font-bold text-sky-blue text-center mb-16">
            营养数据库
          </h2>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="nutrition-card bg-gradient-to-br from-sky-blue/10 to-white/90 rounded-xl p-8 border border-sky-blue/20">
              <h3 className="font-serif-cn text-2xl font-semibold text-sky-blue mb-6">
                三大豆类营养成分对比
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                不同种类的豆类具有不同的营养特点。黄豆蛋白质含量高，黑豆富含花青素，青豆则含有丰富的维生素和矿物质。
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                  <span className="font-medium">黄豆</span>
                  <span className="text-ancient-brown font-medium">
                    蛋白质之王
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                  <span className="font-medium">黑豆</span>
                  <span className="text-health-green font-medium">
                    抗氧化明星
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                  <span className="font-medium">青豆</span>
                  <span className="text-sky-blue font-medium">维生素宝库</span>
                </div>
              </div>
            </div>

            {/* Chart Component */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <ChartComponent />
            </div>
          </div>
        </section>

        {/* Health Topics */}
        <section className="mb-20">
          <h2 className="font-serif-cn text-3xl font-bold text-health-green text-center mb-16">
            健康专题
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {healthTopics.map((topic) => (
              <div
                key={topic.id}
                className="health-card bg-gradient-to-br from-health-green/10 to-white/90 rounded-xl p-6 border border-health-green/20 hover:translate-y-[-5px] transition-all duration-300 hover:shadow-xl cursor-pointer"
                onClick={() => toggleHealthTopic(topic.id)}
              >
                <div
                  className={`w-16 h-16 bg-${topic.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  {topic.icon}
                </div>
                <h3
                  className={`font-serif-cn text-xl font-semibold text-${topic.color} text-center mb-4`}
                >
                  {topic.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {topic.description}
                </p>

                {topic.expanded && (
                  <div className="health-details animate-fade-in">
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      研究表明，每天饮用豆浆可以：
                    </p>
                    <ul className="text-sm text-gray-600 space-y-2 mb-4">
                      {topic.details.map((detail, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                    <p className={`text-xs text-${topic.color}`}>
                      {topic.recommendation}
                    </p>
                  </div>
                )}

                <button
                  type="button" // 修复：添加button类型
                  className={`text-${topic.color} hover:text-${topic.color}/80 font-medium text-sm w-full text-center mt-4`}
                  onClick={(e) => {
                    e.stopPropagation(); // 阻止事件冒泡
                    toggleHealthTopic(topic.id);
                  }}
                >
                  {topic.expanded ? "收起详情 ↑" : "查看详情 →"}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Test */}
        <section className="mb-20">
          <h2 className="font-serif-cn text-3xl font-bold text-ancient-brown text-center mb-16">
            体质测试
          </h2>

          <div className="max-w-3xl mx-auto test-card bg-gradient-to-br from-lemon-yellow/30 to-white/90 rounded-xl p-8 border border-lemon-yellow/50">
            <div className="text-center mb-8">
              <h3 className="font-serif-cn text-2xl font-semibold text-ancient-brown mb-4">
                测测你的体质适合哪种豆浆？
              </h3>
              <p className="text-gray-600">
                通过简单的5个问题，为你推荐最适合的豆浆配方
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>进度</span>
                <span id="progressText">0/5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  id="progressBar"
                  className="progress-bar bg-health-green h-2 rounded-full transition-all duration-500"
                  style={{ width: "0%" }}
                >
                </div>
              </div>
            </div>

            {/* Quiz Questions */}
            <div id="quizContainer">
              {/* Question 1 */}
              <div
                className={`quiz-container ${currentQuestion === 1 ? "block" : "hidden"} animate-fade-in`}
                id="question1"
              >
                <h4 className="font-semibold text-lg text-ancient-brown mb-6">
                  1. 你通常的体温感受是？
                </h4>
                <div className="space-y-3">
                  {[
                    { value: "cold", label: "经常感觉手脚冰冷" },
                    { value: "normal", label: "体温适中，比较舒适" },
                    { value: "hot", label: "容易感觉燥热" },
                  ].map((option) => (
                    <div
                      key={option.value}
                      className={`quiz-option p-4 rounded-lg border border-gray-200 transition-all duration-300 cursor-pointer ${
                        quizAnswers.find(
                          (a) => a.question === 1 && a.value === option.value,
                        )
                          ? "selected bg-health-green text-white"
                          : "hover:bg-health-green/10 hover:translate-x-2"
                      }`}
                      onClick={() => selectQuizOption(1, option.value)}
                    >
                      <span>{option.label}</span>
                    </div>
                  ))}
                </div>
                <button
                  id="nextBtn1"
                  type="button" // 修复：添加button类型
                  className="px-6 py-2 rounded-lg mt-6 opacity-50 cursor-not-allowed bg-ancient-brown text-white hover:bg-ancient-brown/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => nextQuizQuestion()}
                  disabled
                >
                  下一题
                </button>
              </div>

              {/* Question 2 */}
              <div
                className={`quiz-container ${currentQuestion === 2 ? "block" : "hidden"} animate-fade-in`}
                id="question2"
              >
                <h4 className="font-semibold text-lg text-ancient-brown mb-6">
                  2. 你的精神状态通常是？
                </h4>
                <div className="space-y-3">
                  {[
                    { value: "tired", label: "容易疲劳，精力不足" },
                    { value: "energetic", label: "精力充沛，活力满满" },
                    { value: "anxious", label: "容易焦虑，情绪波动" },
                  ].map((option) => (
                    <div
                      key={option.value}
                      className={`quiz-option p-4 rounded-lg border border-gray-200 transition-all duration-300 cursor-pointer ${
                        quizAnswers.find(
                          (a) => a.question === 2 && a.value === option.value,
                        )
                          ? "selected bg-health-green text-white"
                          : "hover:bg-health-green/10 hover:translate-x-2"
                      }`}
                      onClick={() => selectQuizOption(2, option.value)}
                    >
                      <span>{option.label}</span>
                    </div>
                  ))}
                </div>
                <button
                  id="nextBtn2"
                  type="button" // 修复：添加button类型
                  className="px-6 py-2 rounded-lg mt-6 opacity-50 cursor-not-allowed bg-ancient-brown text-white hover:bg-ancient-brown/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => nextQuizQuestion()}
                  disabled
                >
                  下一题
                </button>
              </div>

              {/* Question 3 */}
              <div
                className={`quiz-container ${currentQuestion === 3 ? "block" : "hidden"} animate-fade-in`}
                id="question3"
              >
                <h4 className="font-semibold text-lg text-ancient-brown mb-6">
                  3. 你的睡眠质量如何？
                </h4>
                <div className="space-y-3">
                  {[
                    { value: "poor", label: "睡眠浅，容易醒来" },
                    { value: "good", label: "睡眠良好，一觉到天亮" },
                    { value: "dreamy", label: "多梦，醒来仍感疲惫" },
                  ].map((option) => (
                    <div
                      key={option.value}
                      className={`quiz-option p-4 rounded-lg border border-gray-200 transition-all duration-300 cursor-pointer ${
                        quizAnswers.find(
                          (a) => a.question === 3 && a.value === option.value,
                        )
                          ? "selected bg-health-green text-white"
                          : "hover:bg-health-green/10 hover:translate-x-2"
                      }`}
                      onClick={() => selectQuizOption(3, option.value)}
                    >
                      <span>{option.label}</span>
                    </div>
                  ))}
                </div>
                <button
                  id="nextBtn3"
                  type="button" // 修复：添加button类型
                  className="px-6 py-2 rounded-lg mt-6 opacity-50 cursor-not-allowed bg-ancient-brown text-white hover:bg-ancient-brown/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => nextQuizQuestion()}
                  disabled
                >
                  下一题
                </button>
              </div>

              {/* Question 4 */}
              <div
                className={`quiz-container ${currentQuestion === 4 ? "block" : "hidden"} animate-fade-in`}
                id="question4"
              >
                <h4 className="font-semibold text-lg text-ancient-brown mb-6">
                  4. 你的消化情况？
                </h4>
                <div className="space-y-3">
                  {[
                    { value: "weak", label: "消化功能较弱，容易胀气" },
                    { value: "strong", label: "消化良好，食欲正常" },
                    { value: "sensitive", label: "肠胃敏感，容易不适" },
                  ].map((option) => (
                    <div
                      key={option.value}
                      className={`quiz-option p-4 rounded-lg border border-gray-200 transition-all duration-300 cursor-pointer ${
                        quizAnswers.find(
                          (a) => a.question === 4 && a.value === option.value,
                        )
                          ? "selected bg-health-green text-white"
                          : "hover:bg-health-green/10 hover:translate-x-2"
                      }`}
                      onClick={() => selectQuizOption(4, option.value)}
                    >
                      <span>{option.label}</span>
                    </div>
                  ))}
                </div>
                <button
                  id="nextBtn4"
                  type="button" // 修复：添加button类型
                  className="px-6 py-2 rounded-lg mt-6 opacity-50 cursor-not-allowed bg-ancient-brown text-white hover:bg-ancient-brown/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => nextQuizQuestion()}
                  disabled
                >
                  下一题
                </button>
              </div>

              {/* Question 5 */}
              <div
                className={`quiz-container ${currentQuestion === 5 ? "block" : "hidden"} animate-fade-in`}
                id="question5"
              >
                <h4 className="font-semibold text-lg text-ancient-brown mb-6">
                  5. 你喜欢的口味？
                </h4>
                <div className="space-y-3">
                  {[
                    { value: "sweet", label: "偏爱甜味" },
                    { value: "salty", label: "偏爱咸味" },
                    { value: "plain", label: "喜欢原味" },
                  ].map((option) => (
                    <div
                      key={option.value}
                      className={`quiz-option p-4 rounded-lg border border-gray-200 transition-all duration-300 cursor-pointer ${
                        quizAnswers.find(
                          (a) => a.question === 5 && a.value === option.value,
                        )
                          ? "selected bg-health-green text-white"
                          : "hover:bg-health-green/10 hover:translate-x-2"
                      }`}
                      onClick={() => selectQuizOption(5, option.value)}
                    >
                      <span>{option.label}</span>
                    </div>
                  ))}
                </div>
                <button
                  id="nextBtn5"
                  type="button" // 修复：添加button类型
                  className="px-6 py-2 rounded-lg mt-6 opacity-50 cursor-not-allowed bg-health-green text-white hover:bg-health-green/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleShowResult}
                  disabled
                >
                  查看结果
                </button>
              </div>

              {/* Result */}
              <div
                className={`quiz-container ${showResult ? "block" : "hidden"} animate-fade-in`}
                id="result"
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-health-green rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-serif-cn text-2xl font-semibold text-ancient-brown mb-4">
                    你的专属豆浆配方
                  </h3>
                  <div
                    id="resultContent"
                    className="bg-white rounded-lg p-6 mb-6"
                  >
                    {(() => {
                      const result = getQuizResult();
                      return (
                        <div className="text-center">
                          <h4 className="font-serif-cn text-xl font-semibold text-ancient-brown mb-3">
                            {result.title}
                          </h4>
                          <p className="text-gray-600 mb-4">
                            {result.description}
                          </p>
                          <ul className="text-sm text-gray-600 text-left space-y-2 mb-4">
                            {result.details.map((detail, index) => (
                              <li key={index} className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                          <p className="text-xs text-health-green">
                            {result.advice}
                          </p>
                        </div>
                      );
                    })()}
                  </div>
                  <div className="space-y-4">
                    <button
                      type="button" // 修复：添加button类型
                      className="px-8 py-3 rounded-lg font-medium bg-ancient-brown text-white hover:bg-ancient-brown/90 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg"
                      onClick={restartQuiz}
                    >
                      重新测试
                    </button>
                    <div>
                      <button
                        type="button" // 修复：添加button类型
                        className="px-6 py-2 rounded-lg font-medium text-sm bg-health-green text-white hover:bg-health-green/90 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg"
                        onClick={showLoginPrompt}
                      >
                        登录保存结果
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Expert Q&A */}
        <section className="mb-16">
          <h2 className="font-serif-cn text-3xl font-bold text-ancient-brown text-center mb-16">
            专家问答
          </h2>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="nutrition-card bg-gradient-to-br from-sky-blue/10 to-white/90 rounded-xl p-6 border border-sky-blue/20">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-health-green rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">营</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-ancient-brown mb-2">
                    问：豆浆和牛奶哪个更有营养？
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    答：豆浆和牛奶各有优势。豆浆富含植物蛋白、异黄酮，零胆固醇，适合素食者和乳糖不耐受人群。牛奶含钙量更高，含有优质动物蛋白和B族维生素。建议根据个人体质和需求选择，也可以搭配饮用。
                  </p>
                  <div className="text-xs text-gray-500">
                    营养学专家 王医生 | 回答时间：2025-01-15
                  </div>
                </div>
              </div>
            </div>

            <div className="nutrition-card bg-gradient-to-br from-sky-blue/10 to-white/90 rounded-xl p-6 border border-sky-blue/20">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-sky-blue rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">中</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-ancient-brown mb-2">
                    问：什么时候喝豆浆效果最好？
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    答：从中医角度看，早晨7-9点是胃经当令时段，此时饮用豆浆最容易被吸收。避免空腹饮用，建议搭配主食。晚上饮用应适量，以免影响睡眠。体质偏寒者可加入生姜、红枣等温性食材。
                  </p>
                  <div className="text-xs text-gray-500">
                    中医专家 李医师 | 回答时间：2025-01-12
                  </div>
                </div>
              </div>
            </div>

            <div className="nutrition-card bg-gradient-to-br from-sky-blue/10 to-white/90 rounded-xl p-6 border border-sky-blue/20">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-lemon-yellow rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-gray-700 font-bold text-sm">美</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-ancient-brown mb-2">
                    问：豆浆有美容养颜的效果吗？
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    答：豆浆确实具有美容养颜效果。大豆异黄酮有类似雌激素的作用，有助于保持皮肤弹性，延缓衰老。维生素E是天然抗氧化剂，能保护皮肤免受自由基伤害。建议长期坚持饮用，配合健康作息。
                  </p>
                  <div className="text-xs text-gray-500">
                    美容专家 张医师 | 回答时间：2025-01-10
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <button
                type="button" // 修复：添加button类型
                className="px-6 py-3 rounded-lg font-medium bg-ancient-brown text-white hover:bg-ancient-brown/90 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg"
                onClick={showLoginPrompt}
              >
                提问专家
              </button>
              <p className="text-sm text-gray-600 mt-3">
                登录后可向专家提问，获取个性化健康建议
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
