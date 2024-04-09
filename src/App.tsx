import Board from './Components/Board/Board';
import PieceHolster from './Components/PieceHolster/PieceHolster';
import ReducerLearner from './Components/ReducerLearner/ReducerLearner'
import './App.css';

function App() {
  return (
    <div className="block-game">
      {/* <Board /> */}
      <ReducerLearner />
    </div>
  );
}

export default App;
