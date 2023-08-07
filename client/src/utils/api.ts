import axios, { AxiosRequestConfig } from "axios";
import { CreateGroupMessageParams, CreateGroupParams, CreateUserParams, CredentialsUserParams, Group, GroupMessagesPayload } from "./types";



export const API_URL = 'http://localhost:5000/api';
console.log(API_URL)
const axiosClient = axios.create({ baseURL: API_URL });
const config: AxiosRequestConfig = { withCredentials: true };



export const postRegisterUser = (data: CreateUserParams) =>
    axiosClient.post(`/auth/register`, data, config);

export const postLoginUser = (data: CredentialsUserParams) =>
    axiosClient.post(`/auth/login`, data, config);

export const postLogoutUser = () =>
    axiosClient.post(`/auth/logout`, {}, config);


export const createGroup = (params: CreateGroupParams) =>
    axiosClient.post(`/groups`, params, config);

export const getGroups = (search: string = '') => axiosClient.get<Group[]>(`/groups?search=${search}`, config);

export const createGroupMessage = (id: string, data: CreateGroupMessageParams) => 
    axiosClient.post(`/groups/${id}/messages`, data, config);

export const getGroupMessages = (id: number) =>
    axiosClient.get<GroupMessagesPayload>(`/groups/${id}/messages`, config);