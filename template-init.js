
const fs = require('fs');
const path = require('path');
const init = async function ({project,inquirer}) {
    const options = await inquirer.prompt([
        {type: "input", name: "name", message: "package name: ", default: project},
        {type: "input", name: "version", message: "version: ", default: '0.0.0'},
        {type: "input", name: "description", message: "description: "},
        {type: "input", name: "main", message: "entry point: ", default: 'index.js'},
        {type: "input", name: "repository", message: "git repository: "},
        {type: "input", name: "keywords", message: "keywords: ", default: project},
        {type: "input", name: "author", message: "author: "},
        {type: "input", name: "license", message: "license: ", default: 'MIT'},
    ])

    const setting = require('./package.json');
    const {repository, ...rest} = options;

    Object.assign(setting, rest);
    setting.repository.url = repository;

    fs.writeFile(path.resolve(__dirname, './package.json'), JSON.stringify(setting, null, 2), function (err) {
        if (err) {
            throw err
        }
        fs.unlink(path.resolve(__dirname, './template-init.js'), function (err) {
            if (err) {
                throw err
            }
        })
    });


}


module.exports = init;

