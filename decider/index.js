'use strict';
var yeoman = require('yeoman-generator');
var _s = require('underscore.string');

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);
    this.argument('name', {
      required: true,
      type: String,
      desc: 'The decider name'
    });
  },

  initializing: function () {
    this.dirname = _s.dasherize(this.name);
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('index.js'),
      this.destinationPath('deciders', this.dirname, 'index.js')
    );
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('deciders', this.dirname, 'package.json'),
      {dirname : this.dirname}
    );
  }
});
