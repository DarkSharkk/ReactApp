import React, { useMemo, useState } from "react";
import PostFilter from "./components/PostFilter";
import PostForm from "./components/PostForm";
// import ClassCounter from "./components/ClassCounter";
// import Counter from "./components/Counter";
import PostList from "./components/PostList";
import './styles/App.css'

function App() {
  const [posts, setPosts] = useState([
    {id: 1, title: "JavaScript", body: "Веб-разработка"},
    {id: 2, title: "Python", body: "Машинное обучение"},
    {id: 3, title: "C++", body: "Игровые движки"}
  ]);

  const [filter, setFilter] = useState({sort: '', query: ''})

  const sortedPosts = useMemo(() => {
    if (filter.sort) {
      return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
    }
    return posts;
  }, [filter.sort, posts]);

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query))
  }, [filter.query, sortedPosts])

  // Получаем newPost из дочернего элемента
  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  }

  // Получаем post из дочернего элемента
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }


  return (
    <div className="App">
      <h1 style={{textAlign: "center"}}>Создание постов</h1>
      <PostForm create={createPost} />
      <hr style={{margin: "15px 0"}} />

      <h1 style={{textAlign: "center"}}>Поиск постов</h1>
      <PostFilter 
        filter={filter} 
        setFilter={setFilter} 
      />

      <PostList 
        remove={removePost} 
        posts={sortedAndSearchedPosts} 
        title="Посты про JS" 
      /> 
    </div>
  );
}

export default App;
