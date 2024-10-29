import { Request, Response } from 'express';
import { extractTextFromImage } from '../services/ocrService';
import { parseDocumentData, validateParsedData } from '../services/documentService';
import DocumentModel from '../models/documentModel';

export const extractDocumentData = async (req: Request, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ message: 'No file uploaded' });
    return;
  }

  try {
    const extractedText = await extractTextFromImage(req.file.path);
    console.log('Extracted text:', extractedText);

    const parsedData = parseDocumentData(extractedText);
    console.log('Parsed Data:', parsedData);

    // Check if parsedData is null due to failed parsing
    if (!parsedData) {
      res.status(400).json({ message: 'Failed to parse document data' });
      return;
    }

    // Validate the parsed data structure
    if (!validateParsedData(parsedData)) {
      res.status(400).json({ message: 'Parsed document data is invalid or missing fields' });
      return;
    }

    const document = new DocumentModel(parsedData);
    await document.save();

    res.json({ message: 'Document data extracted and stored successfully', data: document });
  } catch (error) {
    console.error('Error processing document:', error);
    res.status(500).json({ message: 'Error processing document', error });
  }
};
