import { Fab, Icon } from "@mui/material";
import { styled } from "@mui/material/styles";

type Props = {
  todos: Todo[];
  filter: Filter;
  alertOpen: boolean;
  dialogOpen: boolean;
  onToggleAlert: () => void;
  onToggqleDialog: () => void;
};
const FabButton = styled(Fab)({
  position: "fixed",
  bottom: 15,
  right: 15,
});
export const ActionButton = ({
  todos,
  filter,
  alertOpen,
  dialogOpen,
  onToggleAlert,
  onToggqleDialog,
}: Props) => {
  const removed = todos.filter((todo) => todo.removed).length !== 0;

  return (
    <>
      {filter === "removed" ? (
        <FabButton
          aria-label="fab-delete-button"
          color="secondary"
          onClick={onToggleAlert}
          disabled={!removed || alertOpen}
        >
          <Icon>delete</Icon>
        </FabButton>
      ) : (
        <FabButton
          aria-label="fab-add-button"
          color="primary"
          onClick={onToggqleDialog}
          disabled={filter === "checked" || dialogOpen}
        >
          <Icon>create</Icon>
        </FabButton>
      )}
    </>
  );
};
