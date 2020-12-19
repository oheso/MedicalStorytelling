// rafec
import React, { useEffect } from "react";
import Feed from "./Feed";
import { auth } from "./firebase"; //追加
import ExitToAppIcon from "@material-ui/icons/ExitToApp"; //ログアウト用のボタン画像

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
    <div>
      {/* ログアウト用のボタンを追加 */}
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
        <ExitToAppIcon />
      </button>
      {/* ログアウト用のボタンを追加 */}
      <Feed />
    </div>
  );
};
export default App;