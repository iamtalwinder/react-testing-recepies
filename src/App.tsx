import DebounceSearchInput from "./recepies/testing-with-timer/DebounceSearchInput";

function App() {
  return (
    <div>
      <DebounceSearchInput onChange={() =>  console.log('debounce')}/>
    </div>
  );
}

export default App;
