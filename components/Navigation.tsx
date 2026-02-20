// components/Navigation.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'

export default function Navigation() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout, loading } = useAuth()

  const navLinks = [
    { href: '/', label: '首页' },
    { href: '/culture', label: '文化溯源' },
    { href: '/encyclopedia', label: '知豆百科' },
    { href: '/workshop', label: '巧手工坊' },
    { href: '/about', label: '关于我们' },
  ]

  const [avatarError, setAvatarError] = useState(false)

  // 显示加载状态
  if (loading) {
    return (
      <nav className="fixed top-0 w-full z-50 backdrop-blur-sm bg-warm-beige/95 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="h-10 w-10 relative">
                <Image
                  src="/resources/logo.png"
                  alt="豆香传 Logo"
                  fill
                  sizes="40px"
                  priority
                  className="object-contain"
                />
              </div>
              <span className="font-serif-cn text-2xl font-bold text-ancient-brown">豆香传</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-ancient-brown"></div>
                <span className="text-xs text-gray-500">验证中</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-sm bg-warm-beige/95 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="h-10 w-10 relative">
              <Image
                src="/resources/logo.png"
                alt="豆香传 Logo"
                fill
                sizes="40px"
                priority
                className="object-contain"
              />
            </div>
            <span className="font-serif-cn text-2xl font-bold text-ancient-brown">豆香传</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link font-medium transition-colors relative after:absolute after:bottom-[-5px] after:left-1/2 after:h-[2px] after:bg-ancient-brown after:transition-all after:duration-300 after:transform after:-translate-x-1/2 hover:text-ancient-brown ${
                  pathname === link.href
                    ? 'text-ancient-brown after:w-full'
                    : 'text-gray-700 hover:after:w-full after:w-0'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 md:space-x-4">
            
            {/* Language Switcher (Desktop) */}
            <div className="hidden md:flex items-center space-x-1">
              <button className="px-2 py-1 text-sm font-medium text-ancient-brown hover:bg-white/50 rounded-md transition-colors">
                简体
              </button>
              <button className="px-2 py-1 text-sm font-medium text-gray-500 hover:text-ancient-brown hover:bg-white/30 rounded-md transition-colors">
                EN
              </button>
            </div>

            {/* Auth Section */}
            {user ? (
              <div className="flex items-center space-x-3">
                {/* Desktop User Info */}
                <div className="hidden md:flex items-center space-x-3">
                  {user.photoURL && !avatarError ? (
                    <div className="w-8 h-8 relative">
                      <Image
                        src={user.photoURL}
                        alt={`${user.displayName || '用户'}的头像`}
                        fill
                        sizes="32px"
                        className="rounded-full object-cover border border-ancient-brown/20"
                        loading="lazy"
                        onError={() => setAvatarError(true)}
                      />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-ancient-brown rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">用</span>
                    </div>
                  )}
                  <div className="text-right">
                    <p className="text-sm font-medium text-ancient-brown truncate max-w-[120px]">
                      {user.displayName || '用户'}
                    </p>
                  </div>
                </div>
                
                {/* Logout Button */}
                <button
                  onClick={logout}
                  className="px-3 py-1.5 rounded-lg font-medium text-sm border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300 hover:border-ancient-brown hover:text-ancient-brown"
                >
                  <span className="hidden md:inline">退出</span>
                  <svg className="w-5 h-5 md:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            ) : (
              /* Login Button */
              <Link
                href="/login"
                className="btn-primary px-4 py-2 rounded-lg font-medium text-sm bg-ancient-brown text-white hover:bg-ancient-brown/90 transition-all duration-300"
              >
                登录
              </Link>
            )}

            {/* Mobile Menu Button - 修复：提取到最外层，始终显示 */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-white/30 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label="切换菜单"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6 text-ancient-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-ancient-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - 修复：去掉 !user 条件，允许已登录用户查看 */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-3 rounded-md text-base font-medium ${
                    pathname === link.href
                      ? 'bg-ancient-brown/10 text-ancient-brown'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-ancient-brown'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Language Switcher for Mobile */}
              <div className="flex space-x-2 px-3 py-3">
                <button className="flex-1 py-2 text-sm font-medium text-ancient-brown border border-ancient-brown rounded-md">
                  简体
                </button>
                <button className="flex-1 py-2 text-sm font-medium text-gray-500 border border-gray-300 rounded-md hover:text-ancient-brown hover:border-ancient-brown">
                  EN
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
