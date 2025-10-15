// السكريبت الرئيسي للتطبيق

class GameController {
    constructor() {
        this.currentSection = 'intro';
        this.challengeQueue = [];
        this.currentChallengeIndex = 0;
        this.gameState = {
            score: 0,
            correctAnswers: 0,
            completedChallenges: []
        };
        
        this.init();
    }

    init() {
        // تحميل البيانات وبدء اللعبة
        this.loadGameState();
        this.setupEventListeners();
        this.showIntroScreen();
    }

    // تحميل حالة اللعبة من localStorage
    loadGameState() {
        const saved = localStorage.getItem('letterGameState');
        if (saved) {
            this.gameState = JSON.parse(saved);
        }
    }

    // حفظ حالة اللعبة
    saveGameState() {
        localStorage.setItem('letterGameState', JSON.stringify(this.gameState));
    }

    // إعداد مستمعي الأحداث
    setupEventListeners() {
        document.addEventListener('challengeComplete', (e) => {
            console.log('Challenge complete event received', e.detail);
            this.gameState.score = e.detail.score;
            this.gameState.correctAnswers = e.detail.correctAnswers;
            this.saveGameState();
            
            // الانتقال للتحدي التالي
            setTimeout(() => {
                console.log('Loading next challenge after delay');
                this.loadNextChallenge();
            }, 500);
        });
    }

    // عرض شاشة البداية
    showIntroScreen() {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <div class="text-center max-w-4xl mx-auto animate-fade-in">
                <div class="bg-white rounded-3xl shadow-2xl p-12 mb-8">
                    <div class="text-8xl mb-6">👦📖</div>
                    <h1 class="text-5xl font-bold text-purple-600 mb-6">تدريبات بصرية</h1>
                    <p class="text-2xl text-gray-600 mb-8">استعد لبدء مغامرة تعليمية ممتعة!</p>
                    
                    <button id="start-training" class="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-3xl font-bold py-6 px-12 rounded-2xl hover:scale-105 transition-all shadow-lg">
                        🎮 ابدأ التدريبات
                    </button>
                </div>
                
                <!-- شريط التقدم -->
                <div class="bg-white rounded-2xl p-6 shadow-lg">
                    <div class="flex justify-between items-center">
                        <div class="text-center">
                            <div class="text-3xl mb-2">⭐</div>
                            <div class="text-xl font-bold text-purple-600">النقاط</div>
                            <div class="text-2xl font-bold" id="score">${this.gameState.score}</div>
                        </div>
                        <div class="text-center">
                            <div class="text-3xl mb-2">✅</div>
                            <div class="text-xl font-bold text-green-600">الإجابات الصحيحة</div>
                            <div class="text-2xl font-bold">${this.gameState.correctAnswers}</div>
                        </div>
                        <div class="text-center">
                            <div class="text-3xl mb-2">🏆</div>
                            <div class="text-xl font-bold text-yellow-600">التحديات</div>
                            <div class="text-2xl font-bold">${this.gameState.completedChallenges.length}</div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('start-training').addEventListener('click', () => {
            audioManager.playClickSound();
            // Start training without voice - challenges will announce themselves
            this.startVisualTraining();
        });
    }

    // بدء التدريبات البصرية
    startVisualTraining() {
        this.currentSection = 'visualTraining';
        this.challengeQueue = [...challengesData.visualTraining];
        this.currentChallengeIndex = 0;
        
        this.loadNextChallenge();
    }

    // تحميل التحدي التالي
    loadNextChallenge() {
        console.log(`Loading challenge ${this.currentChallengeIndex + 1}/${this.challengeQueue.length}`);
        
        if (this.currentChallengeIndex >= this.challengeQueue.length) {
            console.log('All challenges completed, proceeding to next section');
            // الانتقال للقسم التالي
            this.proceedToNextSection();
            return;
        }

        const challenge = this.challengeQueue[this.currentChallengeIndex];
        console.log(`Current challenge: ${challenge.title}`);
        this.currentChallengeIndex++;

        this.renderChallengePage(challenge);
    }

