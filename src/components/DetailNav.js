import { BsMic } from 'react-icons/bs';
import { MdArrowBackIos, MdSettings } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCompanies } from '../redux/Company/CompanySlice';

function DetailNav() {
  const { companyDetail } = useSelector(selectCompanies);

  return (
    <header className="d-flex ">
      <section className="py-5 d-flex flex-row justify-content-between align-items-center container">
        <Link to="/">
          <MdArrowBackIos />
        </Link>

        {companyDetail.length > 0
          ? companyDetail.map(({ companyName }) => (
            <h1 key={companyName}>{companyName}</h1>
          ))
          : ''}

        <div>
          {' '}
          <BsMic />
          {' '}
          <MdSettings />
          {' '}
        </div>
      </section>
    </header>
  );
}

export default DetailNav;
