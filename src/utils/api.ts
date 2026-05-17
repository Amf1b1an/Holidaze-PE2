const BASE_URL = import.meta.env.VITE_BASE_URL || "https://v2.api.noroff.dev";
const API_KEY = import.meta.env.VITE_API_KEY;

const getHeaders = () => {
  const token = localStorage.getItem("token");
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-Noroff-API-Key": API_KEY || "",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

export const apiRequest = async <T>(
  endpoint: string,
  options: { method?: "GET" | "POST" | "PUT" | "DELETE"; body?: any } = {},
): Promise<T> => {
  const { method = "GET", body } = options;

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: getHeaders(),
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.errors?.[0]?.message || "Something went wrong");
  }

  if (response.status === 204) return {} as T;

  const json = await response.json();
  return json.data;
};
