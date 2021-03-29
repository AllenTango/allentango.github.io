import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import Loading from "./components/Loading";
import Post from "./components/Post";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [posts, setPosts] = useState([]);

  const url =
    "https://api.github.com/repos/AllenTango/allentango.github.io/issues";

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setPosts(data);
        },
        (error) => {
          console.log(error);
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  return (
    <>
      <Header />
      <Main>
        {!isLoaded ? (
          <Loading />
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : (
          <>
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
          </>
        )}
      </Main>
      <Footer />
    </>
  );
}

export default App;
