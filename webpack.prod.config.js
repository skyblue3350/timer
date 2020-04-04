const webpack = require('webpack');
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.base.config')

const env = 'production'

const baseDevConfig= {
    ...baseConfig,
    mode: env,
    watch: false,
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                mode: JSON.stringify(env),
            }
        })
    ]
}

module.exports = [
    {
        ...baseDevConfig,
        target: 'electron-main',
        entry: {
            main: path.join(__dirname, 'src/browser/index.ts'),
        },
        output: {
            path: path.join(__dirname, 'assets/browser/'),
            filename: '[name].js'
        },
    },
    {
        ...baseDevConfig,
        target: 'electron-renderer',
        entry: {
            bundle: path.join(__dirname, 'src/renderer/index.tsx'),
        },
        output: {
            path: path.join(__dirname, 'assets/renderer/'),
            filename: '[name].js'
        },
        plugins: [
            ...baseDevConfig.plugins,
            new HtmlWebpackPlugin({
                title: 'Timer',
                template: 'src/renderer/index.html'
            })
        ]
    }
]
