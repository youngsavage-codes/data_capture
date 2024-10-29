import Tesseract from 'tesseract.js';

export const extractTextFromImage = async (filePath: string): Promise<string> => {
  const result = await Tesseract.recognize(filePath, 'eng');
  return result.data.text;
};
