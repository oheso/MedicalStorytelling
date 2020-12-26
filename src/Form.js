import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import Post from "./Post";
import TweetInput from "./TweetInput";

const Form = () => {
  const [posts, setPosts] = useState([
    {
      id: "",
      text: "",
      timestamp: null,
    },
  ]);

  useEffect(() => {
    const firebaseData = db
      .collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            text: doc.data().text,
            timestamp: doc.data().timestamp,
          }))
        )
      );
    return () => {
      firebaseData();
    };
  }, []);
  console.log(posts);

  return (
    <div>
      <TweetInput />
      {/* 記述3. Postコンポーネントを表示するロジックを書きます */}
      {posts && (
        <>
          {posts.map((postItem) => (
            <Post
              key={postItem.id}
              text={postItem.text}
              timestamp={postItem.timestamp}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Form;
