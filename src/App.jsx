import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Blogs from './pages/Blogs';
import CreateBlog from "./pages/CreateBlog";
import Blog from './pages/Blog';



  
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    errorElement:<NotFound/>
  },
  {
    path: "/blogs",
    element: <Blogs/>,
  },
  {
    path: "/create-blog",
    element: <CreateBlog/>
  },
  {
    path: "/blogs/:id",
    element: <Blog/>
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
