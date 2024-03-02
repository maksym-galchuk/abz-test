export const getImageDimensionFromBlob = (
  blobUrl: string
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      resolve({
        width: image.width,
        height: image.height,
      });
    };
    image.onerror = reject;
    image.src = blobUrl;
  });
};
