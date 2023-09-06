import { Link } from 'react-router-dom';

const Navigation = () => (
  <header className="d-flex flex-row justify-content-between align-items-center my-3 pb-2 container">
    <Link to="/">
      <h1>FM</h1>
    </Link>

    <div className="col-6">
      <input
        type="text"
        placeholder="search company by name..."
        className="form-control"
      />
    </div>
  </header>
);

export default Navigation;
