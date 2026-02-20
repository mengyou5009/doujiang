// components/HeroSection.tsx
'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

interface HeroSectionProps {
  title?: string
  subtitle?: string
  description?: string
  backgroundImage?: string
  overlayOpacity?: number
  showCTAs?: boolean
  align?: 'left' | 'center' | 'right'
}

export default function HeroSection({
  title = "豆香传",
  subtitle = "一杯豆浆，敬过往，连世界，创未来",
  description = "跨越语言与国界的豆浆文化线上家园，连接全球华人及国际中华文化爱好者",
  backgroundImage = "/resources/hero-bg.jpg",
  overlayOpacity = 40,
  showCTAs = true,
  align = "center"
}: HeroSectionProps) {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 根据对齐方式设置样式
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end'
  }

  // 滚动视差效果
  const parallaxStyle = {
    transform: `translateY(${scrollY * 0.5}px)`,
    backgroundImage: `url('${backgroundImage}')`,
    opacity: Math.max(0, Math.min(1, overlayOpacity / 100))
  }

  return (
    <section className="relative h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden pt-16">
      {/* 背景图片 - 带视差效果 */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300 ease-out"
        style={parallaxStyle}
      />
      
      {/* 渐变遮罩 */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"
        style={{ opacity: Math.max(0, Math.min(1, overlayOpacity / 100)) }}
      />
      
      {/* 二次遮罩 - 暖色调 */}
      <div className="absolute inset-0 bg-gradient-to-br from-ancient-brown/20 to-transparent mix-blend-overlay" />

      {/* 内容区域 */}
      <div className={`relative z-10 px-4 max-w-4xl mx-auto flex flex-col ${alignmentClasses[align]} space-y-6`}>
        
        {/* 徽章/标签 */}
        <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4 animate-fade-in">
          <span className="text-white text-sm font-medium">#豆浆文化 #传承创新</span>
        </div>
        
        {/* 主标题 */}
        <h1 className="font-serif-cn text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
          {title.split('').map((char, index) => (
            <span 
              key={`title-char-${index}-${char}`}  
              className="inline-block animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {char}
            </span>
          ))}
        </h1>
        
        {/* 副标题 */}
        <p className="font-serif-cn text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl animate-slide-up">
          {subtitle}
        </p>
        
        {/* 描述 */}
        <p className="font-sans-cn text-base md:text-lg text-white/80 leading-relaxed max-w-xl animate-slide-up">
          {description}
        </p>

        {/* 操作按钮 */}
        {showCTAs && (
          <div className="flex flex-col sm:flex-row gap-4 mt-8 animate-slide-up">
            <Link
              href="/culture"
              className="btn-primary px-8 py-4 rounded-lg font-medium text-lg hover:translate-y-[-2px] transition-all duration-300 hover:shadow-xl animate-pulse-slow"
            >
              探索文化之旅 →
            </Link>
            <Link
              href="/workshop"
              className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-white/30 transition-all duration-300 hover:translate-y-[-2px]"
            >
              体验巧手工坊
            </Link>
          </div>
        )}

        {/* 滚动提示 */}
        {showCTAs && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="text-white/60">
              <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* 装饰性元素 */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-health-green/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-ancient-brown/10 rounded-full blur-3xl animate-pulse" />
    </section>
  )
}
