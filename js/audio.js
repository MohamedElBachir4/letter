// نظام المؤثرات الصوتية والتعليقات العربية
// Audio system with Arabic voice comments for children

class AudioManager {
    constructor() {
        this.audioContext = null;
        this.isSpeaking = false;
        this.isAudioEnabled = false;
        this.initAudioContext();
        
        console.log('🎵 AudioManager initialized');
    }

    // تهيئة Audio Context
    initAudioContext() {
        try {
            if ('AudioContext' in window || 'webkitAudioContext' in window) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                console.log('🎵 AudioContext created, state:', this.audioContext.state);
            }
        } catch (error) {
            console.error('❌ Error creating AudioContext:', error);
        }
    }

    // تفعيل الصوت (يجب استدعاؤه عند أول تفاعل)
    enableAudio() {
        if (!this.isAudioEnabled && this.audioContext) {
            console.log('🔓 Enabling audio...');
            
            if (this.audioContext.state === 'suspended') {
                this.audioContext.resume().then(() => {
                    console.log('✅ AudioContext resumed, state:', this.audioContext.state);
                    this.isAudioEnabled = true;
                }).catch(error => {
                    console.error('❌ Error resuming AudioContext:', error);
                });
            } else {
                console.log('✅ AudioContext already running');
                this.isAudioEnabled = true;
            }
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
        // تم تعطيله - يتم استخدام playVoiceFile مباشرة
    }
    
    // تشغيل صوت إجابة صحيحة (عشوائي)
    playCorrectVoice() {
        // تم تعطيله - يتم استخدام playVoiceFile مباشرة
    }
    
    // تشغيل صوت إجابة خاطئة (عشوائي)
    playWrongVoice() {
        // تم تعطيله - يتم استخدام playVoiceFile مباشرة
    }
    
    // تشغيل صوت إكمال القسم
    playSectionCompleteVoice() {
        // تم تعطيله - يتم استخدام playVoiceFile مباشرة
    }
    
    // تشغيل صوت إكمال اللعبة
    playGameCompleteVoice() {
        // تم تعطيله - يتم استخدام playVoiceFile مباشرة
    }
    
    // تشغيل ملف صوتي عربي
    playVoiceFile(filename) {
        if (!filename) {
            console.warn('⚠️ No filename provided to playVoiceFile');
            return;
        }
        
        // تفعيل الصوت إذا لم يكن مفعلاً
        this.enableAudio();
        
        console.log('🔊 Attempting to play voice file:', filename);
        
        try {
            const audio = new Audio(filename);
            audio.volume = 0.8;
            audio.preload = 'auto';
            
            // Event listeners for debugging
            audio.addEventListener('loadstart', () => {
                console.log('📥 Loading:', filename);
            });
            
            audio.addEventListener('canplay', () => {
                console.log('▶️ Can play:', filename);
            });
            
            audio.addEventListener('playing', () => {
                console.log('✅ Now playing:', filename);
            });
            
            audio.addEventListener('error', (e) => {
                console.error('❌ Audio error for:', filename);
                console.error('Error code:', audio.error?.code);
                console.error('Error message:', audio.error?.message);
            });
            
            const playPromise = audio.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        console.log('✅ Play promise resolved:', filename);
                    })
                    .catch(error => {
                        console.error('❌ Play promise rejected:', filename);
                        console.error('Error:', error.name, '-', error.message);
                        
                        if (error.name === 'NotAllowedError') {
                            console.warn('⚠️ Audio blocked by browser. User interaction required.');
                        }
                    });
            }
        } catch (error) {
            console.error('❌ Exception in playVoiceFile:', error);
        }
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
