// components/ContactForm.tsx
'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'

// 补充 AuthContext 中 user 的类型定义（避免隐式 any）
interface User {
  displayName?: string
  email?: string
  [key: string]: any
}

interface FormData {
  name: string
  email: string
  subject: string
  message: string
  contactType: 'general' | 'business' | 'suggestion' | 'technical'
}

// 扩展 useAuth 返回值类型
interface AuthContextType {
  user: User | null | undefined
}

export default function ContactForm() {
  // 显式指定 useAuth 返回值类型
  const { user } = useAuth() as AuthContextType
  const [formData, setFormData] = useState<FormData>({
    name: user?.displayName || '',
    email: user?.email || '',
    subject: '',
    message: '',
    contactType: 'general'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const contactTypes = [
    { value: 'general', label: '一般咨询', icon: '💬' },
    { value: 'business', label: '商务合作', icon: '🤝' },
    { value: 'suggestion', label: '建议反馈', icon: '💡' },
    { value: 'technical', label: '技术支持', icon: '🔧' }
  ]

  // 修复事件处理函数类型（完整覆盖所有元素类型）
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // 清除错误信息
    if (error) setError(null)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // 修复验证逻辑：补充 subject 字段验证（UI标记为必填但原逻辑未覆盖）
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setError('请填写所有必填字段')
      return
    }

    // 增强邮箱验证逻辑（更严谨）
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email.trim())) {
      setError('请输入有效的邮箱地址')
      return
    }

    // 增加消息长度验证（UI提示不少于50字）
    if (formData.message.trim().length < 50) {
      setError('详细内容需不少于50字，请补充描述')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // 这里应该是实际的API调用
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })
      
      console.log('表单提交成功:', formData)
      setIsSubmitted(true)
      
      // 重置表单（保留登录用户的信息）
      setFormData({
        name: user?.displayName || '',
        email: user?.email || '',
        subject: '',
        message: '',
        contactType: 'general'
      })
      
      // 5秒后重置提交状态
      setTimeout(() => setIsSubmitted(false), 5000)
      
    } catch (err) {
      console.error('提交失败:', err)
      setError('提交失败，请稍后重试')
    } finally {
      setIsSubmitting(false)
    }
  }

  // 修复：使用 useEffect 替代渲染阶段直接 setState（避免无限重渲染）
  useEffect(() => {
    if (user && !formData.name && !formData.email) {
      setFormData(prev => ({
        ...prev,
        name: user.displayName || '',
        email: user.email || ''
      }))
    }
  }, [user, formData.name, formData.email])

  return (
    <div className="max-w-4xl mx-auto">
      {/* 表单说明 */}
      <div className="text-center mb-12">
        <h2 className="font-serif-cn text-3xl font-bold text-ancient-brown mb-4">
          联系我们
        </h2>
        <p className="text-gray-600 mb-2">
          我们重视每一位用户的反馈和建议，期待与您交流
        </p>
        <p className="text-sm text-gray-500">
          我们将在24小时内回复您的咨询
        </p>
      </div>

      {/* 表单卡片 */}
      <div className="contact-card bg-gradient-to-br from-warm-beige to-white/90 rounded-xl p-8 border border-ancient-brown/10 shadow-lg">
        
        {/* 成功消息 */}
        {isSubmitted && (
          <div className="mb-8 p-4 bg-health-green/20 border border-health-green/30 rounded-lg animate-fade-in">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-health-green rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-health-green">感谢您的联系！</h4>
                <p className="text-sm text-gray-600">我们已经收到您的消息，将尽快处理并回复。</p>
              </div>
            </div>
          </div>
        )}

        {/* 错误消息 */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg animate-fade-in">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-500 text-xl">⚠️</span>
              </div>
              <div>
                <h4 className="font-semibold text-red-600">提交失败</h4>
                <p className="text-sm text-gray-600">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* 用户状态提示 */}
        {user && (
          <div className="mb-8 p-4 bg-sky-blue/10 border border-sky-blue/20 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-sky-blue rounded-full flex items-center justify-center">
                <span className="text-white text-sm">已登录</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  您已登录为 <span className="font-medium text-sky-blue">{user.email}</span>，我们将根据此邮箱与您联系。
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 联系表单 */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* 联系类型选择 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              请选择联系类型 *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {contactTypes.map((type) => (
                <label
                  key={type.value}
                  className={`contact-type-option relative cursor-pointer ${
                    formData.contactType === type.value 
                      ? 'bg-ancient-brown text-white' 
                      : 'bg-white border border-gray-200 hover:border-ancient-brown'
                  } p-4 rounded-lg text-center transition-all duration-300`}
                >
                  <input
                    type="radio"
                    name="contactType"
                    value={type.value}
                    checked={formData.contactType === type.value}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className="text-2xl mb-2">{type.icon}</div>
                  <span className="text-sm font-medium">{type.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 姓名和邮箱 */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                姓名 *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="请输入您的姓名"
                className="form-input w-full px-4 py-3 rounded-lg"
                required
                disabled={!!user?.displayName}
              />
              {user?.displayName && (
                <p className="text-xs text-gray-500 mt-1">已从您的账户信息自动填充</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                邮箱 *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="请输入您的邮箱"
                className="form-input w-full px-4 py-3 rounded-lg"
                required
                disabled={!!user?.email}
              />
              {user?.email && (
                <p className="text-xs text-gray-500 mt-1">已从您的账户信息自动填充</p>
              )}
            </div>
          </div>

          {/* 主题 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              主题 *
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="请简要说明您联系的目的"
              className="form-input w-full px-4 py-3 rounded-lg"
              required
            />
          </div>

          {/* 消息内容 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              详细内容 *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="请详细描述您的问题、建议或合作意向..."
              rows={6}
              className="form-input w-full px-4 py-3 rounded-lg resize-none"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              请尽量详细描述，以便我们更好地为您服务（不少于50字）
            </p>
          </div>

          {/* 提交按钮 */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-lg font-medium text-lg transition-all duration-300 ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'btn-primary hover:translate-y-[-2px] hover:shadow-xl'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></span>
                  提交中...
                </span>
              ) : (
                '发送消息'
              )}
            </button>
          </div>
        </form>

        {/* 联系信息 */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h4 className="font-serif-cn text-lg font-semibold text-ancient-brown mb-4">
            其他联系方式
          </h4>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-ancient-brown/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">📧</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">电子邮箱</p>
                <p className="text-sm text-gray-600">contact@douxiangchuan.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-health-green/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">📞</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">联系电话</p>
                <p className="text-sm text-gray-600">+86 10 8888 9999</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-sky-blue/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">📍</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">办公地址</p>
                <p className="text-sm text-gray-600">北京市朝阳区文化创意园区</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

