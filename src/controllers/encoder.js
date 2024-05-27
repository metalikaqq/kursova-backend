const EncoderService = require("../services/encoder");
const User = require("../models/user-model");

class EncoderController {
  async encrypt(req, res, next) {
    try {
      const { password, userId } = req.body;
      const file = req.file;

      if (!file || !password || !userId) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const encryptedFile = await EncoderService.encryptFileWithPassword(file, password);
      
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      user.files.push({
        filename: encryptedFile.originalname,
        data: encryptedFile.buffer,
        contentType: encryptedFile.mimetype,
      });

      await user.save();

      res.status(200).json({ message: "File encrypted and saved successfully" });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async decryptFile(req, res, next) {
    try {
      const { password, userId } = req.body;
      const file = req.file;

      if (!file || !password || !userId) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const decryptedFile = await EncoderService.decryptFileWithPassword(file, password);

      res.set({
        'Content-Type': decryptedFile.mimetype,
        'Content-Disposition': `attachment; filename="${decryptedFile.originalname}"`
      });

      res.send(decryptedFile.buffer);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getFiles(req, res, next) {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(user.files);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async downloadFile(req, res, next) {
    try {
      const fileId = req.params.fileId;
      const user = await User.findOne({ "files._id": fileId });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const file = user.files.id(fileId);

      res.set({
        'Content-Type': file.contentType,
        'Content-Disposition': `attachment; filename="${file.filename}"`
      });

      res.send(file.data);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = new EncoderController();
