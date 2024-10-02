import { NavLink } from 'react-router-dom'

const SiteLinks = () => {
  return (
    <>
      <div>
        <div className='ui__menu'>
          <div className='ui__menu--header'>
            <p>MENU:</p>
          </div>
          <ul className='ui'>
            <div className='ui__menu--header'>
              <p>Site</p>
              <hr style={{ width: '15rem' }} />
            </div>
            <NavLink to='/valut/all-items'>All-Items</NavLink>
            <NavLink to='/valut/fav'>Favourites</NavLink>
            <NavLink to='/client/trash'>Trash</NavLink>
            <div className='ui__menu--header'>
              <p>Tools</p>
              <hr style={{ width: '15rem' }} />
            </div>
            <NavLink to='/password-generator'>Password Generator</NavLink>
          </ul>
        </div>
      </div>
    </>
  )
}

export default SiteLinks
