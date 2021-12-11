import "./App.css";
import { Users } from "./components/User";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <Users />
      </RecoilRoot>
    </div>
  );
}

export default App;
