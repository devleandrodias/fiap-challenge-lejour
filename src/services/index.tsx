import axios from "axios";

const apiLejour = axios.create({
  baseURL: "https://sheet2api.com",
});

export const getUsers = async () =>
  await (await apiLejour.get("/v1/ByR2h1huRjyQ/fiap/user")).data;

export const getWedding = async () =>
  await (await apiLejour.get("/v1/ByR2h1huRjyQ/fiap/wedding")).data;

export const getInvoice = async () =>
  await (await apiLejour.get("/v1/ByR2h1huRjyQ/fiap/invoice")).data;

export const getAppointment = async () =>
  await (await apiLejour.get("/v1/ByR2h1huRjyQ/fiap/appointment")).data;

export const getWeddingFavorites = async () =>
  await (await apiLejour.get("/v1/ByR2h1huRjyQ/fiap/wedding_favorites")).data;
