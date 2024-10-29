import mongoose, { Schema } from 'mongoose';
import { IDocument } from '../types/type';

const DocumentSchema = new Schema<IDocument>({
  fullName: { type: String, required: true }, // Required name
  documentNumber: { type: String, unique: true }, // Optional document number
  issueDate: { type: Date }, // Optional issue date
  expiryDate: { type: Date }, // Optional expiration date
  gender: { type: String, required: true }, // Required gender
  dateOfBirth: { type: Date, required: true }, // Required date of birth (dob)
  address: { type: String } // Optional address
});

// Create a model for the Document schema
const DocumentModel = mongoose.model<IDocument>('Document', DocumentSchema);

export default DocumentModel;
