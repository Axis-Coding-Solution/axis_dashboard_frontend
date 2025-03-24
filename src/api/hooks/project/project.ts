import { useMutation, useQuery } from "@tanstack/react-query";
import { addProject, delProject, editProject, getAllProject, getByIdProject, getProjectByRole } from "../../https/project/index.ts";



export const PROJECT_MUTATION_KEY = '/project'
export let PROJECT_QUERY_KEY = '/project';
export const DEL_PROJECT_QUERY_KEY = '/project';
export const EDIT_PROJECT_QUERY_KEY = '/editproject';
export const PROJECT_BY_ROLE_QUERY_KEY = "/project-by-role";
export const useAddProject = () => useMutation({ mutationFn: addProject, mutationKey: [PROJECT_MUTATION_KEY], });
export const useGetAllProject = (page = 1, limit = 25) =>
    useQuery({
      queryKey: [PROJECT_QUERY_KEY, page, limit],
      queryFn: () => getAllProject(page, limit),
    })
export const useGetByIdProject = (id) => useQuery({ queryFn: ()=> getByIdProject(id), queryKey: [PROJECT_QUERY_KEY, id], });
export const useDeleteProject = () => useMutation({ mutationFn: delProject, mutationKey: [DEL_PROJECT_QUERY_KEY], });
export const useEditProject = () => useMutation({ mutationFn: editProject, mutationKey: [EDIT_PROJECT_QUERY_KEY], });
export const useGetProjectByRole = () =>
  useQuery({
    queryKey: [PROJECT_BY_ROLE_QUERY_KEY],
    queryFn: getProjectByRole,
  });