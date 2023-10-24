function displayDefault() {
  // Axios Textbook declaration
  let url = "https://newsapi.org/v2/everything"; // News API Basic Link. everything is their filter to find all sources.
  let para = { // Adding in the parameters for the API to filter.
      q :  "gardening food", // General query/search work is 'Gardening'. Can be changed.
      language : "en", // Filter by English language.
      apiKey : "8d18ec19967e4892bbd586aa0d1f76c9" // Insert API Key here. You can use mine for now since I didn't have to pay yet.
  };

  // Axios GET data
  axios.get(url, {params:para}) // Using the data defined above.
  .then(response => { // When data present.
    let articles = response.data.articles; // Specifying that we only want the articles content.
    let content = '' // Will be used to compile data later for innerHTML indenting.

    // Since there is a lot of different articles, we use a For Loop to extract and append each one to content.
    for (let i = 10; i < 15; i++) {
      let title = articles[i].title;
      let image = articles[i].urlToImage;
      let description = articles[i].description;
      let url = articles[i].url;
      console.log(url)

      // Appending of the specifc article's information into content in a Bootstrap Card Format.
      if (image !== null) {
        if (content == '') {
          content += `<div class="carousel-item active">
                        <img src="` + image + `" class="d-block w-100" alt="...">
                        <div class="carousel-caption">
                          <div class="title-box">
                            <h5 class='title'>` + title + `</h5>
                            <p class='description'>` + description + `</p>
                          </div>
                          <a href="` + url + `" target="_blank" class='url'>Read more</a>
                        </div>
                      </div>`
        }
        else {
          content += `<div class="carousel-item">
                        <img src="` + image + `" class="d-block w-100" alt="...">
                        <div class="carousel-caption">
                        <div class="title-box">
                        <h5 class='title'>` + title + `</h5>
                        <p class='description'>` + description + `</p>
                        </div>
                        <a href="` + url + `" target="_blank" class='url'>Read more</a>
                        </div>
                      </div>`            
        }
      }
    };
    console.log(content)
    document.getElementById('news').innerHTML = content; // Indenting the compiled content onto the HTML at div id='news'.
  });
}


