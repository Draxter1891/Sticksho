import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster
        position="bottom-right"
        containerStyle={{
          bottom: 20,
          right: 20,
        }}
      />
      <AppRoutes />
    </>
  );
};

export default App;
