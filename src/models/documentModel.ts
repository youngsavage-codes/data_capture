import mongoose, { Schema } from 'mongoose';
import { IDocument } from '../types/type';

const DocumentSchema = new Schema<IDocument>({
  fullName: { type: String, required: true },
  documentNumber: { type: String, required: true, unique: true },
  dateOfBirth: { type: Date, required: true },
  expiryDate: { type: Date, required: true },
  documentType: { type: String, required: true }, // e.g., 'ID', 'Passport'
  createdAt: { type: Date, default: Date.now }
});

const DocumentModel = mongoose.model<IDocument>('Document', DocumentSchema);

export default DocumentModel;
