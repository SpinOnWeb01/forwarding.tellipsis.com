import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "react-datetime/css/react-datetime.css";
import { ToastContainer } from "react-toastify";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import All_Route from "./routes/AllRoute";
import ErrorBoundary from "./pages/ErrorBoundaries";
Chart.register(CategoryScale);
function App() {
  
  return (
    <div className="App" >
      <ErrorBoundary>
      <All_Route />
      </ErrorBoundary>
      <ToastContainer />
    </div>
  );
}

export default App;
