'use strict';

var browserSync = require('browser-sync').create(),
  changed = require('gulp-changed'),
  cp = require('child_process'),
  del = require('del'),
  exec = require('child_process').exec,
  fs = require('fs'),
  gulp = require('gulp'),
  path = require('path'),
  patternUtils = require('pattern-library-utilities'),
  patternImporter = require('pattern-importer'),
  print = require('gulp-print'),
  rename = require('gulp-rename'),
  replace = require('gulp-replace'),
  runSequence = require('run-sequence'),
  sass = require('gulp-sass'),
  taskListing = require('gulp-task-listing'),
  watch = require('gulp-watch');

/******************************************
CONFIGURATION
*/
// configuration file must be YAML
var configurationFile = './config.yml';
// attempt to synchronously open the yaml configuration file
try {
  // open the configuration file
  var configYml = fs.readFileSync(configurationFile, {encoding:'utf8'});
} catch (e) {
  console.log('Configuration Load Error:', e);
}
// convert configuration file to JS Object
var configObject = patternUtils.convertYamlToObject(configYml);
// regex to search for variables
var variableRegex = /{{.*}}/g;
// convert variables
var configuration = patternUtils.convertRecursiveJsonVariables(configObject, variableRegex);


/******************************************
NPM-BASED GULP TASKS
These gulp tasks are imported into gulp by referencing their javascript module.
*/

/**
 * Pattern Importer
 *
 * Searches for all `pattern.yml` files in the source directory, parses them, and uses the data to write or copy the pattern's files to the appropriate destination locations.
 *
 * @example
 * // import local project's patterns into prototyper
 * `gulp patterns-import-local`
 *
 * @param {Object} gulp including file should in inject the gulp module
 * @param {Object} projectOptions  object of options
 *
 * @requires NPM:pattern-importer
 */

// array will contain all pattern import task-names
var patternImportTasks = [];

// NPM-Imported Pattern Libraries
if(configuration.npmPatternRepos){
  configuration.npmPatternRepos.forEach(function (repo) {
    var npmImporterOptions = {
      config: {
        htmlTemplateDest: configuration.fileTypes.patterns.prototyperDestDir,
        stylesDest: configuration.fileTypes.sass.prototyperSrcDir + '/npm/' + repo.name,
        scriptsDest: configuration.fileTypes.js.prototyperSrcDir + '/npm/' + repo.name
      },
      taskName: 'patterns-import-npm-' + repo.name,
      src: ['./node_modules/' + repo.repoDir + '/patterns/**/pattern.yml']
    };
    patternImportTasks.push(npmImporterOptions.taskName);
    patternImporter.gulpImportPatterns(gulp,npmImporterOptions);
  });
}

// Project pattern library
patternImportTasks.push(configuration.gulpTasks.patternImporter.localPatterns.taskName);
patternImporter.gulpImportPatterns(gulp,configuration.gulpTasks.patternImporter.localPatterns);

/**
Import from all pattern libraries
**/
gulp.task('patterns-import-all', function(){
  runSequence.apply(null, patternImportTasks);
});

/**
 * Glob and Inject JS
 *
 * Separate glob and inject tasks for pattern libraries' and site file's javascript directories.
 *
 * @example
 * // import site-files
 * `gulp glob-inject-js-sitefiles`
 * // writes `<script>` statements into the target file for each .js file in ./PATH/js/site-files/
 *
 * @param {Object} gulp including Gulp object injects the gulp module
 * @param {Object} globbingOptions  object of options
 *
 * @requires NPM:pattern-library-utilities
 * @requires NPM:run-sequence
 */

// array will contain all javascript glob/inject task-names
var javascriptGlobTasks = [];

