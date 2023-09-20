export const compressFile = async (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: 0.6,
      success: (compressedFile: File) => {
        resolve(compressedFile);
      },
      error: (error) => {
        console.error('Error compressing the image:', error.message);
        reject(error);
      },
    });
  });
};
