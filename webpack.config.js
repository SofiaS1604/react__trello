const path = require("path");
const webpack = require("webpack");

const htmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");


const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const env = "development";

const config = {
    entry: [
        '@babel/polyfill',
        '@babel/register',
        'webpack-hot-middleware/client',
        "./src/index.jsx",
    ],
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: {presets: ["@babel/env", "@babel/react"]}
            },
            {
                test: /\.css$/,
                use: ['css-loader']
            },
            {
                test: /\.styl/,
                use: [
                    {
                        loader: `style-loader`
                    },
                    {
                        loader: `css-loader`
                    },
                    {
                        loader: `stylus-loader`
                    }
                ]
            },
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader'
            },
            {
                test: /\.(jpg|png|webp|gif|otf|ttf|woff|woff2|ani|eot|svg)$/,
                use:[
                    {
                        loader: `url-loader`,
                    }
                ],
                include: path.resolve(__dirname, "./src/view/images"),
            }
        ]
    },
    resolve: {
        extensions: ["*", ".js", ".jsx", ".json", ".styl"],
        alias: {
            view: path.resolve(__dirname, './src/view'),
        }
    },
    output: {
        publicPath: "/",
    },
    devServer: {
        contentBase: path.join(__dirname, "public/"),
        port: 3000,
        publicPath: "http://localhost:3000/dist/",
        hotOnly: true,
        hash: false
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin(),

        new HtmlWebpackPlugin({
            title: "todo list",
            template: "src/html-templates/index.hbs",
            env: "development",
            hash: false,
            inject: false
        }),
        new htmlWebpackHarddiskPlugin(),


        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};

module.exports = config;