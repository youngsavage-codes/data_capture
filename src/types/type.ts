export interface IDocument {
    fullName: string; // Required: name field
    documentNumber?: string; // Optional: document number
    dateOfBirth: Date; // Required: date of birth
    issueDate?: Date; // Optional: issue date
    expiryDate?: Date; // Optional: expiration date
    gender: string; // Required: gender
    address?: string; // Optional: address
    createdAt?: Date; // Optional: creation timestamp, defaults to now in schema
}



export interface RawOcrResponse {
    text: string;
};
  
export interface ParsedData {
    fullName: string;
    documentNumber: string;
    dateOfBirth: string;
    expiryDate: string;
};

export interface IdentityCardData {
    surname: string;
    firstName: string;
    middleName: string;
    dateOfBirth: string; // Format: 'DD MMM YYYY'
    sex: string; // 'M' or 'F'
    height: string; // Format: 'X.X cm'
    nationality: string; // Country Code
    documentNumber: string;
    expiryDate: string; // Format: 'DD MMM YYYY'
  }
  