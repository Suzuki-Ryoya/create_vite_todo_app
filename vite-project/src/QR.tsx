import { QRCode } from "react-qrcode-logo";

import { Backdrop } from "@mui/material";
import { styled } from "@mui/material/styles";

const TodoBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: "#fff",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
}));

type Props = {
  open: boolean;
  onClose: () => void;
};

export const QR = ({ open, onClose }: Props) => (
  <TodoBackdrop open={open} onClick={onClose}>
    <QRCode value="https://sprout2000.github.io/todo" />
  </TodoBackdrop>
);
