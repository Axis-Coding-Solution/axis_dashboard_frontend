import { useMutation, useQuery } from '@tanstack/react-query';
import { addEMPLOYEE, delEMPLOYEE, editEMPLOYEE, getAllEMPLOYEE, getByIdEMPLOYEE } from '../../https/employees/allEmployee.ts';

export const EMPLOYEE_MUTATION_KEY = '/employee'
export let EMPLOYEE_QUERY_KEY = '/employee';
export const DEL_EMPLOYEE_QUERY_KEY = '/employee';
export const EDIT_EMPLOYEE_QUERY_KEY = '/editemployee';
export const useEmployeetMutation = () => useMutation({ mutationFn: addEMPLOYEE, mutationKey: [EMPLOYEE_MUTATION_KEY], });
export const useGetAllEmployee = () => useQuery({ queryFn: getAllEMPLOYEE, queryKey: [EMPLOYEE_QUERY_KEY], });
export const useGetByIdEmployee = (id) => useQuery({ queryFn: ()=> getByIdEMPLOYEE(id), queryKey: [EMPLOYEE_QUERY_KEY, id], });
export const useDeleteEmployee = () => useMutation({ mutationFn: delEMPLOYEE, mutationKey: [EMPLOYEE_MUTATION_KEY], });
export const useEditEmployee = () => useMutation({ mutationFn: editEMPLOYEE, mutationKey: [EDIT_EMPLOYEE_QUERY_KEY], });

