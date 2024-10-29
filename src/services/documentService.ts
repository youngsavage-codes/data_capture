export const parseDocumentData = (extractedText: string): any => {
  // Regular expressions for matching fields in the extracted text with flexible patterns
  const nameRegex = /(?:PP Name|Surname|Name)\s*[:|-]?\s*([A-Za-z]+)\s+([A-Za-z]+)/i;
  const dobRegex = /(?:Date of Birth|rl Date of Birth|Daxie of Dirth)\s*[:|-]?\s*(\d{1,2}-[A-Z]{3}-\d{4})/i;
  const idNumberRegex = /(?:ID Number|Number|ID)\s*[:|-]?\s*(\d{6,10})/i;
  const expiryDateRegex = /(?:Expiry Date|Expire Date|Pe Expire Date)\s*[:|-]?\s*(\d{1,2}-[A-Z]{3}-\d{4})/i;

  // Log regex matches for debugging
  const nameMatch = extractedText.match(nameRegex);
  console.log('Name Match:', nameMatch);

  const dobMatch = extractedText.match(dobRegex);
  console.log('DOB Match:', dobMatch);

  const idNumberMatch = extractedText.match(idNumberRegex);
  console.log('ID Number Match:', idNumberMatch);

  const expiryDateMatch = extractedText.match(expiryDateRegex);
  console.log('Expiry Date Match:', expiryDateMatch);

  // Extracted fields with default values if null
  const surname = nameMatch ? nameMatch[1] : null;
  const firstName = nameMatch ? nameMatch[2] : null;
  const documentNumber = idNumberMatch ? idNumberMatch[1] : null;

  // Parse dates with error handling
  const parseDate = (dateString: string): Date | null => {
    const parts = dateString.split('-');
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = new Date(Date.parse(parts[1] + " 1")).getMonth(); // Convert month to numeric
      const year = parseInt(parts[2], 10);
      const date = new Date(year, month, day);
      return isNaN(date.getTime()) ? null : date; // Validate date
    }
    return null; // Return null if format is invalid
  };

  const dateOfBirth = dobMatch ? parseDate(dobMatch[1]) : null;
  const expiryDate = expiryDateMatch ? parseDate(expiryDateMatch[1]) : null;

  // Combine names into a full name
  const fullName = [surname, firstName].filter(Boolean).join(' ');

  // Return structured data if essential fields are present
  if (fullName && documentNumber && dateOfBirth && expiryDate) {
    return {
      fullName,
      documentNumber,
      dateOfBirth,
      expiryDate,
      documentType: 'ID_CARD',
      createdAt: new Date(), // Current date/time
    };
  }

  // Return null if essential fields are missing
  return null;
};

export const validateParsedData = (data: any): boolean => {
  // Ensure required fields are present and valid
  return (
    typeof data === 'object' &&
    !!data.fullName &&
    !!data.documentNumber &&
    data.dateOfBirth instanceof Date && !isNaN(data.dateOfBirth.getTime()) && // Validate date
    data.expiryDate instanceof Date && !isNaN(data.expiryDate.getTime()) // Validate date
  );
};
