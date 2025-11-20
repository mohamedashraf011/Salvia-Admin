import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Pages/Home/Home";
import About from "./Pages/About-us/About";
import Preview from "./Pages/About-us/Preview";
import Product from "./Pages/Products/Product";
import AddProduct from "./Pages/Products/AddProduct";
import EditProduct from "./Pages/Products/EditProduct";

import Quality from "./Pages/Our-Quality-Commitment/Quality";
import QualityPreview from "./Pages/Our-Quality-Commitment/Preview";
import RnD from "./Pages/R&D/R&D";
import RnDPreview from "./Pages/R&D/Preview";
import Gallary from "./Pages/Gallary/Gallery";
import Events from "./Pages/Events/Event";
import AddEvent from "./Pages/Events/AddEvent";
import EditEvent from "./Pages/Events/EditEvent";
import Contact from "./Pages/Contact-us/Contact";
import Certificate from "./Pages/Certificates/Certificate";
import AddCertificate from "./Pages/Certificates/AddCertificate";
import EditCertificate from "./Pages/Certificates/EditCertificate";
import Page9 from "./Pages/Page-9/Page9";
import Page10 from "./Pages/Page-10/Page10";
import Login from "./Pages/Login";
import { Toaster } from "./Components/ui/sonner";

// Protected Route Component
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />
          <Route
            path="/preview/:blockId"
            element={
              <ProtectedRoute>
                <Preview />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Product />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-product"
            element={
              <ProtectedRoute>
                <AddProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-product/:productId"
            element={
              <ProtectedRoute>
                <EditProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/our-quality"
            element={
              <ProtectedRoute>
                <Quality />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quality-preview/:sectionId/:sectionName"
            element={
              <ProtectedRoute>
                <QualityPreview />
              </ProtectedRoute>
            }
          />
          <Route
            path="/r-and-d"
            element={
              <ProtectedRoute>
                <RnD />
              </ProtectedRoute>
            }
          />
          <Route
            path="/r-and-d-preview/:blockId"
            element={
              <ProtectedRoute>
                <RnDPreview />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gallary"
            element={
              <ProtectedRoute>
                <Gallary />
              </ProtectedRoute>
            }
          />
          <Route
            path="/events"
            element={
              <ProtectedRoute>
                <Events />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-event"
            element={
              <ProtectedRoute>
                <AddEvent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-event/:id"
            element={
              <ProtectedRoute>
                <EditEvent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact-us"
            element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            }
          />
          <Route
            path="/certificates"
            element={
              <ProtectedRoute>
                <Certificate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-certificate"
            element={
              <ProtectedRoute>
                <AddCertificate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-certificate/:id"
            element={
              <ProtectedRoute>
                <EditCertificate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/page9"
            element={
              <ProtectedRoute>
                <Page9 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/page10"
            element={
              <ProtectedRoute>
                <Page10 />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
