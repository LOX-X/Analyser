import { createBrowserRouter } from "react-router-dom";
import App from "../components/app/App";
import Analyser from '../components/pages/analyser/analyser'
import MorseCode from "../components/pages/morsecode/morseCode";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    //errorElement: <ErrorPage />,
    children: [
      {
        index:true,
        element: <Analyser />,
      },
      {
        path:'/translator',
        element: <MorseCode />,
      },
    ],
  },
]);

export default routes;