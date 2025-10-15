# 📚 دليل المعلم والمطور

## للمعلمين والمعلمات 👨‍🏫👩‍🏫

### كيفية استخدام المشروع في الفصل

#### 1. الإعداد الأولي
- افتح `index.html` في متصفح Google Chrome
- تأكد من وجود صوت في الجهاز
- اختبر اللعبة مرة قبل عرضها على الأطفال

#### 2. طريقة التدريس المقترحة

**الجلسة الأولى (30 دقيقة)**
- ابدأ بالصفحة الرئيسية
- اضغط "اسمع عرض المشروع" مع الأطفال
- شرح بسيط عن نظام النقاط
- ابدأ التدريبات البصرية

**الجلسة الثانية (45 دقيقة)**
- مراجعة سريعة للتدريبات البصرية
- البدء بحرف الباء
- التركيز على نطق الحرف
- حل التحديات خطوة بخطوة

**الجلسة الثالثة (45 دقيقة)**
- حوار حرف الباء (تمثيل الأدوار)
- البدء بحرف الجيم
- المقارنة بين الحرفين
- تشجيع الأطفال على المشاركة

#### 3. نصائح للاستخدام الفعّال

✅ **افعل:**
- شجع الأطفال على الإجابة بصوت عالٍ
- احتفل بكل إجابة صحيحة
- اجعل الأطفال يتناوبون على الإجابة
- استخدم السبورة لتعزيز التعلم

❌ **لا تفعل:**
- لا تترك الأطفال بمفردهم لفترة طويلة
- لا تركز على الأخطاء بشكل سلبي
- لا تسرع في الانتقال بين التحديات
- لا تجبر الطفل على الإجابة

#### 4. تقييم التقدم

**مؤشرات النجاح:**
- يتعرف الطفل على الحرف
- ينطق الحرف بشكل صحيح
- يحدد موقع الحرف في الكلمة
- يكوّن كلمات بسيطة

**عند الحاجة لدعم إضافي:**
- كرر التحدي نفسه عدة مرات
- استخدم أمثلة واقعية من البيئة
- اطلب من الطفل رسم الحرف
- استخدم أدوات تعليمية إضافية

---

## للمطورين 👨‍💻👩‍💻

### بنية الكود

#### 1. نظام الوحدات (Modules)

```
js/
├── data.js         → البيانات الثابتة
├── audio.js        → المؤثرات الصوتية
├── challenges.js   → منطق التحديات
└── main.js         → التحكم الرئيسي
```

#### 2. تدفق البيانات (Data Flow)

```
data.js (البيانات)
    ↓
main.js (التحكم)
    ↓
challenges.js (عرض التحديات)
    ↓
audio.js (التفاعل الصوتي)
```

### إضافة حرف جديد

#### الخطوة 1: إضافة البيانات

في `js/data.js`:

```javascript
letterTaa: [
    {
        id: 'taa-challenge-1',
        type: 'multiple-choice',
        title: 'حرف التاء - التحدي الأول',
        description: 'اختر الكلمة التي تبدأ بحرف التاء',
        letter: 'ت',
        points: 10,
        question: 'أي كلمة تبدأ بحرف التاء؟',
        options: [
            { id: 1, text: 'تُفَّاح', audio: 'تُفَّاح', correct: true },
            { id: 2, text: 'بَرْتُقَال', audio: 'بَرْتُقَال', correct: false },
            { id: 3, text: 'مَوْز', audio: 'مَوْز', correct: false },
            { id: 4, text: 'عِنَب', audio: 'عِنَب', correct: false }
        ]
    },
    // أضف المزيد من التحديات...
],

// إضافة الحوار
letterTaaDialogue: {
    title: '🍎 حوار حرف التاء',
    characters: ['طفل', 'معلم'],
    dialogue: [
        { speaker: 'طفل', text: 'أريد تفاحة', highlight: 'ت' },
        { speaker: 'معلم', text: 'ت ت ت... تفاحة جميلة!', highlight: 'ت' }
    ],
    emoji: { 'طفل': '👦', 'معلم': '👨‍🏫' }
}
```

#### الخطوة 2: إضافة التحكم

في `js/main.js`، أضف دالة جديدة:

```javascript
// بدء تحديات حرف التاء
startLetterTaa() {
    this.currentSection = 'letterTaa';
    this.challengeQueue = [...challengesData.letterTaa];
    this.currentChallengeIndex = 0;
    this.loadNextChallenge();
}

// عرض حوار حرف التاء
showLetterTaaDialogue() {
    this.currentSection = 'letterTaaDialogue';
    const dialogue = challengesData.letterTaaDialogue;
    this.showDialogue(dialogue, () => {
        this.proceedToNextSection();
    });
}
```

#### الخطوة 3: تحديث التسلسل

في دالة `proceedToNextSection()`:

```javascript
} else if (this.currentSection === 'letterJeemDialogue') {
    this.showSectionComplete('حرف الجيم', () => {
        this.startLetterTaa(); // إضافة هنا
    });
} else if (this.currentSection === 'letterTaa') {
    this.showLetterTaaDialogue();
} else if (this.currentSection === 'letterTaaDialogue') {
    this.showFinalCongratulations();
}
```

### إضافة نوع تحدي جديد

#### مثال: تحدي الترتيب (Sorting)

في `js/challenges.js`:

