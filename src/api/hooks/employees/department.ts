import { useMutation, useQuery } from '@tanstack/react-query';
import { addDepartment, delDepartment, editDepartment, getAllDepartment, getByIdDepartment } from '../../https/employees/department.ts';

export const DEPARTMENT_MUTATION_KEY = '/department'
export let DEPARTMENT_QUERY_KEY = '/departments';
export const DEL_DEPARTMENT_QUERY_KEY = '/departments';
export const EDIT_DEPARTMENT_QUERY_KEY = '/editdepartments';
export const useAddDepartmentMutation = () => useMutation({ mutationFn: addDepartment, mutationKey: [DEPARTMENT_MUTATION_KEY], });
export const useGetAllDepartment = (page = 1, limit = 25) =>
    useQuery({
      queryKey: [DEPARTMENT_QUERY_KEY, page, limit],
      queryFn: () => getAllDepartment(page, limit),
    })
export const useGetByIdDepartment = (id) => useQuery({ queryFn: ()=> getByIdDepartment(id), queryKey: [DEPARTMENT_QUERY_KEY, id], });
export const useDeleteDepartment = () => useMutation({ mutationFn: delDepartment, mutationKey: [DEPARTMENT_MUTATION_KEY], });
export const useEditDepartment = () => useMutation({ mutationFn: editDepartment, mutationKey: [EDIT_DEPARTMENT_QUERY_KEY], });

