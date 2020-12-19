import React, { useState, useEffect } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { auth } from "./firebase";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = (props) => {
  const classes = useStyles();

  //ログイン状態の保持
  const [isLogin, setIsLogin] = useState(true);
  // メールの状態を保持
  const [email, setEmail] = useState("");
  // パスワードの状態を保持
  const [password, setPassword] = useState("");

  useEffect(() => {
    // 認証関係に対して何かしらの変更があったときに実行されるfirebaseの機能
    // onAuthStateChangedは→ログインしていたとか、ログアウトしたとかで呼び出される
    // userというパラメーターがあり、これには「ログインが成功したときに」この部分に全部格納される
    // userに何らかの情報がはいっていればログインに成功、入ってなければログイン失敗、ログインしていない
    const unSub = auth.onAuthStateChanged((user) => {
      // 判定の条件は何らかの情報が入っていた時→ルートの画面（App）に遷移させる(逆にuserにない場合は常にこの画面に止まり続ける)
      user && props.history.push("/");
    });
    return () => unSub();
  }, [props.history]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          <h1>{isLogin ? "ログイン" : "新規登録"}</h1>
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="メールアドレス"
            value={email} //useStateのemailが入ってくる
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="パスワード"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className={classes.submit}
            onClick={
              // この中にクリックされた処理を書きます
              isLogin
                ? async () => {
                    try {
                      // 作成時 firebaseに[signInWithEmailAndPassword]というものがあるのでそれに
                      // email, passwordで保持した状態を送り→成功すればhistoryによって画面遷移が実行される
                      await auth.signInWithEmailAndPassword(email, password);
                      props.history.push("/");
                    } catch (error) {
                      // ログインできない、失敗したときはエラーで表示される
                      alert(error.message);
                    }
                  }
                : async () => {
                    try {
                      // 作成時 firebaseに[createUserWithEmailAndPassword]というものがあるのでそれに
                      // email, passwordで保持した状態を送り→成功すればhistoryによって画面遷移が実行される
                      await auth.createUserWithEmailAndPassword(
                        email,
                        password
                      );
                      props.history.push("/");
                    } catch (error) {
                      // ログインできない、失敗したときはエラーで表示される
                      alert(error.message);
                    }
                  }
            }
          >
            {isLogin ? "ログインする" : "登録する"}
          </Button>
          <Grid container>
            <Grid item>
              <span onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "新規登録はこちら" : "ログインはこちら"}
              </span>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Login;
