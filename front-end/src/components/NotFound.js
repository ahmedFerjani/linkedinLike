import React from "react";
import {Link} from 'react-router-dom'
import "./NotFound.css"

export default function NotFound() {
  return (
    <div className="wrapper">

      {/* MAIN */}
      <main className="container">
        <div className="row" id="main">
          {/* content */}
          <div className="col-md-4" id="content">
            <article>
                <br />
                <br />

              <h1>OOPS! You did it Again...</h1>
              <p>
                The page you were looking for doesn't exist. We think the page
                may have moved
              </p>
              <Link to="/" className="btn" role="button">
                Go Home
              </Link>
            </article>
          </div>
          {/* end content */}
          {/* glitch laptop for lg, md, sm sizes */}
          <div className="col-md-8 laptop hidden-xs" style={{textAlign:"center"}}>
            <img src="img/laptop.png" alt="laptop" />
          </div>
          {/* end glitch laptop */}
          {/* non animated laptop for xs size */}
          <div className="laptop visible-xs">
            <img src="img/laptop-xs.png" alt="laptop xs" />
          </div>

          {/* end non animated laptop */}
        </div>
      </main>
      {/* END MAIN */}
    </div>
  );
}
