# 📦 دليل التثبيت والتشغيل

## 📋 المتطلبات

### الحد الأدنى
- ✅ متصفح حديث (Chrome 90+, Edge 90+, Safari 14+)
- ✅ اتصال بالإنترنت (لتحميل Tailwind CSS)
- ✅ لا توجد متطلبات أخرى!

### الموصى به
- 🌟 Google Chrome (أفضل دعم للنطق العربي)
- 🌟 سماعات أو سماعات رأس
- 🌟 شاشة 1024x768 أو أكبر

## 🚀 طرق التثبيل

### الطريقة 1: التشغيل المباشر (الأسهل)

#### للمستخدمين العاديين:
1. قم بتحميل المشروع
2. افتح ملف `index.html` في متصفح Chrome
3. ابدأ اللعب!

```bash
# لا حاجة لأي أوامر - فقط افتح الملف
```

### الطريقة 2: استخدام خادم محلي

#### باستخدام Python 3
```bash
# افتح Terminal/Command Prompt في مجلد المشروع
cd path/to/prof

# شغّل الخادم
python -m http.server 8000

# افتح المتصفح وانتقل إلى:
# http://localhost:8000
```

#### باستخدام Python 2
```bash
python -m SimpleHTTPServer 8000
```

#### باستخدام Node.js
```bash
# ثبّت serve (مرة واحدة فقط)
npm install -g serve

# شغّل الخادم
serve

# أو على منفذ محدد
serve -l 8000
```

#### باستخدام PHP
```bash
php -S localhost:8000
```

#### باستخدام Live Server (VS Code)
1. ثبّت إضافة "Live Server" في VS Code
2. انقر بزر الماوس الأيمن على `index.html`
3. اختر "Open with Live Server"

### الطريقة 3: النشر على الإنترنت

#### GitHub Pages (مجاني)
```bash
# 1. أنشئ مستودع على GitHub
# 2. ارفع الملفات

git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/repo.git
git push -u origin main

# 3. في إعدادات المستودع:
# Settings → Pages → Source: main branch → Save

# 4. الموقع سيكون على:
# https://username.github.io/repo/
```

