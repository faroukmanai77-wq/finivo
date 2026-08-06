import { defineMcp } from "@lovable.dev/mcp-js";
import searchCreditCards from "./tools/search-credit-cards";
import searchBrokerages from "./tools/search-brokerages";
import searchBooks from "./tools/search-books";
import listBlogPosts from "./tools/list-blog-posts";
import getBlogPost from "./tools/get-blog-post";

export default defineMcp({
  name: "finivo",
  title: "Finivo",
  version: "0.1.0",
  instructions:
    "Tools for Finivo, a Canadian personal-finance platform. Use `search_credit_cards` to compare Canadian credit cards, `search_brokerages` to compare investing platforms, `search_books` for the curated finance book library, and `list_blog_posts` / `get_blog_post` to read Finivo articles. All data is public and read-only.",
  tools: [searchCreditCards, searchBrokerages, searchBooks, listBlogPosts, getBlogPost],
});