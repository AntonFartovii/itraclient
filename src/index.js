import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from "./stores/UserStore";
import ItemStore from "./stores/ItemStore";
import {CollectionStore} from "./stores/CollectionStore";
import {TagStore} from "./stores/TagStore";
import {AdminStore} from "./stores/AdminStore";

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
            <Context.Provider value={{
                user: new UserStore(),
                admin: new AdminStore(),
                item: new ItemStore(),
                collection: new CollectionStore(),
                tag: new TagStore()
            }}>
                <App />
            </Context.Provider>
);


// Компонент Provider
// После создания контекста, его требуется использовать совместно с компонентом Provider,
// который позволяет дочерним компонентам подписаться на его изменения.
// Если проще, то благодаря компоненту Provider все дочерние компоненты могут получить значения, которые мы ему передаем.