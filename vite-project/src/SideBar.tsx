import { styled } from "@mui/material/styles";
import { indigo, pink } from "@mui/material/colors";

import { Avatar } from "@mui/material";

type Props = {
  drawerOpen: boolean;
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

export const SideBar = ({ onSort }: Props) => (
  <select defaultValue="all" onChange={(e) => onSort(e.target.value as Filter)}>
    <option value="all">全てのタスク</option>
    <option value="checked">完了したタスク</option>
    <option value="unchecked">現在のタスク</option>
    <option value="removed">ゴミ箱</option>
  </select>
);
