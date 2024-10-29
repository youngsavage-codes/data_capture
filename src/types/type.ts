export interface IDocument {
    fullName: string;
    documentNumber: string;
    dateOfBirth: Date;
    expiryDate: Date;
    nationality: string; // Added nationality field
    sex: string; // Added sex field
    documentType: string;
    createdAt: Date;
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
  