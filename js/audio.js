// نظام المؤثرات الصوتية والتعليقات العربية
// Audio system with Arabic voice comments for children

class AudioManager {
    constructor() {
        this.audioContext = null;
        this.isSpeaking = false;
        this.initAudioContext();
        
        // قائمة التعليقات الصوتية العربية
        this.voiceFiles = {
            // Challenge voices - أصوات التحديات
            challenges: {
                'fish-game': 'voices/fish_challenge.mp3',
                'animal-matching': 'voices/animal_matching_challenge.mp3',
                'shadows': 'voices/shadows_challenge.mp3',
                'pen-hold': 'voices/pen_hold_challenge.mp3',
                'baa-different-word': 'voices/baa_different_word.mp3',
                'baa-replace-syllable': 'voices/baa_replace_syllable.mp3',
                'baa-position': 'voices/baa_position.mp3',
                'baa-delete-syllable': 'voices/baa_delete_syllable.mp3',
                'baa-build-words': 'voices/baa_build_words.mp3',
                'baa-fill-blank': 'voices/baa_fill_blank.mp3',
                'jeem-different-word': 'voices/jeem_different_word.mp3'
            },
            
            // Feedback voices - correct answers (randomized)
            correct: [
                'voices/correct_1.mp3',  // "أحسنت!"
                'voices/correct_2.mp3',  // "عمل رائع!"
                'voices/correct_3.mp3',  // "ممتاز!"
                'voices/correct_4.mp3',  // "برافو!"
                'voices/correct_5.mp3'   // "رائع جداً!"
            ],
            
            // Feedback voices - wrong answers (randomized)
            wrong: [
                'voices/wrong_1.mp3',    // "حاول مرة أخرى!"
                'voices/wrong_2.mp3',    // "خطأ، جرب من جديد!"
                'voices/wrong_3.mp3'     // "جرب مرة أخرى!"
            ],
            
            // Section completion
            sectionComplete: 'voices/section_complete.mp3', // "أحسنت! أكملت القسم"
            
            // Final completion
            gameComplete: 'voices/game_complete.mp3' // "مبروك! أكملت جميع التحديات"
        };
    }

    // تهيئة Audio Context
    initAudioContext() {
        if ('AudioContext' in window || 'webkitAudioContext' in window) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    // ===== SPEECH DISABLED =====
    speak(text, options = {}) {
        // No text-to-speech - using pre-recorded Arabic voices instead
    }

    selectBestArabicVoice(utterance) {
        // Disabled
    }
    // ===========================

    // ===== ARABIC VOICE COMMENTS =====
    
    // تشغيل صوت التحدي
    playChallengeVoice(challengeId) {
        const voiceFile = this.voiceFiles.challenges[challengeId];
        if (voiceFile) {
            this.playVoiceFile(voiceFile);
        }
    }
    
    // تشغيل صوت إجابة صحيحة (عشوائي)
    playCorrectVoice() {
        const randomIndex = Math.floor(Math.random() * this.voiceFiles.correct.length);
        const voiceFile = this.voiceFiles.correct[randomIndex];
        this.playVoiceFile(voiceFile);
    }
    
    // تشغيل صوت إجابة خاطئة (عشوائي)
    playWrongVoice() {
        const randomIndex = Math.floor(Math.random() * this.voiceFiles.wrong.length);
        const voiceFile = this.voiceFiles.wrong[randomIndex];
        this.playVoiceFile(voiceFile);
    }
    
    // تشغيل صوت إكمال القسم
    playSectionCompleteVoice() {
        this.playVoiceFile(this.voiceFiles.sectionComplete);
    }
    
    // تشغيل صوت إكمال اللعبة
    playGameCompleteVoice() {
        this.playVoiceFile(this.voiceFiles.gameComplete);
    }
    
    // تشغيل ملف صوتي عربي
    playVoiceFile(filename) {
        if (!filename) return;
        
        const audio = new Audio(filename);
        audio.volume = 0.8; // Volume suitable for voices
        audio.play().catch(error => {
            console.warn('Could not play voice file:', filename);
            console.warn('Make sure the MP3 file exists in the voices/ folder');
        });
    }

    // Legacy method (disabled)
    playAudioFile(filename) {
        // Disabled - use playVoiceFile instead
    }

    // ===== GENTLE SOUND EFFECTS =====
    
    // صوت نقر ناعم
    playClickSound() {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.value = 800;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.15, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.08);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.08);
    }

    // صوت نجاح
    playSuccessSound() {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        const frequencies = [523.25, 659.25, 783.99];
        let currentTime = this.audioContext.currentTime;

        frequencies.forEach((freq, index) => {
            oscillator.frequency.setValueAtTime(freq, currentTime + (index * 0.08));
        });

        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.3);
    }

    // صوت خطأ
    playErrorSound() {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.setValueAtTime(440, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(350, this.audioContext.currentTime + 0.15);

        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.15, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.15);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.15);
    }

    // صوت مكافأة
    playRewardSound() {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        const frequencies = [523.25, 659.25, 783.99, 1046.50];
        let currentTime = this.audioContext.currentTime;

        frequencies.forEach((freq, index) => {
            oscillator.frequency.setValueAtTime(freq, currentTime + (index * 0.1));
        });

        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.25, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.5);
    }

    // صوت انتقال
    playTransitionSound() {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.setValueAtTime(440, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(660, this.audioContext.currentTime + 0.15);

        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.12, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.15);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.15);
    }

    // صوت سحب
    playDragSound() {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.value = 550;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.08, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.05);
    }

    // صوت إفلات
    playDropSound() {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.value = 400;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.15, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }

    // إيقاف جميع الأصوات
    stopAll() {
        if (this.audioContext && this.audioContext.state === 'running') {
            // Context remains active
        }
    }
}

// إنشاء مثيل عام
const audioManager = new AudioManager();

// تصدير للاستخدام في ملفات أخرى
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AudioManager;
}
