'use strict';

module.exports = function (grunt) {
  // Load grunt tasks automatically, when needed
  require('jit-grunt')(grunt, {
    express: 'grunt-express-server',
    useminPrepare: 'grunt-usemin',
    ngtemplates: 'grunt-angular-templates',
    cdnify: 'grunt-google-cdn',
    protractor: 'grunt-protractor-runner',
    buildcontrol: 'grunt-build-control'
  });

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  grunt.initConfig({
    // Project settings
    pkg: grunt.file.readJSON('package.json'),
    config: {
      // configurable paths
      client: require('./bower.json').appPath || 'client',
      dist: 'dist'
    },
    express: {
      options: {
        port: process.env.PORT || 9002
      },
      dev: {
        options: {
          script: 'server/app.js',
          debug: true,
          delay: 5
        }
      },
      prod: {
        options: {
          script: 'dist/server/app.js'
        }
      }
    },
    open:{
      server:{
        url: 'http://localhost:<%= express.options.port %>'
      }
    },
    watch: {
      injectJS: {
        files: [
          '<%= config.client %>/{app, components}/**/*.js',
          '!<%= config.client %>/{app,components}/**/*.spec.js',
          '!<%= config.client %>/{app,components}/**/*.mock.js',
          '<%= config.client %>/{app, components}/*.js',
        ],
        tasks: ['injector:scripts']
      },
      injectCss: {
        files: [
          '<%= config.client %>/{app,components}/**/*.css'
        ],
        tasks: ['injector:css']
      },
      injectSass: {
        files: [
          '<%= config.client %>/{app,components}/**/*.{scss,sass}'],
        tasks: ['injector:sass']
      },
      sass: {
        files: [
          '<%= config.client %>/{app,components}/**/*.{scss,sass}'],
        tasks: ['sass', 'autoprefixer']
      },
      jade: {
        files: [
          '<%= config.client %>/{app,components}/*',
          '<%= config.client %>/{app,components}/**/*.jade'],
        tasks: ['jade']
      },
      babel: {
        files: [
          '<%= config.client %>/{app,components}/**/*.js',
          '!<%= config.client %>/{app,components}/**/*.spec.js'
        ],
        tasks: ['babel']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        files: [
          '{.tmp,<%= config.client %>}/{app,components}/**/*.css',
          '{.tmp,<%= config.client %>}/{app,components}/**/*.html',

          '.tmp/{app,components}/**/*.js',

          '!{.tmp,<%= config.client %>}{app,components}/**/*.spec.js',
          '!{.tmp,<%= config.client %>}/{app,components}/**/*.mock.js',
          '<%= config.client %>/assets/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        options: {
          livereload: true
        }
      },
      express: {
        files: [
          'server/**/*.{js,json}'
        ],
        tasks: ['express:dev', 'wait'],
        options: {
          livereload: true,
          nospawn: true,
          delay: 5 //Without this option specified express won't be reloaded
        }
      }
    },

    jshint:{
      options: {
        jshintrc: '<%= config.client %>/.jshintrc',
        reporter: require('jshint-stylish')
      },
      server: {
        options: {
          jshintrc: 'server/.jshintrc'
        },
        src: [
          'server/**/*.js',
          '!server/**/*.spec.js'
        ]
      },
      serverTest: {
        options: {
          jshintrc: 'server/.jshintrc-spec'
        },
        src: ['server/**/*.spec.js']
      },
      all: [
        '<%= config.client %>/{app,components}/**/*.js',
        '!<%= config.client %>/{app,components}/**/*.spec.js',
        '!<%= config.client %>/{app,components}/**/*.mock.js'
      ],
      test: {
        src: [
          '<%= config.client %>/{app,components}/**/*.spec.js',
          '<%= config.client %>/{app,components}/**/*.mock.js'
        ]
      }
    },

    clean:{
      dist:{
        files:[{
          dot: true,
          src: [
            '.tmp',
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git*',
            '!<%= config.dist %>/.openshift'
          ]
        }]
      },
      server: '.tmp'
    },

    autoprefixer:{
      options:{
        browsers: ['last 1 version']
      },
      dist:{
        files: [{
          expand: true,
          cwd: '.tmp/',
          src: '{,*/}*.css',
          dest: '.tmp/'
        }]
      }
    },

    'node-inspector':{
      custom: {
        options: {
          'web-host': 'localhost'
        }
      }
    },

    nodemon: {
      debug: {
        script: 'server/app.js',
        options: {
          nodeArgs: ['--debug-brk'],
          env: {
            PORT: process.env.PORT || 9000
          },
          callback: function (nodemon) {
            nodemon.on('log', function (event) {
              console.log(event.colour);
            });

            // opens browser on initial server start
            nodemon.on('config:update', function () {
              setTimeout(function () {
                require('open')('http://localhost:8080/debug?port=5858');
              }, 500);
            });
          }
        }
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      target: {
        src: '<%= config.client %>/index.html',
        ignorePath: '<%= config.client %>/',
        exclude: [/bootstrap-sass-official/, /bootstrap.js/, '/json3/', '/es5-shim/', /bootstrap.css/, /font-awesome.css/ ]
      },
      app: {
        src: ['<%= config.client %>/index.html'],
        ignorePath:  /\.\.\//
      }
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= config.dist %>/public/{,*/}*.js',
            '<%= config.dist %>/public/{,*/}*.css',
            '<%= config.dist %>/public/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= config.dist %>/public/assets/fonts/*'
          ]
        }
      }
    },

    useminPrepare: {
      html: ['<%= config.client %>/index.html'],
      options: {
        dest: '<%= config.dist %>/public'
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.client %>/assets/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= config.dist %>/public/assets/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.client %>/assets/images',
          src: '{,*/}*.svg',
          dest: '<%= config.dist %>/public/assets/images'
        }]
      }
    },

    // Allow the use of non-minsafe AngularJS files. Automatically makes it
    // minsafe compatible so Uglify does not destroy the ng references
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat',
          src: '**/*.js',
          dest: '.tmp/concat'
        }]
      }
    },

    // Package all the html partials into a single javascript payload
    ngtemplates: {
      options: {
        // This should be the name of your apps angular module
        module: 'gameLoaderApp',
        htmlmin: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        },
        usemin: 'app/app.js'
      },
      main: {
        cwd: '<%= config.client %>',
        src: ['{app,components}/**/*.html'],
        dest: '.tmp/templates.js'
      },
      tmp: {
        cwd: '.tmp',
        src: ['{app,components}/**/*.html'],
        dest: '.tmp/tmp-templates.js'
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= config.dist %>/public/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.client %>',
          dest: '<%= config.dist %>/public',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'bower_components/**/*',
            'assets/images/{,*/}*.{webp}',
            'assets/fonts/**/*',
            'index.html'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= config.dist %>/public/assets/images',
          src: ['generated/*']
        }, {
          expand: true,
          dest: '<%= config.dist %>',
          src: [
            'package.json',
            'server/**/*'
          ]
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= config.client %>',
        dest: '.tmp/',
        src: ['{app,components}/**/*.css']
      }
    },

    concurrent: {
      server: [
        'babel',
        'jade',
        'sass',
      ],
      test: [
        'babel',
        'jade',
        'sass',
      ],
      debug: {
        tasks: [
          'nodemon',
          'node-inspector'
        ],
        options: {
          logConcurrentOutput: true
        }
      },
      dist: [
        'babel',
        'jade',
        'sass',
        'imagemin',
        'svgmin'
      ]
    },

    // Compiles Jade to html
    jade: {
      compile: {
        options: {
          data: {
            debug: false
          }
        },
        files: [{
          expand: true,
          cwd: '<%= config.client %>',
          src: [
            '{app,components}/**/*.jade'
          ],
          dest: '.tmp',
          ext: '.html'
        }]
      }
    },

    // Compiles ES6 to JavaScript using Babel
    babel: {
      options: {
        sourceMap: true
      },
      server: {
        files: [{
          expand: true,
          cwd: 'client',
          src: [
            '{app,components}/**/*.js',
            '!{app,components}/**/*.spec.js'
          ],
          dest: '.tmp'
        }]
      }
    },

    sass: {
      server: {
        options: {
          loadPath: [
            '<%= config.client %>/bower_components',
            '<%= config.client %>/app',
            '<%= config.client %>/components'
          ],
          compass: false
        },
        files: {
          '.tmp/app/app.css' : '<%= config.client %>/app/app.scss'
        }
      }
    },

    injector: {
      options: {

      },
      // Inject application script files into index.html (doesn't include bower)
      scripts: {
        options: {
          transform: function(filePath) {
            filePath = filePath.replace('/client/', '');
            filePath = filePath.replace('/.tmp/', '');
            return '<script src="' + filePath + '"></script>';
          },
          starttag: '<!-- injector:js -->',
          endtag: '<!-- endinjector -->'
        },
        files: {
          '<%= config.client %>/index.html': [
               [

                 '.tmp/{app,components}/**/*.js',
                 '!{.tmp,<%= config.client %>}/app/app.js',
                 '!{.tmp,<%= config.client %>}/{app,components}/**/*.spec.js',
                 '!{.tmp,<%= config.client %>}/{app,components}/**/*.mock.js'
               ]
            ]
        }
      },

      // Inject component scss into app.scss
      sass: {
        options: {
          transform: function(filePath) {
            filePath = filePath.replace('/client/app/', '');
            filePath = filePath.replace('/client/components/', '');
            return '@import \'' + filePath + '\';';
          },
          starttag: '// injector',
          endtag: '// endinjector'
        },
        files: {
          '<%= config.client %>/app/app.scss': [
            '<%= config.client %>/{app,components}/**/*.{scss,sass}',
            '!<%= config.client %>/app/app.{scss,sass}'
          ]
        }
      },

      // Inject component css into index.html
      css: {
        options: {
          transform: function(filePath) {
            filePath = filePath.replace('/client/', '');
            filePath = filePath.replace('/.tmp/', '');
            return '<link rel="stylesheet" href="' + filePath + '">';
          },
          starttag: '<!-- injector:css -->',
          endtag: '<!-- endinjector -->'
        },
        files: {
          '<%= config.client %>/index.html': [
            '<%= config.client %>/{app,components}/**/*.css'
          ]
        }
      }
    }
  });

  // Used for delaying livereload until after server has restarted
  grunt.registerTask('wait', function () {
    grunt.log.ok('Waiting for server reload...');

    var done = this.async();

    setTimeout(function () {
      grunt.log.writeln('Done waiting!');
      done();
    }, 1500);
  });

  grunt.registerTask('express-keepalive', 'Keep grunt running', function() {
    this.async();
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'env:all', 'env:prod', 'express:prod', 'wait', 'open', 'express-keepalive']);
    }

    if (target === 'debug') {
      return grunt.task.run([
        'clean:server',
        'injector:sass',
        'concurrent:server',
        'injector',
        'wiredep',
        'autoprefixer',
        'concurrent:debug'
      ]);
    }

    grunt.task.run([
      'clean:server',
      'injector:sass',
      'concurrent:server',
      'injector',
      'wiredep',
      'autoprefixer',
      'express:dev',
      'wait',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'injector:sass',
    'concurrent:dist',
    'injector',
    'wiredep',
    'useminPrepare',
    'autoprefixer',
    'ngtemplates',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'cdnify',
    'cssmin',
    'uglify',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'build'
  ]);
};
