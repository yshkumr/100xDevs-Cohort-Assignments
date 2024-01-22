import "./App.css";
import GithubCard from "./components/GithubCard";

function App() {
  return (
    <>
      <h1>Github Info Card</h1>
      <div className="cards">
        <GithubCard username="yshkumr" />
        <GithubCard username="hkirat" />
        <GithubCard username="kdrag0n" />
      </div>
    </>
  );
}

export default App;
