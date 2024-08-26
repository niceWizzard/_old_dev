import './App.css';


import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import useFetch, { putItem, postItem, fetchItem } from './components/customHooks/useFetch';


import Header from './components/Header';
import Home from './components/Home/Home';
import Create from './components/Create';
import BlogsPage from './components/BlogsPage';
import BlogPostsLinks from './components/BlogPostsLinks';
import { handleGetTimePosted, handleAddNewBlog, handleLikeBtnClick, createRandomString, getFullTime } from './components/customHooks/genFunctions'
import { useEffect } from 'react';




function App() {
  const mainUrl = 'http://localhost:8000/';

  const { data: blogs, setData: setBlogs } = useFetch(mainUrl + 'blogs');


  const handleLikeBtnClick = (id) => {
    if (id !== undefined && id !== null) {
      const newBlogs = [...blogs];

      let index = 0;
      blogs.forEach((_blog, _index) => {
        if (_blog.id === id) {
          index = _index
        }
      });

      const likedBlog = newBlogs[index];
      if (!likedBlog.liked) {
        newBlogs[index].liked = true;
        newBlogs[index].likes++;

      } else if (likedBlog.liked) {
        if (likedBlog.likes > 0) {
          newBlogs[index].likes--;
          newBlogs[index].liked = false;
        }
      }
      putItem(id, likedBlog)
      setBlogs(newBlogs)
    }
  }

  const handleAddNewBlog = async (_blog) => {
    let isValid;
    const randomId = createRandomString(12);
    await fetchItem(`${mainUrl}/blogs/${randomId}`)
      .then(res => {
        isValid = !!res
      })
      .catch(err => {
        console.log(err.message)
      })


    if (isValid) {
      _blog.id = randomId;
      postItem(_blog);
      setBlogs([...blogs, _blog])
    } else if (!isValid) {
      console.log("restarted ID")
      handleAddNewBlog(_blog)
    }
  }




  useEffect(() => {
    blogs && console.log(blogs.length)
  }, [blogs])




  return (
    <Router>
      <div className="App" >
        <Header />
        <div className="body">
          <Switch>
            <Route exact path="/">
              <Home mainUrl={mainUrl}
                blogs={blogs}
                fetchItem={fetchItem}
                handleLikeBtnClick={handleLikeBtnClick}
                handleGetTimePosted={handleGetTimePosted}
              />
            </Route>
            <Route path="/create-blog" exact>
              <Create
                handleAddNewBlog={handleAddNewBlog}
              />
            </Route>
            <Route path="/blogs-all" exact>
              <BlogsPage blogs={blogs}
                handleLikeBtnClick={handleLikeBtnClick}
                handleGetTimePosted={handleGetTimePosted}
              />
            </Route>

            <Route path="/blogs/posts/:id" exact>
              {blogs &&
                <BlogPostsLinks blogs={blogs}
                  handleGetTimePosted={handleGetTimePosted}
                  handleLikeBtnClick={handleLikeBtnClick}
                />
              }

            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
