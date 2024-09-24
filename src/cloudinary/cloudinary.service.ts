import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  // Загрузка изображения из буфера
  async uploadImage(fileBuffer: Buffer): Promise<UploadApiResponse> {
    try {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'profile_pictures', transformation: { width: 500, height: 500, crop: 'limit' } },
          (error: UploadApiErrorResponse, result: UploadApiResponse) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        ).end(fileBuffer); // Передаем буфер файла
      });
    } catch (error) {
      throw new Error('Failed to upload image');
    }
  }
}