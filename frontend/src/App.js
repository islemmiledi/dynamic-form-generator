import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Forms from "./pages/forms";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditForm from "./pages/edit-form"
import CreateForm from  "./pages/create-form"
import ViewForm from "./pages/view-form"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Forms />} />

        <Route path="/create-form" element={<CreateForm />} />

        <Route path="/edit-form/:formId" element={<EditForm />} />

        <Route path="/view-form/:formId" element={<ViewForm />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
