# pattern-library
A repository of HTML Patterns and their supporting files.


## Single-Pattern Folder Contents

These are the files which may be in a single HTML pattern's directory. This imaginary pattern is called `example-pattern`.

* ![folder](http://scottnath.github.io/atlas/images/doctree-icons/folder-open.gif) example-pattern/

	* ![file](http://scottnath.github.io/atlas/images/doctree-icons/document.png) pattern.yml
	* ![file](http://scottnath.github.io/atlas/images/doctree-icons/document.png) example-pattern.html
	* ![file](http://scottnath.github.io/atlas/images/doctree-icons/document.png) example-pattern.js
	* ![file](http://scottnath.github.io/atlas/images/doctree-icons/document.png) bower.json
	* ![file](http://scottnath.github.io/atlas/images/doctree-icons/document.png) README.md
	* ![folder](http://scottnath.github.io/atlas/images/doctree-icons/folder-open.gif) sass/
		* ![file](http://scottnath.github.io/atlas/images/doctree-icons/document.png) example-pattern.scss
		* ![folder](http://scottnath.github.io/atlas/images/doctree-icons/folder-open.gif) partials/
			* ![file](http://scottnath.github.io/atlas/images/doctree-icons/document.png) _extends.scss
			* ![file](http://scottnath.github.io/atlas/images/doctree-icons/document.png) _mixins.scss
			* ![file](http://scottnath.github.io/atlas/images/doctree-icons/document.png) _variables.scss
	* ![folder](http://scottnath.github.io/atlas/images/doctree-icons/folder-open.gif) test/
		* ![file](http://scottnath.github.io/atlas/images/doctree-icons/document.png) main.js


## Single-Pattern YAML File (required)

Each single pattern folder *must* contain a `pattern.yml` file. 

This file contains paths to find supporting files, meta data, and dummy data to populate the pattern for testing purposes.

```
name: Figure Image
description: A `figure` element with `figcaption` and an included `img` element from /base/img/img.html.
html: ./figure-image.html
sass: ./sass/_figure-image.scss
script: ./figure-image.js
category: components
options:
	foo: bar
data:
  figure:
    img:
      src: http://placehold.it/350x150&text=figure--image
      alt: Aenean commodo ligula eget dolor. Aenean massa.
      class: figure--image
    caption:
      text: Aenean commodo ligula eget dolor. Aenean massa. Cumo sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
    class: base--figure-image
```

## Single-Pattern HTML File

Each single pattern folder *must* contain a `[pattern-name].html` (example-pattern.html) file. These files should *not* contain actual text, data, images, etc. Instead, patterns use curly-braces as data placeholders.

## Other Possible Single-Pattern Files

### bower.json

Typical bower.json file. Will contain dependencies for other patterns/scripts/etc as needed

### README.md

Should include usage examples

### PATTERN.html

A twig/swig-style template containing html, data-placeholders with curly braces, import-code for other patterns

### PATTERN.js

A pattern's js file. 

### ./sass/PATTERN.scss

A SASS file. **NOTE:** do not prefix this file with an underscore or it will be ignored when import-conversion happens.

Following the [North Standards](https://github.com/north/north#css-naming-conventions), this file includes imported files for SASS partials:

* ./sass/partials/_extends.scss
* ./sass/partials/_mixins.scss
* ./sass/partials/_variables.scss

### ./test/main.js

A unit-test file for the pattern.

## Contributing

Submit a pull request to this repo. Do not submit pull requests to the subtree, read-only versions of these patterns.