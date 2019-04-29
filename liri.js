const { get } = require("axios")
const { get } = require("inquirer")



get(``)
.then(({})) => {

})
.catch (e => console.log(e))

get(`http://www.omdbapi.com/?t=aladdin&y=&plot=short&apikey=trilogy`)
.then(({ data }) => {
    console.log(data)
})
.catch(e => console.log(e))