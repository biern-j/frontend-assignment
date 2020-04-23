type ArticleResponse = {
  id: number;
  date: string;
  image?: string | null;
  category: string;
  title: string;
  preamble?: string | null;
};

export const articlesRequest = async (
  url: string
): Promise<{ articles?: ArticleResponse[]; message?: string }> => {
  try {
    const response = await fetch(`http://localhost:6010/${url}`, {
      method: "GET"
    });
    const articles = await response.json();
    return articles;
  } catch (e) {
    console.log("e", e.message);
    return { articles: [] };
  }
};
