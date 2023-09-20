import { PixelCrop } from 'react-image-crop';

const TO_RADIANS = Math.PI / 180;

export async function canvasPreview(
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  crop: PixelCrop,
  scale = 1,
  rotate = 0,
  filter = 'none'
) {
  const canvasContext = canvas.getContext('2d') as CanvasRenderingContext2D;

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  const pixelRatio = window.devicePixelRatio;

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  canvasContext.scale(pixelRatio, pixelRatio);
  canvasContext.imageSmoothingQuality = 'high';

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  const rotateRads = rotate * TO_RADIANS;
  const centerX = image.naturalWidth / 2;
  const centerY = image.naturalHeight / 2;

  canvasContext.save();

  canvasContext.filter = filter;

  canvasContext.translate(-cropX, -cropY);
  canvasContext.translate(centerX, centerY);
  canvasContext.rotate(rotateRads);
  canvasContext.scale(scale, scale);
  canvasContext.translate(-centerX, -centerY);
  canvasContext.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight
  );
  canvasContext.restore();
}

export async function getBase64Image(
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  crop: PixelCrop,
  scale = 1,
  rotate = 0,
  filter = 'none'
) {
  const canvasContext = canvas.getContext('2d') as CanvasRenderingContext2D ;

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  const pixelRatio = window.devicePixelRatio;

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  canvasContext.scale(pixelRatio, pixelRatio);
  canvasContext.imageSmoothingQuality = 'high';

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  const rotateRads = rotate * TO_RADIANS;
  const centerX = image.naturalWidth / 2;
  const centerY = image.naturalHeight / 2;

  canvasContext.save();

  // 5) Move the crop origin to the canvas origin (0,0)
  canvasContext.translate(-cropX, -cropY);
  // 4) Move the origin to the center of the original position
  canvasContext.translate(centerX, centerY);
  // 3) Rotate around the origin
  canvasContext.rotate(rotateRads);
  // 2) Scale the image
  canvasContext.scale(scale, scale);
  // 1) Move the center of the image to the origin (0,0)
  canvasContext.translate(-centerX, -centerY);

  canvasContext.filter = filter;

  canvasContext.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight
  );

  canvasContext.restore();

  const recortadaDataURL = canvas.toDataURL('image/jpeg');
  return recortadaDataURL;
}

export const base64ToBlob = (base64: string) => {
  const parts = base64.split(';base64,');
  const contentType = parts[0].split(':')[1];
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;
  const uInt8Array = new Uint8Array(rawLength);

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  const blob = new Blob([uInt8Array], { type: contentType });
  
  return blob;
};

export const blobToFile = (
  blob: Blob,
  fileName: string,
  mimeType: string
): File => {
  const file = new File([blob], fileName, { type: mimeType });
  return file;
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result;
      resolve(base64String as string);
    };

    reader.readAsDataURL(file);
  });
};
