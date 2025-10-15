# 🖤 Shadow Challenge Setup Guide

## Overview
This guide will help you set up the Shadow Challenge with proper shadow images.

## What Has Been Implemented

### ✅ Code Changes
1. **Updated `js/data.js`**: Changed shadow challenge type from `multiple-choice` to `shadow-choice` with image paths
2. **Added `renderShadowChoice()` in `js/challenges.js`**: New method to render shadow images with correct/incorrect logic
3. **Added CSS animations in `game.html`**:
   - `correct-shadow-glow`: Green glow effect for correct answer
   - `animate-shadow-bounce`: Bounce animation for success
   - `animate-shake-error`: Shake animation for wrong answer

### 🎯 Features
- ✅ Shows 3 black silhouette images as answer options (shuffled randomly)
- ✅ Child clicks the correct shadow that matches the main image
- ✅ Plays Arabic voice "أحسنت!" when correct (via `audioManager.playCorrectVoice()`)
- ✅ Plays Arabic voice "حاول مرة أخرى!" when wrong (via `audioManager.playWrongVoice()`)
- ✅ Success animation: glow + bounce effect
- ✅ Error animation: shake effect
- ✅ Modern, child-friendly, responsive design
- ✅ Clear code comments explaining logic

## Required Shadow Images

### Current Challenge: Airplane ✈️
Place these images in the `shadows/` folder:

1. **`airplane_shadow_correct.png`** - Correct airplane shadow
2. **`shadow_wrong1.png`** - Wrong shadow (e.g., car)
3. **`shadow_wrong2.png`** - Wrong shadow (e.g., boat)

## How to Create Shadow Images

### Method 1: Using Online Tools (Easiest)

