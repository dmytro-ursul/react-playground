import TodoList from 'components/todoList/TodoList';
import Login from 'components/Login';

import {
  Routes,
  Route
} from "react-router-dom";

function App(props) {
  return (
    <div>
      <Routes>
        <Route path="/" element={<TodoList/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </div>
  );
}

export default App;
