import { useMutation } from '@tanstack/react-query';
import { loginUserApi } from '../../https/auth/index.ts';

export const LOGIN_MUTATION_KEY = '/users/login'

export const useUserLoginMutation = () =>
    useMutation({
        mutationFn: loginUserApi,
        mutationKey: [LOGIN_MUTATION_KEY],
    });

