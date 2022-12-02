require("fix-esm").register();

import * as fs from "fs";
import * as path from "path";
import fetch from 'node-fetch';

const day = process.argv[2];

const cookie = fs.readFileSync(path.join(__dirname, 'cookie')).toString()


fetch(
    `https://adventofcode.com/2022/day/${day}/input`, {
        headers: {
            'cookie': `session=${cookie}`,
            'authority': 'adventofcode.com',
            'method': 'GET',
            'path': `/2022/day/${day}/input`,
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-US,en;q=0.9'
        }
    })
    .then((res) => {
        return new Promise((resolve, reject) => {
            const stream = res.body;
            if (stream == null) return reject('Error, null body returned')
            let ret = '';
            stream.on('data', data => ret += data.toString())
            stream.on('end', () => resolve(ret));
        })
    })
    .then((res: string) => {
        fs.writeFileSync(path.join(__dirname, `./input/${day}.txt`), res)

        const newProject = path.join(__dirname, `./${day}.ts`)

        if(!fs.existsSync(newProject)) {
            fs.writeFileSync(newProject, `import * as fs from 'fs';
import * as path from "path";
import * as R from 'ramda'

const input = fs.readFileSync(path.join(__dirname, './input/${day}.txt')).toString();`)
        }
    })
    .catch((err) => console.error("Failed: ", err))
