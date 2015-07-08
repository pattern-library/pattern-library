# Slider

A `slider` pattern includes the promo pattern for each slide (via the /molecules/components/promo pattern).

## ClassNames

### Slider 

* default: `.slider`

### Slides Container

* default: `.slides`

### Individual Slide

* default: `.slide .slide_[num]`


## Default Output

```html
<div class="slider">
  <div class="button__next">next</div>
  <div class="slides">
    <article class="slide slide__1">
      <section class="slide__1__image">
        <img src="http://placehold.it/800x600&text=slider__image" alt="Slide" class="slide__1__image__img">
      </section>
      <section class="slide__1__text">
        <h2 class="slide__1__text__header">Slide</h2>
        <div class="slide__1__body">All about what happens on slide ONE is all that happens during reading this slide.</div>
      </section>
    </article>
    <article class="slide slide__2">
      <section class="slide__2__image">
        <img src="http://placehold.it/800x600&text=slider__image" alt="Slide" class="slide__2__image__img">
      </section>
      <section class="slide__2__text">
        <h2 class="slide__2__text__header">Slide</h2>
        <div class="slide__2__body">All about what happens on slide TWO is all that happens during reading this slide.</div>
      </section>
    </article>
    <article class="slide slide__3">
      <section class="slide__3__image">
        <img src="http://placehold.it/800x600&text=slider__image" alt="Slide" class="slide__3__image__img">
      </section>
      <section class="slide__3__text">
        <h2 class="slide__3__text__header">Slide</h2>
        <div class="slide__3__body">All about what happens on slide THREE is all that happens during reading this slide.</div>
      </section>
    </article>
  </div <div class="button__previous">previous</div>
</div>

```