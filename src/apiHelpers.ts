export const articlesRequest = async (url: string) => {
  try {
    const response = await fetch(`http://localhost:6010/${url}`, {
      method: "GET"
    });
    const articles = await response.json();
    return articles;
  } catch (e) {
    console.log("e", e.message);
  }
};
