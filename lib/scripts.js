module.exports = {
    originalScript: `"test": "echo \\"Error: no test specified\\" && exit 1"`,
     
    nextScript:  `"test": "echo \\"Error: no test specified\\" && exit 1",
        "babel": "babel ./src --out-dir ./dist",
        "stylus": "stylus ./src/css -o ./dist/css",
        "coffee": "coffee -o ./dist -c ./src",
        "pug": "pug ./src -o ./dist",
        "less: "lessc ./src/style.less ./dist/style.css`
}