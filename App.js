// rafec
import React, { useEffect } from "react";
import { auth } from "./firebase";
import styled from "styled-components";
import ExitToAppIcon from "@material-ui/icons/ExitToApp"; //ログアウト用のボタン画像
import Feed from "./Feed";
import MenuList from "./MenuList";

const MainArea = styled.div`
  display: flex;
  flex-diretion: row;
`;

const App = (props) => {
  useEffect(() => {
    // onAuthStateChanged→何らかのユーザー認証変化があったら実行される
    // その際に[user]内に格納される＝空だったら何も起こらない→つまりログインされていない状態
    const unSub = auth.onAuthStateChanged((user) => {
      // !user = falseとなる、つまりユーザーがログインしていない状態の時はログインページに飛ばす
      !user && props.history.push("login");
    });
    return () => unSub();
  });

  return (
    <div
      style={{
        margin: "auto",
        width: "50%",
      }}
    >
      {/* ログアウト用のボタン */}
      <button
        onClick={async () => {
          try {
            await auth.signOut();
            props.history.push("login");
          } catch (error) {
            alert(error.message);
          }
        }}
      >
        ログアウト
        <ExitToAppIcon />
      </button>
      <MainArea>
        <Feed />
        <MenuList />
      </MainArea>
    </div>
  );
};
export default App;
