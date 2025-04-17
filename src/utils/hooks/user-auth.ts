import {useContext} from 'react';
import {AuthContext} from '../../components/context/index.ts'
export const useAuth = () => {
    const auth = useContext(AuthContext);
    return auth;
  };
  