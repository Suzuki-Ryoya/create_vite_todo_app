import { useState } from "react";
import "./App.css";

// typeは型に名前をつけることができる(型エイリアスと呼ぶ)
// オブジェクトの型を定義(interfaceに似ているがtypeは継承できない)

type Todo = {
  readonly id: number;
  value: string;
  checked: boolean;
  removed: boolean;
};

type Filter = "all" | "checked" | "unchecked" | "removed";

const App = () => {
  // setStateでないと値が書き換えられない
  const [text, setText] = useState("");
  //useStateを使う場合はイミュータブルな値を返す
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  const filterTodos = todos.filter((todo) => {
    switch (filter) {
      case "all":
        return !todo.removed;
      case "checked":
        return todo.checked && !todo.removed;
      case "unchecked":
        return !todo.checked && !todo.removed;
      case "removed":
        return todo.removed;
      default:
        return todo;
    }
  });

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

  const handleEdit = (id: number, value: string) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, value };
        }
        return todo;
      });

      return newTodos;
    });
  };

  const handleChecked = (id: number, checked: boolean) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, checked };
        }
        return todo;
      });
      return newTodos;
    });
  };

  const handleRemove = (id: number, removed: boolean) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          //idが同じものがあれば分割代入でremovedを上書きできる、スプレッド構文はそのほかの要素がある
          //todo.removed = removedを1行でやったってこと(ただし配列をコピーしていないとできないからこの書き方じゃないとできない)
          return { ...todo, removed };
        }
        return todo;
      });
      return newTodos;
    });
  };

  const handleSort = (filter: Filter) => {
    setFilter(filter);
  };

  const handleEmpty = () => {
    setTodos((todos) => todos.filter((todo) => !todo.removed));
  };

  return (
    // divを使いたくない場合は<></>(JSXフラグメント)を使う
    <div>
      <select
        defaultValue="all"
        onChange={(e) => handleSort(e.target.value as Filter)}
      >
        <option value="all">全てのタスク</option>
        <option value="checked">完了したタスク</option>
        <option value="unchecked">現在のタスク</option>
        <option value="removed">ゴミ箱</option>
      </select>
      {filter === "removed" ? (
        <button
          onClick={handleEmpty}
          disabled={todos.filter((todo) => todo.removed).length === 0}
        >
          ゴミ箱を空にする
        </button>
      ) : (
        filter !== "checked" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <input type="text" value={text} onChange={(e) => handleChange(e)} />
            <input type="submit" value="追加" onSubmit={handleSubmit} />
          </form>
        )
      )}
      <ul>
        {filterTodos.map((todo) => {
          // リストの場合はkeyプロパティがないと一意な要素を特定できない
          return (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.checked}
                disabled={todo.removed}
                // チェックボックスの値が変更されたときに呼び出される→だからboolean値の反転してる
                onChange={() => handleChecked(todo.id, !todo.checked)}
              ></input>
              <input
                type="text"
                value={todo.value}
                disabled={todo.checked || todo.removed}
                onChange={(e) => handleEdit(todo.id, e.target.value)}
              ></input>
              <button onClick={() => handleRemove(todo.id, !todo.removed)}>
                {todo.removed ? "復元" : "削除"}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
