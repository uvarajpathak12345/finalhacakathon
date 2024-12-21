import "./App.css";
import HealthForm from "./components/Inputs";
import ResponsiveAppBar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatedTestimonialsDemo } from "./pages/Pageanimated-testimonials";
import AppointmentForm from "./pages/Appointment";
import Home from "./pages/Home";

function App() {
  return (
    <>
    <Router>
      <ResponsiveAppBar></ResponsiveAppBar>
      <Routes>
        <Route path ={'/'} element={<Home></Home>}></Route>
        <Route path ={'/appointment'} element={<AppointmentForm></AppointmentForm>}></Route>
        <Route path={'/healthInfo'} element={<HealthForm></HealthForm>}></Route>     
        <Route path={'/doctorinfo'} element={<AnimatedTestimonialsDemo></AnimatedTestimonialsDemo>}></Route>     
      </Routes>
    </Router>
    </>
  );
}

export default App;
