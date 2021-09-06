import "./App.css";

import { DateProvider } from "./components/ServiceContext";
import HolidayApp from "./components/HolidayApp";

function App() {
  return (
    <DateProvider>
      <HolidayApp />
    </DateProvider>
  );
}

export default App;
