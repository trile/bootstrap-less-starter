module.exports = function(grunt) {

    grunt.initConfig({
        //copy source from Bootstrap folder in node_modules to app
        copy: {
            bootstrap_less: {
                files: [{
                        expand: true,
                        flatten: true,
                        src: ['node_modules/bootstrap/less/*'],
                        dest: 'app/less/vendors/bootstrap'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['node_modules/bootstrap/less/mixins/*'],
                        dest: 'app/less/vendors/bootstrap/mixins'
                    }
                ]
            }
            font_awesome: {
                expand: true,
                flatten: true,
                src: ['node_modules/font-awesome/less/*'],
                dest: 'app/less/vendors/font-awesome'
            },
            bootstrap_dist: {
                expand: true,
                flatten: true,
                src: ['node_modules/bootstrap/dist/css/bootstrap.min.*'],
                dest: 'app/css/'
            }
            jquery: {
                expand: true,
                flatten: true,
                src: ['node_modules/jquery/dist/jquery.min.*'],
                dest: 'app/js/'
            },
            bootstrap_js: {
                expand: true,
                flatten: true,
                src: ['node_modules/bootstrap/dist/js/bootstrap.min.js'],
                dest: 'app/js/'
            },
            bootstrap_font: {
                expand: true,
                flatten: true,
                cwd: 'node_modules/bootstrap/dist',
                src: ['fonts/*'],
                dest: 'app/fonts/'
            }

        },

        // Clean up before actions
        clean: {
            reset: {
                src: ['app/css', 'app/fonts', 'app/js', 'app/less/vendors']
            },
            development: {
                src: ['app/css/*']
            },
            dist: {
                src: ['app/css']
            }
        },

        // Compile less file
        less: {
            development: {
                options: {
                    strictMath: true
                },
                files: {
                    "app/css/main.css": "app/less/main.less"
                }
            },
            dist: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: 'main.css.map',
                    sourceMapFilename: 'app/css/main.css.map'
                },
                files: {
                    "app/css/main.css": "app/less/main.less"
                }
            }
        },

        // Auto prefix for browser
        autoprefixer: {
            options: {
                // map: true,
                browsers: [
                    "Android 2.3",
                    "Android >= 4",
                    "Chrome >= 20",
                    "Firefox >= 24",
                    "Explorer >= 8",
                    "iOS >= 6",
                    "Opera >= 12",
                    "Safari >= 6"
                ]
            },
            development: {
                expand: true,
                cwd: 'app/css',
                src: ['*.css'],
                dest: 'app/css'
            }
        },

        // Set up proper format for css files
        csscomb: {
            options: {
                config: 'app/less/.csscomb.json'
            },
            development: {
                expand: true,
                cwd: 'app/css/',
                src: ['*.css', '!*.min.css'],
                dest: 'app/css/'
            }
        },

        // Minimize CSS files
        cssmin: {
            development: {
                src: ['app/css/main.css'],
                dest: 'app/css/main.min.css'
            },
            dist: {
                options: {
                    // TODO: disable `zeroUnits` optimization once clean-css 3.2 is released
                    //    and then simplify the fix for https://github.com/twbs/bootstrap/issues/14837 accordingly
                    compatibility: 'ie8',
                    keepSpecialComments: '*',
                    sourceMap: true,
                    sourceMapInlineSources: true,
                    advanced: false
                },
                src: ['app/css/main.css'],
                dest: 'app/css/main.min.css'
            }

        },

        //Optimize JS files
        // uglify: {
        //   dist: {
        //     options: {
        //       mangle: false
        //     },
        //     files: {
        //       'app/js/main.js': [ 'app/js/*.js' ]
        //     }
        //   }
        // },

        // Setup local server for development
        connect: {
            options: {
                port: 8080,
                livereload: 42201,
                base: 'app',
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true
                }
            }
        },

        // Watch files to rerun workflow and use live reload to refresh browser
        watch: {
            less: {
                files: ['app/less/**/*.less'],
                tasks: ['less:development', 'autoprefixer', 'csscomb', 'cssmin:development']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: ['{,*/}*.html', 'app/css/{,*/}*.css', 'app/js/{,*/}*.js']
            }
        }

    });


    // define the tasks
    grunt.registerTask('setup-less', ['copy:bootstrap_less', 'copy:font_awesome', 'copy:bootstrap_js', 'copy:boostrap_fonts', 'copy:jquery']);
    grunt.registerTask('setup-external-bootstrap', ['copy:bootstrap_dist', 'copy:bootstrap_js', 'copy:boostrap_fonts', 'copy:jquery']);
    grunt.registerTask('dev-reset', ['clean:reset']);
    grunt.registerTask('dev-compile-less', ['less:development', 'autoprefixer', 'csscomb', 'cssmin:development']);
    grunt.registerTask('dist-less', ['clean:dist', 'less:dist', 'autoprefixer', 'csscomb', 'cssmin:dist']);
    grunt.registerTask('test-less', ['clean:dist', 'less:dist', 'autoprefixer', 'csscomb', 'cssmin:dist']);
    grunt.registerTask('less-server', ['less:development', 'autoprefixer', 'csscomb', 'cssmin:development', 'connect:livereload', 'watch']);


    // load the tasks
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-csscomb');
};
