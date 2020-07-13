import React, { useEffect } from "react";
import Login from "./Login";
import Register from "./Register";
import $ from "jquery";

export default function Home() {
  useEffect(() => {
    $(document).on("click", ".tabs .login", function () {
      console.log("login");

      $(document.getElementById("register")).removeClass("active");
      $(document.getElementById("log-in")).addClass("active");
      $(this).addClass("active").siblings().removeClass("active");
    });

    $(document).on("click", ".tabs .register", function () {
      console.log("register");

      $(document.getElementById("register")).addClass("active");
      $(document.getElementById("log-in")).removeClass("active");
      $(this).addClass("active").siblings().removeClass("active");
    });
  });
  return (
    <>
      {/* HOME PRO*/}
      <div className="home-pro">
        {/* PRO BANNER HEAD */}
        <div className="banr-head">
          <div className="container">
            <div className="row">
              {/* CONTENT */}
              <div className="col-sm-7">
                <div className="text-area">
                  <div className="position-center-center col-md-10">
                    <h1>
                      Here comes the social networking platform that you’ve been
                      waiting for
                    </h1>
                  </div>
                </div>
              </div>
              {/* FORM SECTION */}
              <div className="col-sm-5">
                <div className="login-sec">
                  {/* TABS */}
                  <div className="uou-tabs">
                    <ul className="tabs">
                      <li style={{ cursor: "pointer" }} className="register">
                        <a>Register Now</a>
                      </li>
                      <li
                        className="active login"
                        style={{ cursor: "pointer" }}
                      >
                        <a>Member Login</a>
                      </li>
                    </ul>
                    {/* REGISTER */}
                    <div className="content">
                      <div id="register">
                        <Register />
                      </div>
                      {/* LOGIN */}
                      <div id="log-in" className="active">
                        <Login />
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* SERVICES */}
        <section className="services">
          {/* SERVICES ROW */}
          <ul className="row">
            {/* SECTION */}
            <li className="col-md-4">
              <div className="ser-inn">
                <i className="fa fa-globe" />
                <h4>Stay in touch with your colleagues</h4>
                <i className="fa fa-globe big" />
              </div>
            </li>
            {/* SECTION */}
            <li className="col-md-4">
              <div className="ser-inn">
                <i className="fa fa-book" />
                <h4>Get the latest news in your industry</h4>
                <i className="fa fa-book big" />
              </div>
            </li>
            {/* SECTION  */}
            <li className="col-md-4">
              <div className="ser-inn">
                <i className="fa fa-picture-o" />
                <h4>Feel free to share what’s up with you</h4>
                <i className="fa fa-picture-o big" />
              </div>
            </li>
          </ul>
        </section>
        {/* PRO SECTION */}
        <section className="pro-content">
          <div className="container-fluid">
            <div className="row">
              {/* PRO IMAGE */}
              <div
                className="col-md-6 pro-inside"
                style={{
                  background:
                    "url(images/pro-img-1.jpg) center center no-repeat",
                }}
              />
              {/* PRO CONTENT */}
              <div className="col-md-6 pro-inside">
                <div className="position-center-center col-md-6">
                  <h1>Interact with other professionals</h1>
                  <p>
                    {" "}
                    you can build a relationship with mutual connections, folks
                    in your field, and even your greatest role models.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* PRO SECTION */}
          <div className="container-fluid">
            <div className="row">
              {/* PRO TEXT */}
              <div className="col-md-6 pro-inside">
                <div className="position-center-center col-md-6">
                  <h1>Find opportunities of interest</h1>
                  <p>
                    it is a simple way to put your name on the professional map.
                    Upload a professional profile picture and write a powerful
                    summary that emphasizes your strengths and showcases your
                    personality
                  </p>
                </div>
              </div>
              {/* PRO BACKGROUND */}
              <div
                className="col-md-6 pro-inside"
                style={{
                  background:
                    "url(images/pro-img-2.jpg) center center no-repeat",
                }}
              />
            </div>
          </div>
        </section>
        {/* APP IMAGE */}
        <section className="app-images">
          <div className="container">
            <div className="row">
              {/* TEXT */}
              <div className="col-md-6 text-center text-area">
                <h1> fully responsive platform</h1>
                <p>Accessible via any device : smartphone or laptop ...</p>
                <a>
                  <i className="fa fa-smart" /> Don't forget to Stay in touch
                </a>
              </div>
              {/* APP IMAGE */}
              <div className="col-md-6 text-right">
                <img src="images/app-img.png" alt />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
