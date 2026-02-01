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
                { id: 1, image: 'images/del.png', correct: true, alt: 'ظل الطائرة', useEmoji: false },
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
            word: 'تَشْرَبُ البَطَّةُ الحَلِيبَ',
            allSegments: ['ال', 'حَ', 'لي', 'بَ'],
            deletableSegments: ['ال', 'حَ', 'لي'],
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
                { syllables: ['ج', 'م', 'ة', 'ل'], answer: 'مجلة', displayWord: 'مجلة' }
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
                { original: 'حبال', colored: 'ح', replacement: 'ج', answer: 'جبال' },
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
                { word: 'جزائر', delete: 'ج', answer: 'زائر', displayOriginal: 'جزائر' }
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
            word: 'يَلْعَبُ الجَمَلُ مَعَ الفَرَاشَةِ.',
            allSegments: ['ال', 'ج', 'م', 'ل'],
            deletableSegments: ['ال', 'م', 'ل'],
            protectedSegment: 'ج',
            emoji: '🐪'
        }
    ],

    // حوار حرف الجيم - قصة بصورة وصوت
    letterJeemDialogue: {
        type: 'image-story',
        title: '📖 قصة حرف الجيم',
        slides: [
            {
                image: 'images/j1.png',
                audio: 'audio/j1.mp3',
                storyText: 'كانَ هُناكَ جَمَلٌ جميلٌ يَتجوَّلُ ويُغَنّي بصوتِهِ الجميل، وكانَ يقول: «أَجْ! أَجْ! أَجْ!»'
            },
            {
                image: 'images/j2.png',
                audio: 'audio/j2n.mp3',
                storyText: 'وكانت فراشةٌ بَنَفْسَجِيّةٌ جميلة تَحومُ فوقَه، فقالت له: أَنتَ جَ… جَ… جَميل! خُذْ جَرَسي، وأَعْطِني جَوْزَةً يا جَمَل. فقال الجملُ: لَقَد أَبْهَجتِني! تَعالي أَضُمُّكِ… جَ! جَ! جَ!'
            },
            {
                image: 'images/j3.png',
                audio: 'audio/j3n.mp3',
                storyText: 'وعندما ضَمَّها، تَكَسَّرَ جَناحُها، وصارَ صَوْتُها يقول: «جَ! جَ! جَ!» فَبَكَتْ وتَصْرُخُ مِن الألَم. أَعطاها الجملُ عَصًا، فصارَ صَوْتُها: «جا! جا!»'
            },
            {
                image: 'images/j4.png',
                audio: 'audio/j4.mp3',
                storyText: 'ولَمْ تَسْتَطِعِ الطَّيرانَ، فَرَبَطَها الجملُ بِحَبْلٍ، فصارَ صَوْتُها: «چو! چو!» زادَ الألمُ في رِجْلِها، فقالت له: خُذْني إلى أُمّي… «جي! جي!»'
            }
        ]
    },

    // تحديات حرف الميم - نسخة مشوقة على نمط Duolingo
    letterMeem: [
        {
            id: 'meem-odd-word-out',
            type: 'multiple-choice',
            title: '🟠 السؤال 1: اشطب الكلمة الدخيلة',
            description: 'اختر الكلمة التي لا تحتوي على حرف الميم',
            letter: 'م',
            points: 10,
            question: 'أي كلمة دخيلة؟ 🎯',
            options: [
                { id: 1, text: 'سنجاب', audio: 'سنجاب', correct: true, emoji: '🐿️' },
                { id: 2, text: 'مَطَر', audio: 'مَطَر', correct: false, emoji: '🌧️' },
                { id: 3, text: 'مَظَلَّة', audio: 'مَظَلَّة', correct: false, emoji: '☂️' },
                { id: 4, text: 'مَرْكَب', audio: 'مَرْكَب', correct: false, emoji: '🚢' }
            ]
        },
        {
            id: 'meem-repeated-letter',
            type: 'multiple-choice',
            title: '🟠 السؤال 2: ما الحرف المتكرر؟',
            description: 'ما هو الحرف الذي تكرّر في نهاية الكلمات التالية؟',
            letter: 'م',
            points: 10,
            question: 'يَكرُمُ – يَسلُمُ – يَعلَمُ\nما الحرف المتكرر في النهاية؟',
            options: [
                { id: 1, text: 'م', audio: 'م', correct: true },
                { id: 2, text: 'ر', audio: 'ر', correct: false },
                { id: 3, text: 'س', audio: 'س', correct: false },
                { id: 4, text: 'ل', audio: 'ل', correct: false }
            ]
        },
        {
            id: 'meem-position-game',
            type: 'position-choice',
            title: '🟠 السؤال 3: حدّد موضع حرف الميم',
            description: 'اضغط على موقع حرف الميم في الكلمة',
            letter: 'م',
            points: 10,
            words: [
                { word: 'عمر', position: 'وسط', correct: true },
                { word: 'سَمَك', position: 'وسط', correct: true },
                { word: 'كَلِم', position: 'آخر', correct: true }
            ]
        },
        {
            id: 'meem-build-word-syllables',
            type: 'syllable-builder',
            title: '🟠 السؤال 4: كوّن كلمة صحيحة',
            description: 'اسحب المقاطع بالترتيب لتكوين كلمة صحيحة',
            letter: 'م',
            points: 10,
            exercises: [
                { syllables: ['ر', 'م', 'ط'], answer: 'مطر', displayWord: 'مطر' }
            ]
        },
        {
            id: 'meem-replace-letter',
            type: 'text-input',
            title: '🟠 السؤال 5: استبدل الحرف الملوّن',
            description: 'استبدل الحرف الملوّن بحرف الميم واكتب الكلمة الجديدة',
            letter: 'م',
            points: 10,
            exercises: [
                { original: 'بال', colored: 'ب', replacement: 'م', answer: 'مال', displayOriginal: 'بال' },
                { original: 'نَصْر', colored: 'نَ', replacement: 'مَ', answer: 'مَصْر', displayOriginal: 'نَصْر' }
            ]
        },
        {
            id: 'meem-delete-syllable',
            type: 'text-input',
            title: '🟠 السؤال 6: احذف المقطع الملوّن',
            description: 'احذف المقطع الملوّن واكتب الكلمة الجديدة',
            letter: 'م',
            points: 10,
            exercises: [
                { word: 'مكتب', delete: 'م', answer: 'كتب', displayOriginal: 'مكتب' }
            ]
        },
        {
            id: 'meem-add-letter',
            type: 'fill-blank',
            title: '🟠 السؤال 7: أضف حرف الميم',
            description: 'أضف حرف الميم إلى الكلمة لتكوين كلمة جديدة',
            letter: 'م',
            points: 10,
            exercises: [
                { word: '_َطَر', answer: 'م', complete: 'مَطَر', hint: 'طر → مَطَر' },
                { word: '_َرْكَب', answer: 'م', complete: 'مَرْكَب', hint: 'ركب → مَرْكَب' }
            ]
        },
        {
            id: 'meem-delete-segments',
            type: 'delete-segments',
            title: '🟠 السؤال 8: احذف المقاطع التي لا تحتوي على حرف الميم',
            description: 'اضغط على المقاطع لحذفها، واترك حرف الميم فقط',
            letter: 'م',
            points: 10,
            word: 'تَرْسُمُ النَّمْلَةُ شَمْسًا',
            allSegments: ['تر', 'س', 'م'],
            deletableSegments: ['تر', 'س'],
            protectedSegment: 'م',
            emoji: '🌧️'
        }
    ],

    // حوار حرف الميم - قصة بصورة وصوت
    letterMeemDialogue: {
        type: 'image-story',
        title: '📖 قصة حرف الميم',
        slides: [
            {
                image: 'images/n1.png',
                audio: 'audio/n1.mp3',
                storyText: 'كانت هناك نَمْلَةٌ رَسّامَةٌ مُتَنَقِّلَة، حَطَّتْ رِحالَها في مَرْعًى جميلٍ. كانت تَرْسُمُ: ☀️ شَمْسًا ⛵ مَرْكَبًا ⚓ مِرْسَاةً'
            },
            {
                image: 'images/n2.png',
                audio: 'audio/n2.mp3',
                storyText: 'فَأَتَتْها مَعَزَةٌ، وقالت لها: اِرْسُميني يا نَمْلَة! فقالت النملة: أَنا مَشغولة، أُكْمِلُ رَسمي أَوَّلًا. فَبَدَأَتِ المَعَزَةُ تَبكي، وصَوْتُها يَقول: «أَمْ! أَمْ! أَمْ!» فَفَتَحَتِ النَّمْلَةُ يَدَها، وقالت: مَ… مَ… ماذا بِكِ؟'
            },
            {
                image: 'images/n3.png',
                audio: 'audio/n3n.mp3',
                storyText: 'ثُمَّ قالت لها: سَأَضُمُّكِ يا صَغيرتي. وعندما ضَمَّتْها، صارَ صَوْتُ المَعَزَةِ: «مَ! مَ! مَ!» ولكن عندما ضَمَّتها، تَكَسَّرَتْ رِجْلُ النَّمْلَةِ! فَصَارَتْ تَصرُخُ وتقول: «مَ! مَ! مَ!» فأَعطَتْها المَعَزَةُ عَصًا لِتَتَّكِئَ عَلَيْها، وعندما حَمَلَتِ النملةُ العَصا، صارَ صوتُها: «ما! ما! ما!»'
            },
            {
                image: 'images/n4.png',
                audio: 'audio/n4n.mp3',
                storyText: 'فَضَحِكَتِ المَعَزَةُ وقالت: هاهاها! هذا صَوْتي! «ما! ما!» سَأُرْبِكُكَ بصَوْتِ البَقَرَة: «مو! مو! مو!» حِينها أَتَى القِطُّ وهو يقول: «مي.مي.مي» وقال للنملة: اِرسُميني يا نَمْلَة. فقالت له: حاضِر يا مي مي.'
            }
        ]
    },

    // مقدمة حرف الباء - قصة بصورة وصوت (استبدال الحوار السابق)
    letterBaaDialogue: {
        type: 'image-story',
        title: '📖 قصة حرف الباء',
        slides: [
            {
                image: 'images/im1.png',
                audio: 'audio/vo1.mp3',
                storyText: 'كانَ يا ما كانَ، كانتْ هناكَ بَطبوطَةٌ جميلةٌ تعيشُ معَ أُمِّها في بيتٍ كبيرٍ، كانتْ تُحبُّها كثيرًا وتعتني بها.'
            },
            {
                image: 'images/im2.png',
                audio: 'audio/vo2.mp3',
                storyText: 'كانت بَطبوطَةُ بَدينَةً تُحبُّ أكلَ الجُبنِ والبيضِ والبُندقِ والبُرتُقالِ والبِطيخِ والبِسكويتِ، وتُحبُّ شُربَ الحليبِ مِن ضَرعِ البَقَرَةِ.'
            },
            {
                image: 'images/im3.png',
                audio: 'audio/vo3.mp3',
                storyText: 'كانت أُمُّها تَربِطُها بحَبْلٍ، تَخافُ عليها مِن أَكْلِ الذِّئابِ والكِلابِ.'
            },
            {
                image: 'images/im4.png',
                audio: 'audio/vo4.mp3',
                storyText: 'ذاتَ مَرَّةٍ هَرَبَتْ مِنَ البَيْتِ وذَهَبَتْ إلى حَفْلَةِ ثَعْلُوبِ الماكرِ.'
            },
            {
                image: 'images/im5.png',
                audio: 'audio/vo5.mp3',
                storyText: 'وعندما هَرَبَتْ، وَصَلَتْ إلى الغابَةِ، فَوَجَدَتْ نَفْسَها في مَكانٍ فيه سُكونٌ.'
            },
            {
                image: 'images/im6.png',
                audio: 'audio/vo6.mp3',
                storyText: 'فَصارَتْ تَبكي، وصَوتُها يَقولُ: أَبْ... أَبْ... أَبْ.'
            },
            {
                image: 'images/im7.png',
                audio: 'audio/vo7.mp3',
                storyText: 'سَمِعَتْها أُمُّها، فَجاءَتْ تَجري، وفَتَحَتْ يَدَها وفَمَها، وصارَ صَوتُها يَقولُ: بَ... بَ...'
            },
            {
                image: 'images/im8.png',
                audio: 'audio/vo8.mp3',
                storyText: 'ثُمَّ ضَمَّتْها، فَصارَ صَوتُها يَقولُ: بُ... بُ...'
            },
            {
                image: 'images/im9.png',
                audio: 'audio/vo9.mp3',
                storyText: 'وعندما ضَمَّتْها، تَكَسَّرَتْ رِجلُها، فَصارَ صَوتُها يَقولُ: بِ... بِ... بِ...'
            },
            {
                image: 'images/im10.png',
                audio: 'audio/vo10.mp3',
                storyText: 'أَعطَتْها عَصًا لِتَتَّكِئَ عَلَيها، فَصارَ صَوتُها يَقولُ: با... با... با...'
            },
            {
                image: 'images/im11.png',
                audio: 'audio/vo11.mp3',
                storyText: 'لم تَستَطِعِ المَشيَ بالعَصا، فَجَرَّتْها بِحَبلٍ، فَصارَ صَوتُها يَقولُ: بُو... بُو...'
            },
            {
                image: 'images/im12.png',
                audio: 'audio/vo12.mp3',
                storyText: 'حينَها قالَتْ لِأُمِّها: لا أستَطيعُ المَشيَ، فَأَحضَرَتْ لَها عَرَبَةً صَغيرَةً وَوَضَعَتْها فيها، فَصَارَتْ تُشْبِهُ بَيْبي، فَفَرِحَتْ كَثيرًا وَقالَتْ: أَنا صِرْتُ بي... بي... بي...'
            }
        ]
    },

    // تحديات حرف التاء - نسخة مشوقة على نمط Duolingo
    letterTaa: [
        {
            id: 'taa-odd-word-out',
            type: 'multiple-choice',
            title: '🟠 السؤال 1: اشطب الكلمة الدخيلة',
            description: 'اختر الكلمة التي لا تحتوي على حرف التاء',
            letter: 'ت',
            points: 10,
            question: 'أي كلمة دخيلة؟ 🎯',
            options: [
                { id: 1, text: 'تُوت', audio: 'تُوت', correct: false, emoji: '🫐' },
                { id: 2, text: 'تُفّاح', audio: 'تُفّاح', correct: false, emoji: '🍎' },
                { id: 3, text: 'تِين', audio: 'تِين', correct: false, emoji: '🍈' },
                { id: 4, text: 'باب', audio: 'باب', correct: true, emoji: '🚪' }
            ]
        },
        {
            id: 'taa-repeated-letter',
            type: 'multiple-choice',
            title: '🟠 السؤال 2: ما الحرف المتكرر؟',
            description: 'ما هو الحرف الذي تكرّر في نهاية الكلمات التالية؟',
            letter: 'ت',
            points: 10,
            question: 'يَكتُمُ – يَفتَحُ – يَنتَظِرُ\nما هو الحرف الذي تكرّر في الكلمات التالية؟',
            options: [
                { id: 1, text: 'ت', audio: 'ت', correct: true },
                { id: 2, text: 'ر', audio: 'ر', correct: false },
                { id: 3, text: 'م', audio: 'م', correct: false },
                { id: 4, text: 'ح', audio: 'ح', correct: false }
            ]
        },
        {
            id: 'taa-position-game',
            type: 'position-choice',
            title: '🟠 السؤال 3: حدّد موضع حرف التاء',
            description: 'اضغط على موقع حرف التاء في الكلمة',
            letter: 'ت',
            points: 10,
            words: [
                { word: 'تِين', position: 'أول', correct: true },
                { word: 'مَطَر', position: 'وسط', correct: true },
                { word: 'كَلِمَت', position: 'آخر', correct: true }
            ]
        },
        {
            id: 'taa-build-word-syllables',
            type: 'syllable-builder',
            title: '🟠 السؤال 4: كوّن كلمة صحيحة',
            description: 'اسحب المقاطع بالترتيب لتكوين كلمة صحيحة',
            letter: 'ت',
            points: 10,
            exercises: [
                { syllables: ['م', 'ت', 'ر'], answer: 'تمر', displayWord: 'تمر' }
            ]
        },
        {
            id: 'taa-replace-letter',
            type: 'text-input',
            title: '🟠 السؤال 5: استبدل الحرف الملوّن',
            description: 'استبدل الحرف الملوّن بحرف التاء واكتب الكلمة الجديدة',
            letter: 'ت',
            points: 10,
            exercises: [
                { original: 'حوت', colored: 'ح', replacement: 'ت', answer: 'توت', displayOriginal: 'حوت' },
                { original: 'باب', colored: 'ب', replacement: 'ت', answer: 'بات', displayOriginal: 'باب' }
            ]
        },
        {
            id: 'taa-delete-syllable',
            type: 'text-input',
            title: '🟠 السؤال 6: احذف المقطع الملوّن',
            description: 'احذف المقطع الملوّن واكتب الكلمة الجديدة',
            letter: 'ت',
            points: 10,
            exercises: [
                { word: 'قاتل', delete: 'ت', answer: 'قال', displayOriginal: 'قاتل' }
            ]
        },
        {
            id: 'taa-add-letter',
            type: 'fill-blank',
            title: '🟠 السؤال 7: أضف حرف التاء',
            description: 'أضف حرف التاء إلى الكلمة لتكوين كلمة جديدة',
            letter: 'ت',
            points: 10,
            exercises: [
                { word: '_ِين', answer: 'ت', complete: 'تِين', hint: 'ين → تِين' },
                { word: '_َمْر', answer: 'ت', complete: 'تَمْر', hint: 'مر → تَمْر' }
            ]
        },
        {
            id: 'taa-delete-segments',
            type: 'delete-segments',
            title: '🟠 السؤال 8: احذف المقاطع التي لا تحتوي على حرف التاء',
            description: 'اضغط على المقاطع لحذفها، واترك حرف التاء فقط',
            letter: 'ت',
            points: 10,
            word: 'يَأْكُلُ التَّنِينُ الحُوتَ.',
            allSegments: ['ال', 'حو', 'ت'],
            deletableSegments: ['ال', 'حو'],
            protectedSegment: 'ت',
            emoji: '🐉'
        }
    ],

    // حوار حرف التاء - قصة التينين والتمساح
    letterTaaDialogue: {
        type: 'image-story',
        title: '📖 قصة حرف التاء',
        slides: [
            {
                image: 'images/111.png',
                audio: 'audio/111.mp3',
                storyText: 'عَلَى تَلٍّ جَميلٍ، كانَ هُناكَ تِنِّينٌ صَغيرٌ يَبْكي، وكانَ صَوْتُهُ يَقول: «أَتْ! أَتْ! أَتْ!»'
            },
            {
                image: 'images/222.png',
                audio: 'audio/222.mp3',
                storyText: 'فَسَمِعَهُ التِّمْساحُ، فَقالَ لَهُ: مابِكَ يا صَديقي؟ فَقالَ التِّنينُ: أَنا وَحيدٌ.'
            },
            {
                image: 'images/333.png',
                audio: 'audio/333.mp3',
                storyText: 'فَأجابَهُ التِّمْساحُ: مِنَ اليَومِ فَصاعِدًا، سَتَعيشُ مَعي أَنا وَأُمِّي «تِي تي» في تَلِّي الجَميلِ، وَسَأَعْتَني بِكَ، وَسَتَأكُلُ مِن خَيْراتي العَديدةِ: تُوتٍ، وَتُفّاحٍ، وَتِينٍ، وَتَمْرٍ'
            },
            {
                image: 'images/444.png',
                audio: 'audio/444n.mp3',
                storyText: 'فَرِحَ التِّنينُ الصَّغيرُ كَثيرًا، وَفَتَحَ يَدَهُ وَفَمَهُ، وَصارَ صَوْتُهُ يَقول: «تَ! تَ! تَ!» ثُمَّ ضَمَّهُ التِّمْساحُ، فَصارَ صَوْتُهُ: «تَ! تَ! تَ!» وَبَعْدَ مُدَّةٍ، كَبِرَ التِّنينُ كَثيرًا، وَتَغَيَّرَ لَوْنُهُ وَشَكْلُهُ، وَصارَت لَهُ أَسْنانٌ تُكَسِّرُ الحَديدَ، وَلا يَزالُ صَوْتُهُ يَقول: «تَ! تَ! تَ!»'
            },
            {
                image: 'images/555.png',
                audio: 'audio/555.mp3',
                storyText: 'أَخَذَهُ الغُرورُ، فَأَصْبَحَ يُفَكِّرُ في خُطَّةٍ لِيَأكُلَ التِّمْساحَ وَأُمَّهُ، وَيَسْتَوْليَ عَلى خَيْراتِ التَّلِّ، وَيُصْبِحَ مَلِكًا. وَذاتَ مَرَّةٍ، اِلْتَقى التِّنينُ بالتِّمْساحِ، فَقالَ التِّنينُ: سَآكُلُكَ! فَخافَ التِّمْساحُ، وَقالَ: ما جَزاءُ الإحْسانِ إِلَّا الإحْسانُ يا صَديقي! فَقالَ التِّنينُ: أَنا لا أَعرِفُ الخَيْرَ، وَلا أَعرِفُ الإحْسانَ! عِندَها اِسْتَسْلَمَ التِّمْساحُ، وَرَفَعَ يَدَهُ وَصارَ يُنادِي بِصَوْتٍ مُرْتَفِعٍ: «تا! تا! تا! تا!» فَسَمِعَتْهُ أُمُّهُ، فَأَتَتْ بِحَبْلٍ كَبيرٍ، وَجَذَبَتْهُ بِهِ، فَتَشَبَّثَ بِالحَبْلِ، وَصارَ صَوْتُهُ: «تُو! تُو! تُو!» حِينَها شَكَرَ أُمَّهُ، وَقالَ لَها: شُكرًا لَكِ يا «تِي».'
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
            'ج': '🥳 رائع! 🥳\n\nلقد أتقنت حرف الجيم بنجاح! 🌟',
            'م': '🌧️ ممتاز! 🌧️\n\nلقد أتقنت حرف الميم بنجاح! 🌟',
            'ت': '🐉 ممتاز! 🐉\n\nلقد أتقنت حرف التاء بنجاح! 🌟'
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