    // عرض صفحة التحدي
    renderChallengePage(challenge) {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <div class="max-w-6xl mx-auto">
                <!-- الرأسية -->
                <div class="bg-white rounded-2xl shadow-lg p-4 mb-6 flex justify-between items-center">
                    <div class="flex gap-6">
                        <div class="text-center">
                            <span class="text-2xl">⭐</span>
                            <span class="text-xl font-bold text-purple-600 mr-2" id="score">${this.gameState.score}</span>
                        </div>
                        <div class="text-center">
                            <span class="text-2xl">🎯</span>
                            <span class="text-xl font-bold text-green-600 mr-2">${this.currentChallengeIndex}/${this.challengeQueue.length}</span>
                        </div>
                    </div>
                    
                    <button id="home-btn" class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-6 rounded-xl transition-all">
                        🏠 الرئيسية
                    </button>
                </div>

                <!-- منطقة التحدي -->
                <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl shadow-2xl p-8">
                    <div id="challenge-container"></div>
                </div>

                <!-- منطقة التغذية الراجعة -->
                <div id="feedback"></div>
            </div>
        `;

        // زر العودة للرئيسية
        document.getElementById('home-btn').addEventListener('click', () => {
            audioManager.playClickSound();
            window.location.href = 'index.html';
        });

        // بدء التحدي
        challengeManager.score = this.gameState.score;
        challengeManager.correctAnswers = this.gameState.correctAnswers;
        challengeManager.startChallenge(challenge);
    }

    // الانتقال للقسم التالي
    proceedToNextSection() {
        if (this.currentSection === 'visualTraining') {
            this.showSectionComplete('التدريبات البصرية', () => {
                this.showPhonicsIntro();
            });
        } else if (this.currentSection === 'phonicsIntro') {
            this.showLetterBaaDialogue();
        } else if (this.currentSection === 'letterBaaDialogue') {
            this.startLetterBaa();
        } else if (this.currentSection === 'letterBaa') {
            this.showSectionComplete('حرف الباء', () => {
                this.showLetterJeemDialogue();
            });
        } else if (this.currentSection === 'letterJeemDialogue') {
            this.startLetterJeem();
        } else if (this.currentSection === 'letterJeem') {
            this.showFinalCongratulations();
        }
    }

    // عرض إكمال القسم
    showSectionComplete(sectionName, onContinue) {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <div class="text-center max-w-4xl mx-auto animate-fade-in">
                <div class="bg-white rounded-3xl shadow-2xl p-12">
                    <div class="text-9xl mb-6">🎉</div>
                    <h1 class="text-5xl font-bold text-purple-600 mb-6">أحسنت!</h1>
                    <p class="text-2xl text-gray-600 mb-8">لقد أكملت ${sectionName} بنجاح!</p>
                    
                    <div class="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8 mb-8">
                        <div class="grid grid-cols-2 gap-6">
                            <div>
                                <div class="text-5xl mb-2">⭐</div>
                                <div class="text-xl text-gray-600">النقاط</div>
                                <div class="text-4xl font-bold text-purple-600">${this.gameState.score}</div>
                            </div>
                            <div>
                                <div class="text-5xl mb-2">✅</div>
                                <div class="text-xl text-gray-600">إجابات صحيحة</div>
                                <div class="text-4xl font-bold text-green-600">${this.gameState.correctAnswers}</div>
                            </div>
                        </div>
                    </div>
                    
                    <button id="continue-btn" class="bg-gradient-to-r from-green-500 to-blue-500 text-white text-3xl font-bold py-6 px-12 rounded-2xl hover:scale-105 transition-all shadow-lg">
                        🚀 المتابعة
                    </button>
                </div>
            </div>
        `;

        audioManager.playRewardSound();
        audioManager.playSectionCompleteVoice(); // Arabic: "أحسنت! أكملت القسم"

        document.getElementById('continue-btn').addEventListener('click', () => {
            audioManager.playClickSound();
            if (onContinue) onContinue();
        });
    }

