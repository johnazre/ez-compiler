module.exports = {
    originalScript: `"test": "echo \\"Error: no test specified\\" && exit 1"`,
     
    nextScript:  `"test": "echo \\"Error: no test specified\\" && exit 1",
        "babel": "babel ./src --out-dir ./dist -w",
        "stylus": "stylus ./src/css -o ./dist/css -w",
        "coffee": "coffee -o ./dist -c ./src -w",
        "pug": "pug ./src -o ./dist -w",
        "less": "lessc ./src/style.less ./dist/styles.css -w"`
}