import { useMutation, useQuery } from '@tanstack/react-query';
import { addATTENDANCE_EMPLOYEE, delATTENDANCE_EMPLOYEE, editATTENDANCE_EMPLOYEE, getAllATTENDANCE_EMPLOYEE, getAllStats_ADMIN, getAllStats_EMPLOYEE, getByIdATTENDANCE_EMPLOYEE, getByIdATTENDANCE_EMPLOYEES } from '../../https/employees/attendanceEpmloyees.ts';


export const ATTENDANCE_EMPLOYEE_MUTATION_KEY = '/attendance'
export let ATTENDANCE_EMPLOYEE_QUERY_KEY = '/attendance';
export const DEL_ATTENDANCE_EMPLOYEE_QUERY_KEY = '/attendance';
export const EDIT_ATTENDANCE_EMPLOYEE_QUERY_KEY = '/editattendance';
export const useAttendenceMutation = () => useMutation({ mutationFn: addATTENDANCE_EMPLOYEE, mutationKey: [ATTENDANCE_EMPLOYEE_MUTATION_KEY], });
export const useGetAllAttendence = (page = 1, limit = 25) =>
    useQuery({
      queryKey: [ATTENDANCE_EMPLOYEE_QUERY_KEY, page, limit],
      queryFn: () => getAllATTENDANCE_EMPLOYEE(page, limit),
    })
    export const useGetAllStats = () =>
        useQuery({
          queryKey: [ATTENDANCE_EMPLOYEE_QUERY_KEY],
          queryFn: () => getAllStats_EMPLOYEE(),
        })
export const useGetByIdAttendence = (id) => useQuery({ queryFn: ()=> getByIdATTENDANCE_EMPLOYEE(id), queryKey: [ATTENDANCE_EMPLOYEE_QUERY_KEY, id], });
export const useDeleteAttendence = () => useMutation({ mutationFn: delATTENDANCE_EMPLOYEE, mutationKey: [ATTENDANCE_EMPLOYEE_MUTATION_KEY], });
export const useUpdateAttendence = () => useMutation({ mutationFn: editATTENDANCE_EMPLOYEE, mutationKey: [EDIT_ATTENDANCE_EMPLOYEE_QUERY_KEY], });
export const useGetAllStatsForAdmin = () =>
  useQuery({
    queryKey: [ATTENDANCE_EMPLOYEE_QUERY_KEY],
    queryFn: () => getAllStats_ADMIN(),
  })

  export const useGetByIdAttendenceEmployee = (id) => useQuery({ queryFn: ()=> getByIdATTENDANCE_EMPLOYEES(id), queryKey: [ATTENDANCE_EMPLOYEE_QUERY_KEY, id], });