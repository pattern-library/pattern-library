# Hero Component

A `hero` component pattern includes the promo pattern for each promotion (via the /molecules/components/promo pattern).

## ClassNames

### Hero 

* default: `.heros`

### Heros Container

* default: `.heros__container`

### Individual Hero Promo

* default: `.hero .hero_[num]`


## Default Output

```html
<div class="heros">
  <div class="heros__container">
    <article class="hero hero__1">
      <section class="hero__1__image">
        <img src="http://placehold.it/800x600&text=hero__image" alt="hero" class="hero__1__image__img">
      </section>
      <section class="hero__1__text">
        <h2 class="hero__1__text__header">hero</h2>
        <div class="hero__1__body">All about what happens on hero ONE is all that happens during reading this hero.</div>
      </section>
    </article>
    <article class="hero hero__2">
      <section class="hero__2__image">
        <img src="http://placehold.it/400x300&text=hero__image" alt="hero" class="hero__2__image__img">
      </section>
      <section class="hero__2__text">
        <h2 class="hero__2__text__header">hero</h2>
        <div class="hero__2__body">All about what happens on hero TWO is all that happens during reading this hero.</div>
      </section>
    </article>
    <article class="hero hero__3">
      <section class="hero__3__image">
        <img src="http://placehold.it/400x300&text=hero__image" alt="hero" class="hero__3__image__img">
      </section>
      <section class="hero__3__text">
        <h2 class="hero__3__text__header">hero</h2>
        <div class="hero__3__body">All about what happens on hero THREE is all that happens during reading this hero.</div>
      </section>
    </article>
  </div>
</div>

```