import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Algo from "./Components/Algorithm/Algo.jsx";
import Algo2 from "./Components/Algo2/Algo2.jsx";
import BinarySearch from "./Components/DS/BinarySearch/BinarySearch.jsx";
import Stack from "./Components/DS/stack/Stack.jsx";
import LinkedList from "./Components/DS/LL/LinkedList.jsx";

const router = createBrowserRouter([
  {
    path:'/',
    element:<Navbar/>
  },
  {
    path:'/algorithm',
    element:<Algo/>
  },
  {
    path:'/algorithm2',
    element:<Algo2/>
  },
  {
    path:'/binarysearch',
    element:<BinarySearch/>
  },
  {
    path:'/stack',
    element:<Stack/>
  },
  ,
  {
    path:'/linkedlist',
    element:<LinkedList/>
  },
])

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<Navbar />}>
//       {/* <Route path="/" element={<Home />} /> */}
//       {/* <Route path="/algorithm" element={<Algo />} /> */}
//     </Route>
//   )
// );

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
  // <App/>
);
