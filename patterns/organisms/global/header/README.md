# Header

A `header` which includes the logo and primary navigation patterns.

## ClassNames

### Header 

* default: `.header`

### Logo

* default: `.logo__a .header__logo__a`

### Navigation

* default: `.nav__primary .header__nav__primary`

## Default Output

```html
<header class="header">
  <div class="header__logo">
    <a href="http://example.com" title="Visit the FancyBrand HomePage" class="logo__a header__logo__a">
      <img src="http://placehold.it/350x150&text=header__logo__img" alt="FancyBrand logo" class="logo__img header__logo__img">
    </a>
  </div>
  <nav id="header__nav" class="nav__primary header__nav__primary">
    <ul class="nav__primary__main header__nav__primary__main">
      <li class="nav__main__item header__nav__main__item"><a href="/shows" title="Shows">Shows</a></li>
      <li class="nav__main__item header__nav__main__item"><a href="/movies" title="Feature-Length Movies">Movies</a></li>
      <li class="nav__main__item header__nav__main__item"><a href="/episodes" title="Full Episodes">Episodes</a></li>
      <li class="nav__main__item header__nav__main__item"><a href="/schedule" title="Season Schedule">Schedule</a></li>
    </ul>
  </nav>
</header>
```