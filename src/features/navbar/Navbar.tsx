// @ts-nocheck
import React from "react";
import styles from "./Navbar.module.css";
import { useNavbar } from "./useNavbar";

/**
 * Navbar
 */
const Navbar = () => {
  const { isSearch, setSearch } = useNavbar();
  const HamburgerButton = () => (
    <button className={styles.nav__burger}>
      <svg
        className="burger"
        viewBox="0 0 24 24"
        preserveAspectRatio="xMidYMid meet"
        x="0"
        y="0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    </button>
  );

  const userOption = [
    { style: "login", text: "Login In" },
    { style: "sub", text: "Subscribe" },
    { style: "try", text: "Support" },
  ];

  const UserOptions = () => (
    <>
      {userOption.map((option, idx) => (
        <li
          key={idx}
          className={`${styles.nav__item} ${styles.nav__item}--alt ${styles.nav__item}--${option.style}`}
        >
          <a href="#">
            <span className={styles.nav__text}>{option.text}</span>
          </a>
        </li>
      ))}
    </>
  );

  const userCategory = [
    { text: "MENS" },
    { text: "WOMENS" },
    { text: "KIDS" },
    { text: "ACCESSORIES" },
    { text: "FOOTWEAR" },
  ];

  const UserCategories = () => (
    <>
      {userCategory.map((category, idx) => (
        <li key={idx} className={styles.nav__item}>
          <a href="#">
            <span className={styles.nav__text}>{category.text}</span>
          </a>
        </li>
      ))}
    </>
  );

  const Search = () => (
    <li
      className={`${styles.nav__item} ${styles.nav__item}--alt ${styles.nav__item}--search`}
      onClick={() => setSearch(!isSearch)}
    >
      <button>
        <span className={styles.nav__text}>
          <SvgFind />
          <SvgClose />
        </span>
      </button>
    </li>
  );

  const SvgClose = () => (
    <svg
      className={styles.close}
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
      x="0"
      y="0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );

  const SvgFind = () => (
    <svg
      className={styles.find}
      viewBox="0 0 68 68"
      preserveAspectRatio="xMidYMid meet"
      x="0"
      y="0"
    >
      <g>
        <path d="M40.985 0C28.284 0 17.961 10.324 17.961 23.023c0 4.805 1.484 9.268 4.013 12.965L.947 57.015a3.217 3.217 0 000 4.537l1.512 1.512a3.217 3.217 0 004.537 0l21.026-21.026a22.88 22.88 0 0012.963 4.012C53.677 46.051 64 35.713 64 23.023 64 10.324 53.677 0 40.985 0zm.001 39.239c-8.945 0-16.225-7.268-16.225-16.216 0-8.945 7.28-16.225 16.225-16.225s16.217 7.28 16.217 16.225c0 8.949-7.272 16.216-16.217 16.216z" />
      </g>
    </svg>
  );

  const SvgBurger = () => (
    <svg
      className="burger"
      viewBox="0 0 48 48"
      preserveAspectRatio="xMidYMid meet"
      x="0"
      y="0"
    >
      <path d="M24.12,25.48a5.16,5.16,0,1,1,5.16-5.16A5.16,5.16,0,0,1,24.12,25.48Zm0-8.47a3.31,3.31,0,1,0,3.31,3.31A3.32,3.32,0,0,0,24.12,17Z" />
      <path d="M15.8,33V31.09a1.93,1.93,0,0,1,1.93-1.93H30.64a1.93,1.93,0,0,1,1.93,1.93V33h1.84V31.09a3.78,3.78,0,0,0-3.77-3.77H17.73A3.78,3.78,0,0,0,14,31.09V33H15.8Z" />
    </svg>
  );

  return (
    <>
      <header className={styles.blizz} />
      <main id="app">
        <header className={`${styles.warcraft} ${isSearch ? `searching` : ""}`}>
          <nav className={styles.nav}>
            <div className={styles.nav__bg}>
              <div className={styles.nav__icon}>
                <a href="#">
                  <img
                    alt="icon"
                    src="https://assets.codepen.io/13471/wow-logo-small.png"
                  />
                </a>
              </div>
              <HamburgerButton />
              <div className={styles.nav__drawer}>
                <button className={styles.nav__close}>
                  <SvgClose />
                </button>
                <div className={styles.nav__search}>
                  <label className={styles.nav__search__label}>
                    <SvgFind />
                    <input
                      className={styles.nav__search__input}
                      placeholder="Search for characters, blogs, and more..."
                    />
                  </label>
                </div>
                <ul className={styles.nav__list}>
                  <li
                    className={`${styles.nav__item} ${styles.nav__item}--logo`}
                  >
                    <h1 className={styles.nav__title}>
                      {/*<h1 className="nav__title" loading="lazy">*/}
                      <span className={styles.nav__alt}>World of Warcraft</span>
                      <a href="#">
                        <span className={`${styles.nav__logo} large`} />
                        <img
                          alt="logoSmall"
                          className={`${styles.nav__logo} small`}
                          src="https://assets.codepen.io/13471/wow-logo-small.png"
                        />
                      </a>
                    </h1>
                  </li>
                  <UserCategories />
                  <Search />
                  <UserOptions />
                </ul>
              </div>
            </div>
            <button className={styles.nav__blizz}>
              <SvgBurger />
            </button>
          </nav>
        </header>
        <div className={styles.overlay} />
        {/* <div className={styles.switch}>
          <label>
            <input type="radio" name="style" value="classic" />
            Classic
          </label>
          <label>
            <input type="radio" name="style" value="tbc" />
            Crusade
          </label>
          <label>
            <input type="radio" name="style" value="wolk" checked={true} />
            Wrath
          </label>
          <label>
            <input type="radio" name="style" value="mop" />
            Mists
          </label>
        </div>*/}
      </main>
      <div className={styles.resize}>
        Try resizing your browser for responsiveness, <br />
        and scrolling for stickyness. <br />
        <small>
          <em>(also, check the burger menu out)</em>
        </small>
      </div>
    </>
  );
};

export default Navbar;
