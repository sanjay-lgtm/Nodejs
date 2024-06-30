const puppeteer = require('puppeteer');

async function scrapeIPLStats() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Example: Navigate to the stats page
  await page.goto('https://www.iplt20.com/stats/');

  // Scrape data
  const data = await page.evaluate(() => {
    // Extract data here
    const seasons = [];
    // Example for extracting player stats
    document.querySelectorAll('.season-table').forEach(season => {
      const players = Array.from(season.querySelectorAll('.player-row')).map(player => ({
        name: player.querySelector('.player-name').innerText,
        runs: parseInt(player.querySelector('.runs').innerText, 10),
        fours: parseInt(player.querySelector('.fours').innerText, 10),
        sixes: parseInt(player.querySelector('.sixes').innerText, 10),
        centuries: parseInt(player.querySelector('.centuries').innerText, 10),
        fifties: parseInt(player.querySelector('.fifties').innerText, 10),
      }));
      seasons.push(players);
    });
    return seasons;
  });

  await browser.close();
  return data;
}

scrapeIPLStats().then(data => {
  console.log(JSON.stringify(data, null, 2));
});
