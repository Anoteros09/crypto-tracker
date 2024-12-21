import { Box, Modal, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  borderRadius: "10px",
  bgcolor: "rgb(33, 37, 41)",
  color: "white",
  boxShadow: 24,
  p: 4,
};
export default function CustomModal(props) {
  const { open, setOpen, titleText, bodyText } = props;
  const handleClose = () => setOpen(false);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="divide-y divide-dashed">
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          className="flex items-center"
        >
          <InfoOutlinedIcon className="mr-3" />
          {titleText}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {bodyText}
        </Typography>
      </Box>
    </Modal>
  );
}
