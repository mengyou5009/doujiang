// 豆香传 - 主要JavaScript交互逻辑

// 全局变量
let currentQuizQuestion = 1;
let quizAnswers = {};
let nutritionChart = null;

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

// 初始化页面
function initializePage() {
    // 根据当前页面初始化特定功能
    const currentPage = getCurrentPage();
    
    switch(currentPage) {
        case 'index':
            initializeLoginPage();
            break;
        case 'culture':
            initializeCulturePage();
            break;
        case 'encyclopedia':
            initializeEncyclopediaPage();
            break;
        case 'workshop':
            initializeWorkshopPage();
            break;
    }
    
    // 通用初始化
    initializeScrollEffects();
    initializeScrollToTop();

    // 新增：检查登录状态
    checkLoginStatus();
}

// 获取当前页面
function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('login.html')) return 'login';
    if (path.includes('culture.html')) return 'culture';
    if (path.includes('encyclopedia.html')) return 'encyclopedia';
    if (path.includes('workshop.html')) return 'workshop';
    if (path.includes('about.html')) return 'about';
    return 'index';
}

// ==================== 登录页面功能 ====================

function initializeLoginPage() {
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

// --- 新增：获取 Google 登录按钮 --- 
    const socialBtns = document.querySelectorAll('.social-btn');
    if (socialBtns.length >= 2) {
        const googleBtn = socialBtns[1]; // 红色那个按钮
        googleBtn.addEventListener('click', handleGoogleLogin);
    }

    
    if (loginTab && registerTab) {
        loginTab.addEventListener('click', () => switchTab('login'));
        registerTab.addEventListener('click', () => switchTab('register'));
    }
    
    // 保持原有表单提交防止报错，或者提示用户使用Google登录
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('请点击下方红色 Google 按钮进行验证登录', 'warning');
        });
    }

    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
}

// --- 新增：处理 Google 登录逻辑 ---
function handleGoogleLogin(event) {
    event.preventDefault(); // 防止按钮默认提交行为
    
    if (!window.auth || !window.signInWithPopup || !window.googleProvider) {
        showNotification('系统初始化中，请稍后再试', 'error');
        return;
    }

    showNotification('正在连接 Google 安全登录...', 'info');

    window.signInWithPopup(window.auth, window.googleProvider)
        .then((result) => {
            // 登录成功
            const user = result.user;
            console.log("登录成功用户:", user);
            
            // 保存部分用户信息到 localStorage 以便跨页面显示（简单的状态保持）
            localStorage.setItem('user_email', user.email);
            localStorage.setItem('user_name', user.displayName);
            localStorage.setItem('user_photo', user.photoURL);
            localStorage.setItem('is_logged_in', 'true');

            showNotification(`欢迎回来，${user.displayName}！`, 'success');
            
            setTimeout(() => {
                window.location.href = 'index.html'; // 跳转回首页
            }, 1500);
        })
        .catch((error) => {
            // 处理错误
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("登录错误:", errorCode, errorMessage);
            
            if (errorCode === 'auth/popup-closed-by-user') {
                showNotification('登录已取消', 'warning');
            } else {
                showNotification('登录失败: ' + errorMessage, 'error');
            }
        });
}

// 切换登录/注册标签
function switchTab(tab) {
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (tab === 'login') {
        loginTab.className = 'flex-1 py-3 px-4 rounded-md font-medium text-center transition-all duration-300 bg-ancient-brown text-white';
        registerTab.className = 'flex-1 py-3 px-4 rounded-md font-medium text-center transition-all duration-300 text-ancient-brown hover:text-white';
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
    } else {
        registerTab.className = 'flex-1 py-3 px-4 rounded-md font-medium text-center transition-all duration-300 bg-ancient-brown text-white';
        loginTab.className = 'flex-1 py-3 px-4 rounded-md font-medium text-center transition-all duration-300 text-ancient-brown hover:text-white';
        registerForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
    }
}

// 处理登录
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // 模拟登录逻辑
    showNotification('登录成功！欢迎回到豆香传！', 'success');
    setTimeout(() => {
        window.location.href = 'home.html';
    }, 1500);
}

