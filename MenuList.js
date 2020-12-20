import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const MenuList = () => {
  return (
    <div>
      <List component="nav" aria-label="main mailbox folders">
      <ListItemText primary="質問フィード" />
        <ListItem button>
          <ListItemText primary="新着" />
        </ListItem>
      <ListItemText primary="＜カテゴリー別＞" />
        <ListItem button>
          <ListItemText primary="機器管理" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="人工透析" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="人工呼吸器" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="人工心肺" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="カテーテル" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="キャリア" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="その他" />
        </ListItem>
      </List>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folders">
      <ListItemText primary="ディスカッションフィード" />
        <ListItem button>
          <ListItemText primary="メンバー募集中" />
        </ListItem>
      <ListItemText primary="＜アーカイブ＞" />
        <ListItemLink href="#simple-list">
          <ListItemText primary="2021年1月" />
        </ListItemLink>
        <ListItemLink href="#simple-list">
          <ListItemText primary="2020年12月" />
        </ListItemLink>
        <ListItemLink href="#simple-list">
          <ListItemText primary="2020年11月" />
        </ListItemLink>
        <ListItemLink href="#simple-list">
          <ListItemText primary="2020年10月" />
        </ListItemLink>
        <ListItemLink href="#simple-list">
          <ListItemText primary="もっと見る" />
        </ListItemLink>
      </List>
    </div>
  );
};
export default MenuList;
