import { BrowserRouter } from "react-router-dom";
import { store } from "./store/index";
import { Provider } from "react-redux";
import { AppRoutes } from "./routes/routes";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
