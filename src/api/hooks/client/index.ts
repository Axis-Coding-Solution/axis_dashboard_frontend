import { useMutation, useQuery } from '@tanstack/react-query';
import { addClient, delClient, editClient, getAllClient, getByIdClient } from '../../https/client/index.ts';

export const CLIENT_MUTATION_KEY = '/client'
export let CLIENT_QUERY_KEY = '/client';
export const DEL_CLIENT_QUERY_KEY = '/client';
export const EDIT_CLIENT_QUERY_KEY = '/editclient';
export const useAddClient = () => useMutation({ mutationFn: addClient, mutationKey: [CLIENT_MUTATION_KEY], });
export const useGetAllClient = (page = 1, limit = 25) =>
    useQuery({
      queryKey: [CLIENT_QUERY_KEY, page, limit],
      queryFn: () => getAllClient(page, limit),
    })
export const useGetByIdClient = (id) => useQuery({ queryFn: ()=> getByIdClient(id), queryKey: [CLIENT_QUERY_KEY, id], });
export const useDeleteClient = () => useMutation({ mutationFn: delClient, mutationKey: [CLIENT_MUTATION_KEY], });
export const useEditClient = () => useMutation({ mutationFn: editClient, mutationKey: [EDIT_CLIENT_QUERY_KEY], });

