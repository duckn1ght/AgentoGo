import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

@Controller('upload-image')
export class ImagesController {
  @Post('organization-picture')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './images/organization-pictures',  // путь для сохранения файлов
      filename: (req, file, cb) => {
        // Генерация уникального имени файла
        const randomName = `${uuidv4()}${extname(file.originalname)}`;
        cb(null, randomName);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Unsupported file type'), false);
      }
      cb(null, true);
    },
  }))
  async uploadProfilePicture(@UploadedFile() file: Express.Multer.File) {
    // Сохранение информации о файле в базу данных
    const fileUrl = `http://localhost:3000/images/organization-pictures/${file.filename}`;
    // В реальном проекте нужно сохранить URL файла в базу данных, привязав его к пользователю
    return { url: file.filename };
  }
}
