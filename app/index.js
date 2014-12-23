'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('Empro') + ' generator!'
    ));


    var prompts = [{
      type    : 'input',
      name    : 'name',
      message : 'Your project name',
      default : this.appname // Default to current folder name
    }];

    this.prompt(prompts, function (props) {
      this.someOption = props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.mkdir('build');
      this.mkdir('src');
      this.mkdir('src/styles');
      this.mkdir('src/styles/libs');
      this.mkdir('src/styles/base');
      this.mkdir('src/styles/main');
      this.mkdir('src/styles/fix');
      this.mkdir('src/layouts');
      this.mkdir('src/layouts/templates');
      this.mkdir('src/scripts');
      this.mkdir('src/scripts/app');
      this.mkdir('src/scripts/app/views');
      this.mkdir('src/scripts/app/collections');
      this.mkdir('src/scripts/app/models');
      this.mkdir('src/scripts/app/routers');
      this.mkdir('src/scripts/ui');
      this.mkdir('src/scripts/ui/modules');
      this.mkdir('src/scripts/libs');


      
      this.template('_package.json', 'package.json');
      this.template('_bower.json', 'bower.json');
      this.copy('_gulpfile.coffee', 'gulpfile.coffee');
      this.copy('_src/_layouts/_index.jade', 'src/layouts/index.jade');
      this.copy('_src/_scripts/_main.coffee', 'src/scripts/main.coffee');
      this.copy('_src/_scripts/_ui/_ui.coffee', 'src/scripts/ui/ui.coffee');
      this.copy('_src/_styles/_base/__vars.styl', 'src/styles/base/_vars.styl');
      this.copy('_src/_styles/_base/_grid.styl', 'src/styles/base/grid.styl');
      this.copy('_src/_styles/_fix/_fixes.styl', 'src/styles/fix/fixes.styl');
      this.copy('_src/_styles/_libs/_normalize.css', 'src/styles/libs/normalize.css');
      this.copy('_src/_styles/_main/_main.styl', 'src/styles/main/main.styl');

    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
