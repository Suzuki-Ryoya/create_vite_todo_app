import Icon from "@mui/material/Icon";
import List from "@mui/material/List";
import Avatar from "@mui/material/Avatar";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

import { styled } from "@mui/material/styles";
import { indigo, lightBlue, pink } from "@mui/material/colors";

type Props = {
  drawerOpen: boolean;
  onToggleQR: () => void;
  onToggleDrawer: () => void;
  onSort: (filter: Filter) => void;
};

const DrawerList = styled("div")(() => ({
  width: 250,
}));

const DrawerHeader = styled("div")(() => ({
  height: 150,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "1em",
  backgroundColor: indigo[500],
  color: "#ffffff",
  fontFamily: "-apple-system, BlinkMacSystemFont, Roboto, sans-serif",
}));

const DrawerAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: pink[500],
  width: theme.spacing(6),
  height: theme.spacing(6),
}));

export const SideBar = ({
  drawerOpen,
  onSort,
  onToggleDrawer,
  onToggleQR,
}: Props) => (
  <Drawer variant="temporary" open={drawerOpen} onClose={onToggleDrawer}>
    <DrawerList role="presentation" onClick={onToggleDrawer}>
      <DrawerHeader>
        <DrawerAvatar>
          <Icon>create</Icon>
        </DrawerAvatar>
        <p>TODO</p>
      </DrawerHeader>
      <List>
        <ListItem disablePadding>
          <ListItemButton aria-label="list-all" onClick={() => onSort("all")}>
            <ListItemIcon>
              <Icon>subject</Icon>
            </ListItemIcon>
            <ListItemText secondary="すべてのタスク" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            aria-label="list-unchecked"
            onClick={() => onSort("unchecked")}
          >
            <ListItemIcon>
              <Icon sx={{ color: lightBlue[500] }}>radio_button_unchecked</Icon>
            </ListItemIcon>
            <ListItemText secondary="現在のタスク" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            aria-label="list-checked"
            onClick={() => onSort("checked")}
          >
            <ListItemIcon>
              <Icon sx={{ color: pink.A200 }}>check_circle_outline</Icon>
            </ListItemIcon>
            <ListItemText secondary="完了したタスク" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            aria-label="list-removed"
            onClick={() => onSort("removed")}
          >
            <ListItemIcon>
              <Icon>delete</Icon>
            </ListItemIcon>
            <ListItemText secondary="ごみ箱" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton aria-label="list-share" onClick={onToggleQR}>
            <ListItemIcon>
              <Icon>share</Icon>
            </ListItemIcon>
            <ListItemText secondary="このアプリを共有" />
          </ListItemButton>
        </ListItem>
      </List>
    </DrawerList>
  </Drawer>
);
