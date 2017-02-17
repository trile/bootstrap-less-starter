module.exports = function(grunt) {

  grunt.initConfig({
    //copy file from app tree structure to build folder
    copy: {
      dev_init: {
        files: [
          { expand: true, flatten: true, src: ['node_modules/bootstrap/less/*'], dest: 'app/less/vendors/bootstrap'},
          { expand: true, flatten: true, src: ['node_modules/bootstrap/less/mixins/*'], dest: 'app/less/vendors/bootstrap/mixins'},
          { expand: true, flatten: true, src: ['node_modules/font-awesome/less/*'], dest: 'app/less/vendors/font-awesome'},
          { expand: true, flatten: true, src: ['node_modules/jquery/dist/jquery.min.*'], dest: 'app/js/'},
          { expand: true, flatten: true, src: ['node_modules/bootstrap/dist/js/bootstrap.min.js'], dest: 'app/js/' },
          { expand: true, flatten: true, cwd: 'node_modules/bootstrap/dist', src: ['fonts/*'], dest: 'app/fonts/'},
        ],
      },
    },

    // clean the build folder
    clean: {
      development: {
        src: ['app/css', 'app/fonts', 'app/js', 'app/less/vendors/']
      },
      build: {
        src: 'build'
      },
    },

    // compile less file
    less: {
      development: {
        files: {
          "app/css/main.css": "app/less/main.less"
        }
      },
    },

    // autoprefixer: {
    //   development: {
    //     build: {
    //       expand: true,
    //       cwd: 'app/css',
    //       src: ['*.css'],
    //       dest: 'app/css'
    //     }
    //   },
    // },

    cssmin: {
      development: {
        files: [{
          src: [ 'app/css/main.css' ],
          dest: 'app/css/main.min.css'
        }]
      }
    },

    uglify: {
      development: {
        options: {
          mangle: false
        },
        files: {
          'app/js/main.js': [ 'app/js/*.js' ]
        }
      }
    },

    watch: {
      less: {
        options: { livereload: true },
        files: ['app/less/*', 'app/js/*', 'app/index.html'],
        tasks: ['less', 'cssmin']
      }
    },

    connect: {
      development: {
        options: {
          port: 8080,
          base: 'app',
          hostname: '*'
        }
      }
    },

  });

  // define the tasks
  grunt.registerTask('init_development', ['copy:dev_init']);
  grunt.registerTask('reset_development', ['clean:development']);
  grunt.registerTask('compile_less', ['less:development', 'cssmin:development']);
  grunt.registerTask('dev_compile', ['less:development', 'autoprefixer:development', 'cssmin:development']);
  grunt.registerTask('dev_serve', ['less:development', 'cssmin:development', 'connect:development', 'watch:less']);


  // load the tasks
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
};
