import { useEffect, useState } from 'react';
import axios from 'axios';
import { Post } from './Post';
import './PostList.css';

type Props = {
  limit?: number;
  page?: number;
};

function PostListAxios({ limit = 5, page: initialPage = 1 }: Props) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(initialPage);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/posts`, {
      params: { _limit: limit, _page: page }
    })
      .then(response => {
        setPosts(response.data);
      })
      .catch(err => {
        setError(err.message || 'Something went wrong!');
      });
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
            <li key={post.id}>{post.title}</li>
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

export default PostListAxios;
