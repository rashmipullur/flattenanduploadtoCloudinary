/*
when you’ve got a Russian nesting doll of game folders, each cradling a couple of images like they’re precious Fabergé eggs.

you gotta absolutely flatten this hot mess into one neat folder using Node.js. Here's a script that’ll:

Recursively go through all subfolders inside your game_image folder.

Move each image into a single flattened_images folder.

Rename the images if needed (e.g. add the folder name as a prefix so filenames don’t clash).

*/

// const fs = require("fs");
// const path = require("path");
// const fse = require("fs-extra"); // for safe copy/move

// const sourceDir = "C:/Users/DREAMWORLD/Downloads/game_image";
// const outputDir = "C:/Users/DREAMWORLD/Downloads/flattened_images";

// // make sure output directory exists
// fse.ensureDirSync(outputDir);

// const flattenImages = (dir) => {
//   fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
//     const fullPath = path.join(dir, entry.name);

//     if (entry.isDirectory()) {
//       flattenImages(fullPath);
//     } else if (entry.isFile()) {
//       const parentFolderName = path.basename(path.dirname(fullPath));
//       const newFileName = `${parentFolderName}`;
//       const destinationPath = path.join(outputDir, newFileName);

//       // avoid overwriting and move file
//       if (!fs.existsSync(destinationPath)) {
//         fse.copySync(fullPath, destinationPath);
//         console.log(`✔️ Moved: ${newFileName}`);
//       } else {
//         console.warn(`⚠️ Skipped (already exists): ${newFileName}`);
//       }
//     }
//   });
// };

// flattenImages(sourceDir);
// console.log("✅ All images flattened successfully.");

require("dotenv").config();
import fs from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// list of valid gameTypes
const validGameTypes = [
  "blackjack", "baccarat", "classicbetstackerbj", "rng - racetrack", "crazypachinko",
  "betwithstreamer", "rng - dealnodeal", "roulette", "rng - baccarat", "dragontiger",
  "rng - dragontiger", "cashorcrash", "tcp", "videopoker", "lightningball", "lightningscalablebj",
  "monopoly", "lightningstorm", "monopolybigballer", "rng - roulette", "dhp", "supercolorgame",
  "rng - moneywheel", "funkytime", "andarbahar", "moneywheel", "fireballroulette",
  "gonzotreasuremap", "crazytime", "craps", "fantan", "bacbo", "sicbo", "rng - lightningscalablebj",
  "holdem", "csp", "rng - videopoker", "megaball", "lightningdice", "gonzotreasurehunt",
  "rng - megaball", "crazyballs", "topdice", "eth", "deadoralivesaloon", "racetrack",
  "lightninglotto", "scalableblackjack", "rng - topcard", "uth", "rng - lightninglotto",
  "balloonrace", "rng - sicbo", "topcard", "americanroulette", "marblerace",
  "extrachilliepicspins", "rng - craps", "reddoorroulette", "freebet", "rng - american - roulette"
];

const folderPath = "your folder path here";
const outputDir = path.join(__dirname, "flattened_images");

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

