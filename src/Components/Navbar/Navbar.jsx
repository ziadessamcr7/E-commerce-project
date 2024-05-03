import React, { useContext, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../Context/Authentication";
import logo from "../../images/freshcart-logo.svg";
import { cartContext } from "../Context/CartContext";
import { wishlistContext } from "../Context/WishlistContext";


export default function Navbar() {
  const { Token, setToken } = useContext(authContext);

  const { Name, setName } = useContext(authContext);

  const { numOfCartItems, getUserCart } = useContext(cartContext)

  const { numOfwishListedItems } = useContext(wishlistContext)

  const navigate = useNavigate();


  useEffect(() => {
    if (localStorage.getItem('name') !== null) {
      setName(localStorage.getItem('name'))
      getUserCart()
    }



  }, [])




  function logout() {

    localStorage.removeItem("tkn");
    localStorage.removeItem('name');

    setToken(null);
    setName(null);

    navigate("/e-commerce-login");

  }



  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary position-fixed w-100 z-3 p-3">
        <div className="container">
          <img src={logo} alt="logo" />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {Token ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/home"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/brands"
                    >
                      Brands
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="categories"
                    >
                      Categories
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link position-relative"
                      aria-current="page"
                      to="wishlist"
                    >
                      Wishlist
                      <span class="position-absolute top-2 start-100 translate-middle badge rounded-pill bg-danger">
                        {numOfwishListedItems}
                        <span class="visually-hidden">unread messages</span>
                      </span>
                    </NavLink>
                  </li>
                  {/* <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="allorders"
                    >
                      All Orders
                    </NavLink>
                  </li> */}
                  <li className="nav-item">
                    <NavLink
                      className="nav-link ms-2"
                      aria-current="page"
                      to="products"
                    >
                      Products
                    </NavLink>
                  </li>

                </>
              ) : (
                ""
              )}
            </ul>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

              {Token ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link position-relative"
                      aria-current="page"
                      to="cart"
                    >
                      <i class="fa-solid fa-cart-shopping fa-lg"></i>
                      <span class="position-absolute top-1 start-100 translate-middle badge rounded-pill bg-success">
                        {numOfCartItems}
                        <span class="visually-hidden">unread messages</span>
                      </span>
                    </NavLink>
                  </li>
                  {/* <li className="nav-item ms-3">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/profile"
                    >
                      Profile
                    </NavLink>
                  </li> */}
                  <li className="nav-item ms-3">
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={logout}
                      className="nav-link"
                      aria-current="page"
                    // to="#"
                    >
                      Logout
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/e-commerce-login"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/register"
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              )}

              {Name ? (
                <li className="nav-item">
                  <span
                    className="nav-link fw-bolder text-capitalize"
                    aria-current="page"
                    to="#"
                  >
                    <i className="fa-solid fa-user-check px-1 text-success"></i>  Hi, {Name}
                  </span>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
