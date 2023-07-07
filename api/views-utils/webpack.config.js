const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const glob = require('glob');

module.exports = {
    mode: 'production',
    //MINIFICAR TODO DENTRO DE ESTA CARPETA.
    entry: glob.sync(path.resolve(__dirname, 'C:/xampp/htdocs/25-3-2023 nutribarf/public_html/api/views-scripts/**.js'), {
        //IGNORAR ESTE DIFRECTORIO SI LO HUBIESE.
        ignore: ['C:/xampp/htdocs/25-3-2023 nutribarf/public_html/api/views-scripts/wm.js',
            'C:/xampp/htdocs/25-3-2023 nutribarf/public_html/api/views-scripts/config.js',
        ]
    }).reduce(function (obj, el) {
        obj[path.parse(el).name] = el;
        return obj
    }, {}),
    output: {
        filename: '[name].js', //EL MISMO NOMBRE DE SALIDA QUE EL ORIGINAL.
        path: path.resolve(__dirname, 'C:/xampp/htdocs/25-3-2023 nutribarf/public_html/api/views-scripts/MINIFICADO'), //CARPETA DE SALIDA.
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                test: /\.js(\?.*)?$/i,
            }),
        ],
    },
};
