const headerInner = `
<div class="container">
  <div class="logo"><button type="button">FLIXX</button></div>
    <nav>
      <ul>
        <li>
          <a class="nav-link movies-nav-link active">Movies</a>
        </li>
        <li>
          <a class="nav-link shows-nav-link">TV Shows</a>
        </li>
      </ul>
    </nav>
  </div>
`;

const searchFormInner = `
  <div class="search-radio">
    <input type="radio" id="movie" name="type" value="movie" checked />
    <label for="movie">Movies</label>
    <input type="radio" id="tv" name="type" value="tv" />
    <label for="tv">TV Shows</label>
  </div>
  
  <div class="search-flex">
    <input
      type="text"
      name="search-term"
      id="search-term"
      class="search-input"
      placeholder="Enter search term"
    />
    <button class="btn" type="submit">
      <i class="fas fa-search"></i>
    </button>
  </div>
`;

const footerInner = `
  <div class="container">
    <div class="logo"><button type="button">FLIXX</button></div>
    <div class="social-links">
      <a href="https://www.facebook.com" target="_blank"
        ><i class="fab fa-facebook-f"></i
      ></a>
      <a href="https://www.twitter.com" target="_blank"
        ><i class="fab fa-twitter"></i
      ></a>
      <a href="https://www.instagram.com" target="_blank"
        ><i class="fab fa-instagram"></i
      ></a>
    </div>
  </div>
`;

export { headerInner, searchFormInner, footerInner };
