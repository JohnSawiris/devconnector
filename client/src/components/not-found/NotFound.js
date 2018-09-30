import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <React.Fragment>
      <Link to="/" className="btn btn-info">
        Go Home
      </Link>
      <h1 className="display-4">Page Not Found</h1>
      <p>Sorry, this page does not exist</p>
    </React.Fragment>
  );
};

export default NotFound;
