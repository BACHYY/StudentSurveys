import './App.css';
import { Provider } from 'react-redux';
import { store } from './store';
import Routes from './ROUTES';
import { BrowserRouter } from 'react-router-dom';

function App() {
    return (
        <>
            <Provider store={store}>
                <BrowserRouter>
                    <Routes />
                </BrowserRouter>
            </Provider>
        </>
    );
}

export default App;
