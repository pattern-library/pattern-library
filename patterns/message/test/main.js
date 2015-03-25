var path = require('path'),
		yaml = require('js-yaml'),
		fs = require('fs'),
		should = require('should');

var patternYml = path.join(__dirname, '../pattern.yml');


describe('pattern-library-message', function() {
  
  describe('files-exist', function() {
		var meta = yaml.safeLoad(fs.readFileSync(patternYml, 'utf8'));

	    if (meta.css) {
				it('should contain css file', function() {
			    should.exist(meta.css);
				});
			}

	    if (meta.sass) {
				it('should contain a sass file', function() {
			    should.exist(meta.sass);
				});
			}

	    if (meta.script) {
				it('should contain scripts', function() {
			    should.exist(meta.script);
				});
			}
			
	    if (meta.html) {
				it('should contain an html pattern', function() {
			    should.exist(meta.html);
				});
			}
	});
});