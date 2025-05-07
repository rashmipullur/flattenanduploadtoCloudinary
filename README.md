# 🧹 Image Flattener for Game Folders

When you’ve got a Russian nesting doll of game folders, each cradling a couple of images like they’re precious Fabergé eggs — it’s time to flatten the chaos.

This script will:

- Recursively go through all subfolders inside your game_image folder.
- Move each image into one neat flattened_images folder.
- Rename the images like GameName_1.jpg to avoid name clashes.
- (Optional) Upload them to Cloudinary because why not?

---

## 📂 Before

```
game_image/
├── Blackjack VIP B/
│   └── image1.png
├── Baccarat A/
│   └── image1.jpg
├── Super Sic Bo/
│   └── image2.png
```

## 📁 After

```
flattened_images/
├── Blackjack_VIP_B_1.png
├── Baccarat_A_1.jpg
├── Super_Sic_Bo_1.png
```

---

## 🚀 Quick Start

1. Clone this repo or copy the script.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Drop your game_image folder in the root.

4. (Optional) Add a .env with your Cloudinary creds:

   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_key
   CLOUDINARY_API_SECRET=your_secret
   ```

5. Run it:

   ```bash
   npx tsx flattenImages.ts
   ```

Done. Go get coffee.

---

## 🧠 Notes

- Handles .png, .jpg, .jpeg
- Spaces in names are converted to _
- Skips/renames duplicates

---

## 🤝 Contributions

PRs and dark humor always welcome.
