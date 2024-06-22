import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import commandHistoryReducer from './commandHistorySlice';

const rootReducer = combineReducers({
    commandHistory: commandHistoryReducer,
});

const store = createStore(rootReducer);

const StoreProvider = ({ children }) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};

export default StoreProvider;
