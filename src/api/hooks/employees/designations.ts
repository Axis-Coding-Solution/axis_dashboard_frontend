import { useMutation, useQuery } from '@tanstack/react-query';
import { addDesignation, delDesignation, editDesignation, getAllDesignation, getByIdDesignation } from '../../https/employees/designation.ts';

export const DSIGNATION_MUTATION_KEY = '/designation'
export let DSIGNATION_QUERY_KEY = '/designation';
export const DEL_DSIGNATION_QUERY_KEY = '/designation';
export const EDIT_DSIGNATION_QUERY_KEY = '/editdesignation';
export const useAddDesignation = () => useMutation({ mutationFn: addDesignation, mutationKey: [DSIGNATION_MUTATION_KEY]});
export const useGetAllDesignation = () => useQuery({ queryFn: getAllDesignation, queryKey: [DSIGNATION_QUERY_KEY], });
export const useGetByIdDesignation = (id) => useQuery({ queryFn: ()=> getByIdDesignation(id), queryKey: [DEL_DSIGNATION_QUERY_KEY, id], });
export const useDeleteDesignation = () => useMutation({ mutationFn: delDesignation, mutationKey: [DSIGNATION_MUTATION_KEY], });
export const useEditDesignation = () => useMutation({ mutationFn: editDesignation, mutationKey: [EDIT_DSIGNATION_QUERY_KEY], });

