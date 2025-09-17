export const buildFormDataSingle = (
  payload: Record<string, unknown>,
  imageFile?: File | null,
): FormData => {
  const form = new FormData();
  form.append(
    'request',
    new Blob([JSON.stringify(payload)], { type: 'application/json' }),
  );

  if (imageFile) {
    form.append('imageFile', imageFile);
  }

  return form;
};

export const buildFormDataMultiple = (
  payload: Record<string, unknown>,
  imageFiles?: File[] | null,
): FormData => {
  const form = new FormData();
  form.append(
    'request',
    new Blob([JSON.stringify(payload)], { type: 'application/json' }),
  );

  if (imageFiles && imageFiles.length > 0) {
    imageFiles.forEach((file) => {
      form.append('imageFiles', file);
    });
  }

  return form;
};
