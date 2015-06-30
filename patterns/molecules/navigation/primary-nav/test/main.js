var path = require('path'),
		yaml = require('js-yaml'),
		fs = require('fs'),
		should = require('should');

var patternYml = path.join(__dirname, '../pattern.yml');


describe('pattern-library-figure-image', function() {
  
  describe('files-exist', function() {
		var meta = yaml.safeLoad(fs.readFileSync(patternYml, 'utf8'));

	    if (meta.sass) {
				it('should contain sass file', function() {
			    should.exist(meta.sass);
				});
			}

	    if (meta.twig) {
				it('should contain a twig file', function() {
			    should.exist(meta.twig);
				});
			}

	    if (meta.script) {
				it('should contain scripts', function() {
			    should.exist(meta.script);
				});
			}
			
	    if (meta.includes) {
				it('should include an existing pattern', function() {
			    should.exist(path.join(meta.includes[0],'pattern.yml'));
				});
			}
	});
});