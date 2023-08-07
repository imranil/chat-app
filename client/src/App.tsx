import { Provider as ReduxProvider } from 'react-redux';
import { SocketContext, socket } from './utils/context/SocketContext';
import store from './store';
import './App.scss';
import Router from './pages';



function App() {
  return (
      <ReduxProvider store={store}>
        <SocketContext.Provider value={socket}>
          <Router />
        </SocketContext.Provider>
      </ReduxProvider>
  );
}

export default App;
