'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var path = require('path');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the stupendous ' + chalk.red('Mogy') + ' generator!'
    ));

    var prompts = [{
      name: 'projectName',
      message: 'What is the name of your project ?',
      default: 'myworkflows'
    }];

    this.prompt(prompts, function (props) {
      this.projectName = props.projectName;

      done();
    }.bind(this));
  },

  configuring: {
    enforceFolderName: function () {
      if (this.projectName !== _.last(this.destinationRoot().split(path.sep))) {
        this.destinationRoot(this.projectName);
      }
    }
  },

  writing: {
    app: function () {

      this.fs.copy(
        this.templatePath('config/environments/development.js'),
        this.destinationPath('config/environments/development.js')
      );

      this.fs.copy(
        this.templatePath('activities/README.md'),
        this.destinationPath('activities/README.md')
      );

      this.fs.copy(
        this.templatePath('deciders/README.md'),
        this.destinationPath('deciders/README.md')
      );

      this.fs.copy(
        this.templatePath('log/.gitkeep'),
        this.destinationPath('log/.gitkeep')
      );

      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        { projectName: this.projectName }
      );

      this.fs.copyTpl(
        this.templatePath('README.md'),
        this.destinationPath('README.md'),
        { projectName: this.projectName }
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
      skipInstall: this.options['skip-install'],
      bower: false
    });
  }
});
