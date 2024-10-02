import { NavLink } from 'react-router-dom';

const ClientLinks = () => {
  return (
    <>
      <div>
        <div className="ui__menu">
          <div className="ui__menu--header">
            <p>MENU:</p>
          </div>
          <ul className="ui">
            <div className="ui__menu--header">
              <p>client</p>
              <hr style={{ width: '15rem' }} />
            </div>
            <NavLink to="/client/all-items">All-Items</NavLink>
            <NavLink to="/client/fav">Favourites</NavLink>
            <NavLink to="/client/trash">Trash</NavLink>
            <div className="ui__menu--header">
              <p>Tools</p>
              <hr style={{ width: '15rem' }} />
            </div>
            <NavLink to="/password-generator">Password Generator</NavLink>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ClientLinks;
