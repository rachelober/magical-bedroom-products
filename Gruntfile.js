module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks("grunt-browser-sync");
  grunt.loadNpmTasks('grunt-contrib-symlink');
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-haml2html");
  grunt.loadNpmTasks('grunt-nunjucks');
  grunt.loadNpmTasks("grunt-symdiff");
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-sass-lint');
  grunt.loadNpmTasks('grunt-sass');

  var symdiffCSS = require('symdiff-css'),
      symdiffHTML = require('symdiff-html');

  grunt.initConfig({
    // Before generating new files, clean up!
    clean: {
      build: ["./build"],
      tests: ["./tmp"]
    },

    // Watch task config
    watch: {
      js: {
        files: "assets/javascripts/**/*.js",
        tasks: ["jsBuild"]
      },
      sass: {
        files: "assets/stylesheets/**/*.scss",
        tasks: ["sass"]
      },
      haml: {
        files: "assets/**/*.haml",
        tasks: ["haml"]
      },
      nunjucks: {
        files: "assets/views/*",
        tasks: ["nunjucks"]
      }
    },

    // Haml task config
    haml: {
      dev: {
        files: {
          // destination            // source file
          "build/index.html":       "assets/index.haml",
        }
      }
    },

    // Sass task config
    sass: {
      dev: {
        // Takes every file that ends with .scss from the scss
        // directory and compile them into the css directory.
        // Also changes the extension from .scss into .css.
        // Note: file name that begins with _ are ignored automatically
        files: [{
          expand: true,
          cwd: 'assets/stylesheets/',
          src: ['**/*.scss'],
          dest: 'build/stylesheets/',
          ext: '.css'
        }]
      },
      options: {
        sourceMap: true,
        outputStyle: 'expanded',
        includePaths: [
          './assets/styesheets/',
          './bower_components/sass-flex-mixin/',
        ]
      }
    },

    nunjucks: {
      precompile: {
        baseDir: 'assets/views/',
        src: 'assetsviews/*',
        dest: 'build/javascripts/templates.js',
        options: {
          env: require('./nunjucks-environment'),
          name: function(filename) {
            return 'foo/' + filename;
          }
        }
      }
    },

    // Used to put version at top of javascript build
    pkg: grunt.file.readJSON('package.json'),
    // Javascript build task
    // We use jQuery first and then build whatever comes next
    concat: {
      dev: {
        src: ['assets/javascripts/jquery-2.1.1.min.js', 'assets/javascripts/*'],
        dest: 'build/javascripts/build.js',
      }
    },

    // Grunt-sass-lint
    sasslint: {
      options: {
        configFile: '.sass-lint.yml'
      },
      target: ['assets/stylesheets/**/*.scss']
    },

    // Using the BrowserSync Server for your static .html files.
    browserSync: {
      default_options: {
        bsFiles: {
          src: [
            "build/index.html",
            "build/javascripts/**/*",
            "build/stylesheets/**/*",
          ]
        },
        options: {
          browser: ["google chrome"],
          port: 3001,
          watchTask: true,
          server: {
            baseDir: [
              "./build",
              "./assets",
            ],
          }
        }
      }
    },

    symlink: {
      options: {
        // Enable overwrite to delete symlinks before recreating them
        overwrite: false,
        // Enable force to overwrite symlinks outside the current working directory
        force: false
      },
    },

    // Configuration to be run (and then tested).
    symdiff: {
      core: {
        src: [
          "build/stylesheets/*.css",
          "build/html/*.html",
        ]
      },
      options: {
        css: [symdiffCSS],
        templates: [symdiffHTML]
      }
    },

  });

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask("test", ["symdiff"]);

  // Used to set up your environment for the first time.
  grunt.registerTask("setup", ["clean", "sass", "haml", "concat", "symlink"]);

  // The default task will set up the evironment by compiling assets,
  // setting up browserSync, and then watching files for changes.
  grunt.registerTask("default", ["setup", "browserSync", "watch"]);
};
