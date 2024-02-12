import SharedLayout from "./pages/SharedLayout";
import Home from "./pages/Home";
import About from "./pages/About";

import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
} from "react-router-dom";
import Canvas from "./components/Canvas";
// import "../server";
const router = createBrowserRouter(
    createRoutesFromElements(
        // <Route path="/" element={<SharedLayout />}>
        <Route path="/">
            <Route index element={<Home />} />
            {/* <Route path="about" element={<About />} /> */}
        </Route>
    )
);
function App() {
    return <RouterProvider router={router} />;
}

export default App;
