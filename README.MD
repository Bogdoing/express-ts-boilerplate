* yarn init --yes

* yarn add express

* yarn add nodemon --dev
* * yarn nodemon index.js

* yarn add typescript ts node @types/node @types/express --dev
* * yarn tsc --init



<hr>
tsconfig
    "rootDir": "./src",  
    "outDir": "./dist",
<hr>
"scripts":{
    "watch": "tsc -w",
    "dev": "nodemon --inspect dist/index.js"
},
<hr>