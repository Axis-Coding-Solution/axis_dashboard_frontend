import { useMutation, useQuery } from '@tanstack/react-query';
import { addOVERTIME, delOVERTIME, editOVERTIME, getAllOVERTIME, getByDataOVERTIME, getByIdOVERTIME } from '../../https/employees/overTime.ts';

export const OVERTIME_MUTATION_KEY = '/overtime'
export let OVERTIME_QUERY_KEY = '/overtime';
export const DEL_OVERTIME_QUERY_KEY = '/overtime';
export const EDIT_OVERTIME_QUERY_KEY = '/editovertime';
export const useAddOvertime = () => useMutation({ mutationFn: addOVERTIME, mutationKey: [OVERTIME_MUTATION_KEY]});
export const useGetAllOvertime = () => useQuery({ queryFn: getAllOVERTIME, queryKey: [OVERTIME_QUERY_KEY], });
export const useGetByIdOvertime = (id) => useQuery({ queryFn: ()=> getByIdOVERTIME(id), queryKey: [DEL_OVERTIME_QUERY_KEY, id], });
export const useDeleteOvertime = () => useMutation({ mutationFn: delOVERTIME, mutationKey: [OVERTIME_MUTATION_KEY], });
export const useEditOvertime = () => useMutation({ mutationFn: editOVERTIME, mutationKey: [EDIT_OVERTIME_QUERY_KEY], });
export const useSearchData = () => {
    return useMutation({
      mutationFn: (date) => getByDataOVERTIME(date), 
    });
  };
