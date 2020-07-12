import React from "react";

export default function Header() {
  return (
    <div className="box-shadow-for-ui">
      <div className="uou-block-2b">
        <div className="container">
          <a href="#" className="logo">
            <img src="images/logo.png" alt />
          </a>
          <a href="#" className="mobile-sidebar-button mobile-sidebar-toggle">
            <span />
          </a>
          <nav className="nav">
            <ul className="sf-menu">
              <li className="active">
                <a href="index.html">
                  <i className="fa  fa-home" />
                </a>
              </li>
              <li>
                <a href="listing-filter.html">Professionals</a>
              </li>
              <li>
                <a href="index.html">Pages</a>
                <ul>
                  <li>
                    <a href="profile_company.html">Profile Company</a>
                  </li>
                  <li>
                    <a href="profile_company-no-tabs.html">
                      Profile Company No Tabs
                    </a>
                  </li>
                  <li>
                    <a href="user-dashboard(connections)(hotkeys-disabled).html">
                      User Dashboard 1
                    </a>
                  </li>
                  <li>
                    <a href="user-dashboard(connections)(hotkeys-enabled).html">
                      User Dashboard 2
                    </a>
                  </li>
                  <li>
                    <a href="user-dashboard(followers).html">
                      User Dashboard 3
                    </a>
                  </li>
                  <li>
                    <a href="user-dashboard(following).html">
                      User Dashboard 4
                    </a>
                  </li>
                  <li>
                    <a href="blog-post.html">Blog Post</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="user-profile(layout-1).html">User Profile</a>
              </li>
              <li>
                <a href="blog.html">Blog</a>
              </li>
              <li>
                <a href="gui-kit.html">GUI KIT</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {/* end .uou-block-2b */}
    </div>
  );
}
