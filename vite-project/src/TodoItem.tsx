import { Card, Icon, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { pink, grey, lightBlue } from "@mui/material/colors";

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

  const Container = styled("div")({
    margin: "0 auto",
    maxWidth: "640px",
    fontFamily: "-apple-system, BlinkMacSystemFont, Roboto,sans-serif",
  });

  const TodoCard = styled(Card)(({ theme }) => ({
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    padding: theme.spacing(1),
    fontFamily: "-apple-system, BlinkMacSystemFont, Roboto, sans-serif",
  }));

  const Form = styled("div")(({ theme }) => ({
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    fontSize: "16px",
  }));

  const ButtonContainer = styled("div")(({ theme }) => ({
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  }));

  const Button = styled("button")(() => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    background: "none",
    border: "none",
    cursor: "pointer",
    outline: "none",
  }));

  const Trash = styled("button")(() => ({
    background: "none",
    border: "none",
    cursor: "pointer",
    outline: "none",
  }));

  return (
    <Container>
      {filterTodos.map((todo) => {
        // リストの場合はkeyプロパティがないと一意な要素を特定できない
        return (
          <TodoCard key={todo.id}>
            <Form>
              <TextField
                aria-label={`todo-${todo.value}`}
                fullWidth
                variant="standard"
                value={todo.value}
                onChange={(e) => onTodo(todo.id, "value", e.target.value)}
                disabled={todo.checked || todo.removed}
              ></TextField>
            </Form>
            <ButtonContainer>
              <Button
                aria-label={`todo-check-${todo.value}`}
                onClick={() => onTodo(todo.id, "checked", !todo.checked)}
                disabled={filter === "removed"}
              >
                {todo.checked ? (
                  <Icon
                    aria-label={`todo-removed-${todo.value}`}
                    style={{
                      color: filter !== "removed" ? pink.A200 : grey[500],
                    }}
                  >
                    check_circle_outline
                  </Icon>
                ) : (
                  <Icon
                    aria-label={`todo-uncheck-${todo.value}`}
                    style={{
                      color: filter !== "removed" ? lightBlue[500] : grey[500],
                    }}
                  >
                    radio_button_unchecked
                  </Icon>
                )}
                <Typography
                  style={{
                    userSelect: "none",
                    color:
                      todo.checked && filter !== "removed"
                        ? pink.A200
                        : grey[500],
                  }}
                >
                  Done
                </Typography>
              </Button>
              <Trash
                aria-label={`todo-trash-${todo.value}`}
                onClick={() => onTodo(todo.id, "removed", !todo.removed)}
              >
                {todo.removed ? (
                  <Icon
                    aria-label={`todo-undo-${todo.value}`}
                    style={{ color: lightBlue[500] }}
                  >
                    undo
                  </Icon>
                ) : (
                  <Icon
                    aria-label={`todo-undo-${todo.value}`}
                    style={{ color: grey[500] }}
                  >
                    delete
                  </Icon>
                )}
              </Trash>
            </ButtonContainer>
          </TodoCard>
        );
      })}
    </Container>
  );
};
