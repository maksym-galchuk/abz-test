export async function convertBlobUrlToFile(blobUrl: string, filename: string) {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type });
}
