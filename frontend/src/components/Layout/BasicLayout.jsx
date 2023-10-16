/* eslint-disable react/prop-types */
import { Fragment } from "react";
import Header from "./Header";

const BasicLayout = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <div className="px-2 md:px-3">{children}</div>
    </Fragment>
  );
};

export default BasicLayout;
