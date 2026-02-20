// components/Quiz.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";

// 补充类型定义
interface QuizAnswer {
  question: number;
  value: string;
}

interface QuizQuestion {
  id: number;
  text: string;
  options: {
    value: string;
    label: string;
  }[];
}

interface QuizResult {
  title: string;
  description: string;
  details: string[];
  advice: string;
  color: string;
}

export default function Quiz() {
  const { user } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswer[]>([]);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [progressText, setProgressText] = useState<string>("0/5");

  // 问题列表
  const questions: QuizQuestion[] = [
    {
      id: 1,
      text: "你通常的体温感受是？",
      options: [
        { value: "cold", label: "经常感觉手脚冰冷" },
        { value: "normal", label: "体温适中，比较舒适" },
        { value: "hot", label: "容易感觉燥热" },
      ],
    },
    {
      id: 2,
      text: "你的精神状态通常是？",
      options: [
        { value: "tired", label: "容易疲劳，精力不足" },
        { value: "energetic", label: "精力充沛，活力满满" },
        { value: "anxious", label: "容易焦虑，情绪波动" },
      ],
    },
    {
      id: 3,
      text: "你的睡眠质量如何？",
      options: [
        { value: "poor", label: "睡眠浅，容易醒来" },
        { value: "good", label: "睡眠良好，一觉到天亮" },
        { value: "dreamy", label: "多梦，醒来仍感疲惫" },
      ],
    },
    {
      id: 4,
      text: "你的消化情况？",
      options: [
        { value: "weak", label: "消化功能较弱，容易胀气" },
        { value: "strong", label: "消化良好，食欲正常" },
        { value: "sensitive", label: "肠胃敏感，容易不适" },
      ],
    },
    {
      id: 5,
      text: "你喜欢的口味？",
      options: [
        { value: "sweet", label: "偏爱甜味" },
        { value: "salty", label: "偏爱咸味" },
        { value: "plain", label: "喜欢原味" },
      ],
    },
  ];

  // 更新进度（改用状态管理，避免直接操作DOM）
  useEffect(() => {
    const newProgress = ((currentQuestion - 1) / 5) * 100;
    const newProgressText = `${currentQuestion - 1}/5`;
    setProgress(newProgress);
    setProgressText(newProgressText);
  }, [currentQuestion]);

  // 选择选项
  const selectQuizOption = (questionNum: number, value: string) => {
    const newAnswers = [
      ...quizAnswers.filter((a) => a.question !== questionNum),
    ];
    newAnswers.push({ question: questionNum, value });
    setQuizAnswers(newAnswers);
  };

  // 下一题
  const nextQuizQuestion = () => {
    if (currentQuestion < 5) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  // 提交并显示结果
  const handleShowResult = () => {
    setIsSubmitting(true);

    // 模拟API调用
    setTimeout(() => {
      setShowResult(true);
      setCurrentQuestion(6);
      // 更新进度到100%
      setProgress(100);
      setProgressText("5/5");
      setIsSubmitting(false);
    }, 1000);
  };

  // 重新开始测试
  const restartQuiz = () => {
    setCurrentQuestion(1);
    setQuizAnswers([]);
    setShowResult(false);
    setProgress(0);
    setProgressText("0/5");
  };

  // 缓存测试结果（避免重复计算）
  const quizResult = useMemo((): QuizResult => {
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
          "适宜：阳虚体质，手脚冰凉者",
        ],
        advice: "这款配方有助于改善您的体质，让您更健康！",
        color: "health-green",
      };
    } else if (answers[1] === "hot" && answers[4] === "sensitive") {
      return {
        title: "绿豆百合豆浆",
        description: "这款清凉豆浆非常适合您的体质：",
        details: [
          "主料：绿豆 + 百合 + 黄豆",
          "功效：清热解毒，养胃健脾",
          "建议：下午饮用，每周2-3次",
          "适宜：湿热体质，易上火者",
        ],
        advice: "这款配方能帮助您调节体质，更加舒适！",
        color: "sky-blue",
      };
    } else {
      return {
        title: "经典黄豆豆浆",
        description: "这是最适合大众的经典配方：",
        details: [
          "主料：优质黄豆",
          "功效：均衡营养，增强体质",
          "建议：每日早晨饮用",
          "适宜：大多数人群，养生保健",
        ],
        advice: "这是最经典的配方，适合您的日常保健！",
        color: "ancient-brown",
      };
    }
  }, [quizAnswers]);

  // 检查问题是否已回答
  const isQuestionAnswered = (questionNum: number): boolean => {
    return quizAnswers.some((a) => a.question === questionNum);
  };

  // 登录提示
  const showLoginPrompt = () => {
    alert("请先登录后保存您的测试结果");
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* 补充基础动画样式 */}
      <style jsx global>
        {`
          .animate-fade-in {
            animation: fadeIn 0.5s ease-in-out;
          }
          .animate-bounce {
            animation: bounce 1s ease-in-out;
          }
          .animate-spin {
            animation: spin 1s linear infinite;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes bounce {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>

      {/* 测试介绍 */}
      <div className="text-center mb-12">
        <h2 className="font-serif-cn text-3xl font-bold text-ancient-brown mb-4">
          测测你的体质适合哪种豆浆？
        </h2>
        <p className="text-gray-600 mb-2">
          通过简单的5个问题，为你推荐最适合的豆浆配方
        </p>
        <p className="text-sm text-gray-500">
          {user ? `已登录用户：${user.email}` : "登录后可保存测试结果"}
        </p>
      </div>

      {/* 测试卡片 */}
      <div className="test-card bg-gradient-to-br from-lemon-yellow/30 to-white/90 rounded-xl p-8 border border-lemon-yellow/50 shadow-lg">
        {/* 进度条 */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>测试进度</span>
            <span>{progressText}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="progress-bar bg-health-green h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            >
            </div>
          </div>
        </div>

        {/* 问题容器 */}
        <div id="quizContainer">
          {/* 生成所有问题（优化重复代码） */}
          {questions.map((question) => (
            <div
              key={question.id}
              className={`quiz-question ${currentQuestion === question.id ? "block" : "hidden"} animate-fade-in`}
            >
              <h4 className="font-serif-cn text-xl font-semibold text-ancient-brown mb-6">
                {question.id}. {question.text}
              </h4>
              <div className="space-y-3">
                {question.options.map((option) => (
                  <div
                    key={option.value}
                    className={`quiz-option p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                      quizAnswers.find(
                        (a) =>
                          a.question === question.id &&
                          a.value === option.value,
                      )
                        ? "selected bg-health-green text-white border-health-green"
                        : "border-gray-200 hover:border-health-green hover:bg-health-green/10"
                    }`}
                    onClick={() => selectQuizOption(question.id, option.value)}
                  >
                    <span className="font-medium">{option.label}</span>
                  </div>
                ))}
              </div>

              {/* 问题1-4显示下一题按钮，问题5显示查看结果按钮 */}
              {question.id < 5 ? (
                <button
                  id={`nextBtn${question.id}`}
                  className={`btn-primary px-6 py-3 rounded-lg mt-8 transition-all duration-300 ${
                    isQuestionAnswered(question.id)
                      ? "bg-ancient-brown text-white hover:bg-ancient-brown/90"
                      : "opacity-50 cursor-not-allowed bg-ancient-brown text-white"
                  }`}
                  onClick={nextQuizQuestion}
                  disabled={!isQuestionAnswered(question.id)}
                >
                  下一题 →
                </button>
              ) : (
                <button
                  id={`nextBtn${question.id}`}
                  className={`btn-secondary px-6 py-3 rounded-lg mt-8 transition-all duration-300 ${
                    isQuestionAnswered(question.id) && !isSubmitting
                      ? "bg-health-green text-white hover:bg-health-green/90"
                      : "opacity-50 cursor-not-allowed bg-health-green text-white"
                  }`}
                  onClick={handleShowResult}
                  disabled={!isQuestionAnswered(question.id) || isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                      分析中...
                    </span>
                  ) : (
                    "查看结果"
                  )}
                </button>
              )}
            </div>
          ))}

          {/* 结果展示 */}
          <div
            className={`quiz-result ${showResult ? "block" : "hidden"} animate-fade-in`}
          >
            <div className="text-center">
              {/* 结果图标 */}
              <div
                className={`w-20 h-20 bg-${quizResult.color} rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce`}
              >
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

              {/* 结果标题 */}
              <h3 className="font-serif-cn text-2xl font-semibold text-ancient-brown mb-4">
                你的专属豆浆配方
              </h3>

              {/* 结果内容 */}
              <div className="bg-white rounded-xl p-6 mb-8 shadow-inner">
                <div className="text-center">
                  <h4
                    className={`font-serif-cn text-xl font-semibold text-${quizResult.color} mb-3`}
                  >
                    {quizResult.title}
                  </h4>
                  <p className="text-gray-600 mb-4">{quizResult.description}</p>
                  <ul className="text-sm text-gray-600 text-left space-y-3 mb-4">
                    {quizResult.details.map((detail, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2 text-health-green">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                  <p className={`text-sm text-${quizResult.color}`}>
                    {quizResult.advice}
                  </p>
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="space-y-4">
                <button
                  className="btn-primary px-8 py-3 rounded-lg font-medium text-lg bg-ancient-brown text-white hover:bg-ancient-brown/90 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg"
                  onClick={restartQuiz}
                >
                  重新测试
                </button>

                {user ? (
                  <button
                    className="btn-secondary px-6 py-2 rounded-lg font-medium text-sm bg-health-green text-white hover:bg-health-green/90 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg"
                    onClick={() => alert("结果已保存到您的账户！")}
                  >
                    保存结果到账户
                  </button>
                ) : (
                  <button
                    className="btn-secondary px-6 py-2 rounded-lg font-medium text-sm bg-health-green text-white hover:bg-health-green/90 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg"
                    onClick={showLoginPrompt}
                  >
                    登录保存结果
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
