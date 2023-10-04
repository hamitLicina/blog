import React, { useEffect, useState } from "react";
import "./Banner.css";
import { getDocs, collection, query, orderBy, limit } from "firebase/firestore";
import { db } from "../../config/fireBaseConfig";

function Banner() {
  const [mainArticle, setMainArticle] = useState({});
  const [otherArticles, setOtherArticles] = useState([]);

  // Get data from firestore when the banner loads with useEffect
  useEffect(() => {
    // We will create a variable to reference the articles
    const articleRef = collection(db, "Articles");

    //  We need to set up query to filter responses
    //  FireStore gives us this opportunity to sort and then get latest 5 articles using query
    const q = query(articleRef, orderBy("createdAt", "desc"), limit(5));

    // Next step is get Articles from db
    getDocs(q, articleRef)
      .then((res) => {
        // Lets see what it returns
        //  console.log(res.docs[0].data())

        const articles = res.docs.map((item) => ({
          ...item.data(),
          id: item.id,
        }));
        // We just controlled the Array what we have with this console.log('articles', articles)

        setMainArticle(articles[0]);
        setOtherArticles(articles.splice(1));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="banner-container">
      <div
        className="main-article-container"
        style={{ backgroundImage: `url(${mainArticle?.imageUrl})` }}
      >
        <div className="banner-info">
          <h2>{mainArticle?.title}</h2>
          <div className="main-article-info">
            <p>{mainArticle?.createdAt?.toDate().toDateString()}</p>
          </div>
        </div>
      </div>
      <div className="other-articles-container">
        {otherArticles.map((item, index) => (
          <div
            className="other-article-item" key={index}
            style={{ backgroundImage: `url(${item?.imageUrl})` }}
          >
            <div className="banner-info">
              <h4>{item?.title}</h4>
              <div className="banner-info">
                <small>{item?.createdAt?.toDate().toDateString()}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Banner;
