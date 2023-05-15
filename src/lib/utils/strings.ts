export const getFileExtension = (filename: string): string => {
  const parts = filename.split('.');
  return parts[parts.length - 1];
};

export const truncateText = (text: string, maxLength: number) => {
  if (!text) return text;
  if (maxLength <= 0) return text;

  if (text && text?.trim().length < maxLength) return text.trim();

  const dots = '...';
  const truncatedText = text.trim().substring(0, maxLength - dots.length);

  return (truncatedText + dots).trim();
};
