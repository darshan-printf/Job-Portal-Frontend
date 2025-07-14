import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear(); // Get the current year
 const  Env = process.env;

  return (
    <div>
      {/* <!-- ======= Footer ======= --> */}
      <footer className="main-footer text-center">
        <strong>Copyright © 2016-{currentYear} <Link to={'https://printftech.com/'}>{Env.REACT_APP_PROJECT_NAME}</Link>. </strong>
        All rights reserved.
      </footer>
    </div>
  );
}
