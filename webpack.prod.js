
const HtmlWebpack = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const CssMinimizer = require('css-minimizer-webpack-plugin');
const Terser       = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',

    output: {
        clean: true, // para limpiar después de los cambios
        filename: 'main.[contenthash].js'
    },

    module: {
        rules: [
            {
                test: /\.html$/,        // busca archivos \.html
                loader: 'html-loader',  // los carga con el html-loader
                options: {
                    sources: false
                }
            },
            {
                test: /\.css$/,        // busca archivos \.css
                exclude: /styles.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /styles.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader',
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            },


        ]
    },
    
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizer(),
            new Terser(),
        ]
    },


    plugins: [
        new HtmlWebpack({
            title: 'Mi Webpack App',
            //filename: 'index.html'
            template: './src/index.html' // archivo en que se basa
        }),

        new MiniCssExtractPlugin({
            filename: 'main.[contenthash].css',
            ignoreOrder: false
        }),

        new CopyPlugin({
            patterns: [
              { from: 'src/assets/', to: 'assets/' },
            ],
        }),
    ],
};

