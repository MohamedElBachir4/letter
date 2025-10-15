# 🎙️ Arabic Voice Files for Educational Game

## 📋 Required Voice Files

You need to create **19 Arabic voice MP3 files** and place them in this `voices/` folder.

---

## 🎯 Challenge Voices (11 files)

These voices play when each challenge starts.

| File Name | Arabic Text | English |
|-----------|-------------|---------|
| `fish_challenge.mp3` | "تحدي السمكة 🐟" | Fish Challenge |
| `animal_matching_challenge.mp3` | "تحدي ربط الحيوانات 🦁" | Animal Matching Challenge |
| `shadows_challenge.mp3` | "تحدي الظلال ✈️" | Shadows Challenge |
| `pen_hold_challenge.mp3` | "كيف أمسك القلم؟ ✏️" | Pen Holding Challenge |
| `baa_different_word.mp3` | "حرف الباء - الكلمة المختلفة" | Letter Baa - Different Word |
| `baa_replace_syllable.mp3` | "حرف الباء - استبدال المقطع" | Letter Baa - Replace Syllable |
| `baa_position.mp3` | "حرف الباء - الموضع" | Letter Baa - Position |
| `baa_delete_syllable.mp3` | "حرف الباء - حذف المقطع" | Letter Baa - Delete Syllable |
| `baa_build_words.mp3` | "حرف الباء - تكوين الكلمات" | Letter Baa - Build Words |
| `baa_fill_blank.mp3` | "حرف الباء - املأ الفراغ" | Letter Baa - Fill Blank |
| `jeem_different_word.mp3` | "حرف الجيم - الكلمة المختلفة" | Letter Jeem - Different Word |

---

## ✅ Correct Answer Voices (5 files - randomized)

These voices play when the player answers correctly. The system will randomly pick one.

| File Name | Arabic Text | English |
|-----------|-------------|---------|
| `correct_1.mp3` | "أحسنت!" | Well done! |
| `correct_2.mp3` | "عمل رائع!" | Great work! |
| `correct_3.mp3` | "ممتاز!" | Excellent! |
| `correct_4.mp3` | "برافو!" | Bravo! |
| `correct_5.mp3` | "رائع جداً!" | Very wonderful! |

---

## ❌ Wrong Answer Voices (3 files - randomized)

These voices play when the player answers incorrectly. The system will randomly pick one.

| File Name | Arabic Text | English |
|-----------|-------------|---------|
| `wrong_1.mp3` | "حاول مرة أخرى!" | Try again! |
| `wrong_2.mp3` | "خطأ، جرب من جديد!" | Wrong, try again! |
| `wrong_3.mp3` | "جرب مرة أخرى!" | Try once more! |

---

## 🏆 Special Completion Voices (2 files)

| File Name | Arabic Text | English |
|-----------|-------------|---------|
| `section_complete.mp3` | "أحسنت! لقد أكملت القسم بنجاح" | Well done! You completed the section |
| `game_complete.mp3` | "مبروك! أنت بطل حقيقي! لقد أكملت جميع التحديات" | Congratulations! You're a real hero! You completed all challenges |

---

## 🎨 Voice Requirements

### 1. **Language**: 
- Modern Standard Arabic (الفصحى)
- Clear pronunciation
- Child-friendly tone

### 2. **Quality**:
- Format: MP3
- Bitrate: 128 kbps minimum
- Sample rate: 44.1 kHz or 48 kHz
- Mono or stereo (mono preferred for voices)

### 3. **Tone**:
- Friendly and encouraging
- Not too fast or too slow
- Motivational for children
- Clear articulation

### 4. **Duration**:
- Challenge voices: 2-4 seconds
- Feedback voices: 1-2 seconds
- Completion voices: 3-5 seconds

---

## 🎙️ How to Create Voice Files

### Option 1: Professional Voice Actor
- Hire a native Arabic speaker
- Record in a quiet environment
- Use a good quality microphone
- Edit for clarity

### Option 2: High-Quality AI Voice Generation
Use one of these services:

