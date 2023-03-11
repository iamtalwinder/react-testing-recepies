import DelayMessage from './recepies/testing-with-timer/DelayMessage';

function App() {
  return (
    <div>
      <DelayMessage delay={2000} message='hello'/>
    </div>
  );
}

export default App;
