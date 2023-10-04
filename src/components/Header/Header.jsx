import React from "react";
import "./Header.css";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/fireBaseConfig";
import { signOut } from "firebase/auth";

function Header() {
  const [user] = useAuthState(auth);
  
  const categories = ["Health", "Food", "Travel", "Technology"];

  const navigate = useNavigate();

  return (
    <div className="header-container">
      <FaHome onClick={() => navigate("/")} />
      <div className="categories-container">
        {categories.map((item, index) => (
          <Link className="nav-link" key={index} to={`/category/${item}`}>
            {item}
          </Link>
        ))}
      </div>
      {user ? (
        <div>
          <span className="username">{user?.displayName}</span>
          <button className="auth-link" onClick={() => signOut(auth)}>Logout</button>
        </div>
      ) : (
        <Link className="auth-link" to="/auth">
          Signup
        </Link>
      )}
    </div>
  );
}

export default Header;
