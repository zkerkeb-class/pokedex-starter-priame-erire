import React from 'react';
import { RouterProvider } from 'react-router-dom'; // ✅ correct source
import router from './config/router';
const App = () => {
  return <RouterProvider router={router} />;
};
export default App;