// 处理注册
function handleRegister(event) {
    event.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // 验证密码
    if (password !== confirmPassword) {
        showNotification('两次输入的密码不一致，请检查后重试。', 'error');
        return;
    }
    
    if (password.length < 6) {
        showNotification('密码长度至少为6位，请重新设置。', 'error');
        return;
    }
    
    // 模拟注册逻辑
    showNotification('注册成功！欢迎加入豆香传大家庭！', 'success');
    setTimeout(() => {
        switchTab('login');
    }, 1500);
}

// ==================== 文化页面功能 ====================

function initializeCulturePage() {
    // 初始化时间轴动画
    animateTimeline();
}

// 时间轴动画
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.3
    });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// 切换时间轴详情
function toggleTimelineDetails(element) {
    const details = element.querySelector('.timeline-details');
    const marker = element.parentElement.querySelector('.timeline-marker');
    
    if (details.classList.contains('show')) {
        details.classList.remove('show');
        marker.classList.remove('active');
    } else {
        // 关闭其他详情
        document.querySelectorAll('.timeline-details.show').forEach(item => {
            item.classList.remove('show');
        });
        document.querySelectorAll('.timeline-marker.active').forEach(item => {
            item.classList.remove('active');
        });
        
        // 打开当前详情
        details.classList.add('show');
        marker.classList.add('active');
    }
}

