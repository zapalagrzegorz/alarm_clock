module.exports = function (grunt) {

    // Load the plugins tasks 
    require('load-grunt-tasks')(grunt);

    // Tablica zawierająca zewnętrzne javascripty, które chcemy konkatenować do vendor.js
    var vendorJs = [
        // 'node_modules/howler/dist/howler.core.min.js',
        //  'node_modules/bootstrap/js/dist/util.js',
    ];
    // Project configuration.
    grunt.initConfig({
        watch: {
            scripts: {
                files: ['dev/js/main.js'],
                tasks: ['js']
            },
            sass: {
                files: ['dev/css/*.scss'],
                tasks: ['sass:dev']
            },
            // refresh: {
                // files: 'scriptsEs5.js'
            // }
            options: {
                spawn: false,
                livereload: false,
                event: ['added', 'changed'],
                debounceDelay: 1000,
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'build/css/*.css',
                        'build/js/*.js',
                        '*.html',
                        'dev/js/scriptsEs5.js'
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: './'
                    }
                }
            }
        },
        browserify: {
            dist: {
                src: 'dev/js/main.js',
                dest: 'dev/js/bundled.js',
            }
        },
        clean: {
            build: ['build/**/*'],
            dev_temp: ['dev/temp/', 'dev/js/bundled.js', 'dev/js/scriptsEs5']
        },
        concat: {
            dev: {
                files: {
                    // browserify do the job
                    // 'build/js/vendor.js': [vendorJs],
                    // 'dev/temp/scripts.js': ['dev/js/*.js']
                }
            },
            dist: {
                files: {
                    // 'dev/temp/vendor.js': [vendorJs],
                    'dev/temp/scripts.js': ['dev/js/*.js']
                }
            }
        },
        babel: {
            dist: {
                options: {
                    sourceMap: false,
                    presets: ['env']
                },
                files: {
                    'dev/js/scriptsEs5.js': 'dev/js/bundled.js'
                }
            },
            dev: {
                options: {
                    sourceMap: true,
                    presets: ['env']
                },
                files: {
                    'dev/js/scriptsEs5.js': 'dev/js/bundled.js'
                }
            }
        },
        uglify: {
            options: {
                sourceMap: false
            },
            dist: {
                files: {
                    'build/js/scripts.min.js': 'dev/js/scriptsEs5.js'
                }
            }
        },
        sass: {
            options: {
                sourceMap: false,
                includePaths: [
                    // 'bower_components/font-awesome/scss',
                    'node_modules/bootstrap/scss'
                ]
            },
            dev: {
                files:
                [{
                    expand: true,
                    cwd: 'dev/css/',
                    src: ['*.scss'],
                    dest: 'build/css/',
                    ext: '.css'
                }]
            },
            dist: {
                files:
                [{
                    expand: true,
                    cwd: 'dev/css/',
                    src: ['*.scss'],
                    dest: 'build/css/',
                    ext: '.css'
                }]
            }
        },
        postcss: {
            options: {
                map: false,
                processors: [
                    require('pixrem')(), // add fallbacks for rem units
                    require('autoprefixer')({ browsers: 'last 3 versions' }), // add vendor prefixes
                    require('cssnano')() // minify the result
                ]
            },
            dist: {
                src: 'build/css/main.css',
                dest: 'build/css/main.min.css'
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,                  // Enable dynamic expansion 
                    cwd: 'dev/img/',                   // Src matches are relative to this path 
                    src: ['*.{png,jpg,gif}'],   // Actual patterns to match 
                    dest: 'build/img/'
                }]
            }
        }
    });

    // Default task(s).
    grunt.registerTask('default', ['clean', 'sass:dev', 'concat:dev', 'browserify', 'babel:dev', 'imagemin', 'browserSync', 'watch']);
    grunt.registerTask('dist', ['clean', 'imagemin', 'sass:dist', 'postcss', 'browserify', 'babel:dist', 'uglify', 'clean:dev_temp']);
    grunt.registerTask('css', ['sass:dev', 'postcss']);
    grunt.registerTask('js', ['browserify', 'babel:dev', 'clean:dev_temp']);
    // grunt.registerTask('browserify', ['browserify', 'babel:dev']);


};