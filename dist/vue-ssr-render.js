'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fs = _interopDefault(require('fs'));
var vueServerRenderer = require('vue-server-renderer');
var path = require('path');
var path__default = _interopDefault(path);
var minimist = _interopDefault(require('minimist'));
var chalk = _interopDefault(require('chalk'));
var config = _interopDefault(require('config'));
var webpack = _interopDefault(require('webpack'));
var FriendlyErrorsPlugin = _interopDefault(require('friendly-errors-webpack-plugin'));
var MiniCssExtractPlugin = _interopDefault(require('mini-css-extract-plugin'));
var merge = _interopDefault(require('webpack-merge'));
var VueSSRClientPlugin = _interopDefault(require('vue-server-renderer/client-plugin'));
var nodeExternals = _interopDefault(require('webpack-node-externals'));
var VueSSRServerPlugin = _interopDefault(require('vue-server-renderer/server-plugin'));
var chokidar = _interopDefault(require('chokidar'));
var MFS = _interopDefault(require('memory-fs'));
var koaWebpackMiddleware = require('koa-webpack-middleware');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var Render =
function () {
  function Render(app) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var templatePath = _ref.templatePath,
        options = _objectWithoutProperties(_ref, ["templatePath"]);
    _classCallCheck(this, Render);
    var bundle = require('./vue-ssr-server-bundle.json');
    var clientManifest = require('./public/static/vue-ssr-client-manifest.json');
    var template = fs.readFileSync(templatePath, 'utf-8');
    this.renderer = vueServerRenderer.createBundleRenderer(bundle, _objectSpread({
      runInNewContext: false,
      clientManifest: clientManifest,
      template: template
    }, options));
  }
  _createClass(Render, [{
    key: "get",
    value: function get() {
      return this.renderer;
    }
  }]);
  return Render;
}();

var PWD = process.cwd();
var resolvePwd = function resolvePwd() {
  for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    args[_key5] = arguments[_key5];
  }
  return path.resolve.apply(void 0, [PWD].concat(args));
};

var version = "0.1.8";

var argv = minimist(process.argv);
var _argv$debug = argv.debug,
    _argv$stat = argv.stat;
var NODE_ENV = process.env.NODE_ENV;
var VERSION_CHECK_DISABLE = !!process.env.NODE_ENV;
var signature = "yqg-cli@".concat(version);
var FRAMEWORK_TYPE = {
  ANGULAR: 'angular',
  REACT: 'react',
  VUE: 'vue',
  VUE_SSR: 'vue-ssr',
  NONE: 'none'
};

var colored = function colored(chalkMethod) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  return args.map(function (obj) {
    return typeof obj === 'string' ? chalkMethod(obj) : obj;
  });
};
var timeFormat = function timeFormat(time) {
  return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
};
var timePrefix = function timePrefix() {
  var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
  return chalk.yellow("[".concat(timeFormat(time), "][").concat(signature, "]"));
};
var timeInfoMap = {};
var logger = {
  info: function info() {
    var _console;
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    (_console = console).log.apply(_console, [timePrefix()].concat(args));
  },
  error: function error() {
    var _console2;
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }
    (_console2 = console).error.apply(_console2, [timePrefix()].concat(_toConsumableArray(colored.apply(void 0, [chalk.red].concat(args)))));
  },
  success: function success() {
    var _console3;
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }
    (_console3 = console).error.apply(_console3, [timePrefix()].concat(_toConsumableArray(colored.apply(void 0, [chalk.green].concat(args)))));
  },
  strong: function strong() {
    var _console4;
    for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }
    (_console4 = console).error.apply(_console4, [timePrefix()].concat(_toConsumableArray(colored.apply(void 0, [chalk.bgGreen].concat(args)))));
  },
  time: function time(tag) {
    if (!tag) throw new Error('Tag can not be empty!');
    timeInfoMap[tag] = {
      timeStarted: Date.now()
    };
    for (var _len6 = arguments.length, args = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
      args[_key6 - 1] = arguments[_key6];
    }
    logger.info.apply(logger, ["Starting '".concat(tag, "' ...")].concat(args));
  },
  timeEnd: function timeEnd(tag) {
    if (!tag) throw new Error('Tag can not be empty!');
    var timeInfo = timeInfoMap[tag];
    if (!timeInfo) throw new Error("logger.time(".concat(tag, ") has not been invoked yet."));
    var millis = Date.now() - timeInfo.timeStarted;
    delete timeInfoMap[tag];
    for (var _len7 = arguments.length, args = new Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
      args[_key7 - 1] = arguments[_key7];
    }
    logger.info.apply(logger, ["Finished '".concat(tag, "' after ").concat(millis, " ms")].concat(args));
  }
};

