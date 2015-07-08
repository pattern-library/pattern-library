# Teaser Component

A `teaser` component pattern includes the promo pattern for each teaser (via the /molecules/components/promo pattern).

## ClassNames

### teaser 

* default: `.teasers`

### teasers Container

* default: `.teasers__container`

### Individual teaser Promo

* default: `.teaser .teaser_[num]`


## Default Output

```html
<div class="teaser">
  <div class="teasers__container">
    <article class="teaser teaser__1">
      <section class="teaser__1__image">
        <img src="http://placehold.it/800x600&text=teaser__image" alt="teaser" class="teaser__1__image__img">
      </section>
      <section class="teaser__1__text">
        <h2 class="teaser__1__text__header">teaser</h2>
        <div class="teaser__1__body">All about what happens on teaser ONE is all that happens during reading this teaser.</div>
      </section>
    </article>
    <article class="teaser teaser__2">
      <section class="teaser__2__image">
        <img src="http://placehold.it/400x300&text=teaser__image" alt="teaser" class="teaser__2__image__img">
      </section>
      <section class="teaser__2__text">
        <h2 class="teaser__2__text__header">teaser</h2>
        <div class="teaser__2__body">All about what happens on teaser TWO is all that happens during reading this teaser.</div>
      </section>
    </article>
    <article class="teaser teaser__3">
      <section class="teaser__3__image">
        <img src="http://placehold.it/400x300&text=teaser__image" alt="teaser" class="teaser__3__image__img">
      </section>
      <section class="teaser__3__text">
        <h2 class="teaser__3__text__header">teaser</h2>
        <div class="teaser__3__body">All about what happens on teaser THREE is all that happens during reading this teaser.</div>
      </section>
    </article>
  </div>
</div>
```