#### Netlify (مجاني)
1. اذهب إلى [netlify.com](https://www.netlify.com)
2. اسحب مجلد المشروع إلى Netlify Drop
3. انتهى! سيعطيك رابطاً

أو عبر Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy
```

#### Vercel (مجاني)
```bash
npm install -g vercel
vercel
```

#### Firebase Hosting (مجاني)
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## 🖥️ تثبيت للمطورين

### استنساخ المشروع
```bash
# عبر HTTPS
git clone https://github.com/username/arabic-letters-learning-game.git

# أو عبر SSH
git clone git@github.com:username/arabic-letters-learning-game.git

# انتقل للمجلد
cd arabic-letters-learning-game
```

### فتح في محرر الكود
```bash
# VS Code
code .

# Sublime Text
subl .

# Atom
atom .
```

### هيكل المشروع بعد التثبيت
```
arabic-letters-learning-game/
│
├── index.html              ← الصفحة الرئيسية
├── game.html               ← صفحة اللعبة
├── README.md
├── GUIDE.md
├── INSTALLATION.md
├── CHANGELOG.md
├── CONTRIBUTING.md
├── LICENSE
├── package.json
├── .gitignore
│
├── js/
│   ├── data.js            ← بيانات التحديات
│   ├── audio.js           ← نظام الصوت
│   ├── challenges.js      ← منطق التحديات
│   └── main.js            ← التحكم الرئيسي
│
└── assets/
    ├── images/
    │   └── README.md
    └── sounds/
        └── README.md
```

## ✅ التحقق من التثبيت

### اختبار 1: فتح الصفحة
- افتح `index.html`
- يجب أن ترى الصفحة الرئيسية مع التصميم الجميل
- إذا رأيت صفحة بيضاء، تحقق من اتصالك بالإنترنت

### اختبار 2: الأصوات
- انقر على "اسمع عرض المشروع"
- يجب أن تسمع صوتاً
- إذا لم تسمع:
  - تحقق من مستوى الصوت
  - تحقق من أن المتصفح يسمح بالصوت
  - جرب Chrome أو Edge

### اختبار 3: البدء باللعبة
- انقر "ابدأ اللعبة"
- يجب أن تنتقل لصفحة اللعبة
- إذا لم يحدث شيء:
  - افتح Console (F12) وتحقق من الأخطاء
  - تأكد من وجود ملف `game.html`

### اختبار 4: التحديات
- جرب أحد التحديات
- انقر على إجابة
- يجب أن ترى رسالة تشجيع
- إذا لم يحدث:
  - تحقق من Console
  - تأكد من وجود ملفات JavaScript

## 🐛 حل المشاكل الشائعة

### المشكلة: الصفحة تظهر بدون تنسيق
**الحل:**
1. تحقق من الاتصال بالإنترنت
2. تأكد من تحميل Tailwind CSS:
   ```html
   <link href="https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
   ```
3. امسح Cache وأعد تحميل الصفحة (Ctrl+Shift+R)

### المشكلة: الأصوات لا تعمل
**الحل:**
1. جرب Chrome أو Edge
2. تحقق من إعدادات الصوت:
   - انقر على أيقونة القفل بجانب URL
   - تأكد من السماح بالصوت
3. انقر في أي مكان في الصفحة أولاً (بعض المتصفحات تتطلب تفاعل)

### المشكلة: JavaScript لا يعمل
**الحل:**
1. افتح Console (F12)
2. تحقق من الأخطاء
3. تأكد من وجود جميع ملفات JS:
   - `js/data.js`
   - `js/audio.js`
   - `js/challenges.js`
   - `js/main.js`

### المشكلة: النطق العربي غير واضح
**الحل:**
1. استخدم Chrome (أفضل دعم للعربية)
2. في `js/audio.js`، جرب تغيير:
   ```javascript
   utterance.lang = 'ar-SA'; // جرب ar-EG أو ar-AE
   utterance.rate = 0.85;    // جرب 0.7 أو 0.9
   utterance.pitch = 1.1;    // جرب 1.0 أو 1.2
   ```

### المشكلة: LocalStorage لا يحفظ التقدم
**الحل:**
1. تأكد من عدم استخدام وضع التصفح الخاص
2. تحقق من إعدادات المتصفح للسماح بالتخزين المحلي
3. جرب مسح البيانات والبدء من جديد:
   - F12 → Application → Local Storage → امسح

### المشكلة: التصميم لا يتجاوب على الهاتف
**الحل:**
1. تأكد من وجود meta tag:
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   ```
2. امسح Cache على الهاتف
3. جرب Refresh (سحب للأسفل)

## 📱 التثبيت على الأجهزة المحمولة

### iOS (iPhone/iPad)
1. افتح الموقع في Safari
2. انقر على أيقونة المشاركة
3. اختر "Add to Home Screen"
4. الآن يمكن فتح اللعبة كتطبيق!

### Android
1. افتح الموقع في Chrome
2. انقر على القائمة (3 نقاط)
3. اختر "Add to Home screen"
4. انتهى!

## 🔧 إعدادات متقدمة

### تغيير المنفذ (Port)
```bash
# Python
python -m http.server 3000

# Node.js serve
serve -l 3000
```

### تفعيل HTTPS محلياً
```bash
# باستخدام mkcert (آمن)
mkcert -install
mkcert localhost
serve --ssl-cert localhost.pem --ssl-key localhost-key.pem
```

### استخدام Docker
```dockerfile
# Dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
```

```bash
# بناء وتشغيل
docker build -t arabic-game .
docker run -p 8080:80 arabic-game
```

## 📊 متطلبات الأداء

### الحد الأدنى
- معالج: 1 GHz
- ذاكرة: 512 MB RAM
- مساحة: 10 MB فارغة
- اتصال: 1 Mbps (لتحميل Tailwind أول مرة)

### الموصى به
- معالج: 2 GHz+
- ذاكرة: 2 GB RAM
- مساحة: 50 MB
- اتصال: 5 Mbps+

## 🌐 دعم المتصفحات

| المتصفح | الإصدار الأدنى | النطق العربي | ملاحظات |
|---------|----------------|---------------|----------|
| Chrome | 90+ | ✅ ممتاز | موصى به |
| Edge | 90+ | ✅ ممتاز | موصى به |
| Safari | 14+ | ✅ جيد | يعمل جيداً |
| Firefox | 88+ | ⚠️ محدود | النطق ضعيف |
| Opera | 76+ | ✅ جيد | يعمل |

## 📞 الدعم الفني

واجهتك مشكلة؟
1. تحقق من [README.md](README.md)
2. راجع [GUIDE.md](GUIDE.md)
3. افتح Issue على GitHub
4. راسلنا على: support@example.com

---

<div align="center">

**🎓 استمتع بالتعلم!**

إذا واجهتك أي مشكلة، لا تتردد في طلب المساعدة

</div>

