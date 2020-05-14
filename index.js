const isReachable = require('is-reachable')
const fs = require('fs-extra')
require('colors')

const getListWeb = () => new Promise(async (resolve, reject) => {
 try {
    let data = await fs.readFile('./list.txt', 'utf-8')
    resolve(data.split('\n'))
 } catch(err) {
   reject(err)
 }
})

;(async () => {
  try {
    const listWeb = await getListWeb()

    listWeb.forEach(async (elm, index) => {
      let checkWeb = await isReachable(elm)

      if (checkWeb) {
        console.log(`[${index+1}/${listWeb.length}] (${`Online`.green}) ${elm}`)
        fs.appendFile('./output/online.txt', elm, 'utf8')
      } else {
        console.log(`[${index+1}/${listWeb.length}] (${`Offline`.red}) ${elm}`)
        fs.appendFile('./output/offline.txt', elm, 'utf8')
      }
    })
  } catch(err) {
    console.log(err)
  }
})()