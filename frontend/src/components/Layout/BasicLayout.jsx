/* eslint-disable react/prop-types */
import { Fragment } from "react";
import Header from "./Header";

const BasicLayout = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <div className="py-5 px-[10%]">{children}</div>
    </Fragment>
  );
};

export default BasicLayout;
