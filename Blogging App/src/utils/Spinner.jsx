import FadeLoader from "react-spinners/FadeLoader";

function App() {

  return (
    <div className="sweet-loading flex items-center justify-center mt-7" >
        <h1 className="text-white text-xl mr-7">Loading Posts</h1>

      <FadeLoader
        color="green"
        size={500}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default App;