// NPM-Imported Pattern Libraries
if(configuration.npmPatternRepos){
  configuration.npmPatternRepos.forEach(function (repo) {
    var globbingOptionsNpm = {
      config: {
        starttag: '<!-- inject:npm:' + repo.name + ':{{ext}} -->',
        endtag: '<!-- endinjectnpm' + repo.name + ' -->',
        relative: false,
        ignorePath: '/patternlab/source'
      },
      files: [ // relative paths to files to be globbed
        configuration.fileTypes.js.prototyperSrcDir + '/npm/' + repo.name + '/*.js',
        configuration.fileTypes.js.prototyperSrcDir + '/npm/' + repo.name + '/**/*.js'
      ],
      src: configuration.gulpTasks.fileGlobInject.js.srcFile, // source file with types of files to be glob-injected
      dest: configuration.gulpTasks.fileGlobInject.js.destDir, // destination directory where we'll write our ammended source file
      taskName: 'glob-inject-js-npm-' + repo.name,
      dependencies: []
    };
    javascriptGlobTasks.push(globbingOptionsNpm.taskName);
    patternUtils.gulpFileGlobInject(gulp,globbingOptionsNpm);
  });
}

// site-files
var globbingOptionsSiteFiles = {
  config: {
    starttag: '<!-- inject:sitefiles:{{ext}} -->',
    endtag: '<!-- endinjectsite -->',
    relative: false,
    ignorePath: '/patternlab/source'
  },
  files: [ // relative paths to files to be globbed
    configuration.fileTypes.js.prototyperSrcDir + '/site-files/*.js',
    configuration.fileTypes.js.prototyperSrcDir + '/site-files/**/*.js'
  ],
  src: configuration.gulpTasks.fileGlobInject.js.srcFile, // source file with types of files to be glob-injected
  dest: configuration.gulpTasks.fileGlobInject.js.destDir, // destination directory where we'll write our ammended source file
  taskName: 'glob-inject-js-sitefiles',
  dependencies: ['site-files-import-js']
};
javascriptGlobTasks.push(globbingOptionsSiteFiles.taskName);
patternUtils.gulpFileGlobInject(gulp,globbingOptionsSiteFiles);

// local-files
var globbingOptionsLocal = {
  config: {
    starttag: '<!-- inject:local:{{ext}} -->',
    endtag: '<!-- endinjectlocal -->',
    relative: false,
    ignorePath: '/patternlab/source'
  },
  files: [ // relative paths to files to be globbed
    configuration.fileTypes.js.prototyperSrcDir + '/local/*.js',
    configuration.fileTypes.js.prototyperSrcDir + '/local/**/*.js'
  ],
  src: configuration.gulpTasks.fileGlobInject.js.srcFile, // source file with types of files to be glob-injected
  dest: configuration.gulpTasks.fileGlobInject.js.destDir, // destination directory where we'll write our ammended source file
  taskName: 'glob-inject-js-local',
  dependencies: []
};
javascriptGlobTasks.push(globbingOptionsLocal.taskName);
patternUtils.gulpFileGlobInject(gulp,globbingOptionsLocal);

// glob all javascript files at once
gulp.task('glob-inject-js-all', function(){
  runSequence.apply(null, javascriptGlobTasks);
});

/**
 * Glob and Inject SASS
 *
 * Separate glob and inject tasks for pattern libraries' and site file's SASS (.scss) directories.
 *
 * @example
 * // import site-files
 * `gulp glob-inject-scss-sitefiles`
 * // writes @import statements in the main style.scss file for each .scss file in ./PATH/css/scss/site-files/
 *
 * @param {Object} gulp including file should in inject the gulp module
 * @param {Object} projectOptions  object of options
 *
 * @requires NPM:pattern-library-utilities
 */
// array will contain all javascript glob/inject task-names
var sassGlobTasks = [];

// NPM-Imported Pattern Libraries
if(configuration.npmPatternRepos){
  configuration.npmPatternRepos.forEach(function (repo) {
    var globbingOptionsNpm = {
      config: {
        starttag: '// inject:npm:' + repo.name + ':scss',
        endtag: '// endinjectnpm' + repo.name
      },
      files: [ // relative paths to files to be globbed
        configuration.fileTypes.sass.prototyperSrcDir + '/npm/' + repo.name + '/*.scss',
        configuration.fileTypes.sass.prototyperSrcDir + '/npm/' + repo.name + '/**/*.scss'
      ],
      src: configuration.gulpTasks.fileGlobInject.sass.srcFile, // source file with types of files to be glob-injected
      dest: configuration.gulpTasks.fileGlobInject.sass.destDir, // destination directory where we'll write our ammended source file
      taskName: 'glob-inject-sass-npm-' + repo.name,
      dependencies: []
    };
    sassGlobTasks.push(globbingOptionsNpm.taskName);
    patternUtils.gulpScssGlobInject(gulp,globbingOptionsNpm);
  });
}

