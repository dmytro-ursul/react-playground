import TodoList from './components/todoList/TodoList';
import Login from './components/Login';

import {
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>

      {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
