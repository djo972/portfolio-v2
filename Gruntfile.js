module.exports = function(grunt) {
    // Import
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks("grunt-contrib-watch");
    // grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-nodemon');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '* http://<%= pkg.homepage %>/\n' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
            '<%= pkg.author.name %>; Licensed MIT */',

        clean: {
            build: {
                src: ['dist/*']
            },
            css:{
                src:['dist/js/*']
            },
            js:{
                src:['dist/styles/*']
            }
        },
        copy: {
            component:{
                expand:true,
                cwd:'src/js/component',
                src:['**/*'],
                dest:'dist/js/component'
            },
            fonts:{
                expand:true,
                cwd:'src/fonts',
                src:['**/*'],
                dest:'dist/fonts/'
            },
            project:{
                expand:true,
                cwd:'src/projets',
                src:['**/*'],
                dest:'dist/projects'
            },
            images: {
                expand:     true,
                cwd:        'src/images',
                src:        ['**/*'],
                dest:       'dist/images/',
            },
            files: {
                expand:     true,
                cwd:        './',
                src:        ['*.html'],
                dest:       'dist/',
            },
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    captureFile: 'results.txt', // Optionally capture the reporter output to a file
                    quiet: false, // Optionally suppress output to standard out (defaults to false)
                    clearRequireCache: false, // Optionally clear the require cache before running tests (defaults to false)
                    clearCacheFilter: (key) => true, // Optionally defines which files should keep in cache
                    noFail: false // Optionally set to not fail on failed tests (will still fail on other errors)
                },
                src: ['test/**/*.js']
            }
        },
        sass: {
            // Nom de la tâche
            dev: {
                // Nom de la sous-tâche
                options: {
                    style: "expanded",
                },
                files: [
                    {
                        // C'est ici que l'on définit le dossier que l'on souhaite importer
                        expand: true,
                        cwd: "src/styles/",
                        src: ["main.scss"],
                        dest: "dist/styles/",
                        ext: "<%= pkg.name %><%= pkg.version %>_<%= grunt.template.today('yyyy-mm-dd') %>.css",
                    },
                ],
            },
            dist: {
                // Nom de la sous-tâche
                options: {
                    // Options
                    style: "compressed",
                },
                files: [
                    {
                        // C'est ici que l'on définit le dossier que l'on souhaite importer
                        expand: true,
                        cwd: "src/styles/",
                        src: ["main.scss"],
                        dest: "dist/styles/",
                        ext: "<%= pkg.name %><%= pkg.version %>_<%= grunt.template.today('yyyy-mm-dd') %>.min.css",
                    },
                ],
            },
        },
        cssmin: {
            // dans le cas ou plusieurs fichiers sont present
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    // 'output.css': ['foo.css', 'bar.css']
                }
            }
        },
        htmlmin: {                                     // Task
            dist: {                                      // Target
                options: {                                 // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    src: ['*.html'],
                    dest: 'dist'
                }]
            },
            dev: {                                       // Another target
                files: [{
                    expand: true,
                    cwd: 'app',
                    src: ['src/**/*.html', '*.html'],
                    dest: 'dist'
                }]
            }
        },
        jshint: {
            beforeconcat: ["src/js/*.js"],
            afterconcat: ["dist/js/app<%= pkg.version %>_<%= grunt.template.today('yyyy-mm-dd') %>.min.js"],
            options: {
                reporter: require('jshint-stylish'),
                esversion: 6,
            }
        },
        concat: {
            options: {
                sourceMap:true,
            },
            dist: {
                src: ["src/js/plugin/*.js","src/js/*.js"], // la source
                dest: "dist/js/appCC<%= pkg.version %>_<%= grunt.template.today('yyyy-mm-dd') %>.js", // la destination finale
            },
        },
        babel: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    "dist/js/appBuilt<%= pkg.version %>_<%= grunt.template.today('yyyy-mm-dd') %>.js":"dist/js/appCC<%= pkg.version %>_<%= grunt.template.today('yyyy-mm-dd') %>.js"
                }
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>',
                sourceMap: true
            },
            dist: {
                src: ["dist/js/appBuilt<%= pkg.version %>_<%= grunt.template.today('yyyy-mm-dd') %>.js"], // la source
                dest: "dist/js/app<%= pkg.version %>_<%= grunt.template.today('yyyy-mm-dd') %>.min.js", // la destination finale
            },
        },
        replace: {
            dev:{
                src: ['views/partials/*.ejs'],
                overwrite: true,
                replacements: [{
                    from: /main(.*)css/g,
                    to: "main<%= pkg.name %><%= pkg.version %>_<%= grunt.template.today('yyyy-mm-dd') %>.css"
                }, {
                    from: /app(.*)js/g,
                    to: "appCC<%= pkg.version %>_<%= grunt.template.today('yyyy-mm-dd') %>.js"
                }]
            },
            dist: {
                src: ['dist/views/partial/*.ejs'],
                overwrite: true,
                replacements: [{
                    from: /main(.*)css/g,
                    to: "style_ver=<%= pkg.version %>.min.css"
                }, {
                    from: /app(.*)js/g,
                    to: "app_ver=<%= pkg.version %>.min.js"
                }]
            }
        },
        express: {
            options: {
                port:5000,
            },
            dev: {
                options: {
                    script: 'app.js'
                }
            },
            // prod: {
            //     options: {
            //         script: 'path/to/prod/server.js',
            //         node_env: 'production'
            //     }
            // },
            // test: {
            //     options: {
            //         script: 'path/to/test/server.js'
            //     }
            // }
        },
        nodemon: {
            dev: {
                script: 'app.js',
                options: {
                    nodeArgs: ['--inspect'],
                    env: {
                        PORT: '5455'
                    },
                }
            },
        },
        connect: {
            all: {
                options:{
                    port:4000,
                    hostname: 'localhost',
                    livereload: 35729
                }
            }
        },
        watch: {
            options: {
                livereload: 35729,
                // dateFormat: function(time) {
                //     grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
                //     grunt.log.writeln('Waiting for more changes...');
                // },
            },
            express: {
                files:  [ 'app.js' ],
                tasks:  [ 'express:dev' ],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            // nodemon: {
            //     files:  [ 'app.js' ],
            //     tasks:  [ 'nodemon:dev' ],
            //     options: {
            //         spawn: false,
            //         livereload: true
            //     }
            // },
            images: {
                files: 'src/images/**',
                tasks: ['copy:images'],
            },
            scripts: {
                files:  [ 'app.js','Grunfile.js','config.js', 'views/**/*.js', 'src/js/**','src/js/component/**'],
                tasks: ['dev-js','copy:component','replace:dev','notify:js']
            },
            styles: {
                files: '**/*.scss', // tous les fichiers Sass de n'importe quel dossier
                tasks: ['sass:dev','replace:dev','notify:css']
            },
            files: {
                files: 'views/*.ejs', // tous les fichiers ejs de n'importe quel dossier
                tasks: []
            }
        },
        notify: {
            js: {
                options: {
                    title: 'Task Complete',  // optional
                    message: 'jsfinished running', //required
                }
            },
            css: {
                options: {
                    title: 'Task Complete',  // optional
                    message: 'SASS finished runnin', //required
                }
            },
            watch: {
                options: {
                    title: 'Task Complete',  // optional
                    message: 'SASS and Uglify finished running', //required
                }
            },
            server: {
                options: {
                    message: 'Server is ready!'
                }
            }
        }
});
    // Redéfinition de la tâche `default` qui est la tâche lancée dès que vous lancez Grunt sans rien spécifier.
    // Note : ici, nous définissons sass comme une tâche à lancer si on lance la tâche `default`.
    // grunt.event.on('watch', function(action, filepath, target) {
    //     grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    // });
    // child
    grunt.registerTask("duplicate",["copy:images","copy:files"]);
    grunt.registerTask("duplicate-dev",["copy:images","copy:fonts","copy:component"]);
    grunt.registerTask("dist-js",["jshint:beforeconcat","concat:dist","babel","jshint:afterconcat","uglify",'notify:js']);
    grunt.registerTask("dev-js",["jshint:beforeconcat","concat:dist"]);
    grunt.registerTask("dev-sass",["sass:dev","replace:dev"]);
    grunt.registerTask("prebuild",["dev-js","dev-sass","duplicate-dev"]);
    // prod
    grunt.registerTask("default",["clean:build","sass:dist","dist-js","duplicate","htmlmin:dist","replace:dist"]);
    // dev
    grunt.registerTask("dev",["sass:dev","concat:dist"]);
    // Start web server


    grunt.registerTask('serve', ['clean','express:dev','notify:server','prebuild','watch']);
    // grunt.registerTask('serve', ['clean','notify:server','prebuild','copy:component','nodemon:dev','watch']);
    // grunt.registerTask('serve', ['clean','notify:server','prebuild','nodemon:dev','watch']);


    require('load-grunt-tasks')(grunt);
    // Unit Test
    grunt.registerTask('test',['mochaTest']);
};