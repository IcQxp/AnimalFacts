import axios from "axios";
import { endpoints } from "./config";

enum ApiType {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete'
}

const axiosRequest = async (method: ApiType, url: string, data?: any) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    const response = await axios({ method, url, headers, data });
    return response.data;
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    throw error;
  }
};

const getProducts = () =>  axiosRequest(ApiType.GET, endpoints.getAllProducts);

export {
  getProducts,
}