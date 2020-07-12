import React, { useEffect } from "react";
import {Link} from 'react-router-dom'
import $ from "jquery";
var $body = $("body");
export default function MobileNav() {
  useEffect(() => {
    // Mobile Sidebar
    // ---------------------------------------------------------
    $(".mobile-sidebar-toggle").on("click", function () {
      $body.toggleClass("mobile-sidebar-active");
      return false;
    });

    $(".mobile-sidebar-open").on("click", function () {
      $body.addClass("mobile-sidebar-active");
      return false;
    });

    $(".mobile-sidebar-close").on("click", function () {
      $body.removeClass("mobile-sidebar-active");
      return false;
    });
  });
  return (
    <div className="uou-block-11a">
      <h5 className="title">Menu</h5>
      <a href="#" className="mobile-sidebar-close">
        ×
      </a>
      <nav className="main-nav">
        <ul>
          <li className="active">
            <Link to="/">Home</Link>
          </li>
          <li>
            <a href="listing-filter.html">Professionals</a>
          </li>
          <li>
            <a href="profile_company.html">Profile Company</a>
          </li>
          <li>
            <a href="profile_company-no-tabs.html">Profile Company No Tabs</a>
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
            <a href="user-dashboard(followers).html">User Dashboard 3</a>
          </li>
          <li>
            <a href="user-dashboard(following).html">User Dashboard 4</a>
          </li>
          <li>
            <a href="blog-post.html">Blog Post</a>
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
      <hr />
    </div>
  );
}
