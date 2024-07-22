import { useState } from "react";
import "./App.css";
import { FormDialog } from "./FormDialog";
import { ActionButton } from "./ActionButton";
import { SideBar } from "./SideBar";
import { TodoItem } from "./TodoItem";
import { ToolBar } from "./ToolBar";
import { GlobalStyles, ThemeProvider, createTheme } from "@mui/material";
import { indigo, pink } from "@mui/material/colors";

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

  const handleSubmit = () => {
    if (!text) return;

    const newTodo: Todo = {
      id: new Date().getTime(),
      value: text,
      checked: false,
      removed: false,
    };
    // setStateは関数を入れることもできる
    setTodos((todos) => [newTodo, ...todos]);

    setText("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    // divを使いたくない場合は<></>(JSXフラグメント)を使う
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
      <ToolBar filter={filter} />
      <SideBar
        drawerOpen={drawerOpen}
        onToggleDrawer={handleDrawerToggle}
        onSort={handleSort}
      />
      <FormDialog text={text} onSubmit={handleSubmit} onChange={handleChange} />
      <TodoItem todos={todos} filter={filter} onTodo={handleTodo} />
      <ActionButton todos={todos} onEmpty={handleEmpty} />
    </ThemeProvider>
  );
};

export default App;
