'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _s = require('underscore.string');
const mkdirp = require('mkdirp');
const themeV = '2.0.0';

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay('Yeoman Coworks.be builder \n Welcome to the Drupal Cowfe theme generator! \n For issue call the doctor'));
    this.log(
      chalk.green(
        'With this you can create the scaffolding for your own Drupal 8 theme. \n'
      )
    );

    // Define module list
    const moduleList = ['Slick', 'Singularity'];

    // Here, we add in extra prompts and settings from our base themes.
    const baseThemeList = [
      {name: 'No Base Theme', value: null},
      {name: 'stable (D8)', value: 'stable'},
      {name: 'classy (D8)', value: 'classy'},
      {name: 'bartik', value: 'bartik'},
      {name: 'engines', value: 'engines'},
      {name: 'seven', value: 'seven'},
      {name: 'stark', value: 'stark'}
    ];

    // List of drupal version
    const drupalVersionList = [
      {name: 'Drupal 8', value: 8}
    ];

    const prompts = [
      {
        type: 'list',
        name: 'drupalV',
        message: 'Which Drupal version you want to use?',
        choices: drupalVersionList
      },
      {
        type: 'confirm',
        name: 'installer',
        message: 'Do you want to use deki theme installer',
        default: false
      },
      {
        type: 'string',
        name: 'projectName',
        message: 'What\'s your theme\'s name?',
        default: 'cowfe'
      },
      {
        type: 'string',
        name: 'description',
        message: 'Project description',
        default: 'Cowfe Drupal theme by Coworks'
      },
      {
        type: 'list',
        name: 'baseTheme',
        message: 'Which base theme you want to use?',
        choices: baseThemeList
      },
      {
        type: 'checkbox',
        name: 'moduleList',
        message: 'Which node module\'s you need to install?',
        choices: moduleList
      },
      {
        type: 'confirm',
        name: 'nodeInstall',
        message: 'Would you like to run npm install after theme setup?',
        default: false
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;

      this.props.npm = [];
      this.props.npm.slick = props.moduleList.indexOf('Slick') > -1;
      this.props.npm.singularity = props.moduleList.indexOf('Singularity') > -1;
    });
  }

  default() {
    this.props.scss = 'assets/scss';
    this.props.svgDir = 'assets/svg';
    this.props.imgDir = 'assets/images';
    this.props.jsDir = 'assets/js';
    this.props.fontsDir = 'fonts';
    this.props.templateDir = 'templates';
    this.props.favIcoDir = 'favicon';
    this.props.dConfig = 'config/install';
    this.props.projectSlug = _s.underscored(this.props.projectName);
    this.props.version = themeV;
  }

  writing() {
    // Create project name directory
    mkdirp.sync(this.props.projectSlug);

    // Set project name to be destination root folder
    this.destinationRoot(this.props.projectSlug);

    // Make all required directories what we will need.
    mkdirp.sync(this.props.scss);
    mkdirp.sync(this.props.jsDir);
    mkdirp.sync(this.props.fontsDir);
    mkdirp.sync(this.props.templateDir);
    mkdirp.sync(this.props.svgDir);
    mkdirp.sync(this.props.imgDir);
    mkdirp.sync(this.props.favIcoDir);

    // @NOTE For feature drupal version
    if (this.props.drupalV === 8) {
      // Drupal 8 theme build

      mkdirp.sync(this.props.dConfig);

      // Config drupal install theme
      this.fs.copyTpl(
        this.templatePath('drupal8/config/install/_theme.settings.yml'),
        this.destinationPath(this.props.dConfig + '/' + this.props.projectSlug + '.info.yml'),
        {props: this.props}
      );

      let tmpThemeInfo = 'drupal8/_theme.info.yml';
      if (this.props.installer) {
        tmpThemeInfo = 'deki/_theme.info.yml';
      }

      this.fs.copyTpl(
        this.templatePath(tmpThemeInfo),
        this.destinationPath(this.props.projectSlug + '.info.yml'),
        {props: this.props}
      );

      this.fs.copyTpl(
        this.templatePath('drupal8/_theme.libraries.yml'),
        this.destinationPath(this.props.projectSlug + '.libraries.yml')
      );

      this.fs.copyTpl(
        this.templatePath('drupal8/_theme.layouts.yml'),
        this.destinationPath(this.props.projectSlug + '.layouts.yml')
      );

      this.fs.copyTpl(
        this.templatePath('drupal8/_theme.breakpoints.yml'),
        this.destinationPath(this.props.projectSlug + '.breakpoints.yml'),
        {props: this.props}
      );

      this.fs.copyTpl(
        this.templatePath('drupal8/_theme.theme'),
        this.destinationPath(this.props.projectSlug + '.theme'),
        {props: this.props}
        // {projectSlug: this.props.projectSlug}
      );

      // Template files
      if (this.props.installer) {
        this.fs.copy(
          this.templatePath('deki/tpl/html.html.twig'),
          this.destinationPath(this.props.templateDir + '/html.html.twig')
        );

        this.fs.copy(
          this.templatePath('deki/tpl/page.html.twig'),
          this.destinationPath(this.props.templateDir + '/page.html.twig')
        );
      } else {
        this.fs.copy(
          this.templatePath('drupal8/tpl/html.html.twig'),
          this.destinationPath(this.props.templateDir + '/html.html.twig')
        );

        this.fs.copy(
          this.templatePath('drupal8/tpl/page.html.twig'),
          this.destinationPath(this.props.templateDir + '/page.html.twig')
        );

        this.fs.copy(
          this.templatePath('drupal8/tpl/ds_layouts/ds-offers/ds-offer.html.twig'),
          this.destinationPath(this.props.templateDir + '/ds_layouts/ds-offers/ds-offer.html.twig')
        );

        this.fs.copy(
          this.templatePath('drupal8/tpl/regions/region--content.html.twig'),
          this.destinationPath(this.props.templateDir + '/regions/region--content.html.twig')
        );

        this.fs.copy(
          this.templatePath('drupal8/tpl/regions/region--header.html.twig'),
          this.destinationPath(this.props.templateDir + '/regions/region--header.html.twig')
        );

        this.fs.copy(
          this.templatePath('drupal8/tpl/regions/region--sidebar-first.html.twig'),
          this.destinationPath(this.props.templateDir + '/regions/region--sidebar-first.html.twig')
        );

        this.fs.copy(
          this.templatePath('drupal8/tpl/regions/region--sidebar-second.html.twig'),
          this.destinationPath(this.props.templateDir + '/regions/region--sidebar-second.html.twig')
        );
      }
    }

    // General theme files.
    // Sample JavaScript file.
    this.fs.copy(
      this.templatePath('cowfe/assets/js/scripts.js'),
      this.destinationPath(this.props.jsDir + '/scripts.js')
    );

    // Generate scss base files
    if (this.props.installer) {

      this.fs.copyTpl(
        this.templatePath('deki/assets/scss/style.scss'),
        this.destinationPath(this.props.scss + '/style.scss'),
        {props: this.props}
      );

      this.fs.copy(
        this.templatePath('deki/assets/scss/_utilities.scss'),
        this.destinationPath(this.props.scss + '/_utilities.scss')
      );

      this.fs.copy(
        this.templatePath('deki/assets/scss/_tools.scss'),
        this.destinationPath(this.props.scss + '/_tools.scss')
      );

      this.fs.copy(
        this.templatePath('deki/assets/scss/_settings.scss'),
        this.destinationPath(this.props.scss + '/_settings.scss')
      );

      this.fs.copy(
        this.templatePath('deki/assets/scss/_objects.scss'),
        this.destinationPath(this.props.scss + '/_objects.scss')
      );

      this.fs.copy(
        this.templatePath('deki/assets/scss/_layouts.scss'),
        this.destinationPath(this.props.scss + '/_layouts.scss')
      );

      this.fs.copy(
        this.templatePath('deki/assets/scss/_elements.scss'),
        this.destinationPath(this.props.scss + '/_elements.scss')
      );

      this.fs.copy(
        this.templatePath('deki/assets/scss/_components.scss'),
        this.destinationPath(this.props.scss + '/_components.scss')
      );
    } else {
      // Dexter installer
      this.fs.copyTpl(
        this.templatePath('cowfe/assets/scss/libraries/_libraries.scss'),
        this.destinationPath(this.props.scss + '/libraries/_libraries.scss'),
        {props: this.props}
      );

      this.fs.copy(
        this.templatePath('cowfe/assets/scss/utils/_utils.scss'),
        this.destinationPath(this.props.scss + '/utils/_utils.scss')
      );

      this.fs.copyTpl(
        this.templatePath('cowfe/assets/scss/utils/_glob.scss'),
        this.destinationPath(this.props.scss + '/utils/_glob.scss'),
        {props: this.props}
      );

      this.fs.copyTpl(
        this.templatePath('cowfe/assets/scss/utils/_mixins.scss'),
        this.destinationPath(this.props.scss + '/utils/_mixins.scss'),
        {props: this.props}
      );

      this.fs.copy(
        this.templatePath('cowfe/assets/scss/utils/_variables.scss'),
        this.destinationPath(this.props.scss + '/utils/_variables.scss')
      );

      this.fs.copy(
        this.templatePath('cowfe/assets/scss/_debug.scss'),
        this.destinationPath(this.props.scss + '/_debug.scss')
      );

      this.fs.copy(
        this.templatePath('cowfe/assets/scss/theme.scss'),
        this.destinationPath(this.props.scss + '/theme.scss')
      );

      this.fs.copy(
        this.templatePath('cowfe/assets/scss/base.scss'),
        this.destinationPath(this.props.scss + '/base.scss'),
      );

      this.fs.copy(
        this.templatePath('cowfe/assets/scss/layout.scss'),
        this.destinationPath(this.props.scss + '/layout.scss'),
      );
    }

    // Gulp file
    this.fs.copyTpl(
      this.templatePath('cowfe/_gulpfile.js'),
      this.destinationPath('gulpfile.js'),
      {props: this.props}
    );

    this.fs.copy(
      this.templatePath('cowfe/cowfe.readme'),
      this.destinationPath('cowfe.readme')
    );

    // Copy screenshots
    this.fs.copy(
      this.templatePath('cowfe/screenshot.png'),
      this.destinationPath('screenshot.png')
    );

    // Some config files we want to have.
    this.fs.copy(
      this.templatePath('cowfe/gitignore'),
      this.destinationPath('.gitignore')
    );

    // Package json for gulp
    this.fs.copyTpl(
      this.templatePath('cowfe/_package.json'),
      this.destinationPath('package.json'),
      {props: this.props}
    );
  }

  install() {
    if (this.props.nodeInstall) {
      this.installDependencies({
        npm: this.props.nodeInstall,
        bower: false,
        yarn: false
      });
    }

    this.log(
      chalk.green(
        'Instalation finished. You can use theme now. \nCommand list:\n\nFor dev: gulp watch or gulp w \nFor production: gulp'
      )
    );
  }
};
