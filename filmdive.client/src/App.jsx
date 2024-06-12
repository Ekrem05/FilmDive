import Navigation from "./components/Navigation/Navigation";
import AboveTheFold from "./components/Header/AboveTheFold";
import Header from "./components/Header/Header";
function App() {
  return (
    <>
      <Header>
        <Navigation />
        <AboveTheFold />
      </Header>
      <h2>Hello</h2>
    </>
  );
}

export default App;