var _FRAMEWORK_CONF;
var STAGE = process.env.NODE_ENV || 'dev';
var DEV = !/test|feat|prod/.test(STAGE);
var STAGE_CONF = {
  dev: {
    chidoriApiHost: 'https://chidori-api-test.yangqianguan.com',
    chidoriHost: 'https://chidori-admin-test.yangqianguan.com'
  },
  test: {
    chidoriApiHost: 'https://chidori-api-test.yangqianguan.com',
    chidoriHost: 'https://chidori-admin-test.yangqianguan.com'
  },
  feat: {
    chidoriApiHost: 'https://chidori-api-feat.yangqianguan.com',
    chidoriHost: 'https://chidori-admin-feat.yangqianguan.com'
  },
  prod: {
    chidoriApiHost: 'https://chidori-api-admin.yangqianguan.com',
    chidoriHost: 'https://chidori-admin.yangqianguan.com'
  }
};
Object.assign(STAGE_CONF, {
  'aws-test': STAGE_CONF.test,
  'aws-feat': STAGE_CONF.feat,
  'aws-prod': STAGE_CONF.prod
});
var _ref = STAGE_CONF[STAGE] || STAGE_CONF.dev,
    CHIDORI_API_HOST = _ref.chidoriApiHost,
    CHIDORI_HOST = _ref.chidoriHost;
var buildConf;
var runConf;
try {
  buildConf = config.get('build');
} catch (err) {
  buildConf = {};
}
try {
  runConf = config.get('run');
} catch (err) {
  runConf = {};
}
var _buildConf = buildConf,
    _buildConf$debug = _buildConf.debug,
    DEBUG$1 = _buildConf$debug === void 0 ? DEV : _buildConf$debug,
    _buildConf$vueDebug = _buildConf.vueDebug,
    VUE_DEBUG = _buildConf$vueDebug === void 0 ? DEV : _buildConf$vueDebug,
    _buildConf$verbose = _buildConf.verbose,
    _buildConf$mode = _buildConf.mode,
    MODE = _buildConf$mode === void 0 ? DEV ? 'development' : 'production' : _buildConf$mode,
    _buildConf$framework = _buildConf.framework,
    FRAMEWORK = _buildConf$framework === void 0 ? 'react' : _buildConf$framework,
    _buildConf$hash = _buildConf.hash,
    HASH = _buildConf$hash === void 0 ? DEV ? 'hash' : 'chunkhash' : _buildConf$hash,
    _buildConf$cssHash = _buildConf.cssHash,
    CSS_HASH = _buildConf$cssHash === void 0 ? DEV ? 'hash' : 'contenthash' : _buildConf$cssHash,
    _buildConf$srcMap = _buildConf.srcMap,
    _buildConf$packageJso = _buildConf.packageJsonPath,
    _buildConf$publicPath = _buildConf.publicPath,
    PUBLIC_PATH = _buildConf$publicPath === void 0 ? '/' : _buildConf$publicPath,
    _buildConf$alias = _buildConf.alias,
    WEBPACK_ALIAS_ORIGIN = _buildConf$alias === void 0 ? {} : _buildConf$alias,
    _buildConf$global = _buildConf.global,
    WEBPACK_GLOBALS = _buildConf$global === void 0 ? {} : _buildConf$global,
    _buildConf$serverEntr = _buildConf.serverEntry,
    WEBPACK_SERVER_ENTRY = _buildConf$serverEntr === void 0 ? './server.js' : _buildConf$serverEntr,
    _buildConf$ssrServerE = _buildConf.ssrServerEntry,
    _buildConf$server = _buildConf.server,
    WEBPACK_SERVER_CONF = _buildConf$server === void 0 ? {} : _buildConf$server,
    _buildConf$ssrServer = _buildConf.ssrServer,
    _buildConf$provide = _buildConf.provide,
    _buildConf$htmlPlugin = _buildConf.htmlPlugin,
    _buildConf$cacheGroup = _buildConf.cacheGroups,
    _buildConf$clientEntr = _buildConf.clientEntry,
    WEBPACK_CLIENT_ENTRY = _buildConf$clientEntr === void 0 ? './common/app/index.js' : _buildConf$clientEntr,
    _buildConf$client = _buildConf.client,
    WEBPACK_CLIENT_CONF = _buildConf$client === void 0 ? {} : _buildConf$client,
    _buildConf$clean = _buildConf.clean,
    _buildConf$copy = _buildConf.copy,
    _buildConf$devProxy = _buildConf.devProxy;
