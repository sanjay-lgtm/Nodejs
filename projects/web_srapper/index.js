const axios = require('axios');

const pageUrl = "https://www.amazon.com/s?k=phone&page=2&crid=18EUYBSP7O1SQ&qid=1702535235&sprefix=phon%2Caps%2C280&ref=sr_pg_2"

const getPageData = async() =>{
    try {
        const res = await axios.get(pageUrl)
        const data = res.data;
        console.log(data)
        fs.writeFileSync();
    } catch (error) {
        console.log(error)
    }
}
getPageData();