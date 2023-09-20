import { ErrorResponse } from '../../interface';

const uploadFileToCloudinary = async (file: File): Promise<string> => {
  const url = 'http://localhost:3001/cloudinary/upload';
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    let errorList = '';
    const errorResponse: ErrorResponse = await response.json();

    if (!errorResponse.message) throw new Error('Unexpected server error');

    if (typeof errorResponse.message === 'string')
      throw new Error(`${errorResponse.message}`);

    errorResponse.message.forEach((errorMessage) => {
      errorList += errorMessage + '\n';
    });

    throw new Error(`${errorList}`);
  }

  const data = await response.json();

  return data.secure_url;
};

export { uploadFileToCloudinary };