var WEBPACK_ALIAS = {};
Object.keys(WEBPACK_ALIAS_ORIGIN).forEach(function (key) {
  var modulePath = WEBPACK_ALIAS_ORIGIN[key];
  if (modulePath.startsWith('./') || modulePath.startsWith('../')) {
    WEBPACK_ALIAS[key] = resolvePwd(modulePath);
  } else {
    WEBPACK_ALIAS[key] = modulePath;
  }
});
var _runConf = runConf,
    _runConf$apiHost = _runConf.apiHost,
    API_HOST = _runConf$apiHost === void 0 ? '' : _runConf$apiHost,
    _runConf$webHost = _runConf.webHost,
    WEB_HOST = _runConf$webHost === void 0 ? '' : _runConf$webHost,
    _runConf$port = _runConf.port;
logger.info("FRAMEWORK=".concat(FRAMEWORK, " MODE=").concat(MODE));
var FRAMEWORK_CONF = (_FRAMEWORK_CONF = {}, _defineProperty(_FRAMEWORK_CONF, FRAMEWORK_TYPE.VUE_SSR, {
  styleLoader: 'vue-style-loader',
  devProxy: ['/__webpack_hmr']
}), _defineProperty(_FRAMEWORK_CONF, FRAMEWORK_TYPE.VUE, {
  styleLoader: 'vue-style-loader'
}), _FRAMEWORK_CONF);
var _ref2 = FRAMEWORK_CONF[FRAMEWORK] || {},
    _ref2$styleLoader = _ref2.styleLoader,
    STYLE_LOADER = _ref2$styleLoader === void 0 ? 'style-loader' : _ref2$styleLoader,
    _ref2$devProxy = _ref2.devProxy;

var globals = {
  __STAGE__: JSON.stringify(STAGE),
  __DEBUG__: DEBUG$1,
  __VUE_DEBUG__: VUE_DEBUG,
  __CDN_HOST__: JSON.stringify(''),
  __API_HOST__: JSON.stringify(API_HOST),
  __WEB_HOST__: JSON.stringify(WEB_HOST),
  __CHIDORI_API_HOST__: JSON.stringify(CHIDORI_API_HOST),
  __CHIDORI_HOST__: JSON.stringify(CHIDORI_HOST)
};

var rules = [{
  test: /\.jsx?$/,
  loader: 'babel-loader',
  exclude: /node_modules/
}, {
  test: /\.vue$/,
  loader: 'vue-loader'
}, {
  test: /\.html$/,
  loader: 'html-loader'
}, {
  test: /\.(txt|md)$/,
  loader: 'raw-loader'
}, {
  test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
  loader: 'url-loader',
  options: {
    limit: 10000
  }
}, {
  test: /\.(tpl|eot|ttf|wav|mp3)$/,
  loader: 'file-loader'
}];

var baseConf = {
  mode: MODE,
  cache: DEBUG$1,
  module: {
    rules: _toConsumableArray(rules).concat(_toConsumableArray(DEBUG$1 ? [{
      test: /\.css$/,
      use: [STYLE_LOADER, 'css-loader']
    }, {
      test: /\.scss$/,
      use: [STYLE_LOADER, 'css-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
    }, {
      test: /\.less$/,
      use: [STYLE_LOADER, 'css-loader', {
        loader: 'less-loader',
        options: {
          javascriptEnabled: true
        }
      }]
    }] : [{
      test: /\.css$/,
      loader: [MiniCssExtractPlugin.loader, 'css-loader']
    }, {
      test: /\.scss$/,
      loader: [MiniCssExtractPlugin.loader, 'css-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
    }, {
      test: /\.less$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', {
        loader: 'less-loader',
        options: {
          javascriptEnabled: true
        }
      }]
    }]))
  },
  resolve: {
    alias: WEBPACK_ALIAS,
    extensions: ['.js', '.vue', '.json']
  },
  plugins: [new webpack.DefinePlugin(_objectSpread({}, globals, WEBPACK_GLOBALS))].concat(_toConsumableArray(DEBUG$1 ? [new FriendlyErrorsPlugin()] : [new webpack.optimize.AggressiveMergingPlugin(), new webpack.optimize.OccurrenceOrderPlugin(), new MiniCssExtractPlugin({
    filename: "[name].[".concat(CSS_HASH, "].css")
  })]))
};

var clientConf = {
  target: 'web',
  entry: {
    app: WEBPACK_CLIENT_ENTRY
  },
  output: {
    path: resolvePwd('./build/public/static'),
    publicPath: PUBLIC_PATH,
    filename: "[name].[".concat(HASH, "].js")
  },
  plugins: [new webpack.DefinePlugin({
    'process.env.VUE_ENV': '"client"'
  }), new VueSSRClientPlugin()]
};
var entryClientConfig = merge(baseConf, clientConf, WEBPACK_CLIENT_CONF);

