function display_default() {
  console.log("===[START] display_default() ===");

  const url =
    "https://api.nytimes.com/svc/search/v2/articlesearch.json";
  const query = "edible gardening";
  const key = "yafiAAAqpFtXALxGbamgw5znq8hEAaW1";
  const filter = 'news_desk:("Home")';

  const params = {
    q: query,
    fq: filter,
    "api-key": key,
  };
  axios
  .get(url, { params })
  .then((response) => {
    const docs = response.data.response.docs;
    console.log(docs);
    const images = docs
      .filter(doc => doc.multimedia.length > 0) // Filter out objects without multimedia
      .map(doc => {
        console.log(doc.multimedia);
        const imageUrl = "https://www.nytimes.com/" + doc.multimedia[0].url;
        console.log(imageUrl);
        
        return imageUrl;
      });
    populateCarousel(images);
  })
  .catch((error) => {
    console.error(error);
  });

  console.log("===[END] display_default() ===");
}


function populateCarousel(images) {
  const carouselInner = document.querySelector('.carousel-inner');
  carouselInner.innerHTML = ''; // Clear previous carousel items before populating

  images.forEach((image, index) => {
      const imageUrl = image;
      const imageDiv = document.createElement('div');
      imageDiv.classList.add('carousel-item');
      if (index === 0) {
          imageDiv.classList.add('block', 'opacity-100');
      }
      const img = document.createElement('img');
      img.src = imageUrl;
      img.classList.add('object-cover', 'w-full', 'h-full');
      img.alt = 'carousel image';
      imageDiv.appendChild(img);
      carouselInner.appendChild(imageDiv);
  });
}

