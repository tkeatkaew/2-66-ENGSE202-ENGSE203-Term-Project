import { configureStore } from 'redux';
import usersReducer from '../reducers/users';

const store = configureStore(usersReducer);

store.subscribe(() => {
    console.log('store data:', store.getState());
});

export default store;