import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar";
import GlobalStyles from "./Components/styles/index.tsx";

const OrderManagement = lazy(() => import('./Order-Management/index.tsx')); 
const Dashboard = lazy(() => import('./Dashboard/index.tsx'));
const Settings = lazy(() => import('./Setting/index.tsx'));

const App = () => {
  return (
    <>
          <GlobalStyles />
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ padding: "20px", flex: 1 }}>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/order-management" element={<OrderManagement />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </Router>
    </>
  );
};

export default App;
