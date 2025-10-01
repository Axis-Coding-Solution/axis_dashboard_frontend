import { useMutation, useQuery } from '@tanstack/react-query';
import { addLEAVESETTINGS, delLEAVESETTINGS, editLEAVESETTINGS, getAllLEAVESETTINGS, getByDataLEAVESETTINGS, getByIdLEAVESETTINGS } from '../../https/employees/leaveSettings.ts';

export const LEAVESETTINGS_MUTATION_KEY = '/overtime'
export let LEAVESETTINGS_QUERY_KEY = '/overtime';
export const DEL_LEAVESETTINGS_QUERY_KEY = '/overtime';
export const EDIT_LEAVESETTINGS_QUERY_KEY = '/editovertime';
export const useAddLeaveSettings = () => useMutation({ mutationFn: addLEAVESETTINGS, mutationKey: [LEAVESETTINGS_MUTATION_KEY]});
export const useGetAllLeaveSettings = () => useQuery({ queryFn: getAllLEAVESETTINGS, queryKey: [LEAVESETTINGS_QUERY_KEY], });
export const useGetByIdLeaveSettings = (id) => useQuery({ queryFn: ()=> getByIdLEAVESETTINGS(id), queryKey: [DEL_LEAVESETTINGS_QUERY_KEY, id], });
export const useDeleteLeaveSettings = () => useMutation({ mutationFn: delLEAVESETTINGS, mutationKey: [LEAVESETTINGS_MUTATION_KEY], });
export const useEditLeaveSettings = () => useMutation({ mutationFn: editLEAVESETTINGS, mutationKey: [EDIT_LEAVESETTINGS_QUERY_KEY], });