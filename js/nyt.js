/* script.js */


// Calls the API, based on section selection
async function callAPI() {
    const section = document.querySelector('#section').value
    const res = await fetch(`http://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=WHoSwSB9pn4P2PrdaXW4Ay0MwizgwHiG`)
    const data = await res.json()
    displayStories(data)
}

// Displays the data
function displayStories(data) {
    if (data.status = "OK") {
        // console.log(data)
        let output = ''
        let img = ''
        const displayArea = document.querySelector('#displayArea')

        for (let i = 0; i < data.results.length; i++) {
            if (Array.isArray(data.results[i].multimedia)) {
                let imgUrl = data.results[i].multimedia[3].url
                let caption = data.results[i].multimedia[3].caption
                img = `<img src="${imgUrl}" alt=${caption}>`
            } else {
                img = `<img src="https://placehold.it/75" alt="Placeholder image">`
            }

            let section = data.results[i].section
            switch (section) {
                case 'home':
                    section = 'Home'
                    break;
                case 'arts':
                    section = 'Arts'
                    break;
                case 'automobiles':
                    section = 'Auto'
                    break;
                case 'books':
                    section = 'Books'
                    break;
                case 'business':
                    section = 'Business'
                    break;
                case 'fashion':
                    section = 'Fashion'
                    break;
                case 'dining':
                    section = 'Food'
                    break;
                case 'health':
                    section = 'Health'
                    break;
                case 'insider':
                    section = 'Insider'
                    break;
                case 'magazine':
                    section = 'Magazine'
                    break;
                case 'movies':
                    section = 'Movies'
                    break;
                case 'nyregion':
                    section = 'New York'
                    break;
                case 'obituaries':
                    section = 'Obituaries'
                    break;
                case 'opinion':
                    section = 'Opinion'
                    break;
                case 'politics':
                    section = 'Politics'
                    break;
                case 'realestate':
                    section = 'Real Estate'
                    break;
                case 'science':
                    section = 'Science'
                    break;
                case 'sunday-review':
                    section = 'Sunday Review'
                    break;
                case 'technology':
                    section = 'Tech'
                    break;
                case 'theater':
                    section = 'Theater'
                    break;
                case 'travel':
                    section = 'Travel'
                    break;
                case 'us':
                    section = 'United States'
                    break;
                case 'world':
                    section = 'World'
                    break;
                case 'at-home':
                    section = 'Stay Home'
                    break;
                case 'climate':
                    section = 'Eco'
                default:
                    break;
            }
            let title = data.results[i].title
            let url = data.results[i].url
            let abstract = data.results[i].abstract
            let date = data.results[i].published_date
            let new_date = new Date(date)
            let byline = data.results[i].byline

            output += `<div class="newsCard"><div class="newsImage">${img}</div><div class="newsTitle"><h2><a href="${url}">${title}</a></h2></div><div class="newsSection"><p>${section}</p></div><div class="newsAbstract">${abstract}</div><div class="newsDate">Published: ${new_date}</div><div class="newsByline">${byline}</div> </div>`
        }

        displayArea.innerHTML = output
    } else {
        output = '<p>Could not fetch those stories for you :(<p>'
    }
}

// Logic to select correct API section
const section = document.querySelector('#section')
section.addEventListener('change', () => {
    callAPI()
})

// Re call API on reload button press
const reload = document.querySelector('#reload')
reload.addEventListener('click', () => {
    callAPI()
})

// Call API when page loads
callAPI()