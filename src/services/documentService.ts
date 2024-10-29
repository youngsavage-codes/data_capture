export const parseDocumentData = (extractedText: string): any => {
  // Improved Regular expressions with flexible matching
  const nameRegex = /(?:NAME|Full Name|Surname|Other Name|First Name|Middle Name|FN|LN)[\s\W]*([A-Za-z\s,.]+)/i;
  const idNumberRegex = /(?:IDNO|ID NO|ID Number|Identity number|Number|ID)\s*[:|-]?\s*([\d-]+)/i;
  const dobRegex = /(?:Date of Birth|DOB|Birth)\s*[:|-]?\s*(\d{1,2}\/\d{1,2}\/\d{2,4})/i;
  const addressRegex = /(?:Address|Add|Addr)[\s\W]*([A-Za-z0-9\s,.-]+)/i;
  const sexRegex = /(?:Sex|Gender)\s*[:|-]?\s*(Male|Female|Other)/i;
  const emailRegex = /(?:Email|E-mail|Mail)\s*[:|-]?\s*([\w.-]+@[a-z]+\.[a-z]+)/i;
  const phoneRegex = /(?:Phone|Tel|Mobile)[\s\W]*([+]?[\d\s-]+)/i;

  // Split the extracted text by lines to aid in line-by-line matching
  const lines = extractedText.split('\n');

  // Helper function to search to the right or below a heading
  const findDataForHeading = (regex: RegExp): string | null => {
    for (let i = 0; i < lines.length; i++) {
      const match = lines[i].match(regex);
      if (match) {
        // First, check if data is directly beside the heading
        const inlineMatch = match[1]?.trim();
        if (inlineMatch) return inlineMatch;

        // If not found beside, check below the heading (within the next few lines)
        for (let j = 1; j <= 3 && i + j < lines.length; j++) {
          const belowMatch = lines[i + j].trim();
          if (belowMatch) return belowMatch;
        }
      }
    }
    return null;
  };

  // Extract values using the helper function
  const fullName = findDataForHeading(nameRegex);
  const documentNumber = findDataForHeading(idNumberRegex);
  const dobMatch = findDataForHeading(dobRegex);
  const address = findDataForHeading(addressRegex);
  const sex = findDataForHeading(sexRegex);
  const email = findDataForHeading(emailRegex);
  const phone = findDataForHeading(phoneRegex);

  // Parse the date of birth
  const parseDate = (dateString: string): Date | null => {
    const parts = dateString.split('/');
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      const date = new Date(year, month, day);
      return isNaN(date.getTime()) ? null : date;
    }
    return null;
  };

  const dateOfBirth = dobMatch ? parseDate(dobMatch) : null;

  // Construct structured data object with parsed values
  return {
    fullName,
    documentNumber,
    dateOfBirth,
    address,
    sex,
    email,
    phone,
    documentType: 'Student ID', // Assuming a default document type
    createdAt: new Date(), // Current date/time
  };
};


export const validateParsedData = (data: any): boolean => {
  // Ensure required fields are present and valid
  return (
    typeof data === 'object' &&
    !!data.fullName &&
    !!data.sex && // Validate gender/sex
    data.dateOfBirth instanceof Date && !isNaN(data.dateOfBirth.getTime()) && // Validate date of birth
    data.issueDate instanceof Date && !isNaN(data.issueDate.getTime()) && // Validate issue date
    data.expiryDate instanceof Date && !isNaN(data.expiryDate.getTime()) // Validate expiry date
  );
};
