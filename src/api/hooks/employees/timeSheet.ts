import { useMutation, useQuery } from '@tanstack/react-query';
import { addTIMESHEET, delTIMESHEET, editTIMESHEET, getAllTIMESHEET, getByIdTIMESHEET } from '../../https/employees/timeSheet.ts';


export const TIMESHEET_MUTATION_KEY = '/overtime'
export let TIMESHEET_QUERY_KEY = '/overtime';
export const DEL_TIMESHEET_QUERY_KEY = '/overtime';
export const EDIT_TIMESHEET_QUERY_KEY = '/editovertime';
export const useAddTimeSheet = () => useMutation({ mutationFn: addTIMESHEET, mutationKey: [TIMESHEET_MUTATION_KEY]});
export const useGetAllTimeSheet = (page = 1, limit = 25) =>
    useQuery({
      queryKey: [TIMESHEET_QUERY_KEY, page, limit],
      queryFn: () => getAllTIMESHEET(page, limit),
    })
export const useGetByIdTimeSheet = (id) => useQuery({ queryFn: ()=> getByIdTIMESHEET(id), queryKey: [DEL_TIMESHEET_QUERY_KEY, id], });
export const useDeleteTimeSheet = () => useMutation({ mutationFn: delTIMESHEET, mutationKey: [TIMESHEET_MUTATION_KEY], });
export const useEditTimeSheet = () => useMutation({ mutationFn: editTIMESHEET, mutationKey: [EDIT_TIMESHEET_QUERY_KEY], });
