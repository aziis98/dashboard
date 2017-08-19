
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const webpack = require('webpack');
const path = require('path');
const glob = require('glob');

const files = glob.sync('./src/*.@(js|sass)');
console.log('Entry files detected: %s', files.map(f => '\n - ' + f).join(''));

const config = {
    entry: files,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.txt$/,
                use: 'raw-loader'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.sass$/,
                use: ExtractTextPlugin.extract({
                    // fallbackLoader: 'style-loader',
                    use: 'css-loader!sass-loader'
                }),
            }
        ]
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin('styles.css'),
        new CleanPlugin(['dist']),
    ]
};

module.exports = config;