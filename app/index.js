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
      type: 'confirm',
      name: 'someOption',
      message: 'Would you like to enable this option?',
      default: true
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


      this.copy('_package.json', 'package.json');
      this.copy('_server.js', 'server.js');
      this.copy('_main.js', 'app/main.js');
      this.copy('_index.html', 'static/index.html');
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
      );
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
