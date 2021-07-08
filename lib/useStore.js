import { useState, useEffect } from "react";
export let store = { ls: ["card1", "card2"] };
let listeners = [];
// setStore(store => ({...store, isFoo: false}))
export function setStore(val) {
    if (typeof val === "object" && val !== null) {
        store = val;
    }
    else {
        store = val(store);
    }
    store = val;
    listeners.forEach(l => l(val));
}
export function getStore() {
    return Object.assign({}, store);
}
// setStore(store => {
//     return {...store }
// })
export default function useStore() {
    const listener = useState()[1];
    useEffect(() => {
        listeners.push(listener);
        return () => void (listeners = listeners.filter(l => l === listener));
    }, []);
    return [store, setStore];
}