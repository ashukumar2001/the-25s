import { Route, Routes } from "react-router-dom";
import "./App.css";
import AppContainer from "./components/Containers/AppContainer";
import Dashboard from "./components/Dashboard";
import PlayersDetailsStepper from "./components/PlayerDetails";

const App = () => {
  return (
    <div className="App">
      <AppContainer maxWidth="xs">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/players-registration"
            element={<PlayersDetailsStepper />}
          />
        </Routes>
      </AppContainer>
    </div>
  );
};
export default App;
