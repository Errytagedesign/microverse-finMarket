import React from 'react';
import { useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { BsArrowRightCircle, BsGraphUpArrow } from 'react-icons/bs';
import './CompanyCard.css';
import { Link } from 'react-router-dom';
import { selectCompanies } from '../../redux/Company/CompanySlice';

function CompanyCard() {
  // const dispatch = useDispatch();
  const { companies, isLoading, error } = useSelector(selectCompanies);
  console.log(companies);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div>
        {' '}
        <p> Opps..., There&apos;s a problem</p>
        {' '}
      </div>
    );
  }

  return (
    <main className="cardWrapper">
      {companies.map(({ name, symbol, price }) => (
        <ul key={symbol} className="companyCard">
          <li className="">
            <Link
              to={`company/${symbol}`}
              className="d-flex flex-column justify-content-between align-items-end col-12"
            >
              <BsArrowRightCircle color="var(--secColor)" />
              {' '}
              <div className="d-flex align-items-start col-12 my-4">
                <BsGraphUpArrow className="icon" />
              </div>
              <div className="d-flex flex-column justify-content-between align-items-end col-12 text-end">
                <h2>{name}</h2>
                <div className="d-flex justify-content-between col-10 ">
                  <span className="">
                    {' '}
                    Symbol:
                    <strong>{symbol}</strong>
                  </span>

                  <span className="">
                    {' '}
                    Price:
                    <strong>{`$ ${price}`}</strong>
                  </span>
                </div>
              </div>
            </Link>
          </li>
          {' '}
        </ul>
      ))}
    </main>
  );
}

export default CompanyCard;