1. **ElevenLabs** (https://elevenlabs.io/)
   - Has Arabic voices
   - Very natural sounding
   - Paid service

2. **Play.ht** (https://play.ht/)
   - Arabic TTS available
   - Good quality
   - Paid service

3. **Google Cloud Text-to-Speech**
   - Has Arabic voices
   - API-based
   - Paid service

4. **Microsoft Azure Speech**
   - Arabic voices available
   - Good quality
   - Paid service

### Option 3: Free Tools (Lower Quality)
- Google Translate voice (lower quality)
- Natural Reader
- TTSReader

---

## 📝 Recording Script

Use this script when recording:

```
=== CHALLENGES ===
تحدي السمكة 🐟
تحدي ربط الحيوانات
تحدي الظلال
كيف أمسك القلم؟
حرف الباء - الكلمة المختلفة
حرف الباء - استبدال المقطع
حرف الباء - الموضع
حرف الباء - حذف المقطع
حرف الباء - تكوين الكلمات
حرف الباء - املأ الفراغ
حرف الجيم - الكلمة المختلفة

=== CORRECT ===
أحسنت!
عمل رائع!
ممتاز!
برافو!
رائع جداً!

=== WRONG ===
حاول مرة أخرى!
خطأ، جرب من جديد!
جرب مرة أخرى!

=== COMPLETION ===
أحسنت! لقد أكملت القسم بنجاح
مبروك! أنت بطل حقيقي! لقد أكملت جميع التحديات
```

---

## ⚙️ After Creating Files

1. Save all MP3 files in this `voices/` folder
2. Make sure file names match exactly (case-sensitive on some systems)
3. Test the game - voices should play automatically
4. If a voice doesn't play, check:
   - File name spelling
   - File format (must be MP3)
   - File path (must be in voices/ folder)
   - Console for errors (F12 in browser)

---

## 🔍 File Checklist

Use this checklist to track your progress:

### Challenges (11/11)
- [ ] fish_challenge.mp3
- [ ] animal_matching_challenge.mp3
- [ ] shadows_challenge.mp3
- [ ] pen_hold_challenge.mp3
- [ ] baa_different_word.mp3
- [ ] baa_replace_syllable.mp3
- [ ] baa_position.mp3
- [ ] baa_delete_syllable.mp3
- [ ] baa_build_words.mp3
- [ ] baa_fill_blank.mp3
- [ ] jeem_different_word.mp3

### Feedback - Correct (5/5)
- [ ] correct_1.mp3
- [ ] correct_2.mp3
- [ ] correct_3.mp3
- [ ] correct_4.mp3
- [ ] correct_5.mp3

### Feedback - Wrong (3/3)
- [ ] wrong_1.mp3
- [ ] wrong_2.mp3
- [ ] wrong_3.mp3

### Completion (2/2)
- [ ] section_complete.mp3
- [ ] game_complete.mp3

**Total: 0/19 files**

---

## 💡 Tips

1. **Test as you go**: Add a few files at a time and test
2. **Keep backups**: Save your voice files somewhere safe
3. **Consistent quality**: Use the same voice/service for all files
4. **Volume levels**: Make sure all files have similar volume
5. **Preview**: Listen to each file before adding to game

---

## 🚀 Quick Start

1. Choose your voice generation method
2. Create all 19 MP3 files
3. Name them exactly as shown in tables above
4. Place them in this `voices/` folder
5. Open the game and test!

---

## ❓ Troubleshooting

### Voice doesn't play?
- Check browser console (F12) for errors
- Verify file name matches exactly
- Make sure it's a valid MP3 file
- Check file permissions

### All voices missing?
- Make sure files are in `voices/` folder
- Check that folder is in same directory as `index.html`
- Try refreshing the page (Ctrl+F5)

### Voice too quiet/loud?
- Adjust volume in recording/AI tool
- Or use audio editing software (Audacity is free)
- Normalize all files to same volume level

---

**Good luck creating your Arabic voice files!** 🎙️✨

Once you have all 19 files, your game will have full Arabic voice narration for children!