    // عرض مقدمة مهارات الوعي الصوتي
    showPhonicsIntro() {
        this.currentSection = 'phonicsIntro';
        
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <div class="text-center max-w-4xl mx-auto animate-fade-in">
                <div class="bg-white rounded-3xl shadow-2xl p-12">
                    <div class="text-8xl mb-6">🎵📚</div>
                    <h1 class="text-5xl font-bold text-purple-600 mb-6">مهارات الوعي الصوتي الخطي</h1>
                    <p class="text-2xl text-gray-600 mb-8">الآن سنتعلم الحروف بطريقة ممتعة!</p>
                    
                    <button id="start-phonics" class="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-3xl font-bold py-6 px-12 rounded-2xl hover:scale-105 transition-all shadow-lg">
                        🎯 ابدأ التحدي
                    </button>
                </div>
            </div>
        `;

        // Visual message shown - no voice needed here

        document.getElementById('start-phonics').addEventListener('click', () => {
            audioManager.playClickSound();
            this.showLetterBaaDialogue();
        });
    }

    // بدء تحديات حرف الباء
    startLetterBaa() {
        this.currentSection = 'letterBaa';
        this.challengeQueue = [...challengesData.letterBaa];
        this.currentChallengeIndex = 0;
        
        this.loadNextChallenge();
    }

    // عرض حوار حرف الباء
    showLetterBaaDialogue() {
        this.currentSection = 'letterBaaDialogue';
        const dialogue = challengesData.letterBaaDialogue;
        
        this.showDialogue(dialogue, () => {
            this.proceedToNextSection();
        });
    }

    // بدء تحديات حرف الجيم
    startLetterJeem() {
        this.currentSection = 'letterJeem';
        this.challengeQueue = [...challengesData.letterJeem];
        this.currentChallengeIndex = 0;
        
        this.loadNextChallenge();
    }

    // عرض حوار حرف الجيم
    showLetterJeemDialogue() {
        this.currentSection = 'letterJeemDialogue';
        const dialogue = challengesData.letterJeemDialogue;
        
        this.showDialogue(dialogue, () => {
            this.proceedToNextSection();
        });
    }

    // عرض الحوار
    showDialogue(dialogueData, onComplete) {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <div class="text-center max-w-4xl mx-auto animate-fade-in">
                <div class="bg-white rounded-3xl shadow-2xl p-12">
                    <h1 class="text-4xl font-bold text-purple-600 mb-8">${dialogueData.title}</h1>
                    
                    <div id="dialogue-container" class="space-y-6 mb-8">
                        <!-- سيتم ملؤها ديناميكياً -->
                    </div>
                    
                    <button id="continue-dialogue" class="bg-gradient-to-r from-green-500 to-blue-500 text-white text-2xl font-bold py-4 px-8 rounded-2xl hover:scale-105 transition-all shadow-lg">
                        التالي ➡️
                    </button>
                </div>
            </div>
        `;

        let dialogueIndex = 0;
        const dialogueContainer = document.getElementById('dialogue-container');
        
        const showNextDialogue = () => {
            if (dialogueIndex >= dialogueData.dialogue.length) {
                document.getElementById('continue-dialogue').textContent = 'إنهاء الحوار ✓';
                document.getElementById('continue-dialogue').onclick = () => {
                    audioManager.playClickSound();
                    if (onComplete) onComplete();
                };
                return;
            }

            const line = dialogueData.dialogue[dialogueIndex];
            const emoji = dialogueData.emoji[line.speaker];
            
            // تظليل الحرف المستهدف
            const highlightedText = line.text.replace(
                new RegExp(line.highlight, 'g'), 
                `<span class="text-red-500 font-bold text-4xl">${line.highlight}</span>`
            );
            
            const dialogueEl = document.createElement('div');
            dialogueEl.className = 'bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 text-right animate-fade-in';
            dialogueEl.innerHTML = `
                <div class="flex items-center gap-4">
                    <div class="text-5xl">${emoji}</div>
                    <div class="flex-1">
                        <div class="font-bold text-xl text-gray-700 mb-2">${line.speaker}</div>
                        <div class="text-2xl text-gray-800">${highlightedText}</div>
                    </div>
                </div>
            `;
            
            dialogueContainer.appendChild(dialogueEl);
            
            // تشغيل الملف الصوتي للحوار إذا كان موجوداً
            if (line.audio) {
                setTimeout(() => {
                    audioManager.playVoiceFile(line.audio);
                }, 300);
            }
            
            dialogueIndex++;
        };

        showNextDialogue();

        document.getElementById('continue-dialogue').addEventListener('click', () => {
            audioManager.playClickSound();
            showNextDialogue();
        });
    }

