// Script to create optimized MERN image
const fs = require("fs");

// Create a simple fallback if the optimized image doesn't exist
if (!fs.existsSync("./mern-optimized.webp")) {
  // Copy the original JPEG as fallback
  if (fs.existsSync("./mern.jpeg")) {
    fs.copyFileSync("./mern.jpeg", "./mern-optimized.jpg");
    console.log("Created fallback optimized image");
  }
}
