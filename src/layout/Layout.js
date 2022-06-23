import React from "react";
import MainNavBar from "../components/MainNavBar";
import SiteHeader from "./../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

function Layout({ children }) {
  return (
    <div className="layout">
      <SiteHeader />
      <MainNavBar />
      <main className="main">{children}</main>
      {/* <SiteFooter /> */}
    </div>
  );
}

export default Layout;
