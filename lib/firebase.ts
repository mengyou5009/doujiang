import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// 1. 定义 Firebase 配置
// 注意：必须使用静态访问 process.env.XXX，不能使用变量动态访问 process.env[xxx]
// 这样 Next.js 才能在构建时将其替换为实际值
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// 2. 验证关键配置是否存在
// 在这里检查对象的值，而不是 process.env
if (!firebaseConfig.apiKey) {
  // 这里的错误信息会更明确地指出是哪个具体字段缺失
  // 但为了调试，我们可以打印所有关键配置看是否为 undefined
  console.error("Firebase Config Check:", firebaseConfig);
  throw new Error(
    "Firebase configuration is missing. Please check your .env.local file and ensure all NEXT_PUBLIC_ variables are set, then restart the dev server."
  );
}

// 3. 初始化 Firebase App（避免重复初始化）
// getApps() 检查对于 Next.js 的热重载非常重要
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// 4. 导出 Firebase 服务
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
