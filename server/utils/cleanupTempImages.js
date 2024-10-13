const fs = require('fs');
const { nextTick } = require('process');

const cleanupTempImages = (tempImages) => {
  if (tempImages) {
    // Check and delete profile image
    if (tempImages.profileImg) {
      if (fs.existsSync(tempImages.profileImg)) {
        try 
        {
          // Delete the profile image
          fs.unlinkSync(tempImages.profileImg);  
          // console.log(`Deleted profile image: ${tempImages.profileImg}`);
        } catch (err) {
          console.error(`Error cleaning up profile image ${tempImages.profileImg}: ${err.message}`);
        }
      }
    }

    // Check and delete header image (if applicable)
    if (tempImages.headerImg) {
      if (fs.existsSync(tempImages.headerImg)) {
        try 
        {
           // Delete the header image
          fs.unlinkSync(tempImages.headerImg); 
          console.log(`Deleted header image: ${tempImages.headerImg}`);
        } catch (err) {
          console.error(`Error cleaning up header image ${tempImages.headerImg}: ${err.message}`);
        }
      }
    }
  }
};

module.exports = { cleanupTempImages };
