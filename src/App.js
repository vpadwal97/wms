import logo from './logo.svg';
import './_App.scss';
import { RouterProvider } from 'react-router-dom';
import Routing from './routing/Routing';

function App() {
  return (
    <>
    <RouterProvider router={Routing} />
    </>
  );
}

export default App;
