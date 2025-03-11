import { useMutation, useQuery } from '@tanstack/react-query';
import { addCompanies,delCompany,editCompany,getAllCompanies, getByIdCompany,  } from '../../https/companies/index.ts';

export const COMPANIE_MUTATION_KEY = '/company'
export let COMPANIE_QUERY_KEY = '/company';
export const DEL_COMPANIE_QUERY_KEY = '/company';
export const EDIT_COMPANIE_QUERY_KEY = '/editcompany';
export const useAddCompanyMutation = () => useMutation({ mutationFn: addCompanies, mutationKey: [COMPANIE_MUTATION_KEY], });
export const useGetAllCompanyData = () => useQuery({ queryFn: getAllCompanies, queryKey: [COMPANIE_QUERY_KEY], });
export const useGetByIdCompany = (id) => useQuery({ queryFn: ()=> getByIdCompany(id), queryKey: [COMPANIE_QUERY_KEY, id], });
export const useDeleteCompany = () => useMutation({ mutationFn: delCompany, mutationKey: [DEL_COMPANIE_QUERY_KEY], });
export const useEditCompanyMutation = () => useMutation({ mutationFn: editCompany, mutationKey: [EDIT_COMPANIE_QUERY_KEY], });