// 滚动到顶部
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 初始化滚动到顶部按钮
function initializeScrollToTop() {
    const scrollBtn = document.querySelector('.scroll-to-top');
    if (!scrollBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
}

// ==================== 百科页面功能 ====================

function initializeEncyclopediaPage() {
    initializeNutritionChart();
    initializeQuiz();
}

// 初始化营养图表
function initializeNutritionChart() {
    const ctx = document.getElementById('nutritionChart');
    if (!ctx) return;
    
    nutritionChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['蛋白质', '钙', '铁', '维生素B1', '维生素E', '异黄酮'],
            datasets: [{
                label: '黄豆',
                data: [95, 60, 70, 80, 85, 90],
                backgroundColor: 'rgba(166, 123, 91, 0.2)',
                borderColor: 'rgba(166, 123, 91, 1)',
                borderWidth: 2
            }, {
                label: '黑豆',
                data: [85, 55, 85, 75, 90, 95],
                backgroundColor: 'rgba(143, 188, 143, 0.2)',
                borderColor: 'rgba(143, 188, 143, 1)',
                borderWidth: 2
            }, {
                label: '青豆',
                data: [80, 45, 60, 90, 75, 70],
                backgroundColor: 'rgba(135, 206, 235, 0.2)',
                borderColor: 'rgba(135, 206, 235, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// 展开健康专题
function expandHealthTopic(element) {
    const details = element.querySelector('.health-details');
    const button = element.querySelector('button');
    
    if (details.classList.contains('hidden')) {
        details.classList.remove('hidden');
        button.textContent = '收起详情 ←';
    } else {
        details.classList.add('hidden');
        button.textContent = '查看详情 →';
    }
}

// 初始化体质测试
function initializeQuiz() {
    // 测试已在HTML中初始化
}

// 选择测试选项
function selectOption(element, value) {
    // 移除同一问题的其他选项
    const questionContainer = element.closest('.quiz-container');
    questionContainer.querySelectorAll('.quiz-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // 选中当前选项
    element.classList.add('selected');
    
    // 保存答案
    quizAnswers[currentQuizQuestion] = value;
    
    // 启用下一题按钮
    const nextBtn = document.getElementById(`nextBtn${currentQuizQuestion}`);
    if (nextBtn) {
        nextBtn.disabled = false;
        nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
}

// 下一题
function nextQuestion(questionNum) {
    const currentQuestion = document.getElementById(`question${questionNum}`);
    const nextQuestion = document.getElementById(`question${questionNum + 1}`);
    
    if (nextQuestion) {
        currentQuestion.classList.remove('active');
        nextQuestion.classList.add('active');
        currentQuizQuestion = questionNum + 1;
        
        // 更新进度
        updateQuizProgress();
    }
}

// 更新测试进度
function updateQuizProgress() {
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    if (progressBar && progressText) {
        const progress = (currentQuizQuestion / 5) * 100;
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${currentQuizQuestion}/5`;
    }
}

// 显示测试结果
function showResult() {
    const question5 = document.getElementById('question5');
    const result = document.getElementById('result');
    const resultContent = document.getElementById('resultContent');
    
    if (question5 && result && resultContent) {
        question5.classList.remove('active');
        result.classList.add('active');
        
        // 根据答案生成推荐
        const recommendation = generateRecommendation();
        resultContent.innerHTML = recommendation;
        
        // 更新进度到100%
        const progressBar = document.getElementById('progressBar');
        const progressText = document.getElementById('progressText');
        if (progressBar && progressText) {
            progressBar.style.width = '100%';
            progressText.textContent = '5/5';
        }
    }
}

// 生成推荐
function generateRecommendation() {
    const answers = quizAnswers;
    let recommendation = '';
    
    // 简单的推荐逻辑
    if (answers[1] === 'cold' && answers[3] === 'poor') {
        recommendation = `
            <div class="text-center">
                <h4 class="font-serif-cn text-xl font-semibold text-ancient-brown mb-3">推荐：红枣桂圆豆浆</h4>
                <p class="text-gray-600 mb-4">根据您的体质特点，这款温性豆浆最适合您：</p>
                <ul class="text-sm text-gray-600 text-left space-y-2 mb-4">
                    <li>• 主料：黄豆 + 红枣 + 桂圆</li>
                    <li>• 功效：温补气血，改善睡眠</li>
                    <li>• 建议：早晨饮用，每周3-4次</li>
                </ul>
                <p class="text-xs text-health-green">这款配方有助于改善您的体质，让您更健康！</p>
            </div>
        `;
    } else if (answers[1] === 'hot' && answers[4] === 'sensitive') {
        recommendation = `
            <div class="text-center">
                <h4 class="font-serif-cn text-xl font-semibold text-ancient-brown mb-3">推荐：绿豆百合豆浆</h4>
                <p class="text-gray-600 mb-4">这款清凉豆浆非常适合您的体质：</p>
                <ul class="text-sm text-gray-600 text-left space-y-2 mb-4">
                    <li>• 主料：绿豆 + 百合 + 黄豆</li>
                    <li>• 功效：清热解毒，养胃健脾</li>
                    <li>• 建议：下午饮用，每周2-3次</li>
                </ul>
                <p class="text-xs text-sky-blue">这款配方能帮助您调节体质，更加舒适！</p>
            </div>
        `;
    } else {
        recommendation = `
            <div class="text-center">
                <h4 class="font-serif-cn text-xl font-semibold text-ancient-brown mb-3">推荐：经典黄豆豆浆</h4>
                <p class="text-gray-600 mb-4">这是最适合大众的经典配方：</p>
                <ul class="text-sm text-gray-600 text-left space-y-2 mb-4">
                    <li>• 主料：优质黄豆</li>
                    <li>• 功效：均衡营养，增强体质</li>
                    <li>• 建议：每日早晨饮用</li>
                </ul>
                <p class="text-xs text-lemon-yellow">这是最经典的配方，适合您的日常保健！</p>
            </div>
        `;
    }
    
    return recommendation;
}

// 重新开始测试
function restartQuiz() {
    currentQuizQuestion = 1;
    quizAnswers = {};
    
    // 重置所有问题
    for (let i = 1; i <= 5; i++) {
        const question = document.getElementById(`question${i}`);
        if (question) {
            question.classList.remove('active');
        }
        
        // 重置选项
        const options = document.querySelectorAll(`#question${i} .quiz-option`);
        options.forEach(option => {
            option.classList.remove('selected');
        });
        
        // 重置按钮
        const nextBtn = document.getElementById(`nextBtn${i}`);
        if (nextBtn) {
            nextBtn.disabled = true;
            nextBtn.classList.add('opacity-50', 'cursor-not-allowed');
        }
    }
    
    // 显示第一题
    const question1 = document.getElementById('question1');
    const result = document.getElementById('result');
    if (question1 && result) {
        result.classList.remove('active');
        question1.classList.add('active');
    }
    
    // 重置进度
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    if (progressBar && progressText) {
        progressBar.style.width = '0%';
        progressText.textContent = '0/5';
    }
}

// ==================== 工坊页面功能 ====================

function initializeWorkshopPage() {
    // 工坊页面初始化
}

// 筛选教程
function filterTutorials(category) {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const tutorialItems = document.querySelectorAll('.tutorial-item');
    
    // 更新按钮状态
    filterBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // 筛选内容
    tutorialItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// 筛选作品
function filterWorks(category) {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const workItems = document.querySelectorAll('.masonry-item');
    
    // 更新按钮状态
    filterBtns.forEach(btn => {
        if (btn.onclick && btn.onclick.toString().includes('filterWorks')) {
            btn.classList.remove('active');
        }
    });
    event.target.classList.add('active');
    
    // 这里可以添加更复杂的筛选逻辑
    showNotification(`已切换到${category === 'all' ? '全部' : category === 'latest' ? '最新' : '热门'}作品`, 'info');
}

// 显示教程详情
function showTutorialDetail(type) {
    showNotification(`${type === 'basic' ? '基础' : type === 'creative' ? '创意' : '衍生'}教程详情即将推出，敬请期待！`, 'info');
}

// 切换点赞状态
function toggleLike(button) {
    const isLiked = button.classList.contains('liked');
    const countSpan = button.querySelector('span:last-child');
    let count = parseInt(countSpan.textContent);
    
    if (isLiked) {
        button.classList.remove('liked');
        count--;
    } else {
        button.classList.add('liked');
        count++;
    }
    
    countSpan.textContent = count;
}

// ==================== 关于我们页面功能 ====================

function submitContactForm(event) {
    event.preventDefault();
    showNotification('消息发送成功！我们会尽快回复您。', 'success');
    event.target.reset();
}

// ==================== 通用功能 ====================

// 显示通知
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform translate-x-full transition-transform duration-300`;
    
    // 根据类型设置样式
    switch(type) {
        case 'success':
            notification.classList.add('bg-green-500', 'text-white');
            break;
        case 'error':
            notification.classList.add('bg-red-500', 'text-white');
            break;
        case 'warning':
            notification.classList.add('bg-yellow-500', 'text-white');
            break;
        default:
            notification.classList.add('bg-blue-500', 'text-white');
    }
    
    notification.innerHTML = `
        <div class="flex items-center justify-between">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // 自动隐藏
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// 显示登录提示
function showLoginPrompt() {
    showNotification('请先登录后使用此功能', 'warning');
}

// 初始化滚动效果
function initializeScrollEffects() {
    const elements = document.querySelectorAll('.fade-in, .slide-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });
}

// 工具函数：防抖
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 工具函数：节流
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// 在 main.js 中添加这个函数，用于检查登录状态并更新导航栏
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('is_logged_in');
    const userPhoto = localStorage.getItem('user_photo');
    const userName = localStorage.getItem('user_name');

    // 我们可以通过查找包含 "登录" 链接的容器来定位
    const loginLink = document.querySelector('a[href="login.html"]');
    
    if (isLoggedIn === 'true' && loginLink) {
        const userContainer = loginLink.parentElement;
        
        // 移除登录按钮
        loginLink.style.display = 'none';
        
        // 创建已登录的 UI (头像 + 退出按钮)
        const userInfoHtml = `
            <div class="flex items-center space-x-3">
                <img src="${userPhoto || './resources/logo.png'}" alt="${userName}" class="h-8 w-8 rounded-full border border-ancient-brown" title="${userName}">
                <button onclick="handleLogout()" class="text-sm font-medium text-gray-600 hover:text-ancient-brown transition-colors">
                    退出
                </button>
            </div>
        `;
        
        // 插入新 UI
        const div = document.createElement('div');
        div.innerHTML = userInfoHtml;
        userContainer.appendChild(div.firstElementChild);
    }
}
// --- 新增：处理退出登录 ---
window.handleLogout = function() {
    // 清除本地存储
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_photo');
    localStorage.removeItem('is_logged_in');
    
    // 如果有 Firebase auth 实例，也调用 signout
    if (window.auth) {
        window.auth.signOut();
    }
    
    showNotification('您已安全退出', 'success');
    setTimeout(() => {
        window.location.reload(); // 刷新页面重置 UI
    }, 1000);
}

// 导出函数供全局使用（如果需要）
window.switchTab = switchTab;
window.toggleTimelineDetails = toggleTimelineDetails;
window.scrollToTop = scrollToTop;
window.expandHealthTopic = expandHealthTopic;
window.selectOption = selectOption;
window.nextQuestion = nextQuestion;
window.showResult = showResult;
window.restartQuiz = restartQuiz;
window.filterTutorials = filterTutorials;
window.filterWorks = filterWorks;
window.showTutorialDetail = showTutorialDetail;
window.toggleLike = toggleLike;
window.submitContactForm = submitContactForm;
window.showLoginPrompt = showLoginPrompt;