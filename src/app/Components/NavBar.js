import { Paper } from "@mui/material";
import Link from "next/link";

const Navbar = () => {
  return (
    <Paper elevation={3}>
      <nav
        className="navbar navbar-expand-lg 
                         navbar-dark bg-dark"
      >
        <div className="container">
          <Link className="navbar-brand" href="/">
            CryptoTracker
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto"></ul>
          </div>
        </div>
      </nav>
    </Paper>
  );
};

export default Navbar;
