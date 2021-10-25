import { createStore, applyMiddleware, compose } from 'redux';
import { rootReducer } from 'app/reducers';

// 相关中间件
import thunk from 'redux-thunk';

// redux 调试工具
const composeEnhancers = (typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const enhancer = composeEnhancers(
    applyMiddleware(thunk)
);

const store = createStore(rootReducer, enhancer)

export default store;