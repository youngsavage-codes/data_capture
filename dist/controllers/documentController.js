"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractDocumentData = void 0;
const ocrService_1 = require("../services/ocrService");
const documentService_1 = require("../services/documentService");
const documentModel_1 = __importDefault(require("../models/documentModel"));
const extractDocumentData = async (req, res) => {
    if (!req.file) {
        res.status(400).json({ message: 'No file uploaded' });
        return;
    }
    try {
        const extractedText = await (0, ocrService_1.extractTextFromImage)(req.file.path);
        console.log('Extracted text:', extractedText);
        const parsedData = (0, documentService_1.parseDocumentData)(extractedText);
        console.log('Parsed Data:', parsedData);
        // Check if parsedData is null due to failed parsing
        if (!parsedData) {
            res.status(400).json({ message: 'Failed to parse document data' });
            return;
        }
        // Validate the parsed data structure
        if (!(0, documentService_1.validateParsedData)(parsedData)) {
            res.status(400).json({ message: 'Parsed document data is invalid or missing fields' });
            return;
        }
        const document = new documentModel_1.default(parsedData);
        await document.save();
        res.json({ message: 'Document data extracted and stored successfully', data: document });
    }
    catch (error) {
        console.error('Error processing document:', error);
        res.status(500).json({ message: 'Error processing document', error });
    }
};
exports.extractDocumentData = extractDocumentData;
