import { useMutation, useQuery } from "@tanstack/react-query";
import { addProject, delProject, editProject, getAllProject, getByIdProject } from "../../https/project/index.ts";



export const PROJECT_MUTATION_KEY = '/project'
export let PROJECT_QUERY_KEY = '/project';
export const DEL_PROJECT_QUERY_KEY = '/project';
export const EDIT_PROJECT_QUERY_KEY = '/editproject';
export const useAddProject = () => useMutation({ mutationFn: addProject, mutationKey: [PROJECT_MUTATION_KEY], });
export const useGetAllProject = () => useQuery({ queryFn: getAllProject, queryKey: [PROJECT_QUERY_KEY], });
export const useGetByIdProject = (id) => useQuery({ queryFn: ()=> getByIdProject(id), queryKey: [PROJECT_QUERY_KEY, id], });
export const useDeleteProject = () => useMutation({ mutationFn: delProject, mutationKey: [DEL_PROJECT_QUERY_KEY], });
export const useEditProject = () => useMutation({ mutationFn: editProject, mutationKey: [EDIT_PROJECT_QUERY_KEY], });