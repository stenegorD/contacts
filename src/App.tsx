import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";

const basename = import.meta.env.DEV ? "/" : "/contacts";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    element: <Contact />,
    path: "contact/:contactId"
  }
], { basename });


export function App() {

  return (
    <RouterProvider router={router} />
  )
}

