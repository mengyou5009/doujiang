'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { 
  onAuthStateChanged, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut,
  User 
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

// 定义 AuthContextType 接口
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
}

// 创建上下文并设置默认值
const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  loading: true, 
  login: async () => {},
  logout: async () => {},
  error: null
});

// AuthProvider 组件
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 监听认证状态变化
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth, 
      (user) => {
        setUser(user);
        setLoading(false);
        setError(null);
      },
      (error) => {
        console.error('认证状态监听错误:', error);
        setError('认证状态检查失败');
        setLoading(false);
      }
    );

    // 组件卸载时取消监听
    return () => unsubscribe();
  }, []);

  // 登录方法（Google 弹窗登录）
  const login = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account' // 强制选择账号
      });
      await signInWithPopup(auth, provider);
      setLoading(false); // 登录成功后结束 loading
    } catch (error: any) {
      console.error('登录失败:', error);
      setError(error.message || '登录失败，请稍后重试');
      setLoading(false); // 登录失败后结束 loading
    }
  }, []);

  // 登出方法
  const logout = useCallback(async () => {
    try {
      setLoading(true); // 登出开始时设置 loading
      await signOut(auth);
      setError(null);
      setLoading(false); // 登出成功后结束 loading
    } catch (error: any) {
      console.error('登出失败:', error);
      setError(error.message || '登出失败，请稍后重试');
      setLoading(false); // 登出失败后结束 loading
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

// 自定义 Hook 用于获取认证上下文
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) { // 更严谨的判断（避免 undefined/null）
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

