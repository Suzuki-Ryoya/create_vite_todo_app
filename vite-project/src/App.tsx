import { useEffect, useState } from "react";
import "./App.css";
import { FormDialog } from "./FormDialog";
import { ActionButton } from "./ActionButton";
import { SideBar } from "./SideBar";
import { TodoItem } from "./TodoItem";
import { ToolBar } from "./ToolBar";
import { GlobalStyles, ThemeProvider, createTheme } from "@mui/material";
import { indigo, pink } from "@mui/material/colors";
import { QR } from "./QR";
import { AlertDialog } from "./AlertDialog";
import localforage from "localforage";

// typeは型に名前をつけることができる(型エイリアスと呼ぶ)
// オブジェクトの型を定義(interfaceに似ているがtypeは継承できない)
const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
      light: "#757de8",
      dark: "#002984",
    },

    secondary: {
      main: pink[500],
      light: "#ff6090",
      dark: "#b0003a",
    },
  },
});

const App = () => {
  // setStateでないと値が書き換えられない
  const [text, setText] = useState("");
  //useStateを使う場合はイミュータブルな値を返す
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    localforage
      .getItem("todo-20200101")
      .then((values) => setTodos(values as Todo[]));
  }, []);

  useEffect(() => {
    localforage.setItem("todo-20200101", todos);
  }, [todos]);

  const handleSubmit = () => {
    if (!text) {
      setDialogOpen((dialogOpen) => !dialogOpen);
      return;
    }

    const newTodo: Todo = {
      id: new Date().getTime(),
      value: text,
      checked: false,
      removed: false,
    };
    // setStateは関数を入れることもできる
    setTodos((todos) => [newTodo, ...todos]);
    setText("");
    setDialogOpen((dialogOpen) => !dialogOpen);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setText(e.target.value);
  };

  const handleSort = (filter: Filter) => {
    setFilter(filter);
  };

  const handleEmpty = () => {
    setTodos((todos) => todos.filter((todo) => !todo.removed));
  };

  const handleTodo = <K extends keyof Todo, V extends Todo[K]>(
    id: number,
    key: K,
    value: V
  ) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, [key]: value };
        } else {
          return todo;
        }
      });

      return newTodos;
    });
  };

  const handleDrawerToggle = () => {
    setDrawerOpen((drawerOpen) => !drawerOpen);
  };

  const handleToggleQr = () => {
    setQrOpen((qrOpen) => !qrOpen);
  };

  const handleToggleDialog = () => {
    setDialogOpen((dialogOpen) => !dialogOpen);
    setText("");
  };

  const handleToggleAlert = () => {
    setAlertOpen((alertOpen) => !alertOpen);
  };

  return (
    // divを使いたくない場合は<></>(JSXフラグメント)を使う
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
      <ToolBar filter={filter} onToggleDrawer={handleDrawerToggle} />
      <SideBar
        drawerOpen={drawerOpen}
        onToggleDrawer={handleDrawerToggle}
        onToggleQR={handleToggleQr}
        onSort={handleSort}
      />
      <QR open={qrOpen} onClose={handleToggleQr} />
      <FormDialog
        text={text}
        dialogOpen={dialogOpen}
        onSubmit={handleSubmit}
        onChange={handleChange}
        onToggleDialog={handleToggleDialog}
      />
      <AlertDialog
        alertOpen={alertOpen}
        onToggleAlert={handleToggleAlert}
        onEmpty={handleEmpty}
      />
      <TodoItem todos={todos} filter={filter} onTodo={handleTodo} />
      <ActionButton
        todos={todos}
        filter={filter}
        alertOpen={alertOpen}
        dialogOpen={dialogOpen}
        onToggleAlert={handleToggleAlert}
        onToggqleDialog={handleToggleDialog}
      />
    </ThemeProvider>
  );
};

export default App;
