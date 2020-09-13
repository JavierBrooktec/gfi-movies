import { useState } from 'react';

function useToggle(param: boolean = false):any[] {
    const [state, setState] = useState(param);
    const toogle = () => setState(!state);
    return [state, toogle]
}

export default useToggle;