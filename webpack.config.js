const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const devCerts = require("office-addin-dev-certs");
require("dotenv").config();

module.exports = async (env, options) => ({
    entry: {
        polyfills: "./src/polyfills.ts",
        taskpane: "./src/main.ts",
        commands: "./src/commands/commands.ts",
    },
    output: {
        path: path.resolve(__dirname, "dist"), // путь к каталогу выходных файлов - папка public
        publicPath: "/",
        filename: "[name].[fullhash].js",
    },
    devServer: {
        historyApiFallback: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        https:
            options.https !== undefined
                ? options.https
                : await devCerts.getHttpsServerOptions(),
        port: process.env.npm_package_config_dev_server_port || 3000,
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            //загрузчик для ts
            {
                test: /\.ts$/, // определяем тип файлов
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            configFile: path.resolve(
                                __dirname,
                                "tsconfig.json"
                            ),
                        },
                    },
                    "angular2-template-loader",
                ],
            },
            {
                test: /\.html$/,
                loader: "html-loader",
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: "file-loader",
                options: {
                    name: "[name].[fullhash].[ext]",
                },
            },
            {
                test: /\.css$/,
                exclude: path.resolve(__dirname, "src/app"),
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.css$/,
                include: path.resolve(__dirname, "src/app"),
                loader: "raw-loader",
            },
        ],
    },
    plugins: [
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core/,
            path.resolve(__dirname, "src"), // каталог с исходными файлами
            {} // карта маршрутов
        ),
        new HtmlWebpackPlugin({
            template: "src/index.html",
            filename: "taskpane.html",
            chunks: ["polyfills", "taskpane"],
        }),
        new HtmlWebpackPlugin({
            filename: "commands.html",
            template: "./src/commands/commands.html",
            chunks: ["commands"],
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.LoaderOptionsPlugin({
            htmlLoader: {
                minimize: false,
            },
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "manifest.xml",
                    to: "[name][ext]",
                    transform(content) {
                        return content
                            .toString()
                            .replace(
                                new RegExp("{blobStore}", "g"),
                                process.env.URL
                            );
                    },
                },
                {
                    from: "./assets",
                    to: "assets",
                    force: true,
                },
            ],
        }),
    ],
});
