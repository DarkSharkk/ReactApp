import React, { useEffect, useState } from "react";
import PostService from "./API/PostService";
import { useFetching } from "./components/hooks/useFetching";
import { usePosts } from "./components/hooks/usePosts";
import PostFilter from "./components/PostFilter";
import PostForm from "./components/PostForm";
// import ClassCounter from "./components/ClassCounter";
// import Counter from "./components/Counter";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyLoader from "./components/UI/loader/MyLoader";
import MyModal from "./components/UI/modal/MyModal";
import './styles/App.css'

function App() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  
  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const posts = await PostService.getAll();
    setPosts(posts);
  })


  useEffect(() => {
    fetchPosts();
  }, []);

  // Получаем newPost из дочернего элемента
  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  }

  // Получаем post из дочернего элемента
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  return (
    <div className="App">
      <MyButton 
        style={{marginTop: 30}}
        onClick={() => setModal(true)}>
        Создать пост
      </MyButton>

      <MyModal visible={modal} setVisible={setModal}>
        <h1 style={{textAlign: "center"}}>Создание постов</h1>
        <PostForm create={createPost} />
      </MyModal>
      
      <hr style={{margin: "15px 0"}} />

      <h1 style={{textAlign: "center"}}>Поиск постов</h1>
      <PostFilter 
        filter={filter} 
        setFilter={setFilter} 
      />
      {postError && 
        <h1>Произошла ошибка ${postError}</h1>
      }
      {isPostsLoading
        ? <div style={{display: "flex", justifyContent: "center", marginTop: 50}}><MyLoader /></div>
        : <PostList 
            remove={removePost} 
            posts={sortedAndSearchedPosts} 
            title="Посты по программированию" 
          /> 
      }

      
    </div>
  );
}

export default App;
