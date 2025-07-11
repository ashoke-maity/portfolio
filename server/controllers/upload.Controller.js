const { storage } = require('../configs/appwrite.Config.JS');
const { InputFile } = require('node-appwrite/file');
const { ID } = require('node-appwrite');

const uploadImageToAppwrite = async (file) => {
  try {
    // Convert buffer to InputFile object for Appwrite
    const fileObject = InputFile.fromBuffer(file.buffer, file.originalname);
    
    const result = await storage.createFile(
      process.env.APPWRITE_BUCKET_ID,
      ID.unique(), // generates a unique file ID
      fileObject
    );
    return result; // result.$id or result.url (based on permissions)
  } catch (error) {
    console.error('Appwrite upload error:', error.message);
    throw error;
  }
};

module.exports = {
  uploadImageToAppwrite
};

