import { useState } from 'react';

function useInput(param: string = '', callback?: any): any[] {
    const [state, setState] = useState(param);
    const setInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(e.target.value);
    }
    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            e.preventDefault();
            callback(state);
        }
        
    }
    const reset = () => {
        setState("");
    }
    return [state, setInput, handleEnter, reset]
}

export default useInput;