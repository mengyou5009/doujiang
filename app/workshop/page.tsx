'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// 定义颜色类型，避免字符串字面量错误
type ColorType = 'lemon-yellow' | 'sky-blue' | 'health-green' | 'ancient-brown'
type CategoryType = 'basic' | 'creative' | 'derivative' | 'all'
type WorkFilterType = 'all' | 'latest' | 'popular'

interface Tutorial {
  id: number
  title: string
  subtitle: string
  description: string
  category: CategoryType
  time: string
  difficulty: number
  learners: number
  color: ColorType
  gradient: string
  icon: React.ReactNode
}

interface UserWork {
  id: number
  title: string
  author: string
  description: string
  likes: number
  comments: number
  gradient: string
}

export default function WorkshopPage() {
  const [activeTutorialFilter, setActiveTutorialFilter] = useState<CategoryType>('all')
  const [activeWorkFilter, setActiveWorkFilter] = useState<WorkFilterType>('all')
  const [likedWorks, setLikedWorks] = useState<number[]>([])
  const [isMounted, setIsMounted] = useState(false)
  
  const tutorials: Tutorial[] = [
    {
      id: 1,
      title: '经典黄豆豆浆',
      subtitle: '传统石磨豆浆制作',
      description: '从选豆、泡豆到磨豆、煮浆，掌握传统豆浆制作的每一个关键步骤...',
      category: 'basic',
      time: '30分钟',
      difficulty: 2,
      learners: 1200,
      color: 'lemon-yellow',
      gradient: 'from-yellow-300 to-green-400', // 替换为tailwind默认颜色
      icon: (
        <svg className="w-16 h-16 mx-auto mb-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      id: 2,
      title: '五彩豆浆',
      subtitle: '五谷豆浆创意配方',
      description: '用五种谷物制作营养丰富的创意豆浆，色彩缤纷，口感层次丰富...',
      category: 'creative',
      time: '45分钟',
      difficulty: 3,
      learners: 856,
      color: 'sky-blue',
      gradient: 'from-green-400 to-blue-400', // 替换为tailwind默认颜色
      icon: (
        <svg className="w-16 h-16 mx-auto mb-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )
    },
    {
      id: 3,
      title: '豆浆面膜',
      subtitle: '天然豆浆面膜制作',
      description: '利用豆浆的天然营养成分，制作美容养颜面膜，让肌肤享受大豆的滋养...',
      category: 'derivative',
      time: '20分钟',
      difficulty: 1,
      learners: 2100,
      color: 'lemon-yellow',
      gradient: 'from-blue-400 to-yellow-300', // 替换为tailwind默认颜色
      icon: (
        <svg className="w-16 h-16 mx-auto mb-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v2.286a2 2 0 00.586 1.414l2.414 2.414A2 2 0 0119 12.414V16l-1 1H8l-1-1v-3.586a2 2 0 01.586-1.414l2.414-2.414A2 2 0 0011 7.286V5l-1-1z" />
        </svg>
      )
    },
    {
      id: 4,
      title: '黑豆养生豆浆',
      subtitle: '养生黑豆豆浆',
      description: '黑豆富含花青素，具有强大的抗氧化功效，是养生保健的绝佳选择...',
      category: 'basic',
      time: '35分钟',
      difficulty: 2,
      learners: 1800,
      color: 'ancient-brown',
      gradient: 'from-yellow-800 to-green-400', // 替换为tailwind默认颜色
      icon: (
        <svg className="w-16 h-16 mx-auto mb-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      id: 5,
      title: '豆浆鸡尾酒',
      subtitle: '创意豆浆调酒',
      description: '将豆浆与鸡尾酒完美结合，创造出独特的口感体验，适合派对聚会...',
      category: 'creative',
      time: '25分钟',
      difficulty: 4,
      learners: 543,
      color: 'health-green',
      gradient: 'from-green-400 to-yellow-800', // 替换为tailwind默认颜色
      icon: (
        <svg className="w-16 h-16 mx-auto mb-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      )
    }
  ]

  const userWorks: UserWork[] = [
    {
      id: 1,
      title: '五谷豆浆',
      author: '豆浆爱好者小王',
      description: '用黄豆、黑豆、红豆、绿豆、花生五种食材制作的五谷豆浆，营养丰富，口感层次分明...',
      likes: 23,
      comments: 5,
      gradient: 'from-yellow-300 to-green-400'
    },
    {
      id: 2,
      title: '豆浆面膜',
      author: '养生达人李姐',
      description: '自制豆浆面膜，肌肤变得光滑细腻，天然无添加，值得推荐！',
      likes: 18,
      comments: 3,
      gradient: 'from-green-400 to-blue-400'
    },
    {
      id: 3,
      title: '创意豆花',
      author: '美食创作者小张',
      description: '用豆浆制作的创意豆花，加入了水果和坚果，既美味又健康，颜值也很高！',
      likes: 31,
      comments: 8,
      gradient: 'from-blue-400 to-yellow-300'
    },
    {
      id: 4,
      title: '传统石磨',
      author: '文化传承者老陈',
      description: '复原传统石磨制作豆浆的工艺，保留了最原始的风味，文化传承从我做起。',
      likes: 42,
      comments: 12,
      gradient: 'from-yellow-800 to-green-400'
    },
    {
      id: 5,
      title: '豆浆冰淇淋',
      author: '甜品师小周',
      description: '用豆浆制作的低糖冰淇淋，健康又美味，夏天必备！',
      likes: 27,
      comments: 6,
      gradient: 'from-green-400 to-yellow-800'
    },
    {
      id: 6,
      title: '豆浆拿铁',
      author: '咖啡师阿明',
      description: '豆浆与咖啡的完美结合，创造出独特的豆浆拿铁，中西合璧的创新。',
      likes: 35,
      comments: 9,
      gradient: 'from-yellow-300 to-blue-400'
    }
  ]

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const filterTutorials = (category: CategoryType) => {
    setActiveTutorialFilter(category)
  }

  const filterWorks = (category: WorkFilterType) => {
    setActiveWorkFilter(category)
  }

  const toggleLike = (workId: number) => {
    if (likedWorks.includes(workId)) {
      setLikedWorks(likedWorks.filter(id => id !== workId))
    } else {
      setLikedWorks([...likedWorks, workId])
    }
  }

  const getWorkLikes = (workId: number) => {
    const work = userWorks.find(w => w.id === workId)
    if (!work) return 0
    
    const baseLikes = work.likes
    const isLiked = likedWorks.includes(workId)
    
    return isLiked ? baseLikes + 1 : baseLikes
  }

  // 处理作品筛选逻辑（补充缺失的筛选实现）
  const filteredUserWorks = (() => {
    if (activeWorkFilter === 'all') return userWorks
    if (activeWorkFilter === 'popular') {
      return [...userWorks].sort((a, b) => b.likes - a.likes)
    }
    // latest 按ID倒序（模拟最新）
    return [...userWorks].sort((a, b) => b.id - a.id)
  })()

  const filteredTutorials = activeTutorialFilter === 'all' 
    ? tutorials 
    : tutorials.filter(tutorial => tutorial.category === activeTutorialFilter)

  const showTutorialDetail = (type: CategoryType) => {
    alert(`${type === 'basic' ? '基础' : type === 'creative' ? '创新' : '衍生'}教程详情即将推出，敬请期待！`)
  }

  const showLoginPrompt = () => {
    alert('请先登录后使用此功能')
  }

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-800 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }

  return (
    <main>
      {/* Hero Section */}
      <section 
        className="relative h-96 flex items-center justify-center pt-16 bg-cover bg-center"
        style={{ backgroundImage: "url('/resources/workshop-diy.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            巧手工坊
          </h1>
          <p className="font-sans text-lg md:text-xl text-white/90 mb-2">
            创意无限，豆浆百变
          </p>
          <p className="font-sans text-base text-white/80">
            从传统到创新，探索豆浆的无限可能
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Tutorial Section */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-12 flex-wrap gap-4">
            <h2 className="font-serif text-3xl font-bold text-yellow-400">
              教程专区
            </h2>
            <div className="flex space-x-2">
              <button 
                className={`filter-btn px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTutorialFilter === 'all' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => filterTutorials('all')}
              >
                全部
              </button>
              <button 
                className={`filter-btn px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTutorialFilter === 'basic' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => filterTutorials('basic')}
              >
                基础款
              </button>
              <button 
                className={`filter-btn px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTutorialFilter === 'creative' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => filterTutorials('creative')}
              >
                创新款
              </button>
              <button 
                className={`filter-btn px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTutorialFilter === 'derivative' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => filterTutorials('derivative')}
              >
                衍生品
              </button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTutorials.map((tutorial) => (
              <div 
                key={tutorial.id} 
                className="tutorial-card bg-gradient-to-br from-yellow-300/30 to-white/90 rounded-xl overflow-hidden border border-yellow-300/50 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl"
                data-category={tutorial.category}
              >
                <div className={`h-48 bg-gradient-to-br ${tutorial.gradient} opacity-80 flex items-center justify-center`}>
                  <div className="text-center text-white">
                    {tutorial.icon}
                    <h3 className="font-serif text-xl font-semibold">{tutorial.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <span className={`px-3 py-1 bg-${tutorial.color} bg-opacity-20 text-${tutorial.color} text-xs font-medium rounded-full`}>
                      {tutorial.category === 'basic' ? '基础款' : tutorial.category === 'creative' ? '创新款' : '衍生品'}
                    </span>
                    <span className="text-xs text-gray-500">⏱️ {tutorial.time}</span>
                  </div>
                  <h4 className="font-semibold text-yellow-900 mb-2">{tutorial.subtitle}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {tutorial.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4 flex-wrap gap-2">
                    <span>难度：{'⭐'.repeat(tutorial.difficulty)}</span>
                    <span>👥 {tutorial.learners.toLocaleString()} 学习</span>
                  </div>
                  <button 
                    className="w-full py-2 rounded-lg font-medium text-sm bg-yellow-900 text-white hover:bg-yellow-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    onClick={() => showTutorialDetail(tutorial.category)}
                  >
                    开始学习
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* User Works Gallery */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-12 flex-wrap gap-4">
            <h2 className="font-serif text-3xl font-bold text-green-500">
              作品展示墙
            </h2>
            <div className="flex items-center space-x-4 flex-wrap gap-2">
              <button 
                className="px-4 py-2 rounded-lg font-medium text-sm bg-green-500 text-white hover:bg-green-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                onClick={showLoginPrompt}
              >
                分享我的作品
              </button>
              <div className="flex space-x-2">
                <button 
                  className={`filter-btn px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeWorkFilter === 'all' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => filterWorks('all')}
                >
                  全部
                </button>
                <button 
                  className={`filter-btn px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeWorkFilter === 'latest' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => filterWorks('latest')}
                >
                  最新
                </button>
                <button 
                  className={`filter-btn px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeWorkFilter === 'popular' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => filterWorks('popular')}
                >
                  热门
                </button>
              </div>
            </div>
          </div>
          
          {/* 修复masonry网格布局，使用CSS Grid替代 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUserWorks.map((work) => (
              <div 
                key={work.id} 
                className="work-card bg-gradient-to-br from-yellow-100/80 to-white/90 rounded-xl overflow-hidden border border-yellow-900/10 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl"
              >
                <div className={`h-48 bg-gradient-to-br ${work.gradient} opacity-80`}></div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <h4 className="font-semibold text-yellow-900">{work.title}</h4>
                    <div className="flex items-center space-x-2">
                      <button 
                        className={`like-btn flex items-center space-x-1 transition-all duration-300 hover:scale-110 ${
                          likedWorks.includes(work.id) 
                            ? 'text-red-500' 
                            : 'text-gray-500 hover:text-red-500'
                        }`}
                        onClick={() => toggleLike(work.id)}
                      >
                        <span>❤️</span>
                        <span>{getWorkLikes(work.id)}</span>
                      </button>
                      <button 
                        className="text-gray-500 hover:text-yellow-900 transition-colors duration-300"
                        onClick={showLoginPrompt}
                      >
                        💬 {work.comments}
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">by {work.author}</p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {work.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Challenge Section */}
        <section className="mb-16">
          <h2 className="font-serif text-3xl font-bold text-yellow-900 text-center mb-12">
            本周挑战
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-green-500/10 to-white/90 rounded-xl p-8 border border-green-500/20">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-semibold text-yellow-900 mb-2">
                  解锁五谷豆浆
                </h3>
                <p className="text-gray-600 mb-6">
                  用五种以上的谷物制作创意豆浆，分享你的独特配方
                </p>
              </div>
              
              {/* Challenge Progress */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>挑战进度</span>
                  <span>已有 127 人完成</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-green-500 to-blue-400 h-3 rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>
              
              {/* Challenge Details */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="font-semibold text-yellow-900 mb-3">挑战要求：</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>使用5种以上不同谷物</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>分享制作过程和配方</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>上传成品照片</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>描述口感和特色</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-900 mb-3">奖励内容：</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>50积分奖励</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>"创意大师"徽章</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>作品首页推荐</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>专属食谱模板</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="text-center">
                <button 
                  className="px-8 py-3 rounded-lg font-medium text-lg bg-green-500 text-white hover:bg-green-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  onClick={showLoginPrompt}
                >
                  接受挑战
                </button>
                <p className="text-sm text-gray-600 mt-3">
                  登录后参与挑战，赢取丰厚奖励
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

