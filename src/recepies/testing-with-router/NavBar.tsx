import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/profile/1">Profile</Link></li>
      <li><Link to="/protected">Protected</Link></li>
    </ul>
  );
};

export default NavBar;
