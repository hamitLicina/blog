import React, { useState } from "react";
import "./Likes.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { auth, db } from "../../config/fireBaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
  doc,
} from "firebase/firestore";

function Likes({ articleId }) {
  // Get user data
  const [user] = useAuthState(auth);

  const [isLiked, setIsLiked] = useState(false);

  // We need to add a for this user to this article if you click the empty heart, remove if click again
  // We will need another collection that stores the userId and articleId which is the Like collection
  const handleLike = (e) => {
    // Make sure user is logged in
    if (user) {
      // Create reference to likes collection
      // I will create collection if does not exist
      const likesRef = collection(db, "Likes");
      // Now I am adding a document with this articleId and userId
      addDoc(likesRef, {
        userId: user?.uid,
        articleId: articleId,
      })
        .then((res) => {
          // I want to show that it is liked by showing the full heart icon
          setIsLiked(true);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleUnlike = (e) => {
    // I must make sure the user is logged in
    if (user) {
      // Need to find document with this userId and articleId
      // To get its document id
      const likesRef = collection(db, "Likes");

      // Now I have to make the query to set up and to find the id of the document to delete
      const q = query(
        likesRef,
        where("articleId", "==", articleId),
        where("userId", "==", user?.uid)
      );
      // Query is getting the data based on the condition
      // Get match
      getDocs(q, likesRef)
        .then((res) => {
          // console.log(res.size);
          // console.log(res.docs[0]);
          const likesId = res.docs[0].id;
          // console.log(likesId);  I just made this to make sure which documentId I must select
          deleteDoc(doc(db, "Likes", likesId))
            .then((res) => {
              // Change icon to unlike heart icon
              setIsLiked(false);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      {isLiked ? (
        <div className="like-icon">
          <FaHeart onClick={handleUnlike} />
        </div>
      ) : (
        <div className="like-icon">
          <FaRegHeart onClick={handleLike} />
        </div>
      )}
    </div>
  );
}

export default Likes;
