"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// 颜色映射表 - 修复：添加默认值处理，避免undefined
const colorClassMap: Record<string, { text: string; bg: string; border: string }> = {
  "ancient-brown": {
    text: "text-ancient-brown",
    bg: "bg-ancient-brown",
    border: "border-ancient-brown",
  },
  "health-green": {
    text: "text-health-green",
    bg: "bg-health-green",
    border: "border-health-green",
  },
  "sky-blue": {
    text: "text-sky-blue",
    bg: "bg-sky-blue",
    border: "border-sky-blue",
  },
  "lemon-yellow": {
    text: "text-lemon-yellow",
    bg: "bg-lemon-yellow",
    border: "border-lemon-yellow",
  },
  "gray-700": {
    text: "text-gray-700",
    bg: "bg-gray-700",
    border: "border-gray-700",
  },
  "red-400": {
    text: "text-red-400",
    bg: "bg-red-400",
    border: "border-red-400",
  },
  "purple-400": {
    text: "text-purple-400",
    bg: "bg-purple-400",
    border: "border-purple-400",
  },
  // 补充默认值，防止颜色不存在时报错
  default: {
    text: "text-gray-800",
    bg: "bg-gray-100",
    border: "border-gray-200",
  },
};

interface TimelineItem {
  id: number;
  year: string;
  dynasty: string;
  title: string;
  description: string;
  details: string;
  reference?: string;
  influence?: string;
  image?: string;
  color: keyof typeof colorClassMap | string;
}

interface RegionCard {
  id: number;
  region: string;
  title: string;
  description: string;
  areas: string;
  color: keyof typeof colorClassMap | string;
  gradient: string;
}

interface Celebrity {
  id: number;
  name: string;
  title: string;
  description: string;
  lastName: string;
  color: keyof typeof colorClassMap | string;
}

