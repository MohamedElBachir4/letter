// بيانات التحديات والألعاب التعليمية

const challengesData = {
    // التدريبات البصرية الأولية
    visualTraining: [
        {
            id: 'fish-game',
            type: 'fish-path',
            title: '🐟 لعبة السمكة',
            description: 'ساعد السمكة للوصول إلى الحوض',
            points: 10,
            emoji: '🐟',
            // successAudio: تم تعطيل التسجيلات الصوتية
        },
        {
            id: 'animal-matching',
            type: 'matching',
            title: '🦁 ربط الحيوانات',
            description: 'اربط كل حيوان بالحيوان المشابه له',
            points: 10,
            pairs: [
                { id: 1, animal: '🦁', name: 'أسد' },
                { id: 2, animal: '🐘', name: 'فيل' },
                { id: 3, animal: '🦒', name: 'زرافة' }
            ],
            // successAudio: تم تعطيل التسجيلات الصوتية
        },
        {
            id: 'shadows',
            type: 'shadow-choice',
            title: '✈️ الظلال',
            description: 'اختر الظل الصحيح للطائرة',
            points: 10,
            question: 'ما هو الظل الصحيح؟',
            image: '✈️',
            shadowOptions: [
                { id: 1, image: 'del.png', correct: true, alt: 'ظل الطائرة', useEmoji: false },
                { id: 2, useEmoji: true, emoji: '🚗', correct: false, alt: 'ظل السيارة' },
                { id: 3, useEmoji: true, emoji: '🚢', correct: false, alt: 'ظل الباخرة' }
            ]
        },
        {
            id: 'pen-hold',
            type: 'multiple-choice',
            title: '✏️ كيف أمسك القلم؟',
            description: 'اختر الطريقة الصحيحة لإمساك القلم',
            points: 10,
            question: 'أي طريقة صحيحة لإمساك القلم؟',
            options: [
                { id: 1, text: '✋ الطريقة الأولى', correct: false, emoji: '❌' },
                { id: 2, text: '✍️ الطريقة الثانية', correct: true, emoji: '✅' },
                { id: 3, text: '🖐️ الطريقة الثالثة', correct: false, emoji: '❌' }
            ],
            // successAudio: تم تعطيل التسجيلات الصوتية
        }
    ],

    // تحديات حرف الباء
    letterBaa: [
        {
            id: 'baa-different-word',
            type: 'multiple-choice',
            title: 'حرف الباء - الكلمة المختلفة',
            description: 'اختر الكلمة التي لا تنتهي بنفس الحرف',
            letter: 'ب',
            points: 10,
            question: 'أي كلمة مختلفة؟',
            options: [
                { id: 1, text: 'ذَهَبَ', audio: 'ذَهَبَ', correct: false },
                { id: 2, text: 'كَتَبَ', audio: 'كَتَبَ', correct: false },
                { id: 3, text: 'يُجمَع', audio: 'يُجمَع', correct: true },
                { id: 4, text: 'لَعِبَ', audio: 'لَعِبَ', correct: false }
            ],
            // successAudio: تم تعطيل التسجيلات الصوتية
        },
        {
            id: 'baa-replace-syllable',
            type: 'drag-drop',
            title: 'حرف الباء - استبدال المقطع',
            description: 'استبدل المقطع الملوّن بمقطع "بَ"',
            letter: 'ب',
            points: 10,
            exercises: [
                { original: 'زَيْت', colored: 'زَ', replacement: 'بَ', answer: 'بَيْت' },
                { original: 'فُنْدُق', colored: 'فُ', replacement: 'بُ', answer: 'بُنْدُق' },
                { original: 'نَار', colored: 'نَ', replacement: 'بَ', answer: 'بَار' }
            ],
            // successAudio: تم تعطيل التسجيلات الصوتية
        },
        {
            id: 'baa-position',
            type: 'position-choice',
            title: 'حرف الباء - الموضع',
            description: 'ضع حرف الباء في المكان المناسب',
            letter: 'ب',
            points: 10,
            words: [
                { word: 'بَيْت', position: 'أول', correct: true },
                { word: 'كِتَاب', position: 'آخر', correct: true },
                { word: 'صَبَاح', position: 'وسط', correct: true }
            ],
            // successAudio: تم تعطيل التسجيلات الصوتية
        },
        {
            id: 'baa-delete-syllable',
            type: 'text-input',
            title: 'حرف الباء - حذف المقطع',
            description: 'احذف المقطع الملوّن واكتب الكلمة الجديدة',
            letter: 'ب',
            points: 10,
            exercises: [
                { word: 'بَيْت', delete: 'بَ', answer: 'يْت' },
                { word: 'كِتَاب', delete: 'ب', answer: 'كِتَا' }
            ],
            // successAudio: تم تعطيل التسجيلات الصوتية
        },
        {
            id: 'baa-build-words',
            type: 'syllable-builder',
            title: 'حرف الباء - تكوين الكلمات',
            description: 'كوّن كلمات من المقاطع',
            letter: 'ب',
            points: 10,
            exercises: [
                { syllables: ['بَ', 'يْ', 'ت'], answer: 'بَيْت' },
                { syllables: ['كِ', 'تَا', 'ب'], answer: 'كِتَاب' },
                { syllables: ['بَا', 'ب'], answer: 'بَاب' }
            ]
        },
        {
            id: 'baa-fill-blank',
            type: 'fill-blank',
            title: 'حرف الباء - املأ الفراغ',
            description: 'أضف الباء إلى الكلمة',
            letter: 'ب',
            points: 10,
            exercises: [
                { word: '_َيْت', answer: 'ب', complete: 'بَيْت' },
                { word: 'كِتَا_', answer: 'ب', complete: 'كِتَاب' },
                { word: '_َاب', answer: 'ب', complete: 'بَاب' }
            ]
        }
    ],

    // حوار حرف الباء
    letterBaaDialogue: {
        title: '🦊 حوار حرف الباء',
        characters: ['ثعلب', 'دب'],
        dialogue: [
            { speaker: 'ثعلب', text: 'مرحباً أيها الدب!', highlight: 'ب', audio: 'loup1.mp3' },
            { speaker: 'دب', text: 'أهلاً يا ثعلب الجميل', highlight: 'ب', audio: 'dob1.mp3' },
            { speaker: 'ثعلب', text: 'هل تحب اللعب؟', highlight: 'ب', audio: 'loup2.mp3' },
            { speaker: 'دب', text: 'ب ب ب... أحب اللعب كثيراً!', highlight: 'ب', audio: 'dob2.mp3' }
        ],
        emoji: { 'ثعلب': '🦊', 'دب': '🐻' }
    },

    // تحديات حرف الجيم
    letterJeem: [
        {
            id: 'jeem-different-word',
            type: 'multiple-choice',
            title: 'حرف الجيم - الكلمة المختلفة',
            description: 'اختر الكلمة التي لا تبدأ بحرف الجيم',
            letter: 'ج',
            points: 10,
            question: 'أي كلمة لا تبدأ بحرف الجيم؟',
            options: [
                { id: 1, text: 'جَمَل', audio: 'جَمَل', correct: false },
                { id: 2, text: 'جَوز', audio: 'جَوز', correct: false },
                { id: 3, text: 'فَراشة', audio: 'فَراشة', correct: true },
                { id: 4, text: 'جَميل', audio: 'جَميل', correct: false }
            ]
        },
        {
            id: 'jeem-replace-syllable',
            type: 'drag-drop',
            title: 'حرف الجيم - استبدال المقطع',
            description: 'استبدل المقطع الملوّن بمقطع "جَ"',
            letter: 'ج',
            points: 10,
            exercises: [
                { original: 'نَمَل', colored: 'نَ', replacement: 'جَ', answer: 'جَمَل' },
                { original: 'سَرَح', colored: 'سَ', replacement: 'جَ', answer: 'جَرَح' },
                { original: 'حَبَل', colored: 'حَ', replacement: 'جَ', answer: 'جَبَل' }
            ]
        },
        {
            id: 'jeem-position',
            type: 'position-choice',
            title: 'حرف الجيم - الموضع',
            description: 'حدد موضع حرف الجيم في الكلمة',
            letter: 'ج',
            points: 10,
            words: [
                { word: 'جَمَل', position: 'أول', correct: true },
                { word: 'مَنْهَج', position: 'آخر', correct: true },
                { word: 'سَجَّادة', position: 'وسط', correct: true }
            ]
        },
        {
            id: 'jeem-delete-syllable',
            type: 'text-input',
            title: 'حرف الجيم - حذف المقطع',
            description: 'احذف المقطع الملوّن واكتب الكلمة الجديدة',
            letter: 'ج',
            points: 10,
            exercises: [
                { word: 'جَمَل', delete: 'جَ', answer: 'مَل' },
                { word: 'مَنْهَج', delete: 'ج', answer: 'مَنْهَ' }
            ]
        },
        {
            id: 'jeem-build-words',
            type: 'syllable-builder',
            title: 'حرف الجيم - تكوين الكلمات',
            description: 'كوّن كلمات من المقاطع',
            letter: 'ج',
            points: 10,
            exercises: [
                { syllables: ['جَ', 'مَ', 'ل'], answer: 'جَمَل' },
                { syllables: ['جَ', 'ميل'], answer: 'جَميل' },
                { syllables: ['جَ', 'وْز'], answer: 'جَوْز' }
            ]
        },
        {
            id: 'jeem-fill-blank',
            type: 'fill-blank',
            title: 'حرف الجيم - املأ الفراغ',
            description: 'أضف الجيم إلى الكلمة',
            letter: 'ج',
            points: 10,
            exercises: [
                { word: '_َمَل', answer: 'ج', complete: 'جَمَل' },
                { word: 'مَنْهَ_', answer: 'ج', complete: 'مَنْهَج' },
                { word: '_َوْز', answer: 'ج', complete: 'جَوْز' }
            ]
        }
    ],

    // حوار حرف الجيم
    letterJeemDialogue: {
        title: '🦋 حوار حرف الجيم',
        characters: ['فراشة', 'جمل'],
        dialogue: [
            { speaker: 'فراشة', text: 'أعطني جوزة يا جمل', highlight: 'ج', audio: 'far1.mp3' },
            { speaker: 'جمل', text: 'ج ج ج... جميلة!', highlight: 'ج', audio: 'jam1.mp3' },
            { speaker: 'فراشة', text: 'شكراً يا جمل الكريم', highlight: 'ج', audio: 'far2.mp3' },
            { speaker: 'جمل', text: 'الجوز لذيذ جداً', highlight: 'ج', audio: 'jam2.mp3' }
        ],
        emoji: { 'فراشة': '🦋', 'جمل': '🐫' }
    },

    // رسائل التشجيع
    encouragement: {
        correct: [
            'أحسنت يا بطل! 🌟',
            'رائع جداً! تابع التعلم! ⭐',
            'ممتاز! أنت مميز! 🎉',
            'أنت مبدع حقاً! 💫',
            'برافو! عمل رائع! 👏',
            'عظيم! واصل التقدم! 🚀',
            'حسناً! إجابة صحيحة! ✨',
            'ممتاز جداً! فخور بك! 🏆',
            'برافو عليك! أحسنت! 🎊',
            'رائع! أنت بطل! 💪'
        ],
        wrong: [
            'حاول مجدداً! أنت قادر! 💪',
            'لا بأس، حاول مرة أخرى! 🔄',
            'تعلم من الخطأ وحاول ثانية! 📚',
            'قريب جداً! جرب مرة أخرى! 🎯',
            'لا تستسلم! حاول مرة أخرى! 🌟'
        ],
        milestone: [
            'رائع جداً! لقد حصلت على خمس إجابات صحيحة! 🎊',
            'ممتاز! أنت في الطريق الصحيح! 🏆',
            'مبروك! استمر بهذا الأداء الرائع! 🌟',
            'برافو! أنت بطل حقيقي! 👑'
        ]
    },

    // المكافآت
    rewards: [
        '🎈', '🎁', '⭐', '🌟', '💫', '✨', '🎊', '🎉', '🏆', '👑'
    ]
};

// تصدير البيانات
if (typeof module !== 'undefined' && module.exports) {
    module.exports = challengesData;
}

