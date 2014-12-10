'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _s = require('underscore.string');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the stupendous ' + chalk.red('Mogy Activity') + ' generator!'
    ));

    var prompts = [{
      name: 'activityName',
      message: 'What is the name of the activity to create ?',
      default: 'myactivity'
    }];

    this.prompt(prompts, function (props) {
      this.activityName = props.activityName;
      this.dirname = _s.dasherize(this.activityName);

      done();
    }.bind(this));
  },

  writing: {
    app: function () {

      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('activities', this.dirname, 'package.json'),
        { dirname: this.dirname }
      );

      this.fs.copyTpl(
        this.templatePath('index.js'),
        this.destinationPath('activities', this.dirname, 'index.js'),
        { dirname: this.dirname }
      );

      this.fs.copyTpl(
        this.templatePath('README.md'),
        this.destinationPath('activities', this.dirname, 'README.md'),
        { activityName: this.activityName }
      );

      this.fs.copyTpl(
        this.templatePath('lib/method.js'),
        this.destinationPath('activities', this.dirname, 'lib/'+this.dirname+'.js'),
        { activityName: this.activityName }
      );

    }

  },

  install: function () {
    /*this.installDependencies({
      skipInstall: this.options['skip-install'],
      bower: false
    });*/

    this.log('Remember to run "mogy register" !');
  }
});
