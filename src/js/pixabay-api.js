import Axios from "axios";

const axios = Axios.create({
  baseURL: "https://pixabay.com/api/",
  params: {
    key: "52882585-ee96caa2c42b0b1b8477a4a7b",
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
  },
});

const PER_PAGE = 15;

export async function getImagesByQuery(query, page = 1) {
  try {
    const response = await axios.get("", {
      params: {
        q: query,
        page,
        per_page: PER_PAGE,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
}

export { PER_PAGE };
