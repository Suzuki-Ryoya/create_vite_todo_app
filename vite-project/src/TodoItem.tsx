type Props = {
  todos: Todo[];
  filter: Filter;
  onTodo: <K extends keyof Todo, V extends Todo[K]>(
    id: number,
    key: K,
    value: V
  ) => void;
};

export const TodoItem = ({ todos, filter, onTodo }: Props) => {
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

  return (
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
              onChange={() => onTodo(todo.id, "checked", !todo.checked)}
            ></input>
            <input
              type="text"
              value={todo.value}
              disabled={todo.checked || todo.removed}
              onChange={(e) => onTodo(todo.id, "value", e.target.value)}
            ></input>
            <button onClick={() => onTodo(todo.id, "removed", !todo.removed)}>
              {todo.removed ? "復元" : "削除"}
            </button>
          </li>
        );
      })}
    </ul>
  );
};
