var webpack = require('webpack');
var path = require('path');
var glob = require('glob');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

// clean the cache on each new build
var CleanWebpackPlugin = require('clean-webpack-plugin');

//manifest for assets, helps get hashed files through json
var ManifestPlugin = require('webpack-manifest-plugin');

var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

var HtmlWebpackPlugin = require('html-webpack-plugin');

var inProduction = (process.env.NODE_ENV === 'production');

module.exports = {

    // ------------------------------------
    // Entry Points
    // ------------------------------------
    entry: {
        custom: [
            './build/js/custom.js',
            './build/sass/main.scss'
        ],
        vendor: [
            'wowjs',
            'slick-carousel',
            'bootstrap',
            'jquery-smooth-scroll',
            'jquery.scrollto',
            'popper.js'
        ]

    },
    // ------------------------------------
    // Output
    // ------------------------------------
    output: {
        path:  path.resolve(__dirname, './assets'),
        filename: 'js/[name].js'
    },

    // ------------------------------------
    // Devtool
    // ------------------------------------
    devtool: "source-map",

    // ------------------------------------
    // Module
    // ------------------------------------
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        'css-loader',
                        'resolve-url-loader',
                        'sass-loader?sourceMap'
                    ],
                    fallback: 'style-loader',
                    publicPath: './../'
                })
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name].[ext]'
                        }
                    }
                ],
            },
            {
                test: /\.(svg)$/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'svg/[name].[ext]'
                        }
                    }
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[ext]'
                        }
                    },
                    'image-webpack-loader'
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },

    // ------------------------------------
    // Plugins
    // ------------------------------------
    plugins: [
        new CleanWebpackPlugin(['assets'], {
            root: __dirname,
            verbose: true,
            dry: false,
        }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            Popper: [
                'popper.js',
                'default'
            ],
        }),
        new ExtractTextPlugin('css/style.css'),
    ]
};

// ------------------------------------
// Production Settings
// ------------------------------------

if (inProduction) {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    );
    module.exports.plugins.push(
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/,
            cssProcessorOptions: { discardComments: { removeAll: true } }
        })
    );
} else {
    module.exports.plugins.push(
        // change target to your local development url
        new BrowserSyncPlugin({
            host: '127.0.0.1',
            port: 3000,
            // proxy: {
            //     target: 'http://yourLocalDomain.local/',
            // },
            server: { baseDir: ['./'] }
        })
    );
}
