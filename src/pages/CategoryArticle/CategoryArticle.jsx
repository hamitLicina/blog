import React, { useEffect, useState } from "react";
import "./CategoryArticle.css";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/fireBaseConfig";
import ArticleCard from "../../components/ArticleCard/ArticleCard";

function CategoryArticle() {
  const { categoryName } = useParams();

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    //  First thing create a reference to firestore db collection
    const articleRef = collection(db, "Articles");

    //  Now create query
    const q = query(articleRef, where("category", "==", categoryName));

    // After that we should get the data that matches query
    getDocs(q, articleRef)
      .then((res) => {
        const articles = res.docs.map((item) => ({
          ...item.data(),
          id: item.id,
        }));
        //  We should see is it working?
        //  console.log(articles)
        setArticles(articles);
      })
      .catch((err) => console.log(err));
  }, [categoryName]);

  return (
    <div className="category-article-container">
      {articles.map((item) => (
        <ArticleCard article={item} className="category-article"/>
      ))}
    </div>
  );
}

export default CategoryArticle;