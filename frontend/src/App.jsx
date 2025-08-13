import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "./contexts/session-context";

function App() {
  return (
    <div className="h-screen w-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 animate-gradient-x">
      <div className="flex justify-center items-center h-full">
        <SessionProvider>
          <RouterProvider router={router} />
          <Toaster />
        </SessionProvider>
      </div>
    </div>
  );
}

export default App;
