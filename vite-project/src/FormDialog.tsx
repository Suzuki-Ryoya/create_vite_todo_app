import { Button, Dialog, DialogActions, TextField } from "@mui/material";

type Props = {
  text: string;
  dialogOpen: boolean;
  onSubmit: () => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onToggleDialog: () => void;
};

export const FormDialog = ({
  text,
  dialogOpen,
  onSubmit,
  onChange,
  onToggleDialog,
}: Props) => (
  <Dialog fullWidth open={dialogOpen} onClose={onToggleDialog}>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div style={{ margin: "1em" }}>
        <TextField
          aria-label="todo-input"
          variant="standard"
          style={{
            width: "100%",
            fontSize: "16px",
            fontFamily: "-apple-system, BlinkMacSystemFont, Roboto, sans-serif",
          }}
          label="タスクを入力..."
          onChange={(e) => onChange(e)}
          value={text}
          autoFocus
        />
        <DialogActions>
          <Button aria-label="form-add" color="secondary" onClick={onSubmit}>
            追加
          </Button>
        </DialogActions>
      </div>
    </form>
  </Dialog>
);
