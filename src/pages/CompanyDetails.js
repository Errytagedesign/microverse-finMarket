import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getCompanyDetails,
  selectCompanies,
} from '../redux/Company/CompanySlice';

export const formatMoney = (figure) => figure.toLocaleString('en-US', {
  style: 'currency',
  // this will make it use $
  currency: 'USD',

  // This will ensure 2 decimal place, even if they are zeros
  minimumFraction: 2,
});

function CompanyDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { companyDetail } = useSelector(selectCompanies);
  console.log(companyDetail);

  useEffect(() => {
    dispatch(getCompanyDetails(id));
  }, [dispatch, id]);

  return (
    <main className="container mt-5">
      {companyDetail.map(
        ({
          companyName,
          ceo,
          currency,
          exchangeShortName,
          image,
          industry,
          isActivelyTrading,
          mktCap,
          price,
          sector,
          website,
          description,
        }) => (
          <section
            key={ceo}
            className="d-flex flex-column flex-md-row justify-content-between"
          >
            <div className="odd col-12 col-md-4">
              <figure className=" col-12">
                <img src={image} alt={companyName} />
              </figure>
            </div>

            <section className="col-12 col-md-7">
              <div className="even">
                <p> CEO:</p>
                <h3>{ceo}</h3>
              </div>
              <div className="odd d-flex flex-column">
                <p> company description:</p>

                <small>{description}</small>
              </div>
              <div className="even">
                <p> Currency:</p>
                <h3>{currency}</h3>
              </div>
              <div className="odd">
                <p>Exchange Name: </p>
                <h3>{exchangeShortName}</h3>
              </div>
              <div className="even">
                <p>Actively Trading:</p>
                <h3>{isActivelyTrading}</h3>
              </div>
              <div className="odd">
                <p> Price: </p>
                <h3>{`$${price}`}</h3>
              </div>
              <div className="even">
                <p> Market Cap:</p>
                <h3>{formatMoney(mktCap)}</h3>
              </div>
              <div className="odd">
                <p> Industry:</p>
                <h3>{industry}</h3>
              </div>
              <div className="even">
                <p> Sector:</p>
                <h3>{sector}</h3>
              </div>
              <div className="odd">
                <p> Website:</p>
                <button type="button" className="btn btn-primary">
                  {' '}
                  <a href={website} target="_blank" rel="noreferrer">
                    Visit Our Website
                  </a>
                </button>
              </div>
            </section>
          </section>
        ),
      )}
    </main>
  );
}

export default CompanyDetails;
