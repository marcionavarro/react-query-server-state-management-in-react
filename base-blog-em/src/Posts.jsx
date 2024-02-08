import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

import { fetchPosts, deletePost, updatePost } from "./api";
import { PostDetail } from "./PostDetail";
const maxPostPage = 10;

export function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (currentPage < maxPostPage) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery(["posts", nextPage], () => fetchPosts(nextPage))
    }
  }, [currentPage, queryClient])

  // replace with useQuery
  const { data, isError, error, isLoading} = useQuery(
    ["posts", currentPage],
    () => fetchPosts(currentPage), {
    staleTime: 2000,
    keepPreviousData: true
  });
  if (isLoading) return <h3>Loading...</h3>;
  if (isError) {
    return <>
      <h3>Oops, something went wrong</h3>
      <p>{error.toString()}</p>
    </>
  }

  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button
          disabled={currentPage <= 1}
          onClick={() => {
            setCurrentPage((previousCurrentPage) => previousCurrentPage - 1)
          }}>
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button
          disabled={currentPage >= maxPostPage}
          onClick={() => {
            setCurrentPage((previousCurrentPage) => previousCurrentPage + 1)
          }}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
