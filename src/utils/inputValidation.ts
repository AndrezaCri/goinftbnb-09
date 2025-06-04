
// Input validation utilities to prevent XSS and injection attacks
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 500); // Limit length
};

export const validateAlbumTitle = (title: string): { isValid: boolean; error?: string } => {
  const sanitized = sanitizeInput(title);
  
  if (!sanitized) {
    return { isValid: false, error: 'Title is required' };
  }
  
  if (sanitized.length < 2) {
    return { isValid: false, error: 'Title must be at least 2 characters long' };
  }
  
  if (sanitized.length > 100) {
    return { isValid: false, error: 'Title must be less than 100 characters' };
  }
  
  return { isValid: true };
};

export const validateAlbumDescription = (description: string): { isValid: boolean; error?: string } => {
  const sanitized = sanitizeInput(description);
  
  if (sanitized.length > 500) {
    return { isValid: false, error: 'Description must be less than 500 characters' };
  }
  
  return { isValid: true };
};

export const validateAIPrompt = (prompt: string): { isValid: boolean; error?: string } => {
  const sanitized = sanitizeInput(prompt);
  
  if (!sanitized) {
    return { isValid: false, error: 'Prompt is required' };
  }
  
  if (sanitized.length < 5) {
    return { isValid: false, error: 'Prompt must be at least 5 characters long' };
  }
  
  if (sanitized.length > 200) {
    return { isValid: false, error: 'Prompt must be less than 200 characters' };
  }
  
  return { isValid: true };
};