```javascript
// في دالة renderChallenge()
case 'sorting':
    this.renderSorting(container);
    break;

// دالة جديدة
renderSorting(container) {
    container.innerHTML = `
        <div class="text-center max-w-3xl mx-auto">
            <h2 class="text-3xl font-bold text-purple-600 mb-4">
                ${this.currentChallenge.title}
            </h2>
            
            <div id="items-to-sort" class="flex gap-4 justify-center mb-8">
                ${this.currentChallenge.items.map(item => `
                    <div class="sortable-item bg-purple-200 text-2xl font-bold px-6 py-4 rounded-2xl cursor-move" 
                         draggable="true" 
                         data-order="${item.order}">
                        ${item.text}
                    </div>
                `).join('')}
            </div>
            
            <button id="check-sorting" class="bg-green-500 text-white text-xl font-bold py-4 px-8 rounded-2xl">
                تحقق ✓
            </button>
        </div>
    `;
    
    // منطق السحب والإفلات
    this.setupDragAndDrop();
}

setupDragAndDrop() {
    let draggedElement = null;
    
    const items = document.querySelectorAll('.sortable-item');
    
    items.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            draggedElement = e.target;
            audioManager.playDragSound();
        });
        
        item.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        
        item.addEventListener('drop', (e) => {
            e.preventDefault();
            if (draggedElement !== e.target) {
                const allItems = [...items];
                const draggedIndex = allItems.indexOf(draggedElement);
                const targetIndex = allItems.indexOf(e.target);
                
                if (draggedIndex < targetIndex) {
                    e.target.parentNode.insertBefore(draggedElement, e.target.nextSibling);
                } else {
                    e.target.parentNode.insertBefore(draggedElement, e.target);
                }
                
                audioManager.playDropSound();
            }
        });
    });
    
    document.getElementById('check-sorting').addEventListener('click', () => {
        const currentOrder = [...document.querySelectorAll('.sortable-item')]
            .map(item => parseInt(item.dataset.order));
        
        const correctOrder = currentOrder.slice().sort((a, b) => a - b);
        const isCorrect = JSON.stringify(currentOrder) === JSON.stringify(correctOrder);
        
        if (isCorrect) {
            this.handleCorrectAnswer();
        } else {
            this.handleWrongAnswer();
        }
    });
}
```

### تخصيص المؤثرات الصوتية

#### إضافة صوت مخصص

```javascript
// في audio.js
playCustomSound(frequency, duration, type = 'sine') {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
        0.01, 
        this.audioContext.currentTime + duration
    );

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
}
```

#### النطق الصوتي

```javascript
// يتم استخدام Web Speech API فقط - لا توجد ملفات صوتية
audioManager.speak('النص المراد نطقه');
```

### نصائح للأداء

#### 1. تحسين الصور
```javascript
// استخدم Lazy Loading للصور
<img src="image.jpg" loading="lazy" alt="وصف">
```

#### 2. تحسين الرسوم المتحركة
```css
/* استخدم transform و opacity للرسوم المتحركة السريعة */
.animate {
    transform: translateY(0);
    opacity: 1;
    transition: transform 0.3s, opacity 0.3s;
}
```

#### 3. تقليل حجم JavaScript
```javascript
// استخدم Debouncing للأحداث المتكررة
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}
```

### اختبار المشروع

#### الاختبار اليدوي
- ✅ جرّب كل تحدي
- ✅ اختبر على أجهزة مختلفة
- ✅ اختبر مع أطفال حقيقيين
- ✅ تحقق من الأصوات

#### الاختبار التلقائي (اختياري)
```javascript
// مثال بسيط للاختبار
function testChallenge(challengeId) {
    console.log(`Testing challenge: ${challengeId}`);
    
    // محاكاة الإجابة الصحيحة
    const correctOption = document.querySelector('[data-correct="true"]');
    if (correctOption) {
        correctOption.click();
        console.log('✓ Test passed');
    } else {
        console.error('✗ Test failed: No correct option found');
    }
}
```

### نشر المشروع

#### 1. على GitHub Pages
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin [repository-url]
git push -u origin main
```

ثم في إعدادات المستودع → Pages → اختر `main` branch

#### 2. على Netlify
- اسحب المجلد إلى Netlify Drop
- أو اربط مستودع GitHub

#### 3. على Vercel
```bash
npm i -g vercel
vercel
```

---

## الأسئلة الشائعة ❓

### للمعلمين

**س: كم طفلاً يمكن أن يستخدم اللعبة في نفس الوقت؟**
ج: طفل واحد لكل جهاز. يمكن استخدام عدة أجهزة في نفس الوقت.

**س: هل يمكن طباعة النتائج؟**
ج: حالياً لا، لكن يمكن أخذ لقطة شاشة للنتائج النهائية.

**س: كيف أعيد تعيين تقدم الطفل؟**
ج: افتح أدوات المطور (F12) → Application → Local Storage → احذف البيانات

### للمطورين

**س: كيف أضيف لغة أخرى للنطق؟**
ج: في `audio.js`، غيّر `utterance.lang = 'ar-SA'` إلى اللغة المطلوبة.

**س: كيف أغير مدة عرض الرسائل؟**
ج: في `challenges.js`، ابحث عن `setTimeout` وغيّر المدة (بالميلي ثانية).

**س: هل يمكن إضافة قاعدة بيانات؟**
ج: نعم، يمكن ربط المشروع بـ Firebase أو أي Backend آخر.

---

<div align="center">

**🎓 تعليم ممتع وفعّال للأطفال**

💡 هل لديك اقتراح؟ نحن نستمع!

</div>

