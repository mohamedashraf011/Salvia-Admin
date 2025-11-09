import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import About from "./Pages/About-us/About";
import Preview from "./Pages/About-us/Preview";
import Product from "./Pages/Products/Product";


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


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/preview/:blockId" element={<Preview />} />
          <Route path="/products" element={<Product />} />


          <Route path="/our-quality" element={<Quality />} />
          <Route
            path="/quality-preview/:blockId"
            element={<QualityPreview />}
          />
          <Route path="/r-and-d" element={<RnD />} />
          <Route path="/r-and-d-preview/:blockId" element={<RnDPreview />} />
          <Route path="/gallary" element={<Gallary />} />
          <Route path="/events" element={<Events />} />
          <Route path="/add-event" element={<AddEvent />} />
          <Route path="/edit-event/:id" element={<EditEvent />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/certificates" element={<Certificate />} />
          <Route path="/add-certificate" element={<AddCertificate />} />
          <Route path="/edit-certificate/:id" element={<EditCertificate />} />
          <Route path="/page9" element={<Page9 />} />
          <Route path="/page10" element={<Page10 />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
