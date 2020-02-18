const path = require('path')

module.exports = {
    target: 'electron-main',
    mode: 'development',
    entry: {
        main: path.join(__dirname, 'src/index.ts'),
    },
    output: {
        path: path.join(__dirname, 'assets/'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.(ts|tsx)$/,
                use: 'ts-loader',
            },
            {
                test: /\.(css)$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'},
                ],
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader',
                options: {
                    publicPath: 'js/'
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: 'file-loader'
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    performance: {
        hints: false
    }
}
