import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import LatestNotes from "./components/LatestNote";
import InitialNotes from "./components/InitialNotes";
import './App.css';

function App() {
  return (
    <ApolloProvider client={ client }>
      <div className="App">
        <h1 className="title">Notes</h1>
        <div>
          <InitialNotes/>
          <LatestNotes/>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