const flattenImages = () => {
  const subfolders = fs.readdirSync(folderPath);

  for (const folder of subfolders) {
    const fullPath = path.join(folderPath, folder);
    if (fs.lstatSync(fullPath).isDirectory()) {
      const images = fs.readdirSync(fullPath);

      const clean = (str: string) => str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
      const cleanedFolder = clean(folder);

      // const matchedGameType = validGameTypes.find(gt => cleanedFolder.includes(clean(gt)));

      // ---------------------------------
      const matchedGameType = validGameTypes.find(gt => cleanedFolder.includes(clean(gt)));

      let matchSource = "gameType";
      let finalMatch = matchedGameType;

      if (!matchedGameType) {
        const tableNames = [
          "BJ-11563 Test", "Blackjack VIP B", "Baccarat SW", "Bet Stacker Blackjack", "Race Track", "Crazy Pachinko DNT",
          "Bet with Streamers DNT", "First Person Deal or No Deal DNT", "Roulette", "First Person Golden Wealth Baccarat DNT",
          "Dragon Tiger", "First Person Dragon Tiger DNT", "Cash Or Crash", "Sweepstakes Auto-Roulette", "Three Card Poker",
          "Video Poker", "Lightning Ball DNT", "Lightning Blackjack", "AV Monopoly", "Lightning Storm", "DT_PavTestLI DNT",
          "Sweepstakes Lightning Roulette", "First Person Baccarat", "MONOPOLY Big Baller DEV", "First Person Lightning Roulette DNT",
          "2 Hand Casino Hold'em", "PRQ 2HandPoker DNT", "No Commission Baccarat", "Immersive Roulette", "Blackjack A",
          "Super Color Game DNT", "Hippodrome Grand Casino", "First Person Dream Catcher DNT", "Funky Time", "First Person Roulette DNT",
          "774SSBac", "Baccarat Control Squeeze", "Super Andar Bahar", "Dream Catcher", "XXXtreme Lightning Baccarat", "Fireball Roulette DNT",
          "Gonzo's Treasure Map", "First Person Lightning Baccarat DNT", "Crazy Time", "Peek Baccarat", "Bac8", "Craps DNT",
          "First Person Prosperity Tree Baccarat", "Blackjack Party", "Imperial Quest", "MONOPOLY Big Baller DNT", "Fantan",
          "Bac Bo", "Golden Wealth Baccarat", "Lightning Sic Bo DNT", "Emperor Speed Baccarat B", "First Person Lightning Blackjack DNT",
          "Lotus Speed Baccarat A DNT", "Double Ball Roulette", "Auto-Roulette", "Lotus Roulette DNT", "Casino Hold'em",
          "Custom Roulette DNT", "Caribbean Stud Poker", "Gold Vault Roulette", "Hindi Lightning Roulette DNT", "First Person Video Poker DNT",
          "First Person XXXtreme Lightning Baccarat", "Mega Ball", "Lightning Dice", "Blackjack B", "Gonzo's Treasure Hunt",
          "First Person Mega Ball DNT", "Crazy Balls", "Blackjack C", "Football Studio Dice", "Baccarat A", "Extreme Texas Hold'em",
          "Dead or Alive: Saloon", "AV money MOW", "Lightning 6 DNT", "Infinite Blackjack", "First Person Football Studio DNT",
          "Ultimate Texas Hold'em", "First Person Lightning Lotto DNT", "Mushegh BJ DNT", "Balloon Race DNT", "First Person SicBo DNT",
          "Football studio", "Super Sic Bo", "Sweepstakes American Roulette", "Lightning Dragon Tiger", "Marble Race DNT",
          "Speed Super Sic Bo DNT", "Hindi Roulette", "Baccarat Squeeze", "Extra Chilli Epic Spins", "First Person Craps DNT",
          "Blackjack VIP A", "First Person XXXtreme Lightning Roulette DNT", "VIP Roulette", "Red Door Roulette DNT",
          "Free Bet Blackjack", "First Person American Roulette DNT", "DHP DNT release QA"
        ];

        const matchedTable = tableNames.find(name => cleanedFolder.includes(clean(name)));

        if (matchedTable) {
          matchSource = "tableName";
          finalMatch = clean(matchedTable);
        }
      }

      if (finalMatch) {
        console.log(`✔️ Matched "${folder}" -> ${finalMatch} (${matchSource})`);
      } else {
        console.warn(`❌ No match for folder: "${folder}"`);
        continue;
      }

      // ---------------------------------
      if (matchedGameType) {
        console.log(`✔️ Matched "${folder}" -> ${matchedGameType}`);
      } else {
        console.warn(`❌ No match for folder: "${folder}"`);
      }


      if (!matchedGameType) continue;

      images.forEach((img, idx) => {
        const ext = path.extname(img);
        const destPath = path.join(outputDir, `${matchedGameType}${idx === 0 ? "" : `_${idx}`}${ext}`);
        fs.copyFileSync(path.join(fullPath, img), destPath);
      });
    }
  }

  console.log("Images flattened!");
};

const uploadImages = async () => {
  const files = fs.readdirSync(outputDir);
  for (const file of files) {
    const filePath = path.join(outputDir, file);
    const publicId = file.split(".")[0];

    try {
      const res = await cloudinary.uploader.upload(filePath, {
        folder: "evolution",
        public_id: publicId,
        use_filename: true,
        unique_filename: false,
        overwrite: true
      });
      console.log(`Uploaded: ${file} -> ${res.secure_url}`);
    } catch (err) {
      console.error(`Failed to upload ${file}:`, err);
    }
  }
};

flattenImages();
uploadImages();
