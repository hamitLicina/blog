import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import CategoryArticle from "./pages/CategoryArticle/CategoryArticle";
import Header from "./components/Header/Header";
import Auth from "./pages/Auth/Auth";
import AddArticle from "./pages/AddArticle/AddArticle";
import ArticleDetails from "./pages/ArticleDetails/ArticleDetails";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/addarticle" element={<AddArticle />} />
          <Route path="/category/:categoryName" element={<CategoryArticle />} />
          <Route path="/article/:articleId" element={<ArticleDetails />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;