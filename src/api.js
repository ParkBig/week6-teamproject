// axios 쓸 곳
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://52.79.113.173",
});


///////////////////////////////////////////////////////////////

export const axiosIns = axios.create({
  baseURL: "http://52.79.113.173"
});
export const iDDupCheck = async (idCheck) => {
  return await axiosIns.post("/api/user/idCheck", idCheck).then(res=>res.data);
}
export const postSignUp =  async (userData) => {
  const { data } = await axiosIns.post("/api/user/signup", userData);
  return data;
}
export const postLogIn = async (userData) => {
  const data  = await axiosIns.post("/api/user/login", userData);
  return data;
}
export const formData = async (getFormData) => {
  const { data } = await axiosIns.post("/api/posts", getFormData[0], getFormData[1]);
  return data;
}
export const getData = async () => {
  return await axiosIns.get("/api/posts").then(res=>res.data);
}
export const getDetailData = async (postId) => {
  return await axiosIns.get(`/api/posts/${postId}`).then(res=>res.data);
}
export const deleteDetailData = async (postId) => {
  return await axiosIns.delete(`/api/posts/${postId}`).then(res=>res.data);
}
export const reviseDetailData = async (idAndRevise) => {
  const { data } = axiosIns.put(`/api/posts/${idAndRevise[0]}`,idAndRevise[1]);
  return data;
}
export const writeComment = async (postId) => {
  const { data } = await axiosIns.post(`/api/posts/${postId}/comments`);
  return data;
}
export const deleteComment = async (ids) => {
  return await axiosIns.delete(`/ap/posts/${ids[0]}/comments/${ids[1]}`).then(res=>res.data);
}
