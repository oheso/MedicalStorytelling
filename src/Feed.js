import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { FormControl, TextField } from "@material-ui/core";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import QuestionItem from "./QuestionItem";

const Feed = () => {
  const [data, setData] = useState([{ id: "", title: "", contents: "" }]);

  // inputのデータを保持するuseStateを追加
  const [inputValue, setinputValue] = useState("");
  const [inputContents, setinputContents] = useState("");

  // 送信部分の処理
  const addInputData = () => {
    // groupにaddを使ってオブジェクト形式で登録する
    // idは自動で入るので、inputValueをtitleという場所の値にセットすることで登録する
    db.collection("group").add({ title: inputValue, contents: inputContents });
    setinputValue("");
    setinputContents("");
  };

  // フォーム入力部のイベント
  const handleInputchangeValue = (e) => {
    setinputValue(e.target.value);
    // console.log(e, "event");
  };
  const handleInputchangeContents = (e) => {
    setinputContents(e.target.value);
    // console.log(e, "event");
  };

  // ページを表示させる際にこれを実行する
  useEffect(() => {
    // 以下はデータを取得するコード
    const firebaseData = db
      .collection("group")
      // titleで昇順にならべるという記述(降順はdesc)
      .orderBy("title", "asc")
      .onSnapshot((snapshot) => {
        setData(
          // snapshotの中に[docs]というデータの塊があるので、それを[jsのmap]を使って全て展開する
          snapshot.docs.map((dbData) => ({
            id: dbData.id,
            title: dbData.data().title,
            contents: dbData.data().contents,
          }))
        );
      });
    return () => firebaseData();
  }, []); // ここに最後一つを書き足します

  // console.log(data);

  return (
    <div>
      <h1>質問登録</h1>
      {/* 登録の処理 */}
      <FormControl>
        {/* inputタグ */}
        <TextField
          label="質問タイトル"
          value={inputValue}
          onChange={handleInputchangeValue}
        />
        <TextField
          label="質問内容"
          value={inputContents}
          onChange={handleInputchangeContents}
        />
      </FormControl>

      <button disabled={!inputValue || !inputContents} onClick={addInputData}>
        登録
        <SaveAltIcon />
      </button>

      {data.map((dataItem) => (
        <QuestionItem
          id={dataItem.id}
          title={dataItem.title}
          contents={dataItem.contents}
        />
      ))}
    </div>
  );
};
export default Feed;
