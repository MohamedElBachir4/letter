// نظام إدارة التحديات والألعاب التعليمية

class ChallengeManager {
    constructor() {
        this.currentChallenge = null;
        this.currentChallengeIndex = 0;
        this.score = 0;
        this.correctAnswers = 0;
        this.challengeHistory = [];
        this.currentSection = 'visualTraining'; // القسم الحالي
    }

    // بدء تحدي جديد
    startChallenge(challenge) {
        this.currentChallenge = challenge;
        
        console.log('🎯 Starting challenge:', challenge.id);
        
        // تشغيل صوت التحدي (بعد تفاعل المستخدم)
        setTimeout(() => {
            console.log('🔊 Playing audio for challenge:', challenge.id);
            
            // تفعيل الصوت
            audioManager.enableAudio();
            
            // تشغيل ملف صوتي خاص لكل تحدي
            if (challenge.id === 'fish-game') {
                console.log('🐟 Fish game audio - samaka.mp3');
                audioManager.playVoiceFile('audio/samaka.mp3');
            }
            else if (challenge.id === 'animal-matching') {
                console.log('🦁 Animal matching audio - rabt.mp3');
                audioManager.playVoiceFile('audio/rabt.mp3');
            }
            else if (challenge.id === 'shadows') {
                console.log('✈️ Shadows audio - dell.mp3');
                audioManager.playVoiceFile('audio/dell.mp3');
            }
            else if (challenge.id === 'pen-hold') {
                console.log('✏️ Pen hold audio - kalm.mp3');
                audioManager.playVoiceFile('audio/kalm.mp3');
            }
            // تحديات حرف الباء والجيم
            else if (challenge.id === 'baa-different-word' || challenge.id === 'jeem-different-word') {
                console.log('📝 Different word audio');
                audioManager.playVoiceFile('audio/mokh.mp3');
            }
            else if (challenge.id === 'baa-replace-syllable' || challenge.id === 'jeem-replace-syllable') {
                console.log('🔄 Replace syllable audio');
                audioManager.playVoiceFile('audio/mak.mp3');
            }
            else if (challenge.id === 'baa-position' || challenge.id === 'jeem-position') {
                console.log('📍 Position audio');
                audioManager.playVoiceFile('audio/mawdii.mp3');
            }
            else if (challenge.id === 'baa-delete-syllable' || challenge.id === 'jeem-delete-syllable') {
                console.log('❌ Delete syllable audio');
                audioManager.playVoiceFile('audio/hadf.mp3');
            }
            else if (challenge.id === 'baa-build-words' || challenge.id === 'jeem-build-words') {
                console.log('🏗️ Build words audio');
                audioManager.playVoiceFile('audio/kaw.mp3');
            }
            else if (challenge.id === 'baa-fill-blank' || challenge.id === 'jeem-fill-blank') {
                console.log('📝 Fill blank audio');
                audioManager.playVoiceFile('audio/faragh.mp3');
            }
        }, 500);
        
        this.renderChallenge();
    }

    // عرض التحدي حسب نوعه
    renderChallenge() {
        const container = document.getElementById('challenge-container');
        if (!container) return;

        container.innerHTML = '';

        switch (this.currentChallenge.type) {
            case 'fish-path':
                this.renderFishGame(container);
                break;
            case 'matching':
                this.renderMatchingGame(container);
                break;
            case 'shadow-choice':
                this.renderShadowChoice(container);
                break;
            case 'multiple-choice':
                this.renderMultipleChoice(container);
                break;
            case 'drag-drop':
                this.renderDragDrop(container);
                break;
            case 'position-choice':
                this.renderPositionChoice(container);
                break;
            case 'text-input':
                this.renderTextInput(container);
                break;
            case 'syllable-builder':
                this.renderSyllableBuilder(container);
                break;
            case 'fill-blank':
                this.renderFillBlank(container);
                break;
            default:
                console.warn('نوع التحدي غير معروف:', this.currentChallenge.type);
        }

        // نطق العنوان - تم تعطيله
    }

    // لعبة السمكة
    renderFishGame(container) {
        container.innerHTML = `
            <div class="text-center">
                <h2 class="text-3xl font-bold text-purple-600 mb-4">${this.currentChallenge.title}</h2>
                <p class="text-xl text-gray-600 mb-8">${this.currentChallenge.description}</p>
                <p class="text-lg text-purple-500 mb-4">ارسم خطاً لمساعدة السمكة في الوصول إلى الحوض 🐟</p>
                
                <div class="relative bg-blue-50 rounded-3xl p-8 h-96 overflow-hidden" id="fish-game-area">
                    <!-- Canvas للرسم -->
                    <canvas id="drawing-canvas" class="absolute inset-0 w-full h-full cursor-crosshair drawing-canvas" style="z-index: 10;"></canvas>
                    
                    <!-- السمكة -->
                    <div id="fish" class="absolute text-6xl cursor-pointer transition-all duration-500" style="top: 50%; right: 10%; z-index: 5;">
                        🐟
                    </div>
                    
                    <!-- المسار الموجود -->
                    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4">
                        <div class="border-dashed border-4 border-blue-300 h-1"></div>
                    </div>
                    
                    <!-- الحوض -->
                    <div id="fishbowl" class="absolute text-6xl" style="top: 45%; left: 10%; z-index: 5;">
                        🏺
                    </div>
                </div>
                
                <div class="mt-4 flex gap-4 justify-center">
                    <button id="clearPath" class="bg-red-500 text-white text-lg font-bold py-2 px-6 rounded-xl hover:bg-red-600 transition-all">
                        🗑️ امسح المسار
                    </button>
                    <button id="checkPath" class="bg-green-500 text-white text-lg font-bold py-2 px-6 rounded-xl hover:bg-green-600 transition-all">
                        ✅ تحقق من المسار
                    </button>
                </div>
            </div>
        `;

        this.setupFishGameDrawing();
    }

