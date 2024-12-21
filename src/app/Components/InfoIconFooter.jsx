import { IconButton } from "@mui/material";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import { GridPagination } from "@mui/x-data-grid";

export default function InfoIconFooter(props) {
  const { setInfoModalOpen } = props;
  return (
    <div className="flex justify-between">
      <IconButton
        size="large"
        onClick={() => setInfoModalOpen((prev) => !prev)}
      >
        <HelpOutlinedIcon />
      </IconButton>
      <GridPagination className="custPagination" />
    </div>
  );
}
