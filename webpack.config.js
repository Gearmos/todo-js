
const HtmlWebpack = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',

    output: {
        clean: true // para limpiar después de los cambios
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


        ]
    },
    
    optimization: {},


    plugins: [
        new HtmlWebpack({
            title: 'Mi Webpack App',
            //filename: 'index.html'
            template: './src/index.html' // archivo en que se basa
        }),

        new MiniCssExtractPlugin({
            filename: 'nuevo-estilo.css',
            ignoreOrder: false
        }),

        new CopyPlugin({
            patterns: [
              { from: 'src/assets/', to: 'assets/' },
            ],
        }),
    ],
};

