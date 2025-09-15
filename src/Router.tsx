import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const withSuspense = (element: React.ReactNode) => (
  <Suspense fallback={<></>}>{element}</Suspense>
);

const router = createBrowserRouter([]);

export default router;
