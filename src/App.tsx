import { Toaster } from "sonner";
import MainLayout from "./components/layouts/MainLayout";

const App = () => {
  
  return (
    <div className="">
      <MainLayout />
      <Toaster position="top-right" />
    </div>
  );
};

export default App;
