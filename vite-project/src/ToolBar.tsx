import {
  AppBar,
  Box,
  IconButton,
  Typography,
  Toolbar,
  Icon,
} from "@mui/material";

type Props = {
  filter: Filter;
};

const translator = (arg: Filter) => {
  switch (arg) {
    case "all":
      return "全てのタスク";
    case "unchecked":
      return "現在のタスク";
    case "checked":
      return "完了したタスク";
    case "removed":
      return "ゴミ箱";
  }
};

export const ToolBar = ({ filter }: Props) => (
  <Box sx={{ flex: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          aria-label="menu-button"
          size="large"
          edge="start"
          color="inherit"
          sx={{ mr: 2 }}
        >
          <Icon>menu</Icon>
        </IconButton>
        <Typography>{translator(filter)}</Typography>
      </Toolbar>
    </AppBar>
  </Box>
);