#### Option A: Canva (Free)
1. Go to [canva.com](https://www.canva.com)
2. Create a new design (300x300px)
3. Add your airplane image
4. Apply filters → Brightness → Set to -100 (makes it completely black)
5. Download as PNG

#### Option B: PhotoScissors / Remove.bg
1. Upload your image to [remove.bg](https://www.remove.bg)
2. Remove the background
3. Open in any photo editor
4. Fill the object with pure black (#000000)
5. Export as PNG

### Method 2: Using Photoshop/GIMP
1. Open your image
2. Create a new layer
3. Use Magic Wand tool to select the object
4. Fill selection with black (#000000)
5. Delete original layer
6. Export as PNG with transparent background

### Method 3: Using CSS (Temporary Solution)
If you don't have shadow images yet, the code has a fallback that shows 🖤 emoji and an error message indicating the image is missing.

You can also temporarily use regular images and apply CSS filter:
```css
filter: brightness(0);
```

## Quick Testing Without Images

The shadow challenge will still work even without actual images! It will:
- Show placeholder emoji (🖤) 
- Display the expected file path
- Still test the click logic and animations
- Play the correct Arabic voices

This allows you to test the functionality before creating the actual shadow images.

## Adding More Shadow Challenges

To add more shadow challenges (e.g., butterfly 🦋, car 🚗), follow these steps:

### Step 1: Add Shadow Images
Create 3 shadow images for your new challenge:
- `butterfly_shadow_correct.png`
- `butterfly_shadow_wrong1.png`
- `butterfly_shadow_wrong2.png`

Place them in the `shadows/` folder.

### Step 2: Update `js/data.js`
Add a new challenge object in the `visualTraining` array:

```javascript
{
    id: 'butterfly-shadows',
    type: 'shadow-choice',
    title: '🦋 الظلال - الفراشة',
    description: 'اختر الظل الصحيح للفراشة',
    points: 10,
    question: 'ما هو الظل الصحيح؟',
    image: '🦋',
    shadowOptions: [
        { id: 1, image: 'shadows/butterfly_shadow_correct.png', correct: true, alt: 'ظل الفراشة' },
        { id: 2, image: 'shadows/butterfly_shadow_wrong1.png', correct: false, alt: 'ظل خاطئ 1' },
        { id: 3, image: 'shadows/butterfly_shadow_wrong2.png', correct: false, alt: 'ظل خاطئ 2' }
    ]
}
```

### Step 3: Test
Refresh the game and play through to reach your new shadow challenge!

## Code Structure Explanation

### 1. Data Structure (`js/data.js`)
```javascript
shadowOptions: [
    { 
        id: 1, 
        image: 'shadows/airplane_shadow_correct.png',  // Path to image
        correct: true,                                  // Is this the correct answer?
        alt: 'ظل الطائرة'                              // Alt text for accessibility
    },
    // ... more options
]
```

### 2. Rendering Logic (`js/challenges.js`)
```javascript
// Shuffle options randomly
const shuffledOptions = [...this.currentChallenge.shadowOptions]
    .sort(() => Math.random() - 0.5);

// Check if answer is correct
const isCorrect = btn.dataset.correct === 'true';

if (isCorrect) {
    // Play success animation and sound
    btn.classList.add('correct-shadow-glow', 'animate-shadow-bounce');
    audioManager.playSuccessSound();
    audioManager.playCorrectVoice();
} else {
    // Play error animation and sound
    btn.classList.add('animate-shake-error');
    audioManager.playErrorSound();
    audioManager.playWrongVoice();
}
```

### 3. Animations (`game.html`)
- **`shadow-glow`**: Green pulsing glow effect (1.5s)
- **`shadow-bounce`**: Bounces up and down (0.8s)
- **`shake-error`**: Shakes left-right with rotation (0.5s)

## Image Specifications

### Recommended Size
- Width: 200-300px
- Height: 200-300px
- Format: PNG (with transparency)
- File size: < 100KB

### Color
- Pure black: RGB(0, 0, 0) or #000000
- Background: Transparent or white

### Style
- Clean silhouette (no gradients)
- Clear shape that's recognizable
- Similar level of detail across all shadows

## Troubleshooting

### Images Not Showing
1. Check that images are in `shadows/` folder
2. Check file names match exactly (case-sensitive)
3. Check file format is PNG
4. Open browser console (F12) to see any error messages

### Arabic Voice Not Playing
1. Make sure MP3 files exist in `voices/` folder:
   - `voices/correct_1.mp3` (or correct_2.mp3, etc.)
   - `voices/wrong_1.mp3` (or wrong_2.mp3, etc.)
2. Check browser console for audio errors
3. See `START_HERE_ARABIC_VOICES.md` for voice setup

### Animations Not Working
1. Clear browser cache (Ctrl + F5)
2. Check that `game.html` has been updated with new CSS
3. Open browser DevTools to check for CSS errors

## Testing Checklist

- [ ] Shadow challenge appears in the game
- [ ] 3 shadow images are displayed (or placeholders)
- [ ] Images are shuffled randomly each time
- [ ] Clicking correct shadow shows green glow + bounce
- [ ] Clicking wrong shadow shows shake animation
- [ ] Success sound plays for correct answer
- [ ] Error sound plays for wrong answer
- [ ] Arabic voice "أحسنت!" plays for correct (if MP3 exists)
- [ ] Arabic voice "حاول مرة أخرى!" plays for wrong (if MP3 exists)
- [ ] After wrong answer, can try again
- [ ] After correct answer, moves to next challenge
- [ ] Design is responsive on mobile/tablet

## Next Steps

1. **Create Shadow Images**: Use one of the methods above to create 3 shadow images
2. **Place in `shadows/` folder**: Move your PNG files to the shadows directory
3. **Test the Game**: Open `game.html` and play through to the shadow challenge
4. **Add More Challenges**: Create more shadow challenges with different objects
5. **Add Arabic Voices**: Create MP3 files for voice feedback (see `START_HERE_ARABIC_VOICES.md`)

---

**Created**: October 2025  
**Game Version**: 1.0  
**Technologies**: HTML5, Tailwind CSS 2.2.19, Vanilla JavaScript

