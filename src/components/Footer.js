import React from 'react';

function Footer() {
  return (
    <footer className=" d-flex justify-content-center">
      <section className="py-5 d-flex flex-column flex-md-row text-center justify-content-around col-11 col-md-6 mx-auto">
        <p> Data provided by: </p>
        {' '}
        <a
          href="https://financialmodelingprep.com/developer/docs/"
          target="_blank"
          rel=" noreferrer"
          className="btn btn-primary"
        >
          {' '}
          Financial Modeling Prep
        </a>
      </section>
    </footer>
  );
}

export default Footer;
