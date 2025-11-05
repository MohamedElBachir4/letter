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
            id: 'frog-game',
            type: 'frog-path',
            title: '🐸 لعبة الضفدع',
            description: 'ساعد الضفدع للوصول إلى الورقة',
            points: 10,
            emoji: '🐸',
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

    // تحديات حرف الباء - نسخة مشوقة على نمط Duolingo
    letterBaa: [
        {
            id: 'baa-odd-word-out',
            type: 'multiple-choice',
            title: '🟠 السؤال 1: اشطب الكلمة الدخيلة',
            description: 'اختر الكلمة التي لا تحتوي على حرف الباء في نهايتها',
            letter: 'ب',
            points: 10,
            question: 'أي كلمة دخيلة؟ 🎯',
            options: [
                { id: 1, text: 'يَشرَبُ', audio: 'يَشرَبُ', correct: false, emoji: '💧' },
                { id: 2, text: 'يَضرِبُ', audio: 'يَضرِبُ', correct: false, emoji: '🥊' },
                { id: 3, text: 'يَهرُبُ', audio: 'يَهرُبُ', correct: false, emoji: '🏃' },
                { id: 4, text: 'يَجمَعُ', audio: 'يَجمَعُ', correct: true, emoji: '📦' }
            ]
        },
        {
            id: 'baa-repeated-letter',
            type: 'multiple-choice',
            title: '🟠 السؤال 2: ما الحرف المتكرر؟',
            description: 'ما هو الحرف الذي تكرّر في نهاية الكلمات التالية؟',
            letter: 'ب',
            points: 10,
            question: 'يَشرَبُ – يَضرِبُ – يَهرُبُ\nما الحرف المتكرر في النهاية؟',
            options: [
                { id: 1, text: 'ب', audio: 'ب', correct: true },
                { id: 2, text: 'ر', audio: 'ر', correct: false },
                { id: 3, text: 'م', audio: 'م', correct: false },
                { id: 4, text: 'ل', audio: 'ل', correct: false }
            ]
        },
        {
            id: 'baa-position-game',
            type: 'position-choice',
            title: '🟠 السؤال 3: حدّد موضع حرف الباء',
            description: 'اضغط على موقع حرف الباء في الكلمة',
            letter: 'ب',
            points: 10,
            words: [
                { word: 'بَرميل', position: 'أول', correct: true },
                { word: 'جَيب', position: 'آخر', correct: true },
                { word: 'صَنوبَر', position: 'وسط', correct: true }
            ]
        },
        {
            id: 'baa-build-word-syllables',
            type: 'syllable-builder',
            title: '🟠 السؤال 4: كوّن كلمة صحيحة',
            description: 'اسحب المقاطع بالترتيب لتكوين كلمة صحيحة',
            letter: 'ب',
            points: 10,
            exercises: [
                { syllables: ['م', 'ب', 'را', 'ة'], answer: 'مبراة', displayWord: 'مبراة' }
            ]
        },
        {
            id: 'baa-replace-letter',
            type: 'text-input',
            title: '🟠 السؤال 5: استبدل الحرف الملوّن',
            description: 'استبدل الحرف الملوّن بحرف الباء واكتب الكلمة الجديدة',
            letter: 'ب',
            points: 10,
            exercises: [
                { original: 'زَيت', colored: 'زَ', replacement: 'بَ', answer: 'بيت' }
            ]
        },
        {
            id: 'baa-delete-syllable',
            type: 'text-input',
            title: '🟠 السؤال 6: احذف المقطع الملوّن',
            description: 'احذف المقطع الملوّن واكتب الكلمة الجديدة',
            letter: 'ب',
            points: 10,
            exercises: [
                { word: 'سِباحة', delete: 'ب', answer: 'ساحة', displayOriginal: 'سِباحة' }
            ]
        },
        {
            id: 'baa-add-letter',
            type: 'fill-blank',
            title: '🟠 السؤال 7: أضف حرف الباء',
            description: 'أضف حرف الباء إلى الكلمة لتكوين كلمة جديدة',
            letter: 'ب',
            points: 10,
            exercises: [
                { word: '_َحيرة', answer: 'ب', complete: 'بَحيرة', hint: 'حِيرة → بَحيرة' },
                { word: '_َلونة', answer: 'ب', complete: 'بَلونة', hint: 'لونة → بَلونة' }
            ]
        },
        {
            id: 'baa-delete-segments',
            type: 'delete-segments',
            title: '🟠 السؤال 8: احذف المقاطع التي لا تحتوي على حرف الباء',
            description: 'اضغط على المقاطع لحذفها، واترك حرف الباء فقط',
            letter: 'ب',
            points: 10,
            word: 'البَطَّة',
            allSegments: ['ال', 'بَ', 'طَّ', 'ة'],
            deletableSegments: ['ال', 'طَّ', 'ة'],
            protectedSegment: 'بَ',
            emoji: '🦆'
        }
    ],

    // تحديات حرف الجيم - نسخة مشوقة على نمط Duolingo
    letterJeem: [
        {
            id: 'jeem-odd-word-out',
            type: 'multiple-choice',
            title: '🟠 السؤال 1: اشطب الكلمة الدخيلة',
            description: 'اختر الكلمة التي لا تحتوي على حرف الجيم',
            letter: 'ج',
            points: 10,
            question: 'أي كلمة دخيلة؟ 🎯',
            options: [
                { id: 1, text: 'جَمَل', audio: 'جَمَل', correct: false, emoji: '🐪' },
                { id: 2, text: 'جَرَس', audio: 'جَرَس', correct: false, emoji: '🔔' },
                { id: 3, text: 'جَوْز', audio: 'جَوْز', correct: false, emoji: '🥥' },
                { id: 4, text: 'باب', audio: 'باب', correct: true, emoji: '🚪' }
            ]
        },
        {
            id: 'jeem-repeated-letter',
            type: 'multiple-choice',
            title: '🟠 السؤال 2: ما الحرف المتكرر؟',
            description: 'ما هو الحرف الذي تكرّر في نهاية الكلمات التالية؟',
            letter: 'ج',
            points: 10,
            question: 'يَخرُجُ – يَمزُجُ – يَنسُجُ\nما الحرف المتكرر في النهاية؟',
            options: [
                { id: 1, text: 'ج', audio: 'ج', correct: true },
                { id: 2, text: 'ر', audio: 'ر', correct: false },
                { id: 3, text: 'س', audio: 'س', correct: false },
                { id: 4, text: 'م', audio: 'م', correct: false }
            ]
        },
        {
            id: 'jeem-position-game',
            type: 'position-choice',
            title: '🟠 السؤال 3: حدّد موضع حرف الجيم',
            description: 'اضغط على موقع حرف الجيم في الكلمة',
            letter: 'ج',
            points: 10,
            words: [
                { word: 'جَمَل', position: 'أول', correct: true },
                { word: 'سَجّادَة', position: 'وسط', correct: true },
                { word: 'ثَلْج', position: 'آخر', correct: true }
            ]
        },
        {
            id: 'jeem-build-word-syllables',
            type: 'syllable-builder',
            title: '🟠 السؤال 4: كوّن كلمة صحيحة',
            description: 'اسحب المقاطع بالترتيب لتكوين كلمة صحيحة',
            letter: 'ج',
            points: 10,
            exercises: [
                { syllables: ['م', 'ج', 'ل', 'ة'], answer: 'مجلة', displayWord: 'مجلة' }
            ]
        },
        {
            id: 'jeem-replace-letter',
            type: 'text-input',
            title: '🟠 السؤال 5: استبدل الحرف الملوّن',
            description: 'استبدل الحرف الملوّن بحرف الجيم واكتب الكلمة الجديدة',
            letter: 'ج',
            points: 10,
            exercises: [
                { original: 'حِبال', colored: 'حِ', replacement: 'جِ', answer: 'جبال' },
                { original: 'نُسور', colored: 'نُ', replacement: 'جُ', answer: 'جسور' }
            ]
        },
        {
            id: 'jeem-delete-syllable',
            type: 'text-input',
            title: '🟠 السؤال 6: احذف المقطع الملوّن',
            description: 'احذف المقطع الملوّن واكتب الكلمة الجديدة',
            letter: 'ج',
            points: 10,
            exercises: [
                { word: 'حزائر', delete: 'ح', answer: 'جزائر', displayOriginal: 'حزائر' }
            ]
        },
        {
            id: 'jeem-add-letter',
            type: 'fill-blank',
            title: '🟠 السؤال 7: أضف حرف الجيم',
            description: 'أضف حرف الجيم إلى الكلمة لتكوين كلمة جديدة',
            letter: 'ج',
            points: 10,
            exercises: [
                { word: '_َمَل', answer: 'ج', complete: 'جَمَل', hint: 'مل → جَمَل' },
                { word: '_َوْزَة', answer: 'ج', complete: 'جَوْزَة', hint: 'وزة → جَوْزَة' }
            ]
        },
        {
            id: 'jeem-delete-segments',
            type: 'delete-segments',
            title: '🟠 السؤال 8: احذف المقاطع التي لا تحتوي على حرف الجيم',
            description: 'اضغط على المقاطع لحذفها، واترك حرف الجيم فقط',
            letter: 'ج',
            points: 10,
            word: 'الجَمَل',
            allSegments: ['ال', 'جَ', 'مَ', 'ل'],
            deletableSegments: ['ال', 'مَ', 'ل'],
            protectedSegment: 'جَ',
            emoji: '🐪'
        }
    ],

    // حوار حرف الجيم - نسخة مشوقة على نمط Duolingo
    letterJeemDialogue: {
        title: '🦋 حوار حرف الجيم - الفراشة والجمل',
        characters: ['فراشة', 'جمل'],
        dialogue: [
            { speaker: 'فراشة', text: 'قالتِ الفَراشَةُ: خُذْ جَرَسِي وَأَعْطِنِي جَوْزَةً يا جَمَلُ.', highlight: 'ج', audio: 'fara.mp3' },
            { speaker: 'جمل', text: 'قالَ الجَمَلُ: جَ جَ جَ... فِكْرَةٌ جَميلَةٌ!', highlight: 'ج', audio: 'jam.mp3' }
        ],
        emoji: { 'فراشة': '🦋', 'جمل': '🐪' }
    },

    // مقدمة حرف الباء - قصة بصورة وصوت (استبدال الحوار السابق)
    letterBaaDialogue: {
        type: 'image-story',
        title: '📖 قصة حرف الباء',
        slides: [
            {
                image: 'im1.png',
                audio: 'vo1.mp3',
                storyText: 'كانَ يا ما كانَ، كانتْ هناكَ بَطبوطَةٌ جميلةٌ تعيشُ معَ أُمِّها في بيتٍ كبيرٍ، كانتْ تُحبُّها كثيرًا وتعتني بها.'
            },
            {
                image: 'im2.png',
                audio: 'vo2.mp3',
                storyText: 'كانت بَطبوطَةُ بَدينَةً تُحبُّ أكلَ الجُبنِ والبيضِ والبُندقِ والبُرتُقالِ والبِطيخِ والبِسكويتِ، وتُحبُّ شُربَ الحليبِ مِن ضَرعِ البَقَرَةِ.'
            },
            {
                image: 'im3.png',
                audio: 'vo3.mp3',
                storyText: 'كانت أُمُّها تَربِطُها بحَبْلٍ، تَخافُ عليها مِن أَكْلِ الذِّئابِ والكِلابِ.'
            },
            {
                image: 'im4.png',
                audio: 'vo4.mp3',
                storyText: 'ذاتَ مَرَّةٍ هَرَبَتْ مِنَ البَيْتِ وذَهَبَتْ إلى حَفْلَةِ ثَعْلُوبِ الماكرِ.'
            },
            {
                image: 'im5.png',
                audio: 'vo5.mp3',
                storyText: 'وعندما هَرَبَتْ، وَصَلَتْ إلى الغابَةِ، فَوَجَدَتْ نَفْسَها في مَكانٍ فيه سُكونٌ.'
            },
            {
                image: 'im6.png',
                audio: 'vo6.mp3',
                storyText: 'فَصارَتْ تَبكي، وصَوتُها يَقولُ: أَبْ... أَبْ... أَبْ.'
            },
            {
                image: 'im7.png',
                audio: 'vo7.mp3',
                storyText: 'سَمِعَتْها أُمُّها، فَجاءَتْ تَجري، وفَتَحَتْ يَدَها وفَمَها، وصارَ صَوتُها يَقولُ: بَ... بَ...'
            },
            {
                image: 'im8.png',
                audio: 'vo8.mp3',
                storyText: 'ثُمَّ ضَمَّتْها، فَصارَ صَوتُها يَقولُ: بُ... بُ...'
            },
            {
                image: 'im9.png',
                audio: 'vo9.mp3',
                storyText: 'وعندما ضَمَّتْها، تَكَسَّرَتْ رِجلُها، فَصارَ صَوتُها يَقولُ: بِ... بِ... بِ...'
            },
            {
                image: 'im10.png',
                audio: 'vo10.mp3',
                storyText: 'أَعطَتْها عَصًا لِتَتَّكِئَ عَلَيها، فَصارَ صَوتُها يَقولُ: با... با... با...'
            },
            {
                image: 'im11.png',
                audio: 'vo11.mp3',
                storyText: 'لم تَستَطِعِ المَشيَ بالعَصا، فَجَرَّتْها بِحَبلٍ، فَصارَ صَوتُها يَقولُ: بُو... بُو...'
            },
            {
                image: 'im12.png',
                audio: 'vo12.mp3',
                storyText: 'حينَها قالَتْ لِأُمِّها: لا أستَطيعُ المَشيَ، فَأَحضَرَتْ لَها عَرَبَةً صَغيرَةً وَوَضَعَتْها فيها، فَصَارَتْ تُشْبِهُ بَيْبي، فَفَرِحَتْ كَثيرًا وَقالَتْ: أَنا صِرْتُ بي... بي... بي...'
            }
        ]
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
        ],
        letterComplete: {
            'ب': '🎉 أحسنت يا بطل الباء! 🎉\n\nلقد أتقنت حرف الباء! 🌟',
            'ج': '🥳 رائع! 🥳\n\nلقد أتقنت حرف الجيم بنجاح! 🌟'
        }
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

