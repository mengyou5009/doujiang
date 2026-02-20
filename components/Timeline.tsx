'use client'

// 补充 React 核心导入（JSX 语法必须）
import React, { useState } from 'react'

// 定义时间线项接口
interface TimelineItem {
  year: string
  title: string
  description: string
  details: string
}

// 定义组件属性接口，添加默认值兜底
interface TimelineProps {
  items: TimelineItem[]
}

export default function Timeline({ items = [] }: TimelineProps) {
  // 初始化激活索引为 null，明确类型
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  // 封装点击事件处理逻辑，避免重复代码
  const handleItemClick = (index: number) => {
    setActiveIndex(prev => prev === index ? null : index)
  }

  return (
    <div className="timeline-container">
      <div className="timeline-line" />
      
      {items.map((item, index) => (
        <div key={index} className="relative mb-12">
          <div
            className={`timeline-marker ${activeIndex === index ? 'active' : ''}`}
            onClick={() => handleItemClick(index)}
          />
          
          <div
            className={`timeline-content ${index % 2 === 0 ? 'mr-[55%] text-right' : 'ml-[55%] text-left'}`}
            onClick={() => handleItemClick(index)}
          >
            <div className="timeline-year text-xl font-bold text-ancient-brown mb-2">
              {item.year}
            </div>
            <h3 className="timeline-title text-lg font-semibold text-text-dark mb-3">
              {item.title}
            </h3>
            <p className="timeline-description text-gray-600">
              {item.description}
            </p>
            
            {/* 条件渲染详情，优化状态判断逻辑 */}
            {activeIndex === index && (
              <div className="timeline-details mt-4 pt-4 border-t border-ancient-brown/20 animate-fade-in">
                <p className="text-sm text-gray-600 leading-relaxed">{item.details}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

