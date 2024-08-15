import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { styled } from "@mui/material/styles";

type Props = {
  alertOpen: boolean;
  onEmpty: () => void;
  onToggleAlert: () => void;
};

const Alert = styled(Dialog)({
  fontFamily: "-apple-system, BlinkMacSystemFont, Roboto,sans-serif",
});

export const AlertDialog = ({ alertOpen, onEmpty, onToggleAlert }: Props) => (
  <Alert open={alertOpen} onClose={onToggleAlert}>
    <DialogTitle>アラート</DialogTitle>
    <DialogContent>
      <DialogContentText>本当にゴミ箱を空にしますか？</DialogContentText>
      <DialogContentText>この操作は取り消しできません</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button aria-label="alert-cancel" onClick={onToggleAlert} color="primary">
        キャンセル
      </Button>
      <Button
        aria-label="alert-ok"
        onClick={() => {
          onToggleAlert();
          onEmpty();
        }}
        color="primary"
      >
        OK
      </Button>
    </DialogActions>
  </Alert>
);
