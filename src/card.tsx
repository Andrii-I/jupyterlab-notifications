import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { getStore, setStore } from "./useStore";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function ImgMediaCard(props: any) {
  const classes = useStyles();
  let openUrl = () => {
    const newWindow = window.open(
      "https://jupyter.org/",
      "_blank",
      "noopener,noreferrer"
    );
    if (newWindow) newWindow.opener = null;
  };

  let triggerDelete = (id: string, origin: string) => {
    const store = [...getStore().originStore];
    console.log("origin", origin);
    console.log("id", id);
    const o = store.findIndex((obj) => obj.origin === origin);
    let i = store[o].notifications.findIndex(
      (task: any) => task.notificationId === id
    );
    store[o].notifications.splice(i,1);
    
    
    setStore({
      originStore: store,
    });
    localStorage.setItem("originStore", JSON.stringify(store));
    console.log("This was triggered");
  };
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            onClick={() => openUrl()}
          >
            {props.body}
          </Typography>
          <IconButton aria-label="delete">
            <DeleteIcon
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                triggerDelete(props.id, props.origin);
              }}
              style={{ top: 3, right: 3 }}
            />
          </IconButton>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
