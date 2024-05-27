const crypto = require('crypto');

class EncoderService {
  async encryptFileWithPassword(file, password) {
    const algorithm = 'aes-256-cbc';
    const key = crypto.scryptSync(password, 'salt', 32);
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([iv, cipher.update(file.buffer), cipher.final()]);

    return {
      originalname: file.originalname + '.encrypted',
      buffer: encrypted,
      mimetype: file.mimetype,
    };
  }
  
  async decryptFileWithPassword(file, password) {
    const algorithm = 'aes-256-cbc';
    // Встановлюємо алгоритм дешифрування.

    const key = crypto.scryptSync(password, 'salt', 32);
    // Генеруємо ключ за допомогою пароля та солі.

    const iv = file.buffer.slice(0, 16);
    // Відокремлюємо вектор ініціалізації з початку файлу.

    const encryptedText = file.buffer.slice(16);
    // Відокремлюємо зашифрований текст від вектора ініціалізації.

    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    // Створюємо об'єкт дешифрування з використанням алгоритму, ключа та вектора ініціалізації.

    const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
    // Дешифруємо файл.

    return {
      originalname: file.originalname.replace('.encrypted', ''),
      // Видаляємо суфікс з імені файлу.

      buffer: decrypted,
      // Зберігаємо дешифрований файл у буфері.

      mimetype: file.mimetype,
      // Зберігаємо тип вмісту файлу.
    };
  }
}

module.exports = new EncoderService();
