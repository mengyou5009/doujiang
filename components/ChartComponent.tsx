'use client'

import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

// 定义图表数据类型
type NutrientLabel = '蛋白质' | '钙' | '铁' | '维生素B1' | '维生素E' | '异黄酮'

export default function ChartComponent() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  // 使用 Chart.js 的类型，避免使用 any
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // 销毁之前的实例，防止内存泄漏
    if (chartInstance.current) {
      chartInstance.current.destroy()
      chartInstance.current = null
    }

    const ctx = chartRef.current.getContext('2d')
    if (!ctx) return

    // 创建图表实例
    chartInstance.current = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['蛋白质', '钙', '铁', '维生素B1', '维生素E', '异黄酮'] as NutrientLabel[],
        datasets: [
          {
            label: '黄豆',
            data: [95, 60, 70, 80, 85, 90],
            backgroundColor: 'rgba(166, 123, 91, 0.2)',
            borderColor: 'rgba(166, 123, 91, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(166, 123, 91, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(166, 123, 91, 1)'
          },
          {
            label: '黑豆',
            data: [85, 55, 85, 75, 90, 95],
            backgroundColor: 'rgba(143, 188, 143, 0.2)',
            borderColor: 'rgba(143, 188, 143, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(143, 188, 143, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(143, 188, 143, 1)'
          },
          {
            label: '青豆',
            data: [80, 45, 60, 90, 75, 70],
            backgroundColor: 'rgba(135, 206, 235, 0.2)',
            borderColor: 'rgba(135, 206, 235, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(135, 206, 235, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(135, 206, 235, 1)'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: {
              stepSize: 20,
              // 【修复】使用箭头函数，避免 this 指向问题，代码更简洁
              callback: (value) => `${value}%`
            },
            pointLabels: {
              font: {
                size: 14,
                family: "'Noto Sans SC', sans-serif"
              },
              color: '#4A4A4A'
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            },
            angleLines: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          }
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: {
                size: 14,
                family: "'Noto Sans SC', sans-serif"
              },
              padding: 20,
              usePointStyle: true,
              pointStyle: 'circle'
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            titleFont: {
              size: 14,
              family: "'Noto Sans SC', sans-serif"
            },
            bodyFont: {
              size: 14,
              family: "'Noto Sans SC', sans-serif"
            },
            padding: 12,
            cornerRadius: 6
          }
        }
      }
    })

    // 清理函数
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
        chartInstance.current = null
      }
    }
  }, [])

  return (
    // 建议设置一个固定的容器高度或宽高比，防止图表抖动
    <div className="w-full max-w-4xl mx-auto p-4" style={{ height: '400px' }}>
      <canvas 
        ref={chartRef} 
        // 移除 width/height 属性，完全由 CSS 和 responsive 选项控制
        className="w-full h-full"
      />
    </div>
  )
}
