import React from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import GitHubIcon from "@material-ui/icons/GitHub";

export default function Footer() {
  return (
    <div style={{textAlign: 'center'}}>
      {/* end .uou-block-4e */}
      <div className="uou-block-4a secondary dark">
        <div className="container">
          <p>
            MERN Project Made with{" "}
            <FavoriteIcon color="secondary" fontSize="large" /> by ahmedFerjani{" "}
            <a
              href="https://github.com/ahmedFerjani"
              target="_blank"
              style={{ textDecoration: "none", color: "black" }}
            >
              <GitHubIcon fontSize="large" />
            </a>
          </p>
        </div>
      </div>
      {/* end .uou-block-4a */}
    </div>
  );
}
