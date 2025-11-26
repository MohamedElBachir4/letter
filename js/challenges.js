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
            audioManager.enableAudio();
            
            // تشغيل ملف صوتي خاص لكل تحدي
            if (challenge.id === 'fish-game') {
                audioManager.playVoiceFile('audio/samaka.mp3');
            }
            else if (challenge.id === 'frog-game') {
                audioManager.playVoiceFile('audio/difda.mp3');
            }
            else if (challenge.id === 'animal-matching') {
                audioManager.playVoiceFile('audio/haiw.mp3');
            }
            else if (challenge.id === 'shadows') {
                audioManager.playVoiceFile('audio/del.mp3');
            }
            else if (challenge.id === 'pen-hold') {
                audioManager.playVoiceFile('audio/kalm.mp3');
            }
            // أسئلة حرف الباء (1-8)
            else if (challenge.id === 'baa-odd-word-out' || challenge.id === 'jeem-odd-word-out' || challenge.id === 'meem-odd-word-out' || challenge.id === 'taa-odd-word-out') {
                audioManager.playVoiceFile('audio/q1.mp3');
            }
            else if (challenge.id === 'baa-repeated-letter' || challenge.id === 'jeem-repeated-letter' || challenge.id === 'meem-repeated-letter' || challenge.id === 'taa-repeated-letter') {
                audioManager.playVoiceFile('audio/q2.mp3');
            }
            else if (challenge.id === 'baa-position-game') {
                audioManager.playVoiceFile('audio/q3.mp3');
            }
            else if (challenge.id === 'jeem-position-game') {
                audioManager.playVoiceFile('audio/q3j.mp3');
            }
            else if (challenge.id === 'taa-position-game') {
                audioManager.playVoiceFile('audio/q3ta.mp3');
            }
            else if (challenge.id === 'meem-position-game') {
                audioManager.playVoiceFile('audio/q3mim.mp3');
            }
            else if (challenge.id === 'baa-build-word-syllables' || challenge.id === 'jeem-build-word-syllables' || challenge.id === 'meem-build-word-syllables' || challenge.id === 'taa-build-word-syllables') {
                audioManager.playVoiceFile('audio/q4.mp3');
            }
            else if (challenge.id === 'baa-replace-letter' || challenge.id === 'jeem-replace-letter' || challenge.id === 'meem-replace-letter' || challenge.id === 'taa-replace-letter') {
                audioManager.playVoiceFile('audio/q5.mp3');
            }
            else if (challenge.id === 'baa-delete-syllable' || challenge.id === 'jeem-delete-syllable' || challenge.id === 'meem-delete-syllable' || challenge.id === 'taa-delete-syllable') {
                audioManager.playVoiceFile('audio/q6.mp3');
            }
            else if (challenge.id === 'baa-add-letter') {
                audioManager.playVoiceFile('audio/q7.mp3');
            }
            else if (challenge.id === 'jeem-add-letter') {
                audioManager.playVoiceFile('audio/q7j.mp3');
            }
            else if (challenge.id === 'taa-add-letter') {
                audioManager.playVoiceFile('audio/q7ta.mp3');
            }
            else if (challenge.id === 'meem-add-letter') {
                audioManager.playVoiceFile('audio/q7mim.mp3');
            }
            else if (challenge.id === 'baa-delete-segments') {
                // تشغيل bata.mp3 ثم mkat.mp3 بعد انتهائه
                const bataAudio = new Audio('audio/bata.mp3');
                bataAudio.volume = 0.8;
                bataAudio.preload = 'auto';
                
                bataAudio.addEventListener('ended', () => {
                    audioManager.playVoiceFile('audio/mkat.mp3');
                });
                
                bataAudio.play().catch(error => {
                    console.warn('⚠️ Error playing bata.mp3:', error);
                });
            }
            else if (challenge.id === 'jeem-delete-segments') {
                audioManager.playVoiceFile('audio/q8j.mp3');
            }
            else if (challenge.id === 'taa-delete-segments') {
                audioManager.playVoiceFile('audio/q8ta.mp3');
            }
            else if (challenge.id === 'meem-delete-segments') {
                audioManager.playVoiceFile('audio/q8mim.mp3');
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
            case 'frog-path':
                this.renderFrogGame(container);
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
            case 'word-segmentation':
                this.renderWordSegmentation(container);
                break;
            case 'find-letter-segment':
                this.renderFindLetterSegment(container);
                break;
            case 'delete-segments':
                this.renderDeleteSegments(container);
                break;
            default:
                console.warn('نوع التحدي غير معروف:', this.currentChallenge.type);
        }

        // نطق العنوان - تم تعطيله
    }

    // لعبة السمكة
    renderFishGame(container) {
        container.innerHTML = `
            <div class="text-center px-2">
                <h2 class="text-2xl md:text-3xl font-bold text-purple-600 mb-3">${this.currentChallenge.title}</h2>
                <p class="text-lg md:text-xl text-gray-600 mb-6">${this.currentChallenge.description}</p>
                <p class="text-base md:text-lg text-purple-500 mb-3">ارسم خطاً لمساعدة السمكة في الوصول إلى الحوض 🐟</p>
                
                <div class="relative bg-blue-50 rounded-3xl p-4 md:p-8 h-72 md:h-96 overflow-hidden" id="fish-game-area">
                    <!-- Canvas للرسم -->
                    <canvas id="drawing-canvas" class="absolute inset-0 w-full h-full cursor-crosshair drawing-canvas" style="z-index: 10;"></canvas>
                    
                    <!-- السمكة -->
                    <div id="fish" class="absolute text-4xl md:text-6xl cursor-pointer transition-all duration-500" style="top: 50%; right: 10%; z-index: 5;">
                        🐟
                    </div>
                    
                    <!-- المسار الموجود -->
                    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4">
                        <div class="border-dashed border-2 md:border-4 border-blue-300 h-1"></div>
                    </div>
                    
                    <!-- الحوض -->
                    <div id="fishbowl" class="absolute text-4xl md:text-6xl" style="top: 45%; left: 10%; z-index: 5;">
                        🏺
                    </div>
                </div>
                
                <div class="mt-3 md:mt-4 flex flex-col sm:flex-row gap-2 md:gap-4 justify-center px-2">
                    <button id="clearPath" class="bg-red-500 text-white text-base md:text-lg font-bold py-3 md:py-2 px-5 md:px-6 rounded-xl hover:bg-red-600 transition-all">
                        🗑️ امسح المسار
                    </button>
                    <button id="checkPath" class="bg-green-500 text-white text-base md:text-lg font-bold py-3 md:py-2 px-5 md:px-6 rounded-xl hover:bg-green-600 transition-all">
                        ✅ تحقق من المسار
                    </button>
                </div>
                <div class="mt-3 flex justify-center">
                    <button id="skip-btn" class="bg-gray-400 hover:bg-gray-500 text-white text-lg font-bold py-2 px-6 rounded-xl transition-all">
                        ⏭️ تخطي السؤال
                    </button>
                </div>
            </div>
        `;

        this.setupFishGameDrawing();

        // زر التخطي
        const skipBtn = document.getElementById('skip-btn');
        if (skipBtn) {
            skipBtn.addEventListener('click', () => {
                audioManager.playClickSound();
                this.skipChallenge();
            });
        }
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
        
        // دالة لتحريك السمكة لموقع نهاية الخط المرسوم
        const updateFishPosition = (x, y) => {
            const rect = canvas.getBoundingClientRect();
            
            // تحويل الإحداثيات إلى نسب مئوية من حجم منطقة اللعب
            const percentX = (x / rect.width) * 100;
            const percentY = (y / rect.height) * 100;
            
            // تحريك السمكة لموقع آخر نقطة رسم
            fish.style.right = 'auto';
            fish.style.left = percentX + '%';
            fish.style.top = percentY + '%';
            fish.style.transform = 'translate(-50%, -50%) rotate(' + (Math.sin(Date.now() / 200) * 3) + 'deg)';
            fish.style.transition = 'left 0.1s ease-out, top 0.1s ease-out';
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
            
            // تحديث موقع السمكة لنهاية الخط المرسوم
            updateFishPosition(x, y);
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
        
        // تشغيل صوت النجاح والتسجيل الصوتي
        audioManager.playSuccessSound();
        audioManager.playVoiceFile('audio/hsantyabatal.mp3');
        
        setTimeout(() => {
            // معالجة الإجابة الصحيحة مباشرة لتجنب التخطي
            this.score += this.currentChallenge.points || 10;
            this.correctAnswers++;
            
            // تحديث النقاط
            this.updateScore();
            
            // عرض رسالة التشجيع الخاصة بتحدي السمكة
            const message = 'أحسنت يا بطل 🌟';
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
            <div class="text-center px-2">
                <h2 class="text-2xl md:text-3xl font-bold text-purple-600 mb-3">${this.currentChallenge.title}</h2>
                <p class="text-lg md:text-xl text-gray-600 mb-6">${this.currentChallenge.description}</p>
                <p class="text-base md:text-lg text-purple-500 mb-3">ارسم خطوطاً لربط الحيوانات المتشابهة 🎨</p>
                
                <div class="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-4 md:p-8 h-80 md:h-96 overflow-hidden" id="matching-game-area">
                    <!-- Canvas للرسم -->
                    <canvas id="matching-canvas" class="absolute inset-0 w-full h-full cursor-crosshair drawing-canvas" style="z-index: 10;"></canvas>
                    
                    <div class="grid grid-cols-2 gap-4 md:gap-8 max-w-2xl mx-auto h-full relative" style="z-index: 5;">
                        <div id="left-column" class="space-y-2 md:space-y-4 flex flex-col justify-center">
                            ${leftAnimals.map((animal, index) => `
                                <div class="animal-card bg-yellow-100 p-3 md:p-6 rounded-2xl text-3xl md:text-5xl cursor-pointer hover:scale-110 transition-all border-4 border-transparent hover:border-yellow-300" 
                                     data-id="${animal.id}" 
                                     data-side="left" 
                                     data-index="${index}"
                                     style="position: relative;">
                                    ${animal.animal}
                                </div>
                            `).join('')}
                        </div>
                        <div id="right-column" class="space-y-2 md:space-y-4 flex flex-col justify-center">
                            ${rightAnimals.map((animal, index) => `
                                <div class="animal-card bg-green-100 p-3 md:p-6 rounded-2xl text-3xl md:text-5xl cursor-pointer hover:scale-110 transition-all border-4 border-transparent hover:border-green-300" 
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
                
                <div class="mt-3 md:mt-4 flex flex-col sm:flex-row gap-2 md:gap-4 justify-center px-2">
                    <button id="clearLines" class="bg-red-500 text-white text-base md:text-lg font-bold py-3 md:py-2 px-5 md:px-6 rounded-xl hover:bg-red-600 transition-all">
                        🗑️ امسح الخطوط
                    </button>
                    <button id="checkMatching" class="bg-green-500 text-white text-base md:text-lg font-bold py-3 md:py-2 px-5 md:px-6 rounded-xl hover:bg-green-600 transition-all">
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
            const message = 'احسنت واصل 🦁';
            this.showFeedback(message, 'success');
            
            // تشغيل صوت النجاح والتسجيل الصوتي
            audioManager.playSuccessSound();
            audioManager.playVoiceFile('audio/ahsntwasl.mp3');
            
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
            <div class="text-center max-w-4xl mx-auto px-2">
                <h2 class="text-2xl md:text-3xl font-bold text-purple-600 mb-3">${this.currentChallenge.title}</h2>
                <p class="text-lg md:text-xl text-gray-600 mb-6">${this.currentChallenge.description}</p>
                
                <!-- Main Image - الصورة الأساسية -->
                <div class="bg-white rounded-3xl p-4 md:p-8 shadow-lg mb-6">
                    <div class="text-7xl md:text-9xl mb-4">${this.currentChallenge.image}</div>
                    <h3 class="text-xl md:text-2xl font-bold text-gray-800 mb-4">${this.currentChallenge.question}</h3>
                </div>
                
                <!-- Shadow Options - خيارات الظلال -->
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 mb-8">
                    ${shuffledOptions.map((option, index) => `
                        <div class="shadow-option-container">
                            <button class="shadow-btn w-full bg-white hover:bg-purple-50 p-4 md:p-8 rounded-3xl shadow-lg transition-all hover:scale-105 border-4 border-transparent" 
                                    data-correct="${option.correct}" 
                                    data-option-id="${option.id}">
                                ${option.useEmoji ? 
                                    `<div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 md:p-8 h-32 md:h-48 flex items-center justify-center">
                                        <div class="text-6xl md:text-8xl" style="filter: grayscale(100%) brightness(0.3);">${option.emoji}</div>
                                    </div>` 
                                    : 
                                    `<img src="${option.image}" 
                                         alt="${option.alt}" 
                                         loading="lazy"
                                         class="w-full h-32 md:h-48 object-contain shadow-image">`
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
                    
                    // تشغيل صوت النجاح والتسجيل الصوتي
                    audioManager.playSuccessSound();
                    audioManager.playVoiceFile('audio/jiid.mp3');
                    
                    // عرض رسالة مخصصة لتحدي الظلال
                    setTimeout(() => {
                        this.score += this.currentChallenge.points || 10;
                        this.correctAnswers++;
                        this.updateScore();
                        
                        const message = 'جيد جدا ✈️';
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
            <div class="text-center max-w-3xl mx-auto px-2">
                <h2 class="text-2xl md:text-3xl font-bold text-purple-600 mb-3">${this.currentChallenge.title}</h2>
                <p class="text-lg md:text-xl text-gray-600 mb-6">${this.currentChallenge.description}</p>
                
                ${this.currentChallenge.image ? `<div class="text-7xl md:text-9xl mb-6">${this.currentChallenge.image}</div>` : ''}
                
                <div class="bg-white rounded-3xl p-4 md:p-8 shadow-lg mb-6">
                    <h3 class="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">${this.currentChallenge.question}</h3>
                    
                    <div class="grid gap-3 md:gap-4">
                        ${this.currentChallenge.options.map((option, index) => `
                            <button class="option-btn bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 p-4 md:p-6 rounded-2xl text-lg md:text-xl font-bold text-gray-800 transition-all hover:scale-105 text-right" data-correct="${option.correct}" data-option-id="${option.id}">
                                <span class="mr-2 md:mr-3">${option.emoji || '📌'}</span>
                                ${option.text}
                            </button>
                        `).join('')}
                    </div>
                    
                    <button id="skip-btn" class="mt-6 bg-gray-400 hover:bg-gray-500 text-white text-lg font-bold py-3 px-6 rounded-xl transition-all">
                        ⏭️ تخطي السؤال
                    </button>
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
                    
                    // معالجة خاصة لتحدي الكلمة المختلفة (السؤال 1)
                    if (this.currentChallenge.id === 'baa-odd-word-out' || this.currentChallenge.id === 'jeem-odd-word-out') {
                        this.handleDifferentWordSuccess();
                    }
                    // معالجة خاصة للسؤال 2 (الحرف المتكرر)
                    else if (this.currentChallenge.id === 'baa-repeated-letter' || this.currentChallenge.id === 'jeem-repeated-letter') {
                        this.handleRepeatedLetterSuccess();
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
        
        // زر التخطي
        const skipBtn = document.getElementById('skip-btn');
        if (skipBtn) {
            skipBtn.addEventListener('click', () => {
                audioManager.playClickSound();
                this.skipChallenge();
            });
        }
    }

    // سحب وإفلات
    renderDragDrop(container) {
        const exercise = this.currentChallenge.exercises[0]; // نأخذ أول تمرين كمثال

        container.innerHTML = `
            <div class="text-center max-w-3xl mx-auto px-2">
                <h2 class="text-2xl md:text-3xl font-bold text-purple-600 mb-3">${this.currentChallenge.title}</h2>
                <p class="text-lg md:text-xl text-gray-600 mb-6">${this.currentChallenge.description}</p>
                
                <div class="bg-white rounded-3xl p-4 md:p-8 shadow-lg mb-6">
                    <div class="text-3xl md:text-4xl font-bold mb-6 md:mb-8">
                        <span class="text-gray-400 line-through">${exercise.colored}</span>
                        <span class="text-gray-800">${exercise.original.replace(exercise.colored, '')}</span>
                    </div>
                    
                    <div class="mb-6 md:mb-8">
                        <div id="replacement-syllable" class="inline-block bg-purple-200 text-purple-800 text-2xl md:text-3xl font-bold px-5 md:px-6 py-3 md:py-4 rounded-2xl cursor-move" draggable="true">
                            ${exercise.replacement}
                        </div>
                    </div>
                    
                    <div id="drop-zone" class="border-4 border-dashed border-purple-300 rounded-2xl p-6 md:p-8 min-h-24 md:min-h-32 bg-purple-50">
                        <p class="text-gray-400 text-lg md:text-xl">اسحب المقطع هنا</p>
                    </div>
                    
                    <div id="result" class="mt-4 md:mt-6 text-2xl md:text-3xl font-bold text-green-600"></div>
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
            <div class="text-center max-w-3xl mx-auto px-2">
                <h2 class="text-2xl md:text-3xl font-bold text-purple-600 mb-3">${this.currentChallenge.title}</h2>
                <p class="text-lg md:text-xl text-gray-600 mb-6">${this.currentChallenge.description}</p>
                
                <div class="bg-white rounded-3xl p-4 md:p-8 shadow-lg mb-6">
                    <div class="text-4xl md:text-5xl font-bold mb-6 md:mb-8 text-gray-800">
                        ${word.word}
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                        <button class="position-btn bg-blue-100 hover:bg-blue-200 p-4 md:p-6 rounded-2xl text-lg md:text-xl font-bold transition-all" data-position="أول">
                            أول الكلمة
                        </button>
                        <button class="position-btn bg-green-100 hover:bg-green-200 p-4 md:p-6 rounded-2xl text-lg md:text-xl font-bold transition-all" data-position="وسط">
                            وسط الكلمة
                        </button>
                        <button class="position-btn bg-yellow-100 hover:bg-yellow-200 p-4 md:p-6 rounded-2xl text-lg md:text-xl font-bold transition-all" data-position="آخر">
                            آخر الكلمة
                        </button>
                    </div>
                    
                    <button id="skip-btn" class="mt-6 bg-gray-400 hover:bg-gray-500 text-white text-lg font-bold py-3 px-6 rounded-xl transition-all">
                        ⏭️ تخطي السؤال
                    </button>
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
        
        // زر التخطي
        const skipBtn = document.getElementById('skip-btn');
        if (skipBtn) {
            skipBtn.addEventListener('click', () => {
                audioManager.playClickSound();
                this.skipChallenge();
            });
        }
    }

    // إدخال نص
    renderTextInput(container) {
        const exercise = this.currentChallenge.exercises[0];
        
        // معالجة خاصة للسؤال 5: استبدل الحرف الملوّن
        if (this.currentChallenge.id === 'baa-replace-letter' || this.currentChallenge.id === 'jeem-replace-letter' || 
            this.currentChallenge.id === 'taa-replace-letter' || this.currentChallenge.id === 'meem-replace-letter') {
            this.renderReplaceLetterInput(container);
            return;
        }

        // معالجة خاصة للسؤال 6: احذف المقطع الملوّن - عرض الحرف الملون داخل الكلمة
        let wordDisplay = '';
        if (this.currentChallenge.id === 'baa-delete-syllable' || this.currentChallenge.id === 'taa-delete-syllable' || 
            this.currentChallenge.id === 'jeem-delete-syllable' || this.currentChallenge.id === 'meem-delete-syllable') {
            const word = exercise.word || exercise.displayOriginal;
            const deleteChar = exercise.delete;
            if (word && deleteChar) {
                // البحث عن الحرف مع أو بدون حركات (الحركات: َ ُ ِ ْ ّ)
                const arabicDiacritics = /[\u064B-\u065F\u0670]/g;
                const wordWithoutDiacritics = word.replace(arabicDiacritics, '');
                const indexInClean = wordWithoutDiacritics.indexOf(deleteChar);
                
                if (indexInClean !== -1) {
                    // العثور على الموضع الفعلي في الكلمة الأصلية
                    let actualIndex = 0;
                    let cleanIndex = 0;
                    for (let i = 0; i < word.length; i++) {
                        const char = word[i];
                        if (!/[\u064B-\u065F\u0670]/.test(char)) {
                            if (cleanIndex === indexInClean) {
                                actualIndex = i;
                                break;
                            }
                            cleanIndex++;
                        }
                    }
                    
                    // العثور على نهاية الحرف (قد يكون مع حركة)
                    let endIndex = actualIndex + 1;
                    while (endIndex < word.length && /[\u064B-\u065F\u0670]/.test(word[endIndex])) {
                        endIndex++;
                    }
                    
                    const beforeChar = word.substring(0, actualIndex);
                    const coloredChar = word.substring(actualIndex, endIndex);
                    const afterChar = word.substring(endIndex);
                    
                    wordDisplay = `<span class="text-gray-800 inline">${beforeChar}</span><span class="text-red-500 font-bold underline decoration-2 inline">${coloredChar}</span><span class="text-gray-800 inline">${afterChar}</span>`;
                } else {
                    wordDisplay = `<span class="text-gray-800">${word}</span> <span class="text-red-500 line-through mx-2">${deleteChar}</span>`;
                }
            } else {
                wordDisplay = `<span class="text-gray-800">${exercise.word || ''}</span> <span class="text-red-500 line-through mx-2">${exercise.delete || ''}</span>`;
            }
        } else {
            wordDisplay = `<span class="text-gray-800">${exercise.word || ''}</span> <span class="text-red-500 line-through mx-2">${exercise.delete || ''}</span>`;
        }

        container.innerHTML = `
            <div class="text-center max-w-3xl mx-auto px-2">
                <h2 class="text-2xl md:text-3xl font-bold text-purple-600 mb-3">${this.currentChallenge.title}</h2>
                <p class="text-lg md:text-xl text-gray-600 mb-6">${this.currentChallenge.description}</p>
                
                <div class="bg-white rounded-3xl p-4 md:p-8 shadow-lg mb-6">
                    <div class="text-3xl md:text-4xl font-bold mb-6 md:mb-8">
                        ${wordDisplay}
                    </div>
                    
                    <input 
                        type="text" 
                        id="answer-input" 
                        class="text-2xl md:text-3xl font-bold text-center p-3 md:p-4 border-4 border-purple-300 rounded-2xl w-48 md:w-64 focus:border-purple-500 outline-none"
                        placeholder="اكتب الإجابة"
                    />
                    
                    <button id="check-answer" class="block mx-auto mt-4 md:mt-6 bg-green-500 text-white text-lg md:text-xl font-bold py-3 md:py-4 px-6 md:px-8 rounded-2xl hover:bg-green-600 transition-all">
                        تحقق ✓
                    </button>
                    
                    <button id="skip-btn" class="block mx-auto mt-3 bg-gray-400 hover:bg-gray-500 text-white text-lg font-bold py-2 px-6 rounded-xl transition-all">
                        ⏭️ تخطي السؤال
                    </button>
                </div>
            </div>
        `;

        document.getElementById('check-answer').addEventListener('click', () => {
            const input = document.getElementById('answer-input');
            audioManager.playClickSound();
            
            // دالة لإزالة التشكيل من النص العربي
            const removeDiacritics = (text) => {
                return text.replace(/[\u064B-\u065F\u0670]/g, '');
            };
            
            const userAnswer = input.value.trim();
            const correctAnswer = exercise.answer;
            
            // قبول الإجابة مع أو بدون تشكيل
            const isCorrect = userAnswer === correctAnswer || 
                            removeDiacritics(userAnswer) === removeDiacritics(correctAnswer);
            
            if (isCorrect) {
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
        
        // زر التخطي
        const skipBtn = document.getElementById('skip-btn');
        if (skipBtn) {
            skipBtn.addEventListener('click', () => {
                audioManager.playClickSound();
                this.skipChallenge();
            });
        }
    }
    
    // معالج خاص للسؤال 5: استبدل الحرف الملوّن
    renderReplaceLetterInput(container) {
        const exercises = this.currentChallenge.exercises;
        let currentExerciseIndex = 0;
        
        const showExercise = () => {
            if (currentExerciseIndex >= exercises.length) return;
            
            const exercise = exercises[currentExerciseIndex];
            
            // بناء عرض الكلمة مع الحرف الملون داخلها
            const original = exercise.original || exercise.displayOriginal || '';
            const colored = exercise.colored || '';
            let wordDisplay = '';
            
            if (original && colored) {
                // إذا كان الحرف يظهر أكثر من مرة، استخدم آخر ظهور (مثل "باب" حيث نريد الباء الثانية)
                const firstIndex = original.indexOf(colored);
                const lastIndex = original.lastIndexOf(colored);
                const index = (firstIndex !== lastIndex) ? lastIndex : firstIndex;
                
                if (index !== -1) {
                    wordDisplay = `<span class="text-gray-800 inline">${original.substring(0, index)}</span><span class="text-red-500 font-bold text-4xl md:text-5xl underline decoration-2 inline">${colored}</span><span class="text-gray-800 inline">${original.substring(index + colored.length)}</span>`;
                } else {
                    // إذا لم يتم العثور على الحرف، استخدم الطريقة القديمة
                    wordDisplay = `<span class="text-red-500 font-bold text-4xl md:text-5xl inline">${colored}</span><span class="text-gray-800 inline">${original.replace(colored, '')}</span>`;
                }
            } else {
                wordDisplay = `<span class="text-red-500 font-bold text-4xl md:text-5xl inline">${colored}</span><span class="text-gray-800 inline">${original}</span>`;
            }
        
        container.innerHTML = `
            <div class="text-center max-w-3xl mx-auto px-2">
                <h2 class="text-2xl md:text-3xl font-bold text-purple-600 mb-3">${this.currentChallenge.title}</h2>
                <p class="text-lg md:text-xl text-gray-600 mb-6">${this.currentChallenge.description}</p>
                
                <div class="bg-white rounded-3xl p-4 md:p-8 shadow-lg mb-6">
                    <div class="text-3xl md:text-4xl font-bold mb-6 md:mb-8">
                        <span class="text-gray-800">الكلمة الأصلية: </span>
                        ${wordDisplay}
                    </div>
                    
                    <div class="text-2xl md:text-3xl text-purple-600 mb-4 md:mb-6">
                        استبدل <span class="text-red-500 font-bold">${exercise.colored}</span> بـ <span class="text-green-500 font-bold">${exercise.replacement}</span>
                    </div>
                    
                    <input 
                        type="text" 
                        id="answer-input" 
                        class="text-2xl md:text-3xl font-bold text-center p-3 md:p-4 border-4 border-purple-300 rounded-2xl w-48 md:w-64 focus:border-purple-500 outline-none"
                        placeholder="اكتب الكلمة الجديدة"
                    />
                    
                    <button id="check-answer" class="block mx-auto mt-4 md:mt-6 bg-green-500 text-white text-lg md:text-xl font-bold py-3 md:py-4 px-6 md:px-8 rounded-2xl hover:bg-green-600 transition-all">
                        تحقق ✓
                    </button>
                    
                    <button id="skip-btn" class="block mx-auto mt-3 bg-gray-400 hover:bg-gray-500 text-white text-lg font-bold py-2 px-6 rounded-xl transition-all">
                        ⏭️ تخطي السؤال
                    </button>
                    
                    ${exercises.length > 1 ? `<div class="mt-4 text-gray-500">تمرين ${currentExerciseIndex + 1} من ${exercises.length}</div>` : ''}
                </div>
            </div>
        `;
        
        document.getElementById('check-answer').addEventListener('click', () => {
            const input = document.getElementById('answer-input');
            audioManager.playClickSound();
            
            // دالة لإزالة التشكيل من النص العربي
            const removeDiacritics = (text) => {
                return text.replace(/[\u064B-\u065F\u0670]/g, '');
            };
            
            const userAnswer = input.value.trim();
            const correctAnswer = exercise.answer;
            
            // قبول الإجابة مع أو بدون تشكيل
            const isCorrect = userAnswer === correctAnswer || 
                            removeDiacritics(userAnswer) === removeDiacritics(correctAnswer);
            
            if (isCorrect) {
                input.classList.add('border-green-500', 'bg-green-50');
                
                // الانتقال للتمرين التالي أو إنهاء
                setTimeout(() => {
                    currentExerciseIndex++;
                    if (currentExerciseIndex < exercises.length) {
                        showExercise();
                    } else {
                        // معالجة خاصة لتحدي استبدال الحرف
                        this.handleReplaceSyllableSuccess();
                    }
                }, 1000);
            } else {
                input.classList.add('border-red-500', 'bg-red-50');
                this.handleWrongAnswer();
                
                setTimeout(() => {
                    input.value = '';
                    input.classList.remove('border-red-500', 'bg-red-50');
                }, 2000);
            }
        });
        
        // زر التخطي
        const skipBtn = document.getElementById('skip-btn');
        if (skipBtn) {
            skipBtn.addEventListener('click', () => {
                audioManager.playClickSound();
                this.skipChallenge();
            });
        }
        };
        
        showExercise();
    }

    // بناء الكلمات من المقاطع
    renderSyllableBuilder(container) {
        const exercise = this.currentChallenge.exercises[0];

        container.innerHTML = `
            <div class="text-center max-w-3xl mx-auto px-2">
                <h2 class="text-2xl md:text-3xl font-bold text-purple-600 mb-3">${this.currentChallenge.title}</h2>
                <p class="text-lg md:text-xl text-gray-600 mb-6">${this.currentChallenge.description}</p>
                
                <div class="bg-white rounded-3xl p-4 md:p-8 shadow-lg mb-6">
                    <div class="mb-6 md:mb-8">
                        <h3 class="text-lg md:text-xl font-bold text-gray-600 mb-3 md:mb-4">المقاطع المتاحة:</h3>
                        <div class="flex gap-2 md:gap-4 justify-center flex-wrap" id="syllables-container">
                            ${exercise.syllables.map((syllable, index) => `
                                <div class="syllable bg-purple-200 text-purple-800 text-2xl md:text-3xl font-bold px-4 md:px-6 py-3 md:py-4 rounded-2xl cursor-pointer hover:scale-110 transition-all" data-syllable="${syllable}" data-index="${index}">
                                    ${syllable}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="mb-6 md:mb-8">
                        <h3 class="text-lg md:text-xl font-bold text-gray-600 mb-3 md:mb-4">الكلمة:</h3>
                        <div id="word-builder" class="min-h-16 md:min-h-20 border-4 border-dashed border-purple-300 rounded-2xl p-3 md:p-4 flex gap-2 justify-center items-center bg-purple-50">
                            <p class="text-gray-400 text-base md:text-lg">انقر على المقاطع لبناء الكلمة</p>
                        </div>
                    </div>
                    
                    <button id="check-word" class="bg-green-500 text-white text-lg md:text-xl font-bold py-3 md:py-4 px-6 md:px-8 rounded-2xl hover:bg-green-600 transition-all">
                        تحقق ✓
                    </button>
                    
                    <button id="skip-btn" class="mt-3 bg-gray-400 hover:bg-gray-500 text-white text-lg font-bold py-2 px-6 rounded-xl transition-all">
                        ⏭️ تخطي السؤال
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
        
        // زر التخطي
        const skipBtn = document.getElementById('skip-btn');
        if (skipBtn) {
            skipBtn.addEventListener('click', () => {
                audioManager.playClickSound();
                this.skipChallenge();
            });
        }
    }

    // املأ الفراغ
    renderFillBlank(container) {
        const exercise = this.currentChallenge.exercises[0];

        container.innerHTML = `
            <div class="text-center max-w-3xl mx-auto px-2">
                <h2 class="text-2xl md:text-3xl font-bold text-purple-600 mb-3">${this.currentChallenge.title}</h2>
                <p class="text-lg md:text-xl text-gray-600 mb-6">${this.currentChallenge.description}</p>
                
                <div class="bg-white rounded-3xl p-4 md:p-8 shadow-lg mb-6">
                    <div class="text-3xl md:text-5xl font-bold mb-6 md:mb-8 text-gray-800">
                        ${exercise.word.replace('_', '<input type="text" class="inline-block w-12 md:w-16 text-center border-b-4 border-purple-500 bg-transparent outline-none" id="blank-input" />')}
                    </div>
                    
                    <button id="check-blank" class="bg-green-500 text-white text-lg md:text-xl font-bold py-3 md:py-4 px-6 md:px-8 rounded-2xl hover:bg-green-600 transition-all">
                        تحقق ✓
                    </button>
                    
                    <button id="skip-btn" class="mt-3 bg-gray-400 hover:bg-gray-500 text-white text-lg font-bold py-2 px-6 rounded-xl transition-all">
                        ⏭️ تخطي السؤال
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
        
        // زر التخطي
        const skipBtn = document.getElementById('skip-btn');
        if (skipBtn) {
            skipBtn.addEventListener('click', () => {
                audioManager.playClickSound();
                this.skipChallenge();
            });
        }
    }

    // معالجة خاصة للنجاح في تحدي الكلمة المختلفة (السؤال 1)
    handleDifferentWordSuccess() {
        this.score += this.currentChallenge.points || 10;
        this.correctAnswers++;
        
        // تشغيل صوت النجاح والتسجيل الصوتي
        audioManager.playSuccessSound();
        audioManager.playVoiceFile('audio/ahsntwasl.mp3');
        
        const message = 'احسنت واصل 🌟';
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
    
    // معالجة خاصة للنجاح في السؤال 2 (الحرف المتكرر)
    handleRepeatedLetterSuccess() {
        this.score += this.currentChallenge.points || 10;
        this.correctAnswers++;
        
        // تشغيل صوت النجاح والتسجيل الصوتي
        audioManager.playSuccessSound();
        audioManager.playVoiceFile('audio/hsantyabatal.mp3');
        
        const message = 'احسنت يا بطل 🌟';
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

    // معالجة خاصة للنجاح في تحدي استبدال المقطع (السؤال 5)
    handleReplaceSyllableSuccess() {
        this.score += this.currentChallenge.points || 10;
        this.correctAnswers++;
        
        // تشغيل صوت النجاح والتسجيل الصوتي
        audioManager.playSuccessSound();
        audioManager.playVoiceFile('audio/momtaz.mp3');
        
        const message = 'ممتاز 👏';
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

    // معالجة خاصة للنجاح في تحدي الموضع (السؤال 3)
    handlePositionSuccess() {
        this.score += this.currentChallenge.points || 10;
        this.correctAnswers++;
        
        // تشغيل صوت النجاح والتسجيل الصوتي
        audioManager.playSuccessSound();
        audioManager.playVoiceFile('audio/jiid.mp3');
        
        const message = 'جيد جدا 🌟';
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

    // معالجة خاصة للنجاح في تحدي حذف المقطع (السؤال 6)
    handleDeleteSyllableSuccess() {
        this.score += this.currentChallenge.points || 10;
        this.correctAnswers++;
        
        // تشغيل صوت النجاح والتسجيل الصوتي
        audioManager.playSuccessSound();
        audioManager.playVoiceFile('audio/ahsntwasl.mp3');
        
        const message = 'احسنت واصل 👏';
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

    // معالجة خاصة للنجاح في تحدي تكوين الكلمات (السؤال 4)
    handleBuildWordsSuccess() {
        this.score += this.currentChallenge.points || 10;
        this.correctAnswers++;
        
        // تشغيل صوت النجاح والتسجيل الصوتي
        audioManager.playSuccessSound();
        audioManager.playVoiceFile('audio/mmtazntamomiiz.mp3');
        
        const message = 'ممتاز انت مميز 💫';
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

    // معالجة خاصة للنجاح في تحدي املأ الفراغ (السؤال 7)
    handleFillBlankSuccess() {
        this.score += this.currentChallenge.points || 10;
        this.correctAnswers++;
        
        // تشغيل صوت النجاح والتسجيل الصوتي
        audioManager.playSuccessSound();
        audioManager.playVoiceFile('audio/jiid.mp3');
        
        const message = 'جيد جدا 🚀';
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
    
    // صفحة تفاعلية لكشف الحرف المستهدف
    showLetterRevealPage(letter, letterName, audioFile) {
        const container = document.getElementById('challenge-container');
        
        container.innerHTML = `
            <div class="fixed inset-0 flex items-center justify-center z-50 animate-fade-in overflow-hidden" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);">
                <!-- Animated Background Particles -->
                <div class="absolute inset-0 overflow-hidden">
                    <div class="particle particle-1"></div>
                    <div class="particle particle-2"></div>
                    <div class="particle particle-3"></div>
                    <div class="particle particle-4"></div>
                    <div class="particle particle-5"></div>
                    <div class="particle particle-6"></div>
                    <div class="particle particle-7"></div>
                    <div class="particle particle-8"></div>
                </div>
                
                <!-- Floating Confetti -->
                <div class="confetti-container">
                    <div class="confetti confetti-1">🎊</div>
                    <div class="confetti confetti-2">🎉</div>
                    <div class="confetti confetti-3">🎈</div>
                    <div class="confetti confetti-4">⭐</div>
                    <div class="confetti confetti-5">✨</div>
                    <div class="confetti confetti-6">🌟</div>
                    <div class="confetti confetti-7">💫</div>
                    <div class="confetti confetti-8">🎁</div>
                </div>
                
                <div class="text-center px-4 relative z-10">
                    <!-- العنوان الحماسي مع تأثير متوهج -->
                    <div class="mb-6">
                        <h1 class="text-6xl md:text-8xl font-black text-white mb-2 animate-bounce-in" 
                            style="text-shadow: 0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,215,0,0.6), 0 5px 15px rgba(0,0,0,0.3); 
                                   font-family: 'Arial Black', sans-serif;">
                            🎉 يا رفاق! 🎉
                        </h1>
                        <div class="text-2xl md:text-3xl font-bold text-yellow-200 animate-pulse-fast">
                            ✨ اكتشفنا الحرف المستهدف ✨
                        </div>
                    </div>
                    
                    <!-- الحرف الكبير مع دائرة متوهجة -->
                    <div class="relative inline-block my-8">
                        <!-- دائرة خلفية متوهجة -->
                        <div class="absolute inset-0 flex items-center justify-center">
                            <div class="glow-circle"></div>
                        </div>
                        
                        <!-- الحرف -->
                        <div class="relative z-10 letter-reveal" 
                             style="font-size: clamp(120px, 25vw, 280px); 
                                    font-weight: 900; 
                                    color: #fff;
                                    text-shadow: 
                                        0 0 30px rgba(255,255,255,1),
                                        0 0 60px rgba(255,215,0,0.8),
                                        0 0 90px rgba(255,165,0,0.6),
                                        0 10px 30px rgba(0,0,0,0.5);
                                    font-family: 'Arial Black', sans-serif;">
                            ${letter}
                        </div>
                        
                        <!-- جزيئات متطايرة محسّنة -->
                        <div class="sparkles-container">
                            <div class="sparkle sparkle-1">✨</div>
                            <div class="sparkle sparkle-2">⭐</div>
                            <div class="sparkle sparkle-3">🌟</div>
                            <div class="sparkle sparkle-4">💫</div>
                            <div class="sparkle sparkle-5">✨</div>
                            <div class="sparkle sparkle-6">⭐</div>
                            <div class="sparkle sparkle-7">🌟</div>
                            <div class="sparkle sparkle-8">💫</div>
                            <div class="sparkle sparkle-9">✨</div>
                            <div class="sparkle sparkle-10">⭐</div>
                        </div>
                    </div>
                    
                    <!-- النص التوضيحي مع تأثير قوس قزح -->
                    <h2 class="text-5xl md:text-7xl font-black mb-8 animate-rainbow" 
                        style="text-shadow: 
                            0 0 10px rgba(255,255,255,0.8),
                            0 5px 20px rgba(0,0,0,0.4);
                            font-family: 'Arial Black', sans-serif;">
                        هو حرف ${letterName}!
                    </h2>
                    
                    <!-- أيقونات احتفالية متحركة -->
                    <div class="flex justify-center items-center gap-4 mb-8 text-6xl md:text-7xl">
                        <span class="animate-bounce-emoji" style="animation-delay: 0s;">🎊</span>
                        <span class="animate-bounce-emoji" style="animation-delay: 0.2s;">🎈</span>
                        <span class="animate-bounce-emoji" style="animation-delay: 0.4s;">🎉</span>
                        <span class="animate-bounce-emoji" style="animation-delay: 0.6s;">🎁</span>
                        <span class="animate-bounce-emoji" style="animation-delay: 0.8s;">🎊</span>
                    </div>
                    
                    <!-- زر المتابعة محسّن -->
                    <button id="continueBtn" class="relative overflow-hidden bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 text-purple-900 text-2xl md:text-4xl font-black py-5 px-16 rounded-full hover:scale-110 transition-all duration-300 shadow-2xl animate-button-pulse"
                            style="text-shadow: 0 2px 4px rgba(0,0,0,0.2); border: 4px solid rgba(255,255,255,0.8);">
                        <span class="relative z-10">🚀 رائع! لنكمل 🚀</span>
                        <div class="button-shine"></div>
                    </button>
                </div>
            </div>
            
            <style>
                /* Background Particles */
                .particle {
                    position: absolute;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    animation: float-particle 20s infinite;
                }
                .particle-1 { width: 80px; height: 80px; top: 10%; left: 10%; animation-duration: 15s; }
                .particle-2 { width: 60px; height: 60px; top: 20%; right: 15%; animation-duration: 18s; animation-delay: 2s; }
                .particle-3 { width: 100px; height: 100px; bottom: 15%; left: 20%; animation-duration: 20s; animation-delay: 4s; }
                .particle-4 { width: 70px; height: 70px; bottom: 25%; right: 10%; animation-duration: 17s; animation-delay: 6s; }
                .particle-5 { width: 50px; height: 50px; top: 50%; left: 5%; animation-duration: 16s; animation-delay: 1s; }
                .particle-6 { width: 90px; height: 90px; top: 60%; right: 8%; animation-duration: 19s; animation-delay: 3s; }
                .particle-7 { width: 65px; height: 65px; top: 30%; left: 50%; animation-duration: 21s; animation-delay: 5s; }
                .particle-8 { width: 75px; height: 75px; bottom: 40%; right: 40%; animation-duration: 14s; animation-delay: 7s; }
                
                @keyframes float-particle {
                    0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.3; }
                    25% { transform: translate(50px, -50px) rotate(90deg); opacity: 0.6; }
                    50% { transform: translate(100px, 0) rotate(180deg); opacity: 0.3; }
                    75% { transform: translate(50px, 50px) rotate(270deg); opacity: 0.6; }
                }
                
                /* Confetti Animation */
                .confetti-container {
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                }
                .confetti {
                    position: absolute;
                    font-size: 2.5rem;
                    animation: fall-confetti 8s infinite;
                }
                .confetti-1 { left: 10%; animation-delay: 0s; }
                .confetti-2 { left: 20%; animation-delay: 1s; }
                .confetti-3 { left: 30%; animation-delay: 2s; }
                .confetti-4 { left: 40%; animation-delay: 3s; }
                .confetti-5 { left: 50%; animation-delay: 4s; }
                .confetti-6 { left: 60%; animation-delay: 5s; }
                .confetti-7 { left: 70%; animation-delay: 6s; }
                .confetti-8 { left: 80%; animation-delay: 7s; }
                
                @keyframes fall-confetti {
                    0% { top: -10%; transform: rotate(0deg); opacity: 1; }
                    100% { top: 110%; transform: rotate(720deg); opacity: 0; }
                }
                
                /* Glow Circle */
                .glow-circle {
                    width: 300px;
                    height: 300px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,215,0,0.3) 40%, transparent 70%);
                    animation: pulse-circle 2s ease-in-out infinite;
                }
                
                @keyframes pulse-circle {
                    0%, 100% { transform: scale(1); opacity: 0.6; }
                    50% { transform: scale(1.3); opacity: 0.3; }
                }
                
                /* Letter Reveal Animation */
                .letter-reveal {
                    animation: letter-appear 1s ease-out, letter-pulse 2s ease-in-out 1s infinite;
                }
                
                @keyframes letter-appear {
                    0% { transform: scale(0) rotate(-180deg); opacity: 0; }
                    60% { transform: scale(1.2) rotate(20deg); }
                    100% { transform: scale(1) rotate(0deg); opacity: 1; }
                }
                
                @keyframes letter-pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.08); }
                }
                
                /* Sparkles Enhanced */
                .sparkles-container {
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                }
                .sparkle {
                    position: absolute;
                    font-size: 2.5rem;
                    animation: sparkle-move 3s ease-in-out infinite;
                }
                
                @keyframes sparkle-move {
                    0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 1; }
                    50% { transform: translate(var(--tx), var(--ty)) rotate(180deg) scale(1.5); opacity: 0.6; }
                }
                
                .sparkle-1 { top: -20%; left: -20%; --tx: 20px; --ty: -40px; animation-delay: 0s; }
                .sparkle-2 { top: -20%; right: -20%; --tx: -20px; --ty: -40px; animation-delay: 0.3s; }
                .sparkle-3 { top: 50%; left: -30%; --tx: 30px; --ty: 0px; animation-delay: 0.6s; }
                .sparkle-4 { top: 50%; right: -30%; --tx: -30px; --ty: 0px; animation-delay: 0.9s; }
                .sparkle-5 { bottom: -20%; left: -20%; --tx: 20px; --ty: 40px; animation-delay: 1.2s; }
                .sparkle-6 { bottom: -20%; right: -20%; --tx: -20px; --ty: 40px; animation-delay: 1.5s; }
                .sparkle-7 { top: 10%; left: 50%; --tx: 0px; --ty: -30px; animation-delay: 1.8s; }
                .sparkle-8 { bottom: 10%; left: 50%; --tx: 0px; --ty: 30px; animation-delay: 2.1s; }
                .sparkle-9 { top: 30%; left: 10%; --tx: -20px; --ty: -20px; animation-delay: 2.4s; }
                .sparkle-10 { top: 30%; right: 10%; --tx: 20px; --ty: -20px; animation-delay: 2.7s; }
                
                /* Rainbow Text Animation */
                @keyframes rainbow-text {
                    0% { color: #ff6b6b; }
                    16% { color: #ffd93d; }
                    33% { color: #6bcf7f; }
                    50% { color: #4d96ff; }
                    66% { color: #a78bfa; }
                    83% { color: #ff6bcf; }
                    100% { color: #ff6b6b; }
                }
                
                .animate-rainbow {
                    animation: rainbow-text 3s linear infinite;
                }
                
                /* Bounce In Animation */
                @keyframes bounce-in {
                    0% { transform: scale(0); opacity: 0; }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1); opacity: 1; }
                }
                
                .animate-bounce-in {
                    animation: bounce-in 0.8s ease-out;
                }
                
                /* Emoji Bounce */
                @keyframes bounce-emoji {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-30px); }
                }
                
                .animate-bounce-emoji {
                    display: inline-block;
                    animation: bounce-emoji 1.5s ease-in-out infinite;
                }
                
                /* Button Pulse */
                @keyframes button-pulse {
                    0%, 100% { transform: scale(1); box-shadow: 0 20px 50px rgba(0,0,0,0.3); }
                    50% { transform: scale(1.05); box-shadow: 0 25px 60px rgba(0,0,0,0.4); }
                }
                
                .animate-button-pulse {
                    animation: button-pulse 2s ease-in-out infinite;
                }
                
                /* Button Shine Effect */
                .button-shine {
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
                    animation: shine 3s infinite;
                }
                
                @keyframes shine {
                    0% { left: -100%; }
                    50%, 100% { left: 100%; }
                }
                
                /* Fast Pulse */
                @keyframes pulse-fast {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.7; }
                }
                
                .animate-pulse-fast {
                    animation: pulse-fast 1s ease-in-out infinite;
                }
            </style>
        `;
        
        // تشغيل الصوت
        setTimeout(() => {
            audioManager.playVoiceFile(audioFile);
        }, 300);
        
        // زر المتابعة
        document.getElementById('continueBtn').addEventListener('click', () => {
            // تحديث النقاط
            this.updateScore();
            
            // الانتقال للتحدي التالي
            setTimeout(() => {
                this.nextChallenge();
            }, 500);
        });
    }

    // معالجة خاصة للنجاح في تحدي القلم
    handlePenHoldSuccess() {
        this.score += this.currentChallenge.points || 10;
        this.correctAnswers++;
        
        // تشغيل صوت النجاح والتسجيل الصوتي
        audioManager.playSuccessSound();
        audioManager.playVoiceFile('audio/momtaz.mp3');
        
        const message = 'ممتاز ✏️';
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
    
    // تخطي التحدي
    skipChallenge() {
        console.log('Skipping challenge:', this.currentChallenge.id);
        
        // عرض رسالة التخطي
        this.showFeedback('تم تخطي السؤال ⏭️', 'info');
        
        // الانتقال للتحدي التالي
        setTimeout(() => {
            this.nextChallenge();
        }, 1000);
    }
    
    // تقطيع الكلمات
    renderWordSegmentation(container) {
        const word = this.currentChallenge.word;
        const correctSegments = this.currentChallenge.segments;
        const emoji = this.currentChallenge.emoji || '📝';
        
        container.innerHTML = `
            <div class="text-center max-w-3xl mx-auto px-2">
                <h2 class="text-2xl md:text-3xl font-bold text-purple-600 mb-3">${this.currentChallenge.title}</h2>
                <p class="text-lg md:text-xl text-gray-600 mb-6">${this.currentChallenge.description}</p>
                
                <div class="bg-white rounded-3xl p-4 md:p-8 shadow-lg mb-6">
                    <!-- الكلمة الكاملة مع الإيموجي -->
                    <div class="mb-6 md:mb-8">
                        <div class="text-6xl md:text-8xl mb-4">${emoji}</div>
                        <div class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                            ${word}
                        </div>
                        <p class="text-lg md:text-xl text-purple-600">قطّع هذه الكلمة إلى مقاطع</p>
                    </div>
                    
                    <!-- منطقة التقطيع -->
                    <div class="mb-6 md:mb-8">
                        <h3 class="text-xl md:text-2xl font-bold text-gray-700 mb-4">المقاطع:</h3>
                        <div id="segments-display" class="flex gap-3 justify-center flex-wrap min-h-20 items-center">
                            <p class="text-gray-400 text-lg">اضغط على الكلمة أعلاه لتقطيعها</p>
                        </div>
                    </div>
                    
                    <!-- المقاطع المتاحة للاختيار -->
                    <div class="mb-6 md:mb-8">
                        <h3 class="text-xl md:text-2xl font-bold text-gray-700 mb-4">اختر المقاطع بالترتيب:</h3>
                        <div id="available-segments" class="flex gap-2 md:gap-3 justify-center flex-wrap">
                            ${this.shuffleArray([...correctSegments]).map((segment, index) => `
                                <button class="segment-btn bg-purple-200 hover:bg-purple-300 text-purple-800 text-2xl md:text-3xl font-bold px-4 md:px-6 py-3 md:py-4 rounded-2xl transition-all hover:scale-110" data-segment="${segment}">
                                    ${segment}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="flex gap-3 justify-center">
                        <button id="check-segmentation" class="bg-green-500 text-white text-lg md:text-xl font-bold py-3 md:py-4 px-6 md:px-8 rounded-2xl hover:bg-green-600 transition-all">
                            تحقق ✓
                        </button>
                        
                        <button id="reset-segmentation" class="bg-yellow-500 text-white text-lg md:text-xl font-bold py-3 md:py-4 px-6 md:px-8 rounded-2xl hover:bg-yellow-600 transition-all">
                            🔄 إعادة
                        </button>
                    </div>
                    
                    <button id="skip-btn" class="mt-3 bg-gray-400 hover:bg-gray-500 text-white text-lg font-bold py-2 px-6 rounded-xl transition-all">
                        ⏭️ تخطي السؤال
                    </button>
                </div>
            </div>
        `;
        
        let selectedSegments = [];
        const segmentsDisplay = document.getElementById('segments-display');
        const segmentButtons = container.querySelectorAll('.segment-btn');
        
        // معالج النقر على المقاطع
        segmentButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                audioManager.playClickSound();
                
                const segment = btn.dataset.segment;
                selectedSegments.push(segment);
                
                // مسح الرسالة الافتراضية
                if (selectedSegments.length === 1) {
                    segmentsDisplay.innerHTML = '';
                }
                
                // إضافة المقطع المختار
                const segmentEl = document.createElement('div');
                segmentEl.className = 'bg-green-200 text-green-800 text-2xl md:text-3xl font-bold px-4 md:px-5 py-3 md:py-4 rounded-2xl';
                segmentEl.textContent = segment;
                segmentsDisplay.appendChild(segmentEl);
                
                // تعطيل الزر
                btn.disabled = true;
                btn.style.opacity = '0.3';
                btn.style.pointerEvents = 'none';
            });
        });
        
        // زر التحقق
        document.getElementById('check-segmentation').addEventListener('click', () => {
            audioManager.playClickSound();
            
            // التحقق من صحة الترتيب
            const isCorrect = JSON.stringify(selectedSegments) === JSON.stringify(correctSegments);
            
            if (isCorrect) {
                segmentsDisplay.classList.add('ring-4', 'ring-green-500', 'bg-green-50', 'rounded-2xl', 'p-4');
                
                // معالجة خاصة لتحدي التقطيع
                this.handleWordSegmentationSuccess();
            } else {
                segmentsDisplay.classList.add('ring-4', 'ring-red-500', 'bg-red-50', 'rounded-2xl', 'p-4');
                this.handleWrongAnswer();
            }
        });
        
        // زر الإعادة
        document.getElementById('reset-segmentation').addEventListener('click', () => {
            audioManager.playClickSound();
            
            selectedSegments = [];
            segmentsDisplay.innerHTML = '<p class="text-gray-400 text-lg">اضغط على الكلمة أعلاه لتقطيعها</p>';
            segmentsDisplay.classList.remove('ring-4', 'ring-green-500', 'ring-red-500', 'bg-green-50', 'bg-red-50');
            
            // إعادة تفعيل جميع الأزرار
            segmentButtons.forEach(btn => {
                btn.disabled = false;
                btn.style.opacity = '1';
                btn.style.pointerEvents = 'auto';
            });
        });
        
        // زر التخطي
        const skipBtn = document.getElementById('skip-btn');
        if (skipBtn) {
            skipBtn.addEventListener('click', () => {
                audioManager.playClickSound();
                this.skipChallenge();
            });
        }
    }
    
    // دالة مساعدة لخلط المصفوفة
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    
    // معالجة خاصة للنجاح في تحدي التقطيع
    handleWordSegmentationSuccess() {
        this.score += this.currentChallenge.points || 10;
        this.correctAnswers++;
        
        audioManager.playSuccessSound();
        
        const message = 'ممتاز! أحسنت التقطيع! 🦆';
        this.showFeedback(message, 'success');
        
        this.updateScore();
        
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
    
    // حذف المقاطع التي لا تحتوي على الحرف
    renderDeleteSegments(container) {
        const word = this.currentChallenge.word;
        const allSegments = this.currentChallenge.allSegments;
        const deletableSegments = this.currentChallenge.deletableSegments;
        const protectedSegment = this.currentChallenge.protectedSegment;
        const emoji = this.currentChallenge.emoji || '📝';
        const letter = this.currentChallenge.letter || 'ب';
        
        // تحديد اسم الحرف
        const letterNames = {
            'ب': 'الباء',
            'ت': 'التاء',
            'ج': 'الجيم',
            'م': 'الميم'
        };
        const letterName = letterNames[letter] || 'الباء';
        
        let deletedSegments = [];
        
        container.innerHTML = `
            <div class="text-center max-w-3xl mx-auto px-2">
                <h2 class="text-2xl md:text-3xl font-bold text-purple-600 mb-3">${this.currentChallenge.title}</h2>
                <p class="text-lg md:text-xl text-gray-600 mb-6">${this.currentChallenge.description}</p>
                
                <div class="bg-white rounded-3xl p-4 md:p-8 shadow-lg mb-6">
                    <!-- الكلمة الكاملة مع الإيموجي -->
                    <div class="mb-6 md:mb-8">
                        <div class="text-6xl md:text-8xl mb-4">${emoji}</div>
                        <div class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                            ${word}
                        </div>
                    </div>
                    
                    <!-- المقاطع القابلة للحذف -->
                    <div class="mb-6 md:mb-8">
                        <h3 class="text-xl md:text-2xl font-bold text-gray-700 mb-4">المقاطع:</h3>
                        <p class="text-lg text-purple-600 mb-4">اضغط على المقاطع لحذفها (ما عدا ${letterName})</p>
                        <div id="segments-container" class="flex gap-3 justify-center flex-wrap">
                            ${allSegments.map((segment, index) => {
                                const isDeletable = deletableSegments.includes(segment);
                                const isProtected = segment === protectedSegment;
                                return `
                                    <div class="segment-item ${isDeletable ? 'deletable' : 'protected'}" data-segment="${segment}">
                                        <button class="segment-delete-btn bg-gradient-to-r ${isProtected ? 'from-green-200 to-green-300 cursor-not-allowed' : 'from-purple-200 to-pink-200 hover:from-red-300 hover:to-red-400'} text-gray-800 text-3xl md:text-4xl font-bold px-5 md:px-6 py-4 md:py-5 rounded-2xl transition-all hover:scale-110 border-4 border-transparent" data-segment="${segment}" ${!isDeletable ? 'disabled' : ''}>
                                            ${segment}
                                        </button>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                        <p class="text-sm md:text-base text-gray-500 mt-3">💡 ${letterName} محمي ولا يمكن حذفه</p>
                    </div>
                    
                    <button id="check-deletion" class="bg-green-500 text-white text-lg md:text-xl font-bold py-3 md:py-4 px-6 md:px-8 rounded-2xl hover:bg-green-600 transition-all">
                        تحقق ✓
                    </button>
                    
                    <button id="skip-btn" class="mt-3 bg-gray-400 hover:bg-gray-500 text-white text-lg font-bold py-2 px-6 rounded-xl transition-all">
                        ⏭️ تخطي السؤال
                    </button>
                </div>
            </div>
        `;
        
        const segmentButtons = container.querySelectorAll('.segment-delete-btn');
        
        segmentButtons.forEach(btn => {
            const segment = btn.dataset.segment;
            const isDeletable = deletableSegments.includes(segment);
            
            if (isDeletable) {
                btn.addEventListener('click', () => {
                    audioManager.playClickSound();
                    
                    // تشغيل الصوت الخاص بكل مقطع (السؤال 8)
                    if (this.currentChallenge.id === 'baa-delete-segments') {
                        console.log('🔊 حذف المقطع (الباء):', segment);
                        
                        const segmentAudios = {
                            'ال': 'audio/alb.mp3',
                            'حَ': 'audio/hab.mp3',
                            'لي': 'audio/lib.mp3'
                        };
                        
                        if (segmentAudios[segment]) {
                            console.log('✅ تشغيل الصوت:', segmentAudios[segment]);
                            audioManager.playVoiceFile(segmentAudios[segment]);
                        } else {
                            console.log('❌ لا يوجد صوت للمقطع:', segment, 'الأصوات المتاحة:', Object.keys(segmentAudios));
                        }
                    }
                    
                    // تشغيل الصوت الخاص بكل مقطع (السؤال 8 - حرف الجيم)
                    if (this.currentChallenge.id === 'jeem-delete-segments') {
                        console.log('🔊 حذف المقطع (الجيم):', segment);
                        
                        const segmentAudios = {
                            'ال': 'audio/al.mp3',
                            'مَ': 'audio/ma.mp3',
                            'ل': 'audio/lo.mp3'
                        };
                        
                        if (segmentAudios[segment]) {
                            console.log('✅ تشغيل الصوت:', segmentAudios[segment]);
                            audioManager.playVoiceFile(segmentAudios[segment]);
                        } else {
                            console.log('❌ لا يوجد صوت للمقطع:', segment, 'الأصوات المتاحة:', Object.keys(segmentAudios));
                        }
                    }
                    
                    // تشغيل الصوت الخاص بكل مقطع (السؤال 8 - حرف الميم)
                    if (this.currentChallenge.id === 'meem-delete-segments') {
                        console.log('🔊 حذف المقطع (الميم):', segment);
                        
                        const segmentAudios = {
                            'ال': 'audio/al.mp3',
                            'طَ': 'audio/ta.mp3',
                            'ر': 'audio/lo.mp3'
                        };
                        
                        if (segmentAudios[segment]) {
                            console.log('✅ تشغيل الصوت:', segmentAudios[segment]);
                            audioManager.playVoiceFile(segmentAudios[segment]);
                        } else {
                            console.log('❌ لا يوجد صوت للمقطع:', segment, 'الأصوات المتاحة:', Object.keys(segmentAudios));
                        }
                    }
                    
                    // تشغيل الصوت الخاص بكل مقطع (السؤال 8 - حرف التاء)
                    if (this.currentChallenge.id === 'taa-delete-segments') {
                        console.log('🔊 حذف المقطع (التاء):', segment);
                        
                        const segmentAudios = {
                            'ال': 'audio/al.mp3',
                            'ي': 'audio/lo.mp3',
                            'ن': 'audio/lo.mp3'
                        };
                        
                        if (segmentAudios[segment]) {
                            console.log('✅ تشغيل الصوت:', segmentAudios[segment]);
                            audioManager.playVoiceFile(segmentAudios[segment]);
                        } else {
                            console.log('❌ لا يوجد صوت للمقطع:', segment, 'الأصوات المتاحة:', Object.keys(segmentAudios));
                        }
                    }
                    
                    // حذف المقطع (إخفاؤه)
                    btn.style.opacity = '0';
                    btn.style.transform = 'scale(0)';
                    btn.style.transition = 'all 0.3s ease-out';
                    
                    setTimeout(() => {
                        btn.style.display = 'none';
                    }, 300);
                    
                    // إضافة للمحذوفات
                    if (!deletedSegments.includes(segment)) {
                        deletedSegments.push(segment);
                    }
                });
            } else {
                // الحرف محمي
                const letter = this.currentChallenge.letter || 'ب';
                const letterNames = {
                    'ب': 'الباء',
                    'ت': 'التاء',
                    'ج': 'الجيم',
                    'م': 'الميم'
                };
                const letterName = letterNames[letter] || 'الباء';
                
                btn.addEventListener('click', () => {
                    audioManager.playErrorSound();
                    
                    // تأثير اهتزاز
                    btn.classList.add('animate-shake-error');
                    
                    // رسالة
                    this.showFeedback(`لا يمكن حذف ${letterName}! 🦆`, 'error');
                    
                    setTimeout(() => {
                        btn.classList.remove('animate-shake-error');
                    }, 500);
                });
            }
        });
        
        // زر التحقق
        document.getElementById('check-deletion').addEventListener('click', () => {
            audioManager.playClickSound();
            
            // التحقق من حذف جميع المقاطع ما عدا الباء
            const allDeleted = deletableSegments.every(seg => deletedSegments.includes(seg));
            
            if (allDeleted) {
                // نجاح
                this.score += this.currentChallenge.points || 10;
                this.correctAnswers++;
                this.updateScore();
                
                audioManager.playSuccessSound();
                
                // إذا كان السؤال 8 لحرف الباء، نعرض الصفحة الخاصة
                if (this.currentChallenge.id === 'baa-delete-segments') {
                    setTimeout(() => {
                        this.showLetterRevealPage('ب', 'الباء', 'audio/rifakba.mp3');
                    }, 1000);
                    return;
                }
                
                // إذا كان السؤال 8 لحرف الجيم، نعرض الصفحة الخاصة
                if (this.currentChallenge.id === 'jeem-delete-segments') {
                    setTimeout(() => {
                        this.showLetterRevealPage('ج', 'الجيم', 'audio/rifakj.mp3');
                    }, 1000);
                    return;
                }
                
                // إذا كان السؤال 8 لحرف الميم، نعرض الصفحة الخاصة
                if (this.currentChallenge.id === 'meem-delete-segments') {
                    setTimeout(() => {
                        this.showLetterRevealPage('م', 'الميم', 'audio/rimim.mp3');
                    }, 1000);
                    return;
                }
                
                // إذا كان السؤال 8 لحرف التاء، نعرض الصفحة الخاصة
                if (this.currentChallenge.id === 'taa-delete-segments') {
                    setTimeout(() => {
                        this.showLetterRevealPage('ت', 'التاء', 'audio/rita.mp3');
                    }, 1000);
                    return;
                }
                
                const message = 'ممتاز! أبقيت على الحرف! 🦆';
                this.showFeedback(message, 'success');
                
                if (this.correctAnswers % 5 === 0) {
                    setTimeout(() => {
                        this.showReward();
                    }, 1500);
                } else {
                    setTimeout(() => {
                        this.nextChallenge();
                    }, 2000);
                }
            } else {
                audioManager.playErrorSound();
                const letter = this.currentChallenge.letter || 'ب';
                const letterNames = {
                    'ب': 'الباء',
                    'ت': 'التاء',
                    'ج': 'الجيم',
                    'م': 'الميم'
                };
                const letterName = letterNames[letter] || 'الباء';
                const remaining = deletableSegments.filter(seg => !deletedSegments.includes(seg));
                this.showFeedback(`احذف جميع المقاطع ما عدا ${letterName}! (باقي: ${remaining.join('، ')})`, 'error');
            }
        });
        
        // زر التخطي
        const skipBtn = document.getElementById('skip-btn');
        if (skipBtn) {
            skipBtn.addEventListener('click', () => {
                audioManager.playClickSound();
                this.skipChallenge();
            });
        }
    }
    
    // تحديد المقطع الذي يحتوي على الحرف
    renderFindLetterSegment(container) {
        const word = this.currentChallenge.word;
        const allSegments = this.currentChallenge.allSegments;
        const correctSegment = this.currentChallenge.correctSegment;
        const emoji = this.currentChallenge.emoji || '📝';
        
        container.innerHTML = `
            <div class="text-center max-w-3xl mx-auto px-2">
                <h2 class="text-2xl md:text-3xl font-bold text-purple-600 mb-3">${this.currentChallenge.title}</h2>
                <p class="text-lg md:text-xl text-gray-600 mb-6">${this.currentChallenge.description}</p>
                
                <div class="bg-white rounded-3xl p-4 md:p-8 shadow-lg mb-6">
                    <!-- الكلمة الكاملة مع الإيموجي -->
                    <div class="mb-6 md:mb-8">
                        <div class="text-6xl md:text-8xl mb-4">${emoji}</div>
                        <div class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                            ${word}
                        </div>
                        <p class="text-lg md:text-xl text-purple-600 mb-4">مقاطع الكلمة:</p>
                        <div class="flex gap-2 justify-center mb-4">
                            ${allSegments.map(seg => `
                                <div class="bg-gray-100 text-gray-600 text-2xl md:text-3xl font-bold px-4 py-3 rounded-xl border-2 border-gray-300">
                                    ${seg}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <!-- السؤال -->
                    <div class="mb-6 md:mb-8">
                        <h3 class="text-xl md:text-2xl font-bold text-gray-700 mb-4">اختر المقطع الذي يحتوي على حرف الباء:</h3>
                        <div id="segment-options" class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                            ${allSegments.map((segment, index) => `
                                <button class="segment-option-btn bg-purple-200 hover:bg-purple-300 text-purple-800 text-2xl md:text-3xl font-bold px-4 md:px-6 py-4 md:py-6 rounded-2xl transition-all hover:scale-110 border-4 border-transparent" data-segment="${segment}">
                                    ${segment}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                    
                    <button id="skip-btn" class="mt-3 bg-gray-400 hover:bg-gray-500 text-white text-lg font-bold py-2 px-6 rounded-xl transition-all">
                        ⏭️ تخطي السؤال
                    </button>
                </div>
            </div>
        `;
        
        const segmentButtons = container.querySelectorAll('.segment-option-btn');
        
        segmentButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                audioManager.playClickSound();
                
                const selectedSegment = btn.dataset.segment;
                const isCorrect = selectedSegment === correctSegment;
                
                // تعطيل جميع الأزرار
                segmentButtons.forEach(b => b.disabled = true);
                
                if (isCorrect) {
                    // إجابة صحيحة
                    btn.classList.add('bg-green-300', 'border-green-500', 'ring-4', 'ring-green-500');
                    
                    // إخفاء المقاطع الأخرى تدريجياً
                    segmentButtons.forEach(b => {
                        if (b !== btn) {
                            b.style.opacity = '0.3';
                            b.classList.add('line-through');
                        }
                    });
                    
                    // معالجة النجاح
                    setTimeout(() => {
                        this.score += this.currentChallenge.points || 10;
                        this.correctAnswers++;
                        this.updateScore();
                        
                        audioManager.playSuccessSound();
                        
                        const message = 'ممتاز! وجدت حرف الباء! 🦆';
                        this.showFeedback(message, 'success');
                        
                        if (this.correctAnswers % 5 === 0) {
                            setTimeout(() => {
                                this.showReward();
                            }, 1500);
                        } else {
                            setTimeout(() => {
                                this.nextChallenge();
                            }, 2000);
                        }
                    }, 1000);
                } else {
                    // إجابة خاطئة
                    btn.classList.add('bg-red-300', 'border-red-500', 'ring-4', 'ring-red-500');
                    this.handleWrongAnswer();
                    
                    // إعادة تفعيل الأزرار
                    setTimeout(() => {
                        segmentButtons.forEach(b => {
                            b.disabled = false;
                            b.classList.remove('bg-red-300', 'border-red-500', 'ring-4', 'ring-red-500');
                        });
                    }, 2000);
                }
            });
        });
        
        // زر التخطي
        const skipBtn = document.getElementById('skip-btn');
        if (skipBtn) {
            skipBtn.addEventListener('click', () => {
                audioManager.playClickSound();
                this.skipChallenge();
            });
        }
    }

    // عرض رسالة التغذية الراجعة
    showFeedback(message, type) {
        const feedbackEl = document.getElementById('feedback');
        if (!feedbackEl) return;

        let borderClass = 'border-4 border-red-400';
        let textClass = 'text-red-600';
        
        if (type === 'success') {
            borderClass = 'border-4 border-green-400';
            textClass = 'text-green-600';
        } else if (type === 'info') {
            borderClass = 'border-4 border-blue-400';
            textClass = 'text-blue-600';
        }

        feedbackEl.innerHTML = `
            <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-bounce">
                <div class="bg-white rounded-3xl shadow-2xl p-8 text-center ${borderClass}">
                    <p class="text-3xl font-bold ${textClass}">${message}</p>
                </div>
            </div>
        `;

        // Message shown visually - voice already played in handleWrongAnswer

        setTimeout(() => {
            feedbackEl.innerHTML = '';
        }, 2000);
    }

    // لعبة الضفدع - مسار منحني
    renderFrogGame(container) {
        container.innerHTML = `
            <div class="text-center px-2">
                <h2 class="text-2xl md:text-3xl font-bold text-purple-600 mb-3">${this.currentChallenge.title}</h2>
                <p class="text-lg md:text-xl text-gray-600 mb-6">${this.currentChallenge.description}</p>
                <p class="text-base md:text-lg text-purple-500 mb-3">ارسم مساراً منحنياً لمساعدة الضفدع في الوصول إلى الورقة 🐸</p>
                
                <div class="relative bg-gradient-to-br from-green-100 to-blue-100 rounded-3xl p-4 md:p-8 h-72 md:h-96 overflow-hidden" id="frog-game-area">
                    <!-- Canvas للرسم -->
                    <canvas id="frog-canvas" class="absolute inset-0 w-full h-full cursor-crosshair drawing-canvas" style="z-index: 10;"></canvas>
                    
                    <!-- Canvas للخطوط المتقطعة المرشدة -->
                    <canvas id="guide-path-canvas" class="absolute inset-0 w-full h-full" style="z-index: 2; pointer-events: none;"></canvas>
                    
                    <!-- الضفدع -->
                    <div id="frog" class="absolute text-4xl md:text-6xl cursor-pointer transition-all duration-500" style="bottom: 10%; left: 10%; z-index: 5;">
                        🐸
                    </div>
                    
                    <!-- ورقة الشجر -->
                    <div id="leaf" class="absolute text-4xl md:text-6xl" style="top: 10%; right: 10%; z-index: 5;">
                        🍃
                    </div>
                </div>
                
                <div class="mt-3 md:mt-4 flex flex-col sm:flex-row gap-2 md:gap-4 justify-center px-2">
                    <button id="clearFrogPath" class="bg-red-500 text-white text-base md:text-lg font-bold py-3 md:py-2 px-5 md:px-6 rounded-xl hover:bg-red-600 transition-all">
                        🗑️ امسح المسار
                    </button>
                    <button id="checkFrogPath" class="bg-green-500 text-white text-base md:text-lg font-bold py-3 md:py-2 px-5 md:px-6 rounded-xl hover:bg-green-600 transition-all">
                        ✅ تحقق من المسار
                    </button>
                </div>
                <div class="mt-3 flex justify-center">
                    <button id="skip-btn" class="bg-gray-400 hover:bg-gray-500 text-white text-lg font-bold py-2 px-6 rounded-xl transition-all">
                        ⏭️ تخطي السؤال
                    </button>
                </div>
            </div>
        `;

        this.setupFrogGameDrawing();

        // زر التخطي
        const skipBtn = document.getElementById('skip-btn');
        if (skipBtn) {
            skipBtn.addEventListener('click', () => {
                audioManager.playClickSound();
                this.skipChallenge();
            });
        }
    }

    // إعداد الرسم في لعبة الضفدع
    setupFrogGameDrawing() {
        const canvas = document.getElementById('frog-canvas');
        const ctx = canvas.getContext('2d');
        const gameArea = document.getElementById('frog-game-area');
        const frog = document.getElementById('frog');
        
        // Canvas للخطوط المرشدة
        const guideCanvas = document.getElementById('guide-path-canvas');
        const guideCtx = guideCanvas ? guideCanvas.getContext('2d') : null;
        
        let pathLength = 0;
        let startPoint = null;
        const targetPathLength = 350; // أطول قليلاً من لعبة السمكة
        
        // تعيين حجم Canvas
        const resizeCanvas = () => {
            const rect = gameArea.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
            
            if (guideCanvas) {
                guideCanvas.width = rect.width;
                guideCanvas.height = rect.height;
                drawGuidePath(guideCtx, rect.width, rect.height);
            }
            
            // تعيين خصائص الرسم - أخضر للضفدع
            ctx.strokeStyle = '#22c55e';
            ctx.lineWidth = 8;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.shadowColor = '#16a34a';
            ctx.shadowBlur = 4;
        };
        
        // رسم المسار المرشد المتقطع - قفزات الضفدع
        const drawGuidePath = (ctx, width, height) => {
            if (!ctx) return;
            
            ctx.clearRect(0, 0, width, height);
            
            // إعداد نمط الخط المتقطع
            ctx.strokeStyle = '#22c55e';
            ctx.lineWidth = 6;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.globalAlpha = 0.7;
            ctx.setLineDash([15, 10]); // خطوط متقطعة: 15 بكسل خط، 10 بكسل فراغ
            
            // رسم قفزات الضفدع (أقواس متتالية)
            const startX = width * 0.15;
            const startY = height * 0.85;
            const endX = width * 0.85;
            const endY = height * 0.15;
            
            // عدد القفزات
            const numberOfJumps = 5;
            
            // رسم كل قفزة كقوس
            for (let i = 0; i < numberOfJumps; i++) {
                ctx.beginPath();
                
                // نقطة بداية ونهاية كل قفزة
                const t1 = i / numberOfJumps;
                const t2 = (i + 1) / numberOfJumps;
                
                const x1 = startX + (endX - startX) * t1;
                const y1 = startY - (startY - endY) * t1;
                
                const x2 = startX + (endX - startX) * t2;
                const y2 = startY - (startY - endY) * t2;
                
                // نقطة التحكم لإنشاء القوس (أعلى من الخط المستقيم)
                const midX = (x1 + x2) / 2;
                const midY = (y1 + y2) / 2;
                const controlX = midX;
                const controlY = midY - 30; // القوس يرتفع 30 بكسل
                
                // رسم قوس القفزة
                ctx.moveTo(x1, y1);
                ctx.quadraticCurveTo(controlX, controlY, x2, y2);
                ctx.stroke();
            }
            
            // إعادة تعيين النمط
            ctx.setLineDash([]);
            ctx.globalAlpha = 1;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        let isDrawing = false;
        let hasDrawnPath = false;
        let lastX = 0;
        let lastY = 0;
        
        // دالة لتحريك الضفدع لموقع نهاية الخط المرسوم
        const updateFrogPosition = (x, y) => {
            const rect = canvas.getBoundingClientRect();
            
            // تحويل الإحداثيات إلى نسب مئوية من حجم منطقة اللعب
            const percentX = (x / rect.width) * 100;
            const percentY = (y / rect.height) * 100;
            
            // تحريك الضفدع لموقع آخر نقطة رسم
            frog.style.left = percentX + '%';
            frog.style.top = percentY + '%';
            frog.style.bottom = 'auto';
            
            // تأثير القفز
            const bounce = Math.abs(Math.sin(Date.now() / 150) * 5);
            frog.style.transform = `translate(-50%, -50%) translateY(-${bounce}px)`;
            frog.style.transition = 'left 0.1s ease-out, top 0.1s ease-out';
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
            
            audioManager.playDragSound();
        };
        
        // أثناء الرسم
        const draw = (e) => {
            if (!isDrawing) return;
            
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const dx = x - lastX;
            const dy = y - lastY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            pathLength += distance;
            
            lastX = x;
            lastY = y;
            
            ctx.lineTo(x, y);
            ctx.stroke();
            
            // تحديث موقع الضفدع لنهاية الخط المرسوم
            updateFrogPosition(x, y);
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
        
        // أحداث اللمس
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
        document.getElementById('clearFrogPath').addEventListener('click', () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            hasDrawnPath = false;
            pathLength = 0;
            startPoint = null;
            
            frog.style.left = '10%';
            frog.style.bottom = '10%';
            frog.style.transform = 'none';
            frog.style.transition = 'all 0.5s ease-out';
            
            audioManager.playClickSound();
        });
        
        // زر التحقق من المسار
        document.getElementById('checkFrogPath').addEventListener('click', () => {
            audioManager.playClickSound();
            
            if (!hasDrawnPath) {
                audioManager.playErrorSound();
                return;
            }
            
            if (pathLength < targetPathLength * 0.7) {
                audioManager.playErrorSound();
                this.showFeedback('ارسم مساراً أطول للضفدع! 🐸', 'error');
                return;
            }
            
            this.completeFrogAnimation();
        });
    }

    // إكمال حركة الضفدع
    completeFrogAnimation() {
        const frog = document.getElementById('frog');
        const leaf = document.getElementById('leaf');
        const canvas = document.getElementById('frog-canvas');
        const ctx = canvas.getContext('2d');
        
        // تحريك الضفدع للوصول للورقة
        frog.style.transition = 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
        frog.style.left = '90%';
        frog.style.bottom = '90%';
        frog.style.transform = 'translateY(0) rotate(0deg) scale(1.1)';
        
        // قفزات متعددة
        let jumpCount = 0;
        const jumpInterval = setInterval(() => {
            if (jumpCount < 5) {
                const jumpHeight = 15 - jumpCount * 3;
                frog.style.transform = `translateY(-${jumpHeight}px) scale(1.1)`;
                jumpCount++;
            } else {
                clearInterval(jumpInterval);
            }
        }, 250);
        
        // إزالة المسار تدريجياً
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
        
        // جسيمات النجاح
        setTimeout(() => {
            this.createFrogSuccessParticles();
        }, 1500);
        
        audioManager.playSuccessSound();
        audioManager.playVoiceFile('audio/mmtazntamomiiz.mp3');
        
        setTimeout(() => {
            this.score += this.currentChallenge.points || 10;
            this.correctAnswers++;
            this.updateScore();
            
            const message = 'ممتاز انت مميز 🐸';
            this.showFeedback(message, 'success');
            
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

    // جسيمات النجاح للضفدع
    createFrogSuccessParticles() {
        const leaf = document.getElementById('leaf');
        const gameArea = document.getElementById('frog-game-area');
        
        if (!leaf || !gameArea) return;
        
        const leafRect = leaf.getBoundingClientRect();
        const gameRect = gameArea.getBoundingClientRect();
        
        const particles = ['💚', '✨', '🌟', '⭐', '🍀', '💫', '🌿'];
        const particleCount = 10;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.textContent = particles[Math.floor(Math.random() * particles.length)];
            particle.className = 'absolute text-3xl pointer-events-none';
            particle.style.cssText = `
                left: ${(leafRect.left - gameRect.left) + (Math.random() * 60 - 30)}px;
                top: ${(leafRect.top - gameRect.top) + (Math.random() * 60 - 30)}px;
                animation: float-bubble ${1 + Math.random()}s ease-out forwards;
                animation-delay: ${i * 0.1}s;
                opacity: 0;
                z-index: 20;
            `;
            
            gameArea.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 2000 + (i * 100));
        }
        
        // تأثير توهج للورقة
        leaf.style.transform = 'scale(1.3)';
        leaf.style.filter = 'drop-shadow(0 0 20px rgba(34, 197, 94, 0.8))';
        leaf.style.transition = 'all 0.3s ease-out';
        
        setTimeout(() => {
            leaf.style.transform = 'scale(1)';
            leaf.style.filter = 'none';
        }, 800);
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

