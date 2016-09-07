module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-symlink');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nunjucks-render');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-symdiff');
  grunt.loadNpmTasks('grunt-sass-lint');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-serve');

  var symdiffCSS = require('symdiff-css'),
      symdiffHTML = require('symdiff-html');

  grunt.initConfig({
    // Before generating new files, clean up!
    clean: {
      build: ['./build'],
      tests: ['./tmp']
    },

    // Watch task config
    watch: {
      js: {
        files: 'assets/javascripts/**/*.js',
        tasks: ['browserify']
      },
      sass: {
        files: 'assets/stylesheets/**/*.scss',
        tasks: ['sass']
      },
      nunjucks_render: {
        files: 'assets/views/*',
        tasks: ['nunjucks_render']
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
        includePaths: [
          './assets/styesheets/',
        ],
        outputStyle: 'compressed',
        sourceMap: true
      }
    },

    // Use Nunjucks for templating
    nunjucks_render: {
      dev: {
        files: [{
          expand: true,
          cwd: 'assets/views/',
          src: ['index.html'],
          dest: 'build/'
        }]
      },
      options: {
        data: 'data/db.json'
      }
    },

    // Javascript build task
    browserify: {
      dist: {
        src: [
          'assets/javascripts/main.js'
        ],
        dest: 'build/javascripts/main.js',
        options: {
          transform: ['nunjucksify', 'babelify']
        }
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
            'build/index.html',
            'build/javascripts/**/*',
            'build/stylesheets/**/*',
          ]
        },
        options: {
          browser: ['google chrome'],
          port: 3001,
          watchTask: true,
          server: {
            baseDir: [
              './build',
              './assets',
            ],
          }
        }
      }
    },

    postcss: {
      options: {
        map: {
            inline: false,
            annotation: 'build/stylesheets/'
        },

        processors: [
          require('pixrem')(),
          require('autoprefixer')({browsers: 'last 2 versions'}),
          require('cssnano')()
        ]
      },
      dist: {
        src: 'build/stylesheets/*.css'
      }
    },

    symlink: {
      options: {
        // Enable overwrite to delete symlinks before recreating them
        overwrite: false,
        // Enable force to overwrite symlinks outside the current working directory
        force: false
      },
      explicit: {
        src:    'assets/javascripts/nunjucks.min.js',
        dest:   'build/javascripts/nunjucks.min.js'
      },
      expanded: {
        files: [{
          expand: true,
          overwrite: true,
          cwd: 'assets/views/',
          src: ['**/*.html'],
          dest: 'build/views'
        }]
      }
    },

    // Configuration to be run (and then tested).
    symdiff: {
      core: {
        src: [
          'build/stylesheets/*.css',
          'build/views/*.html',
        ]
      },
      options: {
        css: [symdiffCSS],
        templates: [symdiffHTML]
      }
    },

    // Run a local server
    serve: {
      options: {
        path: 'build',
        port: 9000
      }
    }
  });

  // Whenever the 'test' task is run, first clean the 'tmp' dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'sasslint']);

  // Used to set up your environment for the first time.
  grunt.registerTask('setup', ['clean', 'sass', 'postcss', 'nunjucks_render', 'browserify', 'symlink']);

  // Set up the project and then serve the website from
  // http://localhost:9000/index.html
  grunt.registerTask('server', ['setup', 'serve']);

  // The default task will set up the evironment by compiling assets,
  // setting up browserSync, and then watching files for changes.
  grunt.registerTask('default', ['setup', 'browserSync', 'watch']);};
