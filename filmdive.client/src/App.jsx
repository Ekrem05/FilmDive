import Navigation from "./components/Navigation/Navigation";
import AboveTheFold from "./components/Header/AboveTheFold";
import Header from "./components/Header/Header";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Lists from "./components/Lists/Lists";
const client = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={client}>
      <Header>
        <Navigation />
        <AboveTheFold />
      </Header>
      <Lists />
    </QueryClientProvider>
  );
}

export default App;
