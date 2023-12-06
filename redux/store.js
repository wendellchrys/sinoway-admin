import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

function configStore(initialState = {}) {
   const store = createStore(reducers, initialState, applyMiddleware(thunk));

   return store;
}

export default configStore;
