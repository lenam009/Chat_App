import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import '@/assets/css/styles.css';
import store from './redux/store';
import { persistor } from './redux/store';

import 'components/GlobalStyle/GlobalStyle.css';
import router from './routes/router';
import { RouterProvider } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            {/* <App /> */}
            <RouterProvider router={router} />
        </PersistGate>
    </Provider>,
);
