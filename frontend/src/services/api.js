import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:8000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


export const storybookAPI = {

  generate: (data) =>
    apiClient.post(
      "/storybook/generate",
      data
    ),

  regeneratePage: (
    story,
    pageNumber,
    instruction = ""
  ) =>
    apiClient.post(
      "/storybook/regenerate-page",
      {
        story,
        page_number: pageNumber,
        instruction,
      }
    ),

  generateVideo: (
    prompt,
    imageUrl = null
  ) =>
    apiClient.post(
      "/storybook/generate-video",
      {
        prompt,
        image_url: imageUrl,
      }
    ),

  get: (storyId) =>
    apiClient.get(
      `/storybook/${storyId}`
    ),

  evaluate: (
    responseText,
    correctAnswer
  ) =>
    apiClient.post(
      "/story/evaluate",
      null,
      {
        params: {
          response_text: responseText,
          correct_answer: correctAnswer,
        },
      }
    ),
};


export default apiClient;