    // إعداد الرسم في لعبة السمكة مع تحريك السمكة تدريجياً
    setupFishGameDrawing() {
        const canvas = document.getElementById('drawing-canvas');
        const ctx = canvas.getContext('2d');
        const gameArea = document.getElementById('fish-game-area');
        const fish = document.getElementById('fish');
        
        // متغيرات لتتبع التقدم في الرسم
        let pathLength = 0; // طول المسار المرسوم
        let startPoint = null; // نقطة البداية
        const targetPathLength = 300; // الطول المطلوب للوصول (قابل للتعديل)
        
        // تعيين حجم Canvas
        const resizeCanvas = () => {
            const rect = gameArea.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
            
        // تعيين خصائص الرسم
        ctx.strokeStyle = '#3B82F6'; // أزرق
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.shadowColor = '#1E40AF';
        ctx.shadowBlur = 4;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        let isDrawing = false;
        let hasDrawnPath = false;
        let lastX = 0;
        let lastY = 0;
        
        // دالة لحساب التقدم وتحريك السمكة تدريجياً
        const updateFishPosition = () => {
            // حساب نسبة التقدم (0% إلى 100%)
            const progress = Math.min((pathLength / targetPathLength) * 100, 100);
            
            // حساب الموقع الجديد للسمكة بناءً على التقدم
            // البداية: right: 10% (90% من اليسار)
            // النهاية: left: 10% (10% من اليسار)
            const startPosition = 90; // 90% من اليسار
            const endPosition = 10; // 10% من اليسار
            const currentPosition = startPosition - ((startPosition - endPosition) * (progress / 100));
            
            // تحريك السمكة بسلاسة
            fish.style.right = 'auto';
            fish.style.left = currentPosition + '%';
            fish.style.transition = 'left 0.3s ease-out';
            
            // إضافة تأثير حركة السباحة
            if (progress > 0) {
                fish.style.transform = 'translateY(-50%) rotate(' + (Math.sin(Date.now() / 200) * 3) + 'deg)';
            }
        };
        
        // بدء الرسم
        const startDrawing = (e) => {
            isDrawing = true;
            hasDrawnPath = true;
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            lastX = x;
            lastY = y;
            startPoint = {x, y};
            
            ctx.beginPath();
            ctx.moveTo(x, y);
            
            // صوت بدء الرسم
            audioManager.playDragSound();
        };
        
        // أثناء الرسم - مع تحديث موقع السمكة
        const draw = (e) => {
            if (!isDrawing) return;
            
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // حساب المسافة المرسومة وإضافتها للطول الكلي
            const dx = x - lastX;
            const dy = y - lastY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            pathLength += distance;
            
            lastX = x;
            lastY = y;
            
            ctx.lineTo(x, y);
            ctx.stroke();
            
            // تحديث موقع السمكة تدريجياً مع التقدم في الرسم
            updateFishPosition();
        };
        
        // إنهاء الرسم
        const stopDrawing = () => {
            if (isDrawing) {
                isDrawing = false;
                audioManager.playDropSound();
            }
        };
        
        // أحداث الماوس
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseout', stopDrawing);
        
        // أحداث اللمس للأجهزة المحمولة - مع تتبع آخر موضع لمس
        let lastTouchX = 0;
        let lastTouchY = 0;
        
        canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            lastTouchX = touch.clientX;
            lastTouchY = touch.clientY;
            const mouseEvent = new MouseEvent('mousedown', {
                clientX: touch.clientX,
                clientY: touch.clientY,
                bubbles: true
            });
            canvas.dispatchEvent(mouseEvent);
        });
        
        canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            lastTouchX = touch.clientX;
            lastTouchY = touch.clientY;
            const mouseEvent = new MouseEvent('mousemove', {
                clientX: touch.clientX,
                clientY: touch.clientY,
                bubbles: true
            });
            canvas.dispatchEvent(mouseEvent);
        });
        
        canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            // استخدام آخر إحداثيات معروفة من changedTouches أو lastTouch
            const touch = e.changedTouches[0];
            const finalX = touch ? touch.clientX : lastTouchX;
            const finalY = touch ? touch.clientY : lastTouchY;
            
            const mouseEvent = new MouseEvent('mouseup', {
                clientX: finalX,
                clientY: finalY,
                bubbles: true
            });
            canvas.dispatchEvent(mouseEvent);
        });
        
        // زر مسح المسار
        document.getElementById('clearPath').addEventListener('click', () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            hasDrawnPath = false;
            pathLength = 0;
            startPoint = null;
            
            // إعادة السمكة للموقع الأصلي
            fish.style.left = 'auto';
            fish.style.right = '10%';
            fish.style.transform = 'none';
            fish.style.transition = 'all 0.5s ease-out';
            
            audioManager.playClickSound();
        });
        
        // زر التحقق من المسار
        document.getElementById('checkPath').addEventListener('click', () => {
            audioManager.playClickSound();
            
            if (!hasDrawnPath) {
                audioManager.playErrorSound();
                return;
            }
            
            // التحقق من أن المسار طويل بما يكفي
            if (pathLength < targetPathLength * 0.7) {
                audioManager.playErrorSound();
                this.showFeedback('ارسم مساراً أطول للسمكة! 🐟', 'error');
                return;
            }
            
            // تحريك السمكة بسلاسة إلى الحوض
            this.completeFishAnimation();
        });
    }

    // إكمال حركة السمكة مع تأثيرات النجاح
    completeFishAnimation() {
        const fish = document.getElementById('fish');
        const fishbowl = document.getElementById('fishbowl');
        const canvas = document.getElementById('drawing-canvas');
        const ctx = canvas.getContext('2d');
        
        // تحريك السمكة للوصول النهائي إلى الحوض
        fish.style.transition = 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
        fish.style.left = '10%';
        fish.style.right = 'auto';
        fish.style.transform = 'translateY(-50%) rotate(0deg) scale(1.1)';
        
        // إضافة تأثير السباحة النهائي
        let swimCount = 0;
        const swimInterval = setInterval(() => {
            if (swimCount < 6) {
                const angle = Math.sin(swimCount * Math.PI / 3) * 5;
                fish.style.transform = `translateY(-50%) rotate(${angle}deg) scale(1.1)`;
                swimCount++;
            } else {
                clearInterval(swimInterval);
            }
        }, 200);
        
        // إزالة المسار تدريجياً مع تأثير fade
        let opacity = 1;
        const fadeInterval = setInterval(() => {
            opacity -= 0.05;
            ctx.globalAlpha = opacity;
            
            if (opacity <= 0) {
                clearInterval(fadeInterval);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.globalAlpha = 1;
            }
        }, 50);
        
        // إضافة فقاعات/نجوم حول الحوض عند الوصول
        setTimeout(() => {
            this.createFishSuccessParticles();
        }, 1200);
        
        // تشغيل الصوت والتعليق الصوتي العربي الخاص بتحدي السمكة
        audioManager.playSuccessSound();
        audioManager.playVoiceFile('audio/mom.mp3');
        
        setTimeout(() => {
            // معالجة الإجابة الصحيحة مباشرة لتجنب التخطي
            this.score += this.currentChallenge.points || 10;
            this.correctAnswers++;
            
            // تحديث النقاط
            this.updateScore();
            
            // عرض رسالة التشجيع الخاصة بتحدي السمكة
            const message = 'ممتاز جدا! 🌟';
            this.showFeedback(message, 'success');
            
            // تحقق من المكافأة
            if (this.correctAnswers % 5 === 0) {
                setTimeout(() => {
                    this.showReward();
                }, 500);
            } else {
                setTimeout(() => {
                    this.nextChallenge();
                }, 1000);
            }
        }, 2000);
    }

    // لعبة ربط الحيوانات
    renderMatchingGame(container) {
        const pairs = this.currentChallenge.pairs;
        
        // إنشاء نسخة من الحيوانات مع ترتيب عشوائي مختلف لكل جانب
        const leftAnimals = [...pairs].sort(() => Math.random() - 0.5);
        const rightAnimals = [...pairs].sort(() => Math.random() - 0.5);
        
        // التأكد من أن الترتيب مختلف في الجانبين
        let attempts = 0;
        while (JSON.stringify(leftAnimals.map(a => a.id)) === JSON.stringify(rightAnimals.map(a => a.id)) && attempts < 10) {
            rightAnimals.sort(() => Math.random() - 0.5);
            attempts++;
        }

        container.innerHTML = `
            <div class="text-center">
                <h2 class="text-3xl font-bold text-purple-600 mb-4">${this.currentChallenge.title}</h2>
                <p class="text-xl text-gray-600 mb-8">${this.currentChallenge.description}</p>
                <p class="text-lg text-purple-500 mb-4">ارسم خطوطاً لربط الحيوانات المتشابهة 🎨</p>
                
                <div class="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 h-96 overflow-hidden" id="matching-game-area">
                    <!-- Canvas للرسم -->
                    <canvas id="matching-canvas" class="absolute inset-0 w-full h-full cursor-crosshair drawing-canvas" style="z-index: 10;"></canvas>
                    
                    <div class="grid grid-cols-2 gap-8 max-w-2xl mx-auto h-full relative" style="z-index: 5;">
                        <div id="left-column" class="space-y-4 flex flex-col justify-center">
                            ${leftAnimals.map((animal, index) => `
                                <div class="animal-card bg-yellow-100 p-6 rounded-2xl text-5xl cursor-pointer hover:scale-110 transition-all border-4 border-transparent hover:border-yellow-300" 
                                     data-id="${animal.id}" 
                                     data-side="left" 
                                     data-index="${index}"
                                     style="position: relative;">
                                    ${animal.animal}
                                </div>
                            `).join('')}
                        </div>
                        <div id="right-column" class="space-y-4 flex flex-col justify-center">
                            ${rightAnimals.map((animal, index) => `
                                <div class="animal-card bg-green-100 p-6 rounded-2xl text-5xl cursor-pointer hover:scale-110 transition-all border-4 border-transparent hover:border-green-300" 
                                     data-id="${animal.id}" 
                                     data-side="right" 
                                     data-index="${index}"
                                     style="position: relative;">
                                    ${animal.animal}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="mt-4 flex gap-4 justify-center">
                    <button id="clearLines" class="bg-red-500 text-white text-lg font-bold py-2 px-6 rounded-xl hover:bg-red-600 transition-all">
                        🗑️ امسح الخطوط
                    </button>
                    <button id="checkMatching" class="bg-green-500 text-white text-lg font-bold py-2 px-6 rounded-xl hover:bg-green-600 transition-all">
                        ✅ تحقق من الربط
                    </button>
                </div>
            </div>
        `;

        this.setupMatchingGameDrawing();
    }

    // إعداد الرسم في لعبة ربط الحيوانات
    setupMatchingGameDrawing() {
        const canvas = document.getElementById('matching-canvas');
        const ctx = canvas.getContext('2d');
        const gameArea = document.getElementById('matching-game-area');
        
        // تعيين حجم Canvas
        const resizeCanvas = () => {
            const rect = gameArea.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
            
            // تعيين خصائص الرسم
            ctx.strokeStyle = '#8B5CF6'; // بنفسجي
            ctx.lineWidth = 6;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.shadowColor = '#7C3AED';
            ctx.shadowBlur = 4;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        let isDrawing = false;
        let hasDrawnLines = false;
        let currentPath = [];
        let connections = []; // لتخزين الروابط المرسومة
        let startElement = null; // العنصر الذي بدأ منه الرسم
        
        // الحصول على العنصر من الإحداثيات
        const getElementAtPosition = (x, y) => {
            const elements = document.elementsFromPoint(x, y);
            return elements.find(el => el.classList.contains('animal-card'));
        };

        // بدء الرسم
        const startDrawing = (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // تحديد العنصر الذي بدأ منه الرسم
            startElement = getElementAtPosition(e.clientX, e.clientY);
            
            if (!startElement) return;
            
            isDrawing = true;
            hasDrawnLines = true;
            
            currentPath = [{ x, y }];
            ctx.beginPath();
            ctx.moveTo(x, y);
            
            audioManager.playDragSound();
        };
        
        // أثناء الرسم
        const draw = (e) => {
            if (!isDrawing) return;
            
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            currentPath.push({ x, y });
            ctx.lineTo(x, y);
            ctx.stroke();
        };
        
        // إنهاء الرسم
        const stopDrawing = (e) => {
            if (isDrawing) {
                isDrawing = false;
                audioManager.playDropSound();
                
                // تحديد العنصر الذي انتهى عنده الرسم
                if (e && e.clientX && e.clientY) {
                    const endElement = getElementAtPosition(e.clientX, e.clientY);
                    
                    // التحقق من أن الرسم بدأ من عنصر وانتهى عند عنصر آخر
                    if (startElement && endElement && startElement !== endElement) {
                        const startSide = startElement.dataset.side;
                        const endSide = endElement.dataset.side;
                        
                        // التأكد من أن الربط من اليسار لليمين أو العكس
                        if (startSide !== endSide) {
                            connections.push({
                                from: startElement.dataset.id,
                                to: endElement.dataset.id
                            });
                            console.log('Connection added:', connections[connections.length - 1]);
                        }
                    }
                }
                
                startElement = null;
            }
        };
        
        // أحداث الماوس
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseout', stopDrawing);
        
        // أحداث اللمس للأجهزة المحمولة - مع تتبع آخر موضع لمس
        let lastTouchX = 0;
        let lastTouchY = 0;
        
        canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            lastTouchX = touch.clientX;
            lastTouchY = touch.clientY;
            const mouseEvent = new MouseEvent('mousedown', {
                clientX: touch.clientX,
                clientY: touch.clientY,
                bubbles: true
            });
            canvas.dispatchEvent(mouseEvent);
        });
        
        canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            lastTouchX = touch.clientX;
            lastTouchY = touch.clientY;
            const mouseEvent = new MouseEvent('mousemove', {
                clientX: touch.clientX,
                clientY: touch.clientY,
                bubbles: true
            });
            canvas.dispatchEvent(mouseEvent);
        });
        
        canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            // استخدام آخر إحداثيات معروفة من changedTouches أو lastTouch
            const touch = e.changedTouches[0];
            const finalX = touch ? touch.clientX : lastTouchX;
            const finalY = touch ? touch.clientY : lastTouchY;
            
            const mouseEvent = new MouseEvent('mouseup', {
                clientX: finalX,
                clientY: finalY,
                bubbles: true
            });
            canvas.dispatchEvent(mouseEvent);
        });
        
        // زر مسح الخطوط
        document.getElementById('clearLines').addEventListener('click', () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            hasDrawnLines = false;
            connections = []; // مسح الروابط المحفوظة
            audioManager.playClickSound();
        });
        
        // زر التحقق من الربط
        document.getElementById('checkMatching').addEventListener('click', () => {
            console.log('Matching game check button clicked');
            audioManager.playClickSound();
            
            if (!hasDrawnLines) {
                console.log('No lines drawn');
                audioManager.playErrorSound();
                return;
            }
            
            // التحقق من صحة الربط
            this.checkMatchingConnections(connections);
        });
    }
    
    // التحقق من صحة الربط
    checkMatchingConnections(connections) {
        console.log('Checking matching connections', connections);
        
        const pairs = this.currentChallenge.pairs;
        const requiredPairs = pairs.length;
        
        // التحقق من أن جميع الحيوانات تم ربطها بشكل صحيح
        let correctMatches = 0;
        const matchedIds = new Set();
        
        connections.forEach(conn => {
            // التحقق من أن الربط بين نفس الحيوان (نفس الـ id)
            if (conn.from === conn.to) {
                // تجنب عد نفس الربط مرتين
                const matchKey = [conn.from, conn.to].sort().join('-');
                if (!matchedIds.has(matchKey)) {
                    matchedIds.add(matchKey);
                    correctMatches++;
                }
            }
        });
        
        console.log(`Correct matches: ${correctMatches} / ${requiredPairs}`);
        
        // التحقق من أن جميع الأزواج تم ربطها بشكل صحيح
        if (correctMatches >= requiredPairs) {
            // إجابة صحيحة
            const canvas = document.getElementById('matching-canvas');
            const ctx = canvas.getContext('2d');
            
            // تحريك الخطوط تدريجياً
            let opacity = 1;
            const fadeInterval = setInterval(() => {
                opacity -= 0.05;
                ctx.globalAlpha = opacity;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.globalAlpha = 1;
                
                if (opacity <= 0) {
                    clearInterval(fadeInterval);
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                }
            }, 100);
            
            // معالجة الإجابة الصحيحة
            this.score += this.currentChallenge.points || 10;
            this.correctAnswers++;
            this.updateScore();
            
            // عرض رسالة التشجيع الخاصة بتحدي الحيوانات
            const message = 'برافو عمل رائع! 🦁';
            this.showFeedback(message, 'success');
            
            // تشغيل الصوت والتعليق الصوتي العربي الخاص بتحدي الحيوانات
            audioManager.playSuccessSound();
            audioManager.playVoiceFile('audio/mom.mp3');
            
            // الانتقال للتحدي التالي
            setTimeout(() => {
                this.nextChallenge();
            }, 2000);
        } else {
            // إجابة خاطئة
            audioManager.playErrorSound();
            
            const message = `قم بربط جميع الحيوانات المتشابهة! (${correctMatches}/${requiredPairs}) 🎯`;
            this.showFeedback(message, 'error');
        }
    }

    // تحدي الظلال - اختيار الظل الصحيح
    renderShadowChoice(container) {
        // خلط الخيارات عشوائياً
        const shuffledOptions = [...this.currentChallenge.shadowOptions].sort(() => Math.random() - 0.5);
        
        container.innerHTML = `
            <div class="text-center max-w-4xl mx-auto">
                <h2 class="text-3xl font-bold text-purple-600 mb-4">${this.currentChallenge.title}</h2>
                <p class="text-xl text-gray-600 mb-8">${this.currentChallenge.description}</p>
                
                <!-- Main Image - الصورة الأساسية -->
                <div class="bg-white rounded-3xl p-8 shadow-lg mb-8">
                    <div class="text-9xl mb-6">${this.currentChallenge.image}</div>
                    <h3 class="text-2xl font-bold text-gray-800 mb-6">${this.currentChallenge.question}</h3>
                </div>
                
                <!-- Shadow Options - خيارات الظلال -->
                <div class="grid grid-cols-3 gap-6 mb-8">
                    ${shuffledOptions.map((option, index) => `
                        <div class="shadow-option-container">
                            <button class="shadow-btn w-full bg-white hover:bg-purple-50 p-8 rounded-3xl shadow-lg transition-all hover:scale-105 border-4 border-transparent" 
                                    data-correct="${option.correct}" 
                                    data-option-id="${option.id}">
                                ${option.useEmoji ? 
                                    `<div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 h-48 flex items-center justify-center">
                                        <div class="text-8xl" style="filter: grayscale(100%) brightness(0.3);">${option.emoji}</div>
                                    </div>` 
                                    : 
                                    `<img src="${option.image}" 
                                         alt="${option.alt}" 
                                         class="w-full h-48 object-contain shadow-image">`
                                }
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        // إضافة معالجات الأحداث للأزرار
        const shadowButtons = container.querySelectorAll('.shadow-btn');
        shadowButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // تشغيل صوت النقر
                audioManager.playClickSound();
                
                const isCorrect = btn.dataset.correct === 'true';
                
                // تعطيل جميع الأزرار لمنع النقرات المتعددة
                shadowButtons.forEach(b => b.disabled = true);
                
                if (isCorrect) {
                    // ===== الإجابة الصحيحة =====
                    // إضافة تأثير التوهج والارتداد
                    btn.classList.add('correct-shadow-glow', 'animate-shadow-bounce');
                    btn.classList.add('border-green-500');
                    
                    // تشغيل صوت النجاح والتعليق الصوتي العربي الخاص بتحدي الظلال
                    audioManager.playSuccessSound();
                    audioManager.playVoiceFile('audio/ahsnt.mp3');
                    
                    // عرض رسالة مخصصة لتحدي الظلال
                    setTimeout(() => {
                        this.score += this.currentChallenge.points || 10;
                        this.correctAnswers++;
                        this.updateScore();
                        
                        const message = 'ممتاز جدا! ✈️';
                        this.showFeedback(message, 'success');
                        
                        // تحقق من المكافأة والانتقال
                        if (this.correctAnswers % 5 === 0) {
                            setTimeout(() => {
                                this.showReward();
                            }, 1500);
                        } else {
                            setTimeout(() => {
                                this.nextChallenge();
                            }, 2000);
                        }
                    }, 1500);
                    
                } else {
                    // ===== الإجابة الخاطئة =====
                    // إضافة تأثير الاهتزاز
                    btn.classList.add('animate-shake-error');
                    btn.classList.add('border-red-500', 'bg-red-50');
                    
                    // تشغيل صوت الخطأ والتعليق الصوتي العربي
                    audioManager.playErrorSound();
                    
                    // إزالة تأثير الاهتزاز بعد الانتهاء
                    setTimeout(() => {
                        btn.classList.remove('animate-shake-error');
                    }, 500);
                    
                    // إعادة تفعيل الأزرار للمحاولة مرة أخرى
                    setTimeout(() => {
                        shadowButtons.forEach(b => {
                            if (b !== btn) {
                                b.disabled = false;
                            }
                        });
                        btn.classList.remove('border-red-500', 'bg-red-50');
                    }, 2000);
                }
            });
        });
    }

    // اختيار متعدد
    renderMultipleChoice(container) {
        container.innerHTML = `
            <div class="text-center max-w-3xl mx-auto">
                <h2 class="text-3xl font-bold text-purple-600 mb-4">${this.currentChallenge.title}</h2>
                <p class="text-xl text-gray-600 mb-8">${this.currentChallenge.description}</p>
                
                ${this.currentChallenge.image ? `<div class="text-9xl mb-8">${this.currentChallenge.image}</div>` : ''}
                
                <div class="bg-white rounded-3xl p-8 shadow-lg mb-8">
                    <h3 class="text-2xl font-bold text-gray-800 mb-6">${this.currentChallenge.question}</h3>
                    
                    <div class="grid gap-4">
                        ${this.currentChallenge.options.map((option, index) => `
                            <button class="option-btn bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 p-6 rounded-2xl text-xl font-bold text-gray-800 transition-all hover:scale-105 text-right" data-correct="${option.correct}" data-option-id="${option.id}">
                                <span class="mr-3">${option.emoji || '📌'}</span>
                                ${option.text}
                            </button>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        const optionButtons = container.querySelectorAll('.option-btn');
        optionButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                audioManager.playClickSound();
                
                // نطق النص إذا كان هناك audio
                const optionIndex = Array.from(optionButtons).indexOf(btn);
                const option = this.currentChallenge.options[optionIndex];
                if (option.audio) {
                    // No need to speak option text - visual only
                }
                
                const isCorrect = btn.dataset.correct === 'true';
                
                if (isCorrect) {
                    btn.classList.add('bg-green-300', 'ring-4', 'ring-green-500');
                    
                    // معالجة خاصة لتحدي الكلمة المختلفة
                    if (this.currentChallenge.id === 'baa-different-word' || this.currentChallenge.id === 'jeem-different-word') {
                        this.handleDifferentWordSuccess();
                    }
                    // معالجة خاصة لتحدي القلم
                    else if (this.currentChallenge.id === 'pen-hold') {
                        this.handlePenHoldSuccess();
                    } else {
                        this.handleCorrectAnswer();
                    }
                } else {
                    btn.classList.add('bg-red-300', 'ring-4', 'ring-red-500');
                    this.handleWrongAnswer();
                }
                
                // تعطيل جميع الأزرار
                optionButtons.forEach(b => b.disabled = true);
            });
        });
    }

    // سحب وإفلات
    renderDragDrop(container) {
        const exercise = this.currentChallenge.exercises[0]; // نأخذ أول تمرين كمثال

        container.innerHTML = `
            <div class="text-center max-w-3xl mx-auto">
                <h2 class="text-3xl font-bold text-purple-600 mb-4">${this.currentChallenge.title}</h2>
                <p class="text-xl text-gray-600 mb-8">${this.currentChallenge.description}</p>
                
                <div class="bg-white rounded-3xl p-8 shadow-lg mb-8">
                    <div class="text-4xl font-bold mb-8">
                        <span class="text-gray-400 line-through">${exercise.colored}</span>
                        <span class="text-gray-800">${exercise.original.replace(exercise.colored, '')}</span>
                    </div>
                    
                    <div class="mb-8">
                        <div id="replacement-syllable" class="inline-block bg-purple-200 text-purple-800 text-3xl font-bold px-6 py-4 rounded-2xl cursor-move" draggable="true">
                            ${exercise.replacement}
                        </div>
                    </div>
                    
                    <div id="drop-zone" class="border-4 border-dashed border-purple-300 rounded-2xl p-8 min-h-32 bg-purple-50">
                        <p class="text-gray-400">اسحب المقطع هنا</p>
                    </div>
                    
                    <div id="result" class="mt-6 text-3xl font-bold text-green-600"></div>
                </div>
            </div>
        `;

        const syllable = document.getElementById('replacement-syllable');
        const dropZone = document.getElementById('drop-zone');
        const result = document.getElementById('result');

        syllable.addEventListener('dragstart', (e) => {
            audioManager.playDragSound();
            e.dataTransfer.setData('text/plain', exercise.replacement);
        });

        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('bg-purple-100', 'border-purple-500');
        });

        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('bg-purple-100', 'border-purple-500');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            audioManager.playDropSound();
            dropZone.classList.remove('bg-purple-100', 'border-purple-500');
            
            const data = e.dataTransfer.getData('text/plain');
            result.textContent = exercise.answer;
            
            // معالجة خاصة لتحدي استبدال المقطع
            if (this.currentChallenge.id === 'baa-replace-syllable' || this.currentChallenge.id === 'jeem-replace-syllable') {
                this.handleReplaceSyllableSuccess();
            } else {
                this.handleCorrectAnswer();
            }
        });
    }

    // اختيار الموضع
    renderPositionChoice(container) {
        const word = this.currentChallenge.words[0];

        container.innerHTML = `
            <div class="text-center max-w-3xl mx-auto">
                <h2 class="text-3xl font-bold text-purple-600 mb-4">${this.currentChallenge.title}</h2>
                <p class="text-xl text-gray-600 mb-8">${this.currentChallenge.description}</p>
                
                <div class="bg-white rounded-3xl p-8 shadow-lg mb-8">
                    <div class="text-5xl font-bold mb-8 text-gray-800">
                        ${word.word}
                    </div>
                    
                    <div class="grid grid-cols-3 gap-4">
                        <button class="position-btn bg-blue-100 hover:bg-blue-200 p-6 rounded-2xl text-xl font-bold transition-all" data-position="أول">
                            أول الكلمة
                        </button>
                        <button class="position-btn bg-green-100 hover:bg-green-200 p-6 rounded-2xl text-xl font-bold transition-all" data-position="وسط">
                            وسط الكلمة
                        </button>
                        <button class="position-btn bg-yellow-100 hover:bg-yellow-200 p-6 rounded-2xl text-xl font-bold transition-all" data-position="آخر">
                            آخر الكلمة
                        </button>
                    </div>
                </div>
            </div>
        `;

        const buttons = container.querySelectorAll('.position-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                audioManager.playClickSound();
                
                if (btn.dataset.position === word.position) {
                    btn.classList.add('bg-green-300', 'ring-4', 'ring-green-500');
                    
                    // معالجة خاصة لتحدي الموضع
                    if (this.currentChallenge.id === 'baa-position' || this.currentChallenge.id === 'jeem-position') {
                        this.handlePositionSuccess();
                    } else {
                        this.handleCorrectAnswer();
                    }
                } else {
                    btn.classList.add('bg-red-300', 'ring-4', 'ring-red-500');
                    this.handleWrongAnswer();
                }
                
                buttons.forEach(b => b.disabled = true);
            });
        });
    }

    // إدخال نص
    renderTextInput(container) {
        const exercise = this.currentChallenge.exercises[0];

        container.innerHTML = `
            <div class="text-center max-w-3xl mx-auto">
                <h2 class="text-3xl font-bold text-purple-600 mb-4">${this.currentChallenge.title}</h2>
                <p class="text-xl text-gray-600 mb-8">${this.currentChallenge.description}</p>
                
                <div class="bg-white rounded-3xl p-8 shadow-lg mb-8">
                    <div class="text-4xl font-bold mb-8">
                        <span class="text-gray-800">${exercise.word}</span>
                        <span class="text-red-500 line-through mx-2">${exercise.delete}</span>
                    </div>
                    
                    <input 
                        type="text" 
                        id="answer-input" 
                        class="text-3xl font-bold text-center p-4 border-4 border-purple-300 rounded-2xl w-64 focus:border-purple-500 outline-none"
                        placeholder="اكتب الإجابة"
                    />
                    
                    <button id="check-answer" class="block mx-auto mt-6 bg-green-500 text-white text-xl font-bold py-4 px-8 rounded-2xl hover:bg-green-600 transition-all">
                        تحقق ✓
                    </button>
                </div>
            </div>
        `;

        document.getElementById('check-answer').addEventListener('click', () => {
            const input = document.getElementById('answer-input');
            audioManager.playClickSound();
            
            if (input.value.trim() === exercise.answer) {
                input.classList.add('border-green-500', 'bg-green-50');
                
                // معالجة خاصة لتحدي حذف المقطع
                if (this.currentChallenge.id === 'baa-delete-syllable' || this.currentChallenge.id === 'jeem-delete-syllable') {
                    this.handleDeleteSyllableSuccess();
                } else {
                    this.handleCorrectAnswer();
                }
            } else {
                input.classList.add('border-red-500', 'bg-red-50');
                this.handleWrongAnswer();
            }
        });
    }

    // بناء الكلمات من المقاطع
    renderSyllableBuilder(container) {
        const exercise = this.currentChallenge.exercises[0];

        container.innerHTML = `
            <div class="text-center max-w-3xl mx-auto">
                <h2 class="text-3xl font-bold text-purple-600 mb-4">${this.currentChallenge.title}</h2>
                <p class="text-xl text-gray-600 mb-8">${this.currentChallenge.description}</p>
                
                <div class="bg-white rounded-3xl p-8 shadow-lg mb-8">
                    <div class="mb-8">
                        <h3 class="text-xl font-bold text-gray-600 mb-4">المقاطع المتاحة:</h3>
                        <div class="flex gap-4 justify-center flex-wrap" id="syllables-container">
                            ${exercise.syllables.map((syllable, index) => `
                                <div class="syllable bg-purple-200 text-purple-800 text-3xl font-bold px-6 py-4 rounded-2xl cursor-pointer hover:scale-110 transition-all" data-syllable="${syllable}" data-index="${index}">
                                    ${syllable}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="mb-8">
                        <h3 class="text-xl font-bold text-gray-600 mb-4">الكلمة:</h3>
                        <div id="word-builder" class="min-h-20 border-4 border-dashed border-purple-300 rounded-2xl p-4 flex gap-2 justify-center items-center bg-purple-50">
                            <p class="text-gray-400">انقر على المقاطع لبناء الكلمة</p>
                        </div>
                    </div>
                    
                    <button id="check-word" class="bg-green-500 text-white text-xl font-bold py-4 px-8 rounded-2xl hover:bg-green-600 transition-all">
                        تحقق ✓
                    </button>
                </div>
            </div>
        `;

        let builtWord = [];
        const wordBuilder = document.getElementById('word-builder');
        const syllables = container.querySelectorAll('.syllable');

        syllables.forEach(syl => {
            syl.addEventListener('click', () => {
                audioManager.playClickSound();
                builtWord.push(syl.dataset.syllable);
                
                if (builtWord.length === 1) {
                    wordBuilder.innerHTML = '';
                }
                
                const syllableEl = document.createElement('span');
                syllableEl.className = 'text-3xl font-bold text-purple-800';
                syllableEl.textContent = syl.dataset.syllable;
                wordBuilder.appendChild(syllableEl);
                
                syl.style.opacity = '0.3';
                syl.style.pointerEvents = 'none';
            });
        });

        document.getElementById('check-word').addEventListener('click', () => {
            audioManager.playClickSound();
            const result = builtWord.join('');
            
            if (result === exercise.answer) {
                wordBuilder.classList.add('border-green-500', 'bg-green-50');
                
                // معالجة خاصة لتحدي تكوين الكلمات
                if (this.currentChallenge.id === 'baa-build-words' || this.currentChallenge.id === 'jeem-build-words') {
                    this.handleBuildWordsSuccess();
                } else {
                    this.handleCorrectAnswer();
                }
            } else {
                wordBuilder.classList.add('border-red-500', 'bg-red-50');
                this.handleWrongAnswer();
            }
        });
    }

    // املأ الفراغ
    renderFillBlank(container) {
        const exercise = this.currentChallenge.exercises[0];

        container.innerHTML = `
            <div class="text-center max-w-3xl mx-auto">
                <h2 class="text-3xl font-bold text-purple-600 mb-4">${this.currentChallenge.title}</h2>
                <p class="text-xl text-gray-600 mb-8">${this.currentChallenge.description}</p>
                
                <div class="bg-white rounded-3xl p-8 shadow-lg mb-8">
                    <div class="text-5xl font-bold mb-8 text-gray-800">
                        ${exercise.word.replace('_', '<input type="text" class="inline-block w-16 text-center border-b-4 border-purple-500 bg-transparent outline-none" id="blank-input" />')}
                    </div>
                    
                    <button id="check-blank" class="bg-green-500 text-white text-xl font-bold py-4 px-8 rounded-2xl hover:bg-green-600 transition-all">
                        تحقق ✓
                    </button>
                </div>
            </div>
        `;

        document.getElementById('check-blank').addEventListener('click', () => {
            const input = document.getElementById('blank-input');
            audioManager.playClickSound();
            
            if (input.value === exercise.answer) {
                input.classList.add('border-green-500', 'text-green-600');
                
                // معالجة خاصة لتحدي املأ الفراغ
                if (this.currentChallenge.id === 'baa-fill-blank' || this.currentChallenge.id === 'jeem-fill-blank') {
                    this.handleFillBlankSuccess();
                } else {
                    this.handleCorrectAnswer();
                }
            } else {
                input.classList.add('border-red-500', 'text-red-600');
                this.handleWrongAnswer();
            }
        });
    }

    // معالجة خاصة للنجاح في تحدي الكلمة المختلفة
    handleDifferentWordSuccess() {
        this.score += this.currentChallenge.points || 10;
        this.correctAnswers++;
        
        // تشغيل الصوت والتعليق الصوتي العربي الخاص بتحدي الكلمة المختلفة
        audioManager.playSuccessSound();
        audioManager.playVoiceFile('audio/mom.mp3');
        
        const message = 'ممتاز جدا! 🌟';
        this.showFeedback(message, 'success');
        
        // تحديث النقاط
        this.updateScore();
        
        // تحقق من المكافأة (كل 5 إجابات صحيحة)
        if (this.correctAnswers % 5 === 0) {
            setTimeout(() => {
                this.showReward();
            }, 1500);
        } else {
            setTimeout(() => {
                this.nextChallenge();
            }, 2000);
        }
    }

    // معالجة خاصة للنجاح في تحدي استبدال المقطع
    handleReplaceSyllableSuccess() {
        this.score += this.currentChallenge.points || 10;
        this.correctAnswers++;
        
        // تشغيل الصوت والتعليق الصوتي العربي الخاص بتحدي استبدال المقطع
        audioManager.playSuccessSound();
        audioManager.playVoiceFile('audio/ahsnt.mp3');
        
        const message = 'برافو احسنت! 👏';
        this.showFeedback(message, 'success');
        
        // تحديث النقاط
        this.updateScore();
        
        // تحقق من المكافأة (كل 5 إجابات صحيحة)
        if (this.correctAnswers % 5 === 0) {
            setTimeout(() => {
                this.showReward();
            }, 1500);
        } else {
            setTimeout(() => {
                this.nextChallenge();
            }, 2000);
        }
    }

    // معالجة خاصة للنجاح في تحدي الموضع
    handlePositionSuccess() {
        this.score += this.currentChallenge.points || 10;
        this.correctAnswers++;
        
        // تشغيل الصوت والتعليق الصوتي العربي الخاص بتحدي الموضع
        audioManager.playSuccessSound();
        audioManager.playVoiceFile('audio/mom.mp3');
        
        const message = 'ممتاز جدا! 🌟';
        this.showFeedback(message, 'success');
        
        // تحديث النقاط
        this.updateScore();
        
        // تحقق من المكافأة (كل 5 إجابات صحيحة)
        if (this.correctAnswers % 5 === 0) {
            setTimeout(() => {
                this.showReward();
            }, 1500);
        } else {
            setTimeout(() => {
                this.nextChallenge();
            }, 2000);
        }
    }

    // معالجة خاصة للنجاح في تحدي حذف المقطع
    handleDeleteSyllableSuccess() {
        this.score += this.currentChallenge.points || 10;
        this.correctAnswers++;
        
        // تشغيل الصوت والتعليق الصوتي العربي الخاص بتحدي حذف المقطع
        audioManager.playSuccessSound();
        audioManager.playVoiceFile('audio/ahsnt.mp3');
        
        const message = 'برافو احسنت! 👏';
        this.showFeedback(message, 'success');
        
        // تحديث النقاط
        this.updateScore();
        
        // تحقق من المكافأة (كل 5 إجابات صحيحة)
        if (this.correctAnswers % 5 === 0) {
            setTimeout(() => {
                this.showReward();
            }, 1500);
        } else {
            setTimeout(() => {
                this.nextChallenge();
            }, 2000);
        }
    }

    // معالجة خاصة للنجاح في تحدي تكوين الكلمات
    handleBuildWordsSuccess() {
        this.score += this.currentChallenge.points || 10;
        this.correctAnswers++;
        
        // تشغيل الصوت والتعليق الصوتي العربي الخاص بتحدي تكوين الكلمات
        audioManager.playSuccessSound();
        audioManager.playVoiceFile('audio/haka.mp3');
        
        const message = 'انت مبدع حقا! 💫';
        this.showFeedback(message, 'success');
        
        // تحديث النقاط
        this.updateScore();
        
        // تحقق من المكافأة (كل 5 إجابات صحيحة)
        if (this.correctAnswers % 5 === 0) {
            setTimeout(() => {
                this.showReward();
            }, 1500);
        } else {
            setTimeout(() => {
                this.nextChallenge();
            }, 2000);
        }
    }

    // معالجة خاصة للنجاح في تحدي املأ الفراغ
    handleFillBlankSuccess() {
        this.score += this.currentChallenge.points || 10;
        this.correctAnswers++;
        
        // تشغيل الصوت والتعليق الصوتي العربي الخاص بتحدي املأ الفراغ
        audioManager.playSuccessSound();
        audioManager.playVoiceFile('audio/wasl.mp3');
        
        const message = 'احسنت واصل! 🚀';
        this.showFeedback(message, 'success');
        
        // تحديث النقاط
        this.updateScore();
        
        // تحقق من المكافأة (كل 5 إجابات صحيحة)
        if (this.correctAnswers % 5 === 0) {
            setTimeout(() => {
                this.showReward();
            }, 1500);
        } else {
            setTimeout(() => {
                this.nextChallenge();
            }, 2000);
        }
    }

    // معالجة خاصة للنجاح في تحدي القلم
    handlePenHoldSuccess() {
        this.score += this.currentChallenge.points || 10;
        this.correctAnswers++;
        
        // تشغيل الصوت والتعليق الصوتي العربي الخاص بتحدي القلم
        audioManager.playSuccessSound();
        audioManager.playVoiceFile('audio/mom.mp3');
        
        const message = 'ممتاز جدا! ✏️';
        this.showFeedback(message, 'success');
        
        // تحديث النقاط
        this.updateScore();
        
        // تحقق من المكافأة (كل 5 إجابات صحيحة)
        if (this.correctAnswers % 5 === 0) {
            setTimeout(() => {
                this.showReward();
            }, 1500);
        } else {
            setTimeout(() => {
                this.nextChallenge();
            }, 2000);
        }
    }
    
    // التعامل مع الإجابة الصحيحة
    handleCorrectAnswer() {
        this.score += this.currentChallenge.points || 10;
        this.correctAnswers++;
        
        // تشغيل الصوت والتعليق الصوتي العربي
        audioManager.playSuccessSound();
        
        const encouragement = challengesData.encouragement.correct;
        const message = encouragement[Math.floor(Math.random() * encouragement.length)];
        this.showFeedback(message, 'success');
        
        // تحديث النقاط
        this.updateScore();
        
        // تحقق من المكافأة (كل 5 إجابات صحيحة)
        if (this.correctAnswers % 5 === 0) {
            setTimeout(() => {
                this.showReward();
            }, 1500);
        } else {
            setTimeout(() => {
                this.nextChallenge();
            }, 2000);
        }
    }

    // التعامل مع الإجابة الخاطئة
    handleWrongAnswer() {
        audioManager.playErrorSound();
        
        const encouragement = challengesData.encouragement.wrong;
        const message = encouragement[Math.floor(Math.random() * encouragement.length)];
        
        this.showFeedback(message, 'error');
        
        setTimeout(() => {
            this.renderChallenge(); // إعادة عرض التحدي
        }, 2000);
    }

    // عرض رسالة التغذية الراجعة
    showFeedback(message, type) {
        const feedbackEl = document.getElementById('feedback');
        if (!feedbackEl) return;

        feedbackEl.innerHTML = `
            <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-bounce">
                <div class="bg-white rounded-3xl shadow-2xl p-8 text-center ${type === 'success' ? 'border-4 border-green-400' : 'border-4 border-red-400'}">
                    <p class="text-3xl font-bold ${type === 'success' ? 'text-green-600' : 'text-red-600'}">${message}</p>
                </div>
            </div>
        `;

        // Message shown visually - voice already played in handleWrongAnswer

        setTimeout(() => {
            feedbackEl.innerHTML = '';
        }, 2000);
    }

    // إضافة تأثير الفقاعات والنجوم عند نجاح السمكة
    createFishSuccessParticles() {
        const fishbowl = document.getElementById('fishbowl');
        const gameArea = document.getElementById('fish-game-area');
        
        if (!fishbowl || !gameArea) return;
        
        // الحصول على موقع الحوض
        const bowlRect = fishbowl.getBoundingClientRect();
        const gameRect = gameArea.getBoundingClientRect();
        
        // إنشاء فقاعات/نجوم متعددة
        const particles = ['💫', '✨', '🌟', '⭐', '💧', '🫧'];
        const particleCount = 8;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.textContent = particles[Math.floor(Math.random() * particles.length)];
            particle.className = 'absolute text-3xl pointer-events-none';
            particle.style.cssText = `
                left: ${(bowlRect.left - gameRect.left) + (Math.random() * 60 - 30)}px;
                top: ${(bowlRect.top - gameRect.top) + (Math.random() * 60 - 30)}px;
                animation: float-bubble ${1 + Math.random()}s ease-out forwards;
                animation-delay: ${i * 0.1}s;
                opacity: 0;
                z-index: 20;
            `;
            
            gameArea.appendChild(particle);
            
            // إزالة الجسيم بعد انتهاء الحركة
            setTimeout(() => {
                particle.remove();
            }, 2000 + (i * 100));
        }
        
        // إضافة تأثير توهج للحوض
        fishbowl.style.transform = 'scale(1.2)';
        fishbowl.style.filter = 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.8))';
        fishbowl.style.transition = 'all 0.3s ease-out';
        
        setTimeout(() => {
            fishbowl.style.transform = 'scale(1)';
            fishbowl.style.filter = 'none';
        }, 800);
    }
    
    // عرض المكافأة
    showReward() {
        const rewards = challengesData.rewards;
        const reward = rewards[Math.floor(Math.random() * rewards.length)];
        
        audioManager.playRewardSound();
        
        const milestone = challengesData.encouragement.milestone;
        const message = milestone[Math.floor(Math.random() * milestone.length)];
        
        const feedbackEl = document.getElementById('feedback');
        feedbackEl.innerHTML = `
            <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                <div class="bg-white rounded-3xl shadow-2xl p-12 text-center animate-pulse">
                    <div class="text-9xl mb-6">${reward}</div>
                    <p class="text-3xl font-bold text-purple-600 mb-4">${message}</p>
                    <p class="text-2xl text-gray-600">النقاط: ${this.score}</p>
                </div>
            </div>
        `;

        // Message shown visually - voice already played in handleWrongAnswer

        setTimeout(() => {
            feedbackEl.innerHTML = '';
            this.nextChallenge();
        }, 3000);
    }

    // تحديث النقاط
    updateScore() {
        const scoreEl = document.getElementById('score');
        if (scoreEl) {
            scoreEl.textContent = this.score;
        }
    }

    // الانتقال للتحدي التالي
    nextChallenge() {
        console.log('Challenge completed, transitioning to next challenge');
        audioManager.playTransitionSound();
        
        // يمكن تخصيص هذه الدالة للانتقال للتحدي التالي
        const event = new CustomEvent('challengeComplete', { 
            detail: { 
                score: this.score, 
                correctAnswers: this.correctAnswers 
            } 
        });
        document.dispatchEvent(event);
    }
}

// إنشاء مثيل عام
const challengeManager = new ChallengeManager();

