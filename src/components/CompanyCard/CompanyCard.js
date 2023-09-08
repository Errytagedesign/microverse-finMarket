import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { BsArrowRightCircle, BsGraphUpArrow, BsSearch } from 'react-icons/bs';
import './CompanyCard.css';
import { Link } from 'react-router-dom';
import {
  selectCompanies,
  updateSearchParam,
} from '../../redux/Company/CompanySlice';
import Navigation from '../Navigation';

function CompanyCard() {
  const dispatch = useDispatch();
  const {
    topGainers, isSearchParam, isLoading, error,
  } = useSelector(selectCompanies);

  const renderCompanies = isSearchParam !== ''
    ? topGainers.filter((coy) => coy.name.toLowerCase().startsWith(isSearchParam.toLowerCase()))
    : topGainers;

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    dispatch(updateSearchParam(searchValue));
  };

  useEffect(() => {
    dispatch(updateSearchParam(''));
  }, [dispatch]);

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
    <div>
      <Navigation />

      <section className="odd d-flex flex-row topGainers">
        <div className="col-6">
          <BsGraphUpArrow size={100} className="icon" />
        </div>
        <div className="col-6">
          <h5> Top Gainers: </h5>
          <h2>
            {' '}
            {topGainers.length}
            {' '}
          </h2>
        </div>
      </section>
      <div className="col-12 d-flex flex-row align-items-center position-relative">
        <BsSearch className="search" />
        <input
          type="text"
          placeholder="Search company by name..."
          onChange={handleSearch}
          defaultValue=""
        />
      </div>
      <main className="d-flex flex-row flex-wrap ">
        {renderCompanies.length === 0 ? (
          <div>
            {' '}
            <p> There&apos;s no match to your search</p>
            {' '}
          </div>
        ) : (
          renderCompanies.map((coy, idx) => (
            <ul
              key={coy.symbol}
              className={`companyCard col-6 col-md-4  ${
                idx % 2 === 0 ? 'even' : 'odd'
              }`}
            >
              <li className="">
                <Link
                  to={`company/${coy.symbol}`}
                  className="d-flex flex-column justify-content-between align-items-end"
                >
                  <BsArrowRightCircle color="var(--secColor)" />
                  {' '}
                  <div className="d-flex align-items-start col-12 my-4">
                    <BsGraphUpArrow className="icon" />
                  </div>
                  <div className="d-flex flex-column justify-content-between align-items-end col-12 text-end">
                    <h2>{coy.name}</h2>
                    <div className="d-flex justify-content-between col-12 col-md-10 ">
                      <span className="">
                        {' '}
                        Symbol:
                        <strong>{coy.symbol}</strong>
                      </span>

                      <span className="">
                        {' '}
                        Price:
                        <strong>{`$ ${coy.price}`}</strong>
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
              {' '}
            </ul>
          ))
        )}
      </main>
    </div>
  );
}

export default CompanyCard;
