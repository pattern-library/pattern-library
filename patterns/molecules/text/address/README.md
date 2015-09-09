# Address

An `address` pattern, which follows the [hcard microformats](http://microformats.org/wiki/hcard) specification.

## ClassNames

### address Element

* default: `.vcard`


## Default Output

```html

<div class="vcard">
  <span class="fn n">
    <span class="given-name">Jane</span>
    <span class="family-name">Doe</span>
  </span>
  <div class="org">Acme, Inc</div>
  <div class="adr">
    <div class="street-address">1234 Main St.</div>
    <span class="locality">Anytown</span>,
    <span class="postal-code">11223</span>,
    <abbr class="region" title="California">CA</abbr>
    <div class="country-name" title="United States of America">U.S.A.</div>
  </div>
  <div class="tel">+1.515.244.5611</div>
</div>

```