// site-files
var globbingOptionsSiteFiles = {
  config: {
    starttag: '// inject:sitefiles:scss',
    endtag: '// endinjectsite'
  },
  files: [ // relative paths to files to be globbed
    configuration.fileTypes.sass.prototyperSrcDir + '/site-files/*.scss',
    configuration.fileTypes.sass.prototyperSrcDir + '/site-files/**/*.scss'
  ],
  src: configuration.gulpTasks.fileGlobInject.sass.srcFile, // source file with types of files to be glob-injected
  dest: configuration.gulpTasks.fileGlobInject.sass.destDir, // destination directory where we'll write our ammended source file
  taskName: 'glob-inject-sass-sitefiles',
  dependencies: ['site-files-import-sass']
};
sassGlobTasks.push(globbingOptionsSiteFiles.taskName);
patternUtils.gulpScssGlobInject(gulp,globbingOptionsSiteFiles);

// local pattern library
var globbingOptionsLocal = {
  config: {
    starttag: '// inject:local:scss',
    endtag: '// endinjectlocal'
  },
  files: [ // relative paths to files to be globbed
    configuration.fileTypes.sass.prototyperSrcDir + '/local/*.scss',
    configuration.fileTypes.sass.prototyperSrcDir + '/local/**/*.scss'
  ],
  src: configuration.gulpTasks.fileGlobInject.sass.srcFile, // source file with types of files to be glob-injected
  dest: configuration.gulpTasks.fileGlobInject.sass.destDir, // destination directory where we'll write our ammended source file
  taskName: 'glob-inject-sass-local',
  dependencies: []
};
sassGlobTasks.push(globbingOptionsLocal.taskName);
patternUtils.gulpScssGlobInject(gulp,globbingOptionsLocal);

// glob all javascript files at once
gulp.task('glob-inject-sass-all', function(){
  runSequence.apply(null, sassGlobTasks);
});

/**
 * GitHub Pages deployment
 *
 * Uses ghPages task to deploy prototyper's public folder to gh-pages. Does a url-replace task before and after
 *
 * @requires NPM:pattern-library-utilities
 */
// set up the gh-pages gulp task from pattern-library-utilities
patternUtils.gulpGhPages(gulp,{});
// gh-pages full deployment gulp task
gulp.task('ghPagesDeploy', function(){

  runSequence(
    'replace-url-ghpages',
    'ghPages',
    'replace-url-local'
  );

});

/******************************************
PATTERN LAB GULP TASKS
*/

/**
Clean the PatternLab Source Folder
*/
gulp.task('patternlab-clean', function (done) {

  del(['patternlab/source/_patterns'], function (err, paths) {
      console.log('Deleted files/folders:\n', paths.join('\n'));
      done();
  });
});

/**
 * Patternlab-install task - installs Patternlab via composer if ./patternlab folder not exists.
 *
 * @requires fs
 * @requires child_process.exec
 */
gulp.task('patternlab-install', function (done) {

  fs.exists(configuration.patternlab.dest, function (exists) {
    if (!exists) {

      // composer create-project pattern-lab/edition-twig-standard has promts,
      // passing answers to command in advance to prevent installation blocking.
      var command = "(echo '1'\
      sleep 1\
      echo 'r'\
      sleep 1 ) | composer create-project pattern-lab/edition-twig-standard " + configuration.patternlab.dest + ' ' + configuration.patternlab.version;

      console.log('Installing Patternlab...');
      exec(command, function(error, stdout, stderr) {
        // print buffers
        console.log(stdout, stderr);
        if (error !== null) {
          console.error(error);
        }
        done();
      });
    } else {
      console.log('Patternlab is already installed, skipping installation...');
      done();
    }
  })
});

/**
Copy templates into prototyper
*/
// array will contain all template copy task-names
var copyTemplateTasks = [];

