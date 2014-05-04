/**
 * Using Grunt for PHP
 * https://chrsm.org/post/using-grunt-for-php/
 */
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    phplint: {
        options: {
            swapPath: '/tmp'
        },
        all: ['index.php']
    }
  });

  grunt.loadNpmTasks('grunt-phplint');
  grunt.registerTask('precommit', ['phplint:all']);
  grunt.registerTask('default', ['phplint:all']);
};