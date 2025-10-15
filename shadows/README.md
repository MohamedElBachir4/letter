# 🖤 Shadow Images Folder

## Overview
This folder contains shadow images for the Shadow Challenge in the educational game.

## Required Images

### Shadow Challenge - Airplane ✈️
- `airplane_shadow_correct.png` - Correct shadow of an airplane
- `shadow_wrong1.png` - Incorrect shadow (e.g., car or other object)
- `shadow_wrong2.png` - Incorrect shadow (e.g., boat or other object)

## Image Specifications

### Format
- **File Type**: PNG (with transparency recommended)
- **Color**: Black silhouettes (RGB: 0, 0, 0)
- **Background**: Transparent or white

### Recommended Size
- **Width**: 200-300 pixels
- **Height**: 200-300 pixels
- **Aspect Ratio**: Square or maintain object proportions

## How to Create Shadow Images

### Method 1: Using Image Editor
1. Open your image in Photoshop/GIMP/Canva
2. Create a new layer
3. Fill the object shape with pure black (#000000)
4. Remove the background (make transparent)
5. Export as PNG

### Method 2: Using Online Tools
- Use tools like:
  - Canva (free)
  - Remove.bg (for background removal)
  - Photopea (free Photoshop alternative)

### Method 3: Using CSS Filter (temporary solution)
If you don't have shadow images yet, you can use CSS filters:
```css
img {
    filter: brightness(0);
}
```

## Example Shadow Objects
- ✈️ Airplane (current)
- 🚗 Car
- 🚢 Boat
- 🦋 Butterfly
- 🌳 Tree
- 🏠 House
- 🐘 Elephant
- 🚀 Rocket

## File Naming Convention
```
[object_name]_shadow_correct.png
shadow_wrong[number].png
```

## Future Challenges
You can add more shadow challenges by:
1. Adding new shadow images to this folder
2. Updating the challenge data in `js/data.js`
3. Following the same structure as the airplane challenge

## Notes
- All shadows should be consistent in style (same level of detail)
- Wrong shadows should be clearly different from the correct one
- Keep file sizes under 100KB for faster loading
- Use descriptive file names for easy identification

---
**Created**: October 2025  
**Last Updated**: October 2025