if(configuration.templates){
  configuration.templates.forEach(function (template) {
    var copyTemplateTask = 'tpl-copy-' + template.name;
    copyTemplateTasks.push(copyTemplateTask);

    gulp.task(copyTemplateTask, function (done) {

      gulp.src(template.src)
        .pipe(rename(template.destFile))
        .pipe(gulp.dest(template.destDir))
        .on('end',done);

    });

  });
}
// copy all templates in parallel
gulp.task('tpl-copy-all', copyTemplateTasks);

/**
Generate the Patternlab Public Folder from the Source Folder
TODO: error handling
*/
gulp.task('patternlab-build-public', function (done) {

  return cp.spawn('php', ['patternlab/core/console', '--generate'])
      .on('close', done);
});

/******************************************
PATTERN LIBRARY GULP TASKS
*/


/**
 * SASS Compilation
 *
 * Uses gulp-sass (libsass) to compile scss
 *
 * @requires NPM:gulp-sass
 */
gulp.task('sass', configuration.gulpTasks.gulpSass.dependencies, function () {
  return gulp.src(configuration.fileTypes.sass.prototyperSrc) // primary sass file in SOURCE
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(configuration.fileTypes.sass.prototyperDestDir)); // directory for compiled/processed .css file
});

/**
Site Files Importing
import files from ./site-files into ./patternlab/sources
*/

// import sitewide javascript
gulp.task('site-files-import-js', function(){

  return gulp.src(configuration.fileTypes.js.sitefilesSrc)
    .pipe(changed(configuration.fileTypes.js.prototyperSrcDir + '/site-files'))
    .pipe(print())
    .pipe(gulp.dest(configuration.fileTypes.js.prototyperSrcDir + '/site-files'));

});

// import sitewide sass
gulp.task('site-files-import-sass', function(){

  return gulp.src(configuration.fileTypes.sass.sitefilesSrc)
    .pipe(changed(configuration.fileTypes.sass.sitefilesDest))
    .pipe(print())
    .pipe(gulp.dest(configuration.fileTypes.sass.sitefilesDest));

});

// import sitewide css
gulp.task('site-files-import-css', function(){

  return gulp.src(configuration.fileTypes.css.sitefilesSrc)
    .pipe(changed(configuration.fileTypes.css.sitefilesDest))
    .pipe(print())
    .pipe(gulp.dest(configuration.fileTypes.css.sitefilesDest));

});

// import sitewide fonts
gulp.task('site-files-import-fonts', function(){

  return gulp.src(configuration.fileTypes.fonts.sitefilesSrc)
    .pipe(changed(configuration.fileTypes.fonts.sitefilesDest))
    .pipe(print())
    .pipe(gulp.dest(configuration.fileTypes.fonts.sitefilesDest));

});

// import sitewide images
gulp.task('site-files-import-images', function(){

  return gulp.src(configuration.fileTypes.images.sitefilesSrc)
    .pipe(changed(configuration.fileTypes.images.sitefilesDest))
    .pipe(print())
    .pipe(gulp.dest(configuration.fileTypes.images.sitefilesDest));

});

// import all sitewide files
gulp.task('site-files-import-all', ['site-files-import-js', 'site-files-import-sass', 'site-files-import-css', 'site-files-import-fonts', 'site-files-import-images']);

/**
BROWSER SYNC
*/
gulp.task('browsersync', function(){
  // .init starts the server
  browserSync.init({
    server: {
      baseDir: './patternlab/public'
    }
  });

});

/**
Replace content for gh-pages deployment
**/

/**
 * Gulp task that replaces some urls for gh-pages deployment
 *
 * @requires NPM:gulp-replace
 */
// change urls to match final gh-pages url prefix
gulp.task('replace-url-ghpages', function(){
  gulp.src(configuration.gulpTasks.replaceUrl.src, { base: "./" })
    .pipe(replace('"baseurl": ""', '"baseurl": "' + configuration.gulpTasks.replaceUrl.ghPagesPrefix + '"'))
    .pipe(gulp.dest('.'));
});
// change urls to remove final gh-pages url prefix
gulp.task('replace-url-local', function(){
  gulp.src(configuration.gulpTasks.replaceUrl.src, { base: "./" })
    .pipe(replace('"baseurl": "' + configuration.gulpTasks.replaceUrl.ghPagesPrefix + '"', '"baseurl": ""'))
    .pipe(gulp.dest('.'));
});

