module.exports = {
    presets: [ 
        [
            '@babel/preset-env',
            {
                useBuiltins: 'entry', 
                corejs: '2', 
                targets: { node: 'current' } 
            },
        ],
        '@babel/preset-typescript',
    ],
    plugins: [
        "babel-plugin-transform-import-meta"
    ],
};