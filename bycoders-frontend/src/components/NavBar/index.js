import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Avatar from '../../components/Avatar';
import FabButton from '../../components/FabButton';
import { FaSignOutAlt } from 'react-icons/fa';
import './style.css';

function Navbar() {
  const { user, logout } = useAuth0();
  
  return (
    <div className="navbar">
      <div />
      <div className="profile">
        <div className="label">{user.name}</div>
        <Avatar style={{ marginLeft: 10 }} src={user.picture} name={user.name} />
        <FabButton style={{ marginLeft: 10 }} onClick={() => logout()}>
          <FaSignOutAlt/>
        </FabButton>
      </div>

    </div>
  );
}

export default Navbar;