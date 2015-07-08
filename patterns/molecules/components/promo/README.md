# Promo

A `promo` pattern includes an image (via the /atoms/images/img pattern), a title with a variable header-element type and description

## ClassNames

### Promo 

* default: `.promo`

### Image

* default: `.promo__image`

### Text

* default: `.promo__text`

#### Header

* default: `.promo__text__header`

#### Body

* default: `.promo__body`

## Text Header

You can change the Hx number for the header element so this promo can be used in various situations. It doesn't even need to be a heading element. Just change:

`{{promo.text.header.element}}`

## Default Output

```html
<article class="promo">
  
  <section class="promo__image">
    <img src="http://placehold.it/350x150&text=promo__image" alt="Thing 123 Promo Image" class="promo__image__img">
  </section>

  <section class="promo__text">
    <h2 class="promo__text__promo">Thing 123 Premieres</h2>
    <div class="promo__body">All about what happens on episode one of Thing 123</div>
  </section>
  
</article>
```