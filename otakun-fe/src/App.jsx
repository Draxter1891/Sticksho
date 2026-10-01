import AppRoutes from "./routes/AppRoutes";
import { AppProvider } from "./context/AppContext";

const App = () => {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
};

export default App;