import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    element: <Contact />,
    path: "contact/:contactId"
  }
]);


export function App() {

  return (
    <RouterProvider router={router} />
  )
}