    // عرض التهاني النهائية
    showFinalCongratulations() {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <div class="text-center max-w-4xl mx-auto animate-fade-in">
                <div class="bg-white rounded-3xl shadow-2xl p-12">
                    <div class="text-9xl mb-6">🏆👑🎉</div>
                    <h1 class="text-5xl font-bold text-purple-600 mb-6">مبروك يا بطل!</h1>
                    <p class="text-2xl text-gray-600 mb-8">لقد أكملت جميع التحديات بنجاح!</p>
                    
                    <div class="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-8 mb-8">
                        <div class="text-6xl font-bold text-purple-600 mb-4">${this.gameState.score}</div>
                        <div class="text-2xl text-gray-700">مجموع النقاط</div>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4 mb-8">
                        <div class="bg-green-50 rounded-xl p-6">
                            <div class="text-4xl mb-2">✅</div>
                            <div class="text-xl font-bold text-green-600">${this.gameState.correctAnswers}</div>
                            <div class="text-gray-600">إجابات صحيحة</div>
                        </div>
                        <div class="bg-blue-50 rounded-xl p-6">
                            <div class="text-4xl mb-2">🎯</div>
                            <div class="text-xl font-bold text-blue-600">${this.gameState.completedChallenges.length}</div>
                            <div class="text-gray-600">تحديات مكتملة</div>
                        </div>
                    </div>
                    
                    <div class="flex gap-4 justify-center">
                        <button id="play-again" class="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl font-bold py-4 px-8 rounded-2xl hover:scale-105 transition-all shadow-lg">
                            🔄 العب مجدداً
                        </button>
                        <button id="go-home" class="bg-gradient-to-r from-green-500 to-blue-500 text-white text-2xl font-bold py-4 px-8 rounded-2xl hover:scale-105 transition-all shadow-lg">
                            🏠 الرئيسية
                        </button>
                    </div>
                </div>
            </div>
        `;

        audioManager.playRewardSound();
        audioManager.playGameCompleteVoice(); // Arabic: "مبروك! أكملت جميع التحديات"

        document.getElementById('play-again').addEventListener('click', () => {
            audioManager.playClickSound();
            this.resetGame();
            this.showIntroScreen();
        });

        document.getElementById('go-home').addEventListener('click', () => {
            audioManager.playClickSound();
            window.location.href = 'index.html';
        });
    }

    // إعادة تعيين اللعبة
    resetGame() {
        this.gameState = {
            score: 0,
            correctAnswers: 0,
            completedChallenges: []
        };
        this.saveGameState();
        this.currentChallengeIndex = 0;
    }
}

// بدء اللعبة عند تحميل الصفحة
let gameController;

document.addEventListener('DOMContentLoaded', () => {
    gameController = new GameController();
});