/**
Import Single Pattern
TODO: fix bug on SINGLE pattern import on new patterns
**/
function importSinglePattern (file) {

  // get the directory of the local pattern
  // var patternDir = path.dirname(file);
  // // change the source to THIS pattern's pattern.yml file
  // configuration.gulpTasks.patternImporter.localPatterns.src = [path.join(patternDir,configuration.dataFileName)];
  // // temporarily set up our patterns-import-local gulp task to just import THIS pattern
  // patternImporter.gulpImportPatterns(gulp,configuration.gulpTasks.patternImporter.localPatterns);
  // go through the full import process
  runSequence(
    'patterns-import-local',
    'glob-inject-sass-local',
    'glob-inject-js-local',
    'sass',
    'patternlab-build-public',
    function(){
      browserSync.reload();
      console.log('Local pattern file:/n' + file + '/n triggered a watch event. The full Pattern has been re-imported into ' + configuration.prototyperDir);
    }
  );
}

/**
Complete import into patternlab with a build
**/
gulp.task('build', function(callback){
  runSequence(
    'patternlab-install',
    'patternlab-clean',
    'tpl-copy-all',
    'patterns-import-all',
    'site-files-import-all',
    function(){
      console.log('Import of files into patternlab complete');
      callback();
    }
  );
});

/**
Complete import into patternlab with a build
**/
gulp.task('serve', function(callback){
  runSequence(
    ['glob-inject-sass-all','glob-inject-js-all'],
    'sass',
    'patternlab-build-public',
    'browsersync',
    'watch'
  );
});

/**
Watch Tasks
**/
gulp.task('watch', function() {

  /*
    local Pattern Library watch
    TODO: check for deletion and create pattern removal process
  */
  var localPatternsWatcher = watch('./patterns/**/*');
  localPatternsWatcher.on('change', function(event) {
    importSinglePattern(event.path);
  });
  localPatternsWatcher.on('add', function(event) {
    importSinglePattern(event.path);
  });

  /*
    Site Files watch tasks
  */
  // Site Files CSS
  watch(configuration.fileTypes.css.sitefilesSrc, function(){
    runSequence(
      'site-files-import-css',
      'patternlab-build-public',
      function(){
        browserSync.reload();
        console.log('Site-Files css file change.');
      }
    );
  });
  // Site Files Fonts
  watch(configuration.fileTypes.fonts.sitefilesSrc, function(){
    runSequence(
      'site-files-import-fonts',
      'patternlab-build-public',
      function(){
        browserSync.reload();
        console.log('Site-Files font file change.');
      }
    );
  });
  // Site Files Images
  watch(configuration.fileTypes.images.sitefilesSrc, function(){
    runSequence(
      'site-files-import-images',
      'patternlab-build-public',
      function(){
        browserSync.reload();
        console.log('Site-Files image file change.');
      }
    );
  });
  // Site Files JS
  watch(configuration.fileTypes.js.sitefilesSrc, function(){
    runSequence(
      'glob-inject-js-sitefiles',
      'patternlab-build-public',
      function(){
        browserSync.reload();
        console.log('Site-Files js file change.');
      }
    );
  });
  // Site Files SASS
  watch(configuration.fileTypes.sass.sitefilesSrc, function(){
    runSequence(
      'glob-inject-sass-local',
      'sass',
      'patternlab-build-public',
      function(){
        browserSync.reload();
        console.log('Site-Files scss file change.');
      }
    );
  });

  //watch('./patterns/**/*.js', ['patterns-import-local', 'glob-inject-scss-local', 'sass', 'patternlab-build-public', browserSync.reload]);

  // set a watch on each template file
  if(configuration.templates){
    configuration.templates.forEach(function (template) {
      watch(template.src, ['tpl-copy-' + template.name, 'patternlab-build-public', browserSync.reload]);
    });
  }
});

/**
 * Gulp task that lists out all available gulp tasks
 *
 * @requires NPM:gulp-task-listing
 */
gulp.task('help', taskListing.withFilters(/:/));

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['help']);
