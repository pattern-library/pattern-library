# Show

A (TV) show component with an `img`

## ClassNames

ClassNames follow the [BEM Methodology](https://css-tricks.com/bem-101/)

### show
`.show`

### figure element
`.show__figure`

### image element (inside figure element)
`.show__figure__image`

### body
`.show__body`

## default output

```
<article class="show">
  <figure class="show__figure">
    <img src="http://placehold.it/1920x1080&text=show--image" alt="Show image alternative text for the alt tag" class="show__figure__image show__image">
    <figcaption>Caption text for the show image which is a caption</figcaption>
  </figure>
  <h1 class="show__title">XYZ Showname</h1>
  <section class="show__body">
    This show goes through fascinating blah bespoke hella Marfa, narwhal twee cold-pressed pour-over. Bicycle rights Vice +1, Helvetica Shoreditch ethical street art banjo whatever ennui plaid try-hard food truck.
  </section>
</article>
```