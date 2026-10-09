
import { apiFetch } from "./api";

export async function getQuestions() {
  const response = await apiFetch("/questions/get");

  // Your backend uses the { success, message, data } format.
  return response.data;
}
