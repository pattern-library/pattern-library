# Pattern Library: Basic HTML Patterns

This repository is a set of html patterns following the [pattern-library](http://pattern-library.github.io) organizational model.

This pattern library is a collection of base html elements and common html patterns. Using this as a dependency of your project's pattern library will give you all the basic html elements for styling inside of Pattern Lab.

## Requirements

* [Composer](https://getcomposer.org)
* [NodeJS](https://nodejs.org)
* [Yeoman](http://yeoman.io)

## Installation

### To install as a stand-alone library:

* Clone this repo
* Install NPM dependencies
  `npm install`
* Install an instance of Pattern Lab, then import this Pattern Library and local site files into Pattern Lab
  `gulp build`
* Run server, watch files
  `gulp serve`

### To install as a dependency of an existing library or project

* Import to your library via NPM
  `npm install pattern-library --save`

## Import only specific patterns into Pattern Lab

Importing files from your pattern library into Pattern Lab is done with the [Pattern Importer](https://github.com/pattern-library/pattern-importer). Specifically, it uses the [gulp task included with the Pattern Importer](https://github.com/pattern-library/pattern-importer/tree/master/gulp). This gulp task uses a configuration to decide *where* to import your patterns, and *which* patterns to import.

To use only *a portion* of this pattern library, you need to change the configuration file `./config.yml`. You will be changing the settings for the `pattern-importer` gulp task. The default for this task inside of `./config.yml` is this:

```
...
  patternImporter:
    localPatterns:
      config:
        htmlTemplateDest: '{{ fileTypes.patterns.prototyperDestDir }}'
        stylesDest: '{{ fileTypes.sass.prototyperSrcDir }}/local'
        scriptsDest: '{{ fileTypes.js.prototyperSrcDir }}/local'
        convertCategoryTitlesDataFile: './lib/data/pattern-lab-categories.yml'
      taskName: 'patterns-import-local'
      src:
        - './patterns/**/pattern.yml'
...
```

You will be changing the `src` config.

## Import specific patterns: One pattern

You want to import only one pattern, *blockquote*:

```
./patterns/atoms/text/blockquote
```

Your local patterns source configuration will then be:

```
...
      src:
        - './patterns/atoms/text/blockquote/pattern.yml'
...
```

## Import specific patterns: One Subcategory

So, let's say you wanted to only import html patterns that are in the *lists* subcategory of *atoms*:

```
./patterns/atoms/lists
```

Your local patterns source configuration will then be:

```
...
      src:
        - './patterns/atoms/lists/**/pattern.yml'
...
```

## Import specific patterns: Two Subcategories, ignore one pattern

The *src* option is an array and it can also contain the option to ignore files and directories as well. So, let's say you wanted to only import html patterns that are in the *lists* and *text* subcategories of *atoms*, but not include the *blockquote* pattern. Your local patterns source configuration will then be:

```
...
      src:
        - '!./patterns/atoms/text/blockquote/pattern.yml'
        - './patterns/atoms/lists/**/pattern.yml'
        - './patterns/atoms/text/**/pattern.yml'
...
```

