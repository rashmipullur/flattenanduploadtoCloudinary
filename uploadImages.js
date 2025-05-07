require("dotenv").config();
const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const IMAGE_FOLDER = path.join(__dirname, "evolution_images");

const uploadAllImages = async () => {
  const files = fs.readdirSync(IMAGE_FOLDER);
  const uploaded = [];

  for (const file of files) {
    const filePath = path.join(IMAGE_FOLDER, file);
    const fileName = path.parse(file).name;

    try {
      const result = await cloudinary.uploader.upload(filePath, {
        public_id: `evolution/${fileName}`,
        overwrite: true,
        resource_type: "image",
      });

      uploaded.push({
        name: fileName,
        url: result.secure_url,
      });

      console.log(`✅ Uploaded: ${fileName} → ${result.secure_url}`);
    } catch (err) {
      console.error(`❌ Failed to upload ${file}:`, err.message);
    }
  }

  fs.writeFileSync("evolution_image_map.json", JSON.stringify(uploaded, null, 2));
  console.log("\n🎉 All done! Image map saved to `evolution_image_map.json`");
};

uploadAllImages();
