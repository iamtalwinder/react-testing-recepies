import { useEffect, useState } from 'react';
import { Post } from './Post';
import './PostList.css';

type Props = {
  limit?: number;
  page?: number;
};

function PostListFetch({ limit = 5, page: initialPage = 1 }: Props) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(initialPage);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        return response.json();
      })
      .then((data) => setPosts(data))
      .catch((err) => setError(err.message));
  }, [limit, page]);

  const renderPageList = (start: number, end: number) => {
    const list = [];

    for (let pageNumber = start; pageNumber <= end; pageNumber++) {
      list.push(
        <button
          key={pageNumber}
          className={pageNumber === page ? 'active' : ''}
          onClick={() => setPage(pageNumber)}
        >
          {pageNumber}
        </button>
      );
    }

    return list;
  };

  return (
    <>
      <div>
        <h1>Post list</h1>
        <ul>
          {posts.map((post: Post) => (
            <li key={post.id}>{[post.title]}</li>
          ))}
        </ul>
      </div>

      { error && <p className='error'>{error}</p>}

      <div>
        <div className="page-list">{renderPageList(1, 10)}</div>
      </div>

    </>
  );
}

export default PostListFetch;
