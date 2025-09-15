export const buildFormData = (
  payload: Record<string, unknown>,
  images?: File[] | null,
): FormData => {
  const form = new FormData();
  form.append(
    'request',
    new Blob([JSON.stringify(payload)], { type: 'application/json' }),
  );

  if (images && images.length > 0) {
    images.forEach((file) => {
      form.append('images', file);
    });
  }

  return form;
};
