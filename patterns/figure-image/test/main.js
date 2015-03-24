/*

include patterns.yml
parse patterns to get file names
* create js to read, return yml data
go through each one and decide if file is there

*/
var path = require('path'),
		yaml = require('js-yaml'),
		fs = require('fs'),
		should = require('should');

var patternYml = path.join(__dirname, '../pattern.yml');


describe('pattern-figure-image', function() {
  
  describe('files-exist', function() {
		var meta = yaml.safeLoad(fs.readFileSync(patternYml, 'utf8'));

	    if (meta.styles) {
				it('should contain style sheets', function() {
			    should.exist(meta.styles);
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