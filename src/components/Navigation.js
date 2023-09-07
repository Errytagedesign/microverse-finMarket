import { BsMic } from 'react-icons/bs';
import { MdSettings } from 'react-icons/md';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <header className="d-flex ">
      <section className=" py-5 d-flex flex-row justify-content-between align-items-center container">
        <Link to="/">
          <h1>FM</h1>
        </Link>

        <h1> Top Gainer Companies</h1>

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

export default Navigation;