export default function CulturePage() {
  const [activeTimeline, setActiveTimeline] = useState<number | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const timelineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timelineItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  // 时间轴数据
  const timelineItems: TimelineItem[] = [
    {
      id: 1,
      year: "公元前164年",
      dynasty: "西汉",
      title: "刘安发明豆浆",
      description:
        "淮南王刘安在八公山炼丹时，偶然将黄豆磨碎过滤，加入卤水，意外发明了豆浆和豆腐。",
      details:
        '据《本草纲目》记载："豆浆，利水下气，制诸风热，解诸毒。"刘安的发明不仅创造了美味的饮品，更为后世留下了宝贵的健康财富。这一偶然的发现，开启了中国两千多年的豆浆文化史。',
      reference: "参考资料：《本草纲目》、《淮南子》",
      color: "ancient-brown",
    },
    {
      id: 2,
      year: "公元618-907年",
      dynasty: "唐代",
      title: "唐代普及",
      description:
        "豆浆在唐代开始普及，成为民间常见的早餐饮品，并传入日本等周边国家。",
      details:
        '唐代是中国饮食文化的黄金时期，豆浆作为一种营养丰富的饮品，在长安、洛阳等大都市的早市上随处可见。鉴真东渡时，将豆浆制作技术传入日本，为日本"豆乳"文化奠定了基础。',
      influence: "历史影响：奠定了东亚豆浆文化圈",
      color: "health-green",
    },
    {
      id: 3,
      year: "公元960-1279年",
      dynasty: "宋代",
      title: "宋代发展",
      description:
        "宋代豆浆制作工艺更加精细，出现了专门的豆浆铺子，形成了南北不同的口味偏好。",
      details:
        '《东京梦华录》记载了北宋都城汴梁的豆浆店铺："每日清晨，豆香四溢，男女老幼排队等候。"南方偏爱甜味豆浆，北方则喜欢咸味，这种南北差异至今仍然存在。',
      influence: "文化特色：南甜北咸的口味分化形成",
      color: "sky-blue",
    },
    {
      id: 4,
      year: "公元1368-1912年",
      dynasty: "明清",
      title: "明清传承",
      description:
        "明清时期，豆浆制作技艺在民间广泛传承，各种豆制品层出不穷，形成了完整的产业链。",
      details:
        '明代《天工开物》详细记载了豆浆和豆腐的制作工艺。清代，豆浆铺子已经成为城市街景的重要组成部分，"清晨一碗豆浆，配两根油条"的生活方式开始形成。',
      influence: "技术突破：制作工艺标准化、产业化",
      color: "lemon-yellow",
    },
    {
      id: 5,
      year: "20世纪至今",
      dynasty: "现代",
      title: "现代工业化",
      description:
        "20世纪初，豆浆开始工业化生产。现代科技创新使豆浆成为全球性的健康饮品。",
      details:
        "1908年，中国第一家豆浆工厂在上海成立。1980年代后，随着健康意识提升，豆浆在全球范围内受到重视。现代豆浆机、无菌包装等技术的应用，让这一传统饮品焕发新生。",
      influence: "全球影响：从中国传统饮品到世界健康食品",
      color: "purple-400",
    },
  ];

  // 地域文化数据
  const regionCards: RegionCard[] = [
    {
      id: 1,
      region: "北",
      title: "北方咸豆浆",
      description:
        "北方地区偏爱咸味豆浆，常加入酱油、醋、葱花、榨菜等调料，口感咸香开胃。配以油条、包子，成为经典的北方早餐组合。",
      areas: "代表地区：北京、天津、山东",
      color: "ancient-brown",
      gradient: "from-ancient-brown to-health-green",
    },
    {
      id: 2,
      region: "南",
      title: "南方甜豆浆",
      description:
        "南方地区喜欢甜味豆浆，加入白糖、红糖或蜂蜜，口感香甜醇厚。常与粽子、小笼包搭配，体现南方饮食的精致。",
      areas: "代表地区：上海、江苏、浙江",
      color: "health-green",
      gradient: "from-health-green to-sky-blue",
    },
    {
      id: 3,
      region: "台",
      title: "台湾豆浆红茶",
      description:
        '台湾创新将豆浆与红茶结合，创造出独特的"豆浆红茶"饮品。茶香与豆香融合，口感层次丰富，成为台湾特色。',
      areas: "代表地区：台北、台中、高雄",
      color: "sky-blue",
      gradient: "from-sky-blue to-lemon-yellow",
    },
    {
      id: 4,
      region: "粤",
      title: "潮汕豆浆油条",
      description:
        "潮汕地区的豆浆配油条是当地经典早餐。油条酥脆，豆浆醇厚，两者搭配相得益彰，体现了潮汕饮食文化的精髓。",
      areas: "代表地区：汕头、潮州、揭阳",
      color: "gray-700",
      gradient: "from-lemon-yellow to-gray-700",
    },
    {
      id: 5,
      region: "川",
      title: "川味麻辣豆花",
      description:
        "四川地区的豆花加入了麻辣元素，辣椒油、花椒粉与豆花结合，创造出独特的川味豆花，辣而不燥，麻而不苦。",
      areas: "代表地区：成都、重庆、绵阳",
      color: "red-400",
      gradient: "from-red-400 to-orange-400",
    },
    {
      id: 6,
      region: "港",
      title: "港式豆浆甜品",
      description:
        "香港将豆浆与甜品文化结合，创造出豆浆布丁、豆浆慕斯等精致甜品，体现了港式饮食的创新精神。",
      areas: "代表地区：香港岛、九龙、新界",
      color: "purple-400",
      gradient: "from-purple-400 to-pink-400",
    },
  ];

  // 名人轶事数据
  const celebrities: Celebrity[] = [
    {
      id: 1,
      name: "刘安 - 豆浆之父",
      title: "西汉淮南王",
      description:
        "刘安不仅是豆浆的发明者，更是《淮南子》的作者。相传他在八公山修炼时，为了给母亲治病，用黄豆磨成浆汁，加入卤水凝固，既制成了豆腐，也发现了豆浆的美味。这一偶然的发现，成就了中华饮食文化的重要组成部分。",
      lastName: "刘",
      color: "ancient-brown",
    },
    {
      id: 2,
      name: "李时珍 - 豆浆养生",
      title: "明代医学家",
      description:
        '李时珍在《本草纲目》中详细记载了豆浆的药用价值："豆浆，性平味甘，利水下气，制诸风热，解诸毒。"他的医学研究为豆浆的养生保健功能提供了科学依据，影响了后世的中医养生理念。',
      lastName: "李",
      color: "health-green",
    },
    {
      id: 3,
      name: "胡适 - 豆浆情结",
      title: "现代文学家",
      description:
        '胡适先生在美国留学期间，常常怀念家乡的豆浆味道。他在日记中写道："在美国最想念的，就是家乡清晨的那碗热豆浆。"这种乡愁体现了豆浆在中国人心中的文化地位和情感价值。',
      lastName: "胡",
      color: "sky-blue",
    },
  ];

  useEffect(() => {
    // 初始化时间轴动画
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in"); // 修复：使用标准化动画类名
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // 修复：遍历前先清空ref数组，避免重复引用
    timelineItemsRef.current = [];
    document.querySelectorAll('.timeline-item').forEach((el, index) => {
      timelineItemsRef.current[index] = el as HTMLDivElement;
      observer.observe(el);
    });

    // 滚动到顶部按钮逻辑
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 切换时间轴详情显示
  const toggleTimelineDetails = (id: number) => {
    setActiveTimeline(activeTimeline === id ? null : id);
  };

  // 滚动到顶部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // 辅助函数：安全获取颜色类名
  const getColorClass = (color: string, type: 'text' | 'bg' | 'border') => {
    return colorClassMap[color]?.[type] || colorClassMap.default[type];
  };

  return (
    <main>
      {/* Hero Section */}
      <section
        className="relative h-96 flex items-center justify-center pt-16 bg-cover bg-center"
        style={{ backgroundImage: "url('/resources/culture-timeline.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            文化溯源
          </h1>
          <p className="font-sans text-lg md:text-xl text-white/90 mb-2">
            穿越千年时光，探寻豆浆的文化根脉
          </p>
          <p className="font-sans text-base text-white/80">
            从西汉石磨到现代工厂，见证一杯豆浆的文明传承
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Timeline Section */}
        <section className="mb-20">
          <h2 className="font-serif text-3xl font-bold text-ancient-brown text-center mb-16">
            时光长廊
          </h2>

          <div className="timeline-container relative">
            {/* Timeline Line */}
            <div className="timeline-line absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-ancient-brown to-health-green -translate-x-1/2 z-0" />

            {/* Timeline Items */}
            {timelineItems.map((item, index) => (
              <div
                key={item.id}
                className="timeline-item relative mb-12 opacity-0 translate-y-8 transition-all duration-600 ease-out"
              >
                {/* Timeline Marker */}
                <div
                  className={`timeline-marker absolute left-1/2 top-6 w-5 h-5 ${getColorClass(item.color, 'bg')} border-4 border-gray-100 rounded-full -translate-x-1/2 cursor-pointer transition-all duration-300 z-10 ${
                    activeTimeline === item.id
                      ? "scale-150 shadow-lg shadow-health-green/50"
                      : ""
                  }`}
                  onClick={() => toggleTimelineDetails(item.id)}
                  title={item.dynasty}
                />

                {/* Timeline Content */}
                <div
                  className={`timeline-content bg-gray-50 p-6 rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                    index % 2 === 0
                      ? "mr-[55%] text-right"
                      : "ml-[55%] text-left"
                  }`}
                  onClick={() => toggleTimelineDetails(item.id)}
                >
                  <div className="timeline-year text-xl font-bold text-ancient-brown mb-2">
                    {item.year}
                  </div>
                  <h3 className="timeline-title font-serif text-lg font-semibold text-gray-800 mb-3">
                    {item.title}
                  </h3>
                  <p className="timeline-description text-gray-600 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Timeline Details */}
                  {activeTimeline === item.id && (
                    <div className="timeline-details mt-4 pt-4 border-t border-ancient-brown/20 animate-fade-in">
                      <p className="text-sm text-gray-600 leading-relaxed mb-4">
                        {item.details}
                      </p>
                      {item.reference && (
                        <div className="text-xs text-ancient-brown mb-2">
                          {item.reference}
                        </div>
                      )}
                      {item.influence && (
                        <div className="text-xs text-health-green">
                          {item.influence}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Regional Culture */}
        <section className="mb-20">
          <h2 className="font-serif text-3xl font-bold text-ancient-brown text-center mb-16">
            地域文化
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regionCards.map((region) => (
              <div
                key={region.id}
                className="region-card bg-gradient-to-br from-gray-50 to-white/90 rounded-xl p-6 border border-ancient-brown/10 hover:translate-y-[-5px] transition-all duration-300 hover:shadow-xl"
              >
                <div
                  className={`w-16 h-16 ${getColorClass(region.color, 'bg')} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <span className="text-white font-bold text-xl">
                    {region.region}
                  </span>
                </div>
                <h3
                  className={`font-serif text-xl font-semibold ${getColorClass(region.color, 'text')} text-center mb-4`}
                >
                  {region.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {region.description}
                </p>
                <div className={`text-xs ${getColorClass(region.color, 'text')}`}>
                  {region.areas}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Celebrity Stories */}
        <section className="mb-16">
          <h2 className="font-serif text-3xl font-bold text-ancient-brown text-center mb-16">
            名人轶事
          </h2>

          <div className="max-w-4xl mx-auto space-y-12">
            {celebrities.map((celebrity) => (
              <div
                key={celebrity.id}
                className="bg-gray-50 rounded-xl p-8 hover:translate-y-[-3px] transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-start space-x-6">
                  <div
                    className={`w-20 h-20 ${getColorClass(celebrity.color, 'bg')} rounded-full flex items-center justify-center flex-shrink-0`}
                  >
                    <span className="text-white font-serif text-2xl font-bold">
                      {celebrity.lastName}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`font-serif text-2xl font-semibold ${getColorClass(celebrity.color, 'text')} mb-2`}
                    >
                      {celebrity.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      {celebrity.title}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      {celebrity.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 bg-ancient-brown rounded-full flex items-center justify-center text-white shadow-lg hover:bg-health-green hover:translate-y-[-3px] transition-all duration-300 z-50 ${
          showScrollTop ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        aria-label="滚动到顶部"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </main>
  );
}