var externals = nodeExternals({
  whitelist: [/^@yqg\/cli\/dist/, /\.css$/].concat(_toConsumableArray(Object.keys(WEBPACK_ALIAS).map(function (name) {
    return new RegExp("^".concat(name));
  })))
});

var serverConf = {
  target: 'node',
  devtool: '#source-map',
  entry: WEBPACK_SERVER_ENTRY,
  output: {
    path: resolvePwd('./build'),
    filename: 'entry-server.js',
    libraryTarget: 'commonjs2'
  },
  externals: externals,
  plugins: [new webpack.DefinePlugin({
    'process.env.VUE_ENV': '"server"'
  }), new VueSSRServerPlugin()]
};
var entryServerConfig = merge(baseConf, serverConf, WEBPACK_SERVER_CONF);

function readJsonAndParse(fileSystem, filePath) {
  try {
    var content = fileSystem.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.log('read file failed', filePath);
    return null;
  }
}
var RenderDev =
function () {
  function RenderDev(app) {
    var _this = this;
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var templatePath = _ref.templatePath,
        options = _objectWithoutProperties(_ref, ["templatePath"]);
    _classCallCheck(this, RenderDev);
    _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(this, "app", null), "options", {}), "templatePath", null), "template", null), "clientManifest", null), "bundle", null), "renderer", null), "initPromise", null), "resolve", null);
    this.app = app;
    this.options = options;
    this.templatePath = templatePath;
    this.initPromise = new Promise(function (resolve) {
      return _this.resolve = resolve;
    });
    this.watchIndexHtml();
    this.initClientCompiler();
    this.initServerCompiler();
  }
  _createClass(RenderDev, [{
    key: "get",
    value: function get() {
      var _this2 = this;
      return this.initPromise.then(function () {
        return Promise.resolve(_this2.renderer);
      });
    }
  }, {
    key: "watchIndexHtml",
    value: function watchIndexHtml() {
      var self = this;
      var templatePath = self.templatePath;
      self.template = fs.readFileSync(templatePath, 'utf-8');
      chokidar.watch(templatePath).on('change', function () {
        self.template = fs.readFileSync(templatePath, 'utf-8');
        console.log('index.html template updated.');
        self.updateRenderer();
      });
    }
  }, {
    key: "initClientCompiler",
    value: function initClientCompiler() {
      var self = this;
      var app = self.app;
      entryClientConfig.entry.app = ['webpack-hot-middleware/client?reload=true', entryClientConfig.entry.app];
      entryClientConfig.output.filename = '[name].js';
      entryClientConfig.plugins.push(new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin());
      var clientCompiler = webpack(entryClientConfig);
      var devMiddleware = koaWebpackMiddleware.devMiddleware(clientCompiler, {
        publicPath: entryClientConfig.output.publicPath
      });
      var hotMiddleware = koaWebpackMiddleware.hotMiddleware(clientCompiler, {
        heartbeat: 5000
      });
      app.use(devMiddleware);
      app.use(hotMiddleware);
      clientCompiler.plugin('done', function (stats) {
        stats = stats.toJson();
        stats.errors.forEach(function (err) {
          return console.error(err);
        });
        stats.warnings.forEach(function (err) {
          return console.warn(err);
        });
        if (stats.errors.length) return;
        self.clientManifest = readJsonAndParse(devMiddleware.fileSystem, path__default.resolve(entryClientConfig.output.path, 'vue-ssr-client-manifest.json'));
        self.updateRenderer();
      });
    }
  }, {
    key: "initServerCompiler",
    value: function initServerCompiler() {
      var self = this;
      var serverCompiler = webpack(entryServerConfig);
      var mfs = new MFS();
      serverCompiler.outputFileSystem = mfs;
      serverCompiler.watch({}, function (err, stats) {
        if (err) throw err;
        stats = stats.toJson();
        if (stats.errors.length) return;
        self.bundle = readJsonAndParse(mfs, path__default.resolve(entryServerConfig.output.path, 'vue-ssr-server-bundle.json'));
        self.updateRenderer();
      });
    }
  }, {
    key: "updateRenderer",
    value: function updateRenderer() {
      var options = this.options,
          bundle = this.bundle,
          clientManifest = this.clientManifest,
          template = this.template;
      if (bundle && clientManifest) {
        this.renderer = vueServerRenderer.createBundleRenderer(bundle, _objectSpread({
          runInNewContext: false,
          clientManifest: clientManifest,
          template: template
        }, options));
        this.resolve();
      }
    }
  }]);
  return RenderDev;
}();

var vueSsrRender = DEV ? RenderDev : Render;

module.exports = vueSsrRender;
