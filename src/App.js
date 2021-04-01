import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./components/Loading";
import Post from "./components/Post";

function App() {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  let url = `https://api.github.com/repos/AllenTango/allentango.github.io/issues?page=${page}&per_page=10`;

  const loadPost = () => {
    axios.get(url).then((res) => {
      setPosts(res.data);
      setPage(page + 1);
    });
  };

  const morePost = () => {
    axios.get(url).then((res) => {
      if (res.data.length === 0) {
        setHasMore(false);
        return;
      }
      setPosts([...posts, ...res.data]);
      setPage(page + 1);
    });
  };

  useEffect(() => {
    loadPost();
  }, []);

  return (
    <>
      <Header />
      <Main>
        <InfiniteScroll
          dataLength={posts.length}
          next={morePost}
          hasMore={hasMore}
          loader={<Loading />}
          endMessage={
            <div className="text-center text-pink-500 font-bold border-b-4 border-dashed border-pink-400">
              我是有底线的！^_^
            </div>
          }
        >
          {posts.map((post) => (
            <Post
              key={post["id"]}
              title={post["title"]}
              body={post["body"]}
              labels={post["labels"]}
              created_time={post["created_at"]}
              origin_url={post["html_url"]}
            />
          ))}
        </InfiniteScroll>
      </Main>
      <Footer />
    </>
  );
}

export default App;
