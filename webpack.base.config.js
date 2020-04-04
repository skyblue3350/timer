const path = require('path')

const baseConfig= {
    node: {
        __dirname: false,
        __filename: false,
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
                    publicPath: './'
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
    },
}

module.exports = baseConfig