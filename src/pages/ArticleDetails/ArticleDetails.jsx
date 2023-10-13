import React, { useEffect, useState } from "react";
import "./ArticleDetails.css";
import { useParams } from "react-router-dom";
import { db } from "../../config/fireBaseConfig";
import { getDoc, doc } from "firebase/firestore";

const ArticleDetails = () => {
  const { articleId } = useParams();

  const [article, setArticle] = useState({});

  // I need to get details for this article from db

  useEffect(() => {
    // I have to set up a reference to a single document
    const docRef = doc(db, "Articles", articleId);
    // Second one is getting the actual document reference
    getDoc(docRef)
      .then((res) => {
        //  console.log(res.data());
        setArticle(res.data());
      })
      .catch((err) => console.log(err));
  }, []);

  return <div className="details-container">
    <h1>{article?.title}</h1>
    <h3>{article?.summary}</h3>
    <div className="details-info-container">
      <p>Category: {article?.category}</p>
      <p><span className="article-span">Author: </span>{article?.createdBy?.toUpperCase()}</p>
      <p><span className="article-span published">Published: </span>{article?.createdAt?.toDate().toDateString()}</p>
    </div>
    <div className="details-content">
      <img src={article?.imageUrl} alt={article?.title} className="details-img" />
      <p className="article-description">{article?.paragraphOne}</p>
      <p className="article-description">{article?.paragraphTwo}</p>
      <p className="article-description">{article?.paragraphThree}</p>
    </div>
  </div>;
};

export default ArticleDetails;
