import { useMutation, useQuery } from '@tanstack/react-query';
import { addHOLIDAY, delHOLIDAY, editHOLIDAY, getAllHOLIDAY, getByIdHOLIDAY } from '../../https/employees/holiday.ts';

export const HOLIDAY_MUTATION_KEY = '/holiday'
export let HOLIDAY_QUERY_KEY = '/holiday';
export const DEL_HOLIDAY_QUERY_KEY = '/holiday';
export const EDIT_HOLIDAY_QUERY_KEY = '/editholiday';
export const useAddHoliday = () => useMutation({ mutationFn: addHOLIDAY, mutationKey: [HOLIDAY_MUTATION_KEY]});
export const useGetAllHoliday = () => useQuery({ queryFn: getAllHOLIDAY, queryKey: [HOLIDAY_QUERY_KEY], });
export const useGetByIdHoliday = (id) => useQuery({ queryFn: ()=> getByIdHOLIDAY(id), queryKey: [DEL_HOLIDAY_QUERY_KEY, id], });
export const useDeleteHoliday = () => useMutation({ mutationFn: delHOLIDAY, mutationKey: [HOLIDAY_MUTATION_KEY], });
export const useEditHoliday = () => useMutation({ mutationFn: editHOLIDAY, mutationKey: [EDIT_HOLIDAY_QUERY_KEY], });

