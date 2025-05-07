// renameImages.js
const fs = require("fs");
const path = require("path");

// This should be copy-pasted from the logs you printed
const gameTableToTypeMap = {
  "BJ-11563 Test": "blackjack",
  "Blackjack VIP B": "blackjack",
  "Baccarat SW": "baccarat",
  // ...add all from your console output
};

const IMAGE_FOLDER = path.join(__dirname, "evolution_images");

fs.readdirSync(IMAGE_FOLDER).forEach((file) => {
  const oldPath = path.join(IMAGE_FOLDER, file);
  const tableName = path.parse(file).name.trim(); // Remove extension
  const extension = path.extname(file);

  const gameType = gameTableToTypeMap[tableName];

  if (gameType) {
    const newPath = path.join(IMAGE_FOLDER, `${gameType}${extension}`);
    fs.renameSync(oldPath, newPath);
    console.log(`✅ Renamed ${file} → ${gameType}${extension}`);
  } else {
    console.warn(`❌ No match found for "${tableName}". Skipping.`);
  }
});
