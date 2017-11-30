import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const appPath = path.resolve(__dirname, 'src');
const scriptsPath = path.resolve(appPath, 'scripts');
const stylesPath = path.resolve(appPath, 'styles');
const nodePath = path.resolve(appPath, 'node_modules');

const distPath = path.resolve(__dirname, 'dist');

const scriptsRoot = path.resolve(scriptsPath, 'app', 'index.js');
const stylesRoot = path.resolve(stylesPath, 'index.scss');

const loaders = [
    {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['env']
            }
        }
    }, {
        test: /\.(sass|scss)$/,
        exclude: [nodePath],
        include: [
            nodePath, stylesPath
        ],
        use: ExtractTextPlugin.extract({
            use: [
                {
                    loader: "css-loader",
                    options: {
                        minimize: true
                    }
                }, {
                    loader: "sass-loader"
                }
            ],
            fallback: "style-loader"
        })
    }, {
        test: /\.css$/,
        exclude: [nodePath],
        include: [
            nodePath, stylesPath
        ],
        use: ['style-loader', 'css-loader']
    }, {
        test: /\.(eot|svg|ttf)$/,
        loader: 'url-loader?name=static/fonts/**/[name].[ext]'
    }, {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url-loader?name=static/images/[name].[ext]'
    }
]

export default function() {
    const config = {
        entry: [
            scriptsRoot, stylesRoot
        ],
        output: {
            path: distPath,
            filename: 'bundle.js'
        },
        resolve: {
            extensions: ['.js', '.scss', '.css']
        },
        watch: true,
        devtool: 'source-map',
        devServer: {
            contentBase: path.resolve(__dirname),
            compress: true,
            port: 3000
        },
        module: {
            loaders
        },
        plugins: [
            new CopyWebpackPlugin([
                {
                    from: './static/images/',
                    to: './images/'
                },
                {
                    from: './src/index.html',
                    to: 'index.html'
                }
            ]),
            new ExtractTextPlugin('style.css'),
            // new webpack.optimize.UglifyJsPlugin()
        ]
    };
    return config;
};
