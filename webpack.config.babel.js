import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const appPath = path.resolve(__dirname, 'src');
const scriptsPath = path.resolve(appPath, 'scripts');
const stylesPath = path.resolve(appPath, 'styles');
const nodePath = path.resolve(appPath, 'node_modules');

const scriptsRoot = path.resolve(scriptsPath, 'app');
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
            path: path.resolve(__dirname, './dist'),
            filename: 'bundle.js'
        },
        resolve: {
            extensions: ['.js', '.scss', '.css']
        },
        devtool: 'source-map',
        watch: true,
        devServer: {
            contentBase: path.resolve(__dirname, './dist'),
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
                }
            ]),
            new ExtractTextPlugin('style.css')
        ]
    };
    return config;
};
