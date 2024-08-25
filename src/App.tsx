import { Toaster } from "sonner";
import MainLayout from "./components/layouts/MainLayout";

const App = () => {
  
  return (
    <div className="">
      <MainLayout></MainLayout>
      <Toaster position="top-right" />
    </div>
  );
};

export default App;
