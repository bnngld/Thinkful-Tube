const youTubeUrl = "https://www.googleapis.com/youtube/v3/search";

function getData(userInput, callback) {
    const settings = {
      url: youTubeUrl,
      data: {
        part: 'snippet',
        key: 'AIzaSyCEC5bmWn2UB4DpWoXf1H74Tg1E9X2JQn4',
        q: `${userInput} in: title`,
        maxResults: 6
      },
      dataType: 'JSONP',
      type: 'GET',
      success: callback
    };
  console.log('success', callback);
    $.ajax(settings);
  }

  function displayResults(item) {
    return `
    <section class=".js-search-results">
      <a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank"><input type="image" src="${item.snippet.thumbnails.medium.url}" alt="${item.snippet.title}"/></a>
      <h3>${item.snippet.title}</h3>
      <a href="https://www.youtube.com/channel/${item.snippet.channelId}/videos" target="_blank"><h4>YouTube Channel: ${item.snippet.channelTitle}</h4></a>
    </section>
  `;
}

function displayYouTubeData(data) {
  const numberofresults = `<h3 aria-live="assertive" role="alert">Number Of Results: ${data.pageInfo.totalResults}</h3>`;
  const result = data.items.map((item, i) => displayResults(item));
  $('.js-result-container').append(numberofresults, result).prop('hidden', false);
}

function userSubmit() {
  $('.js-search-form').on('submit', event => {
    event.preventDefault();
    const userInput = $('.js-query').val(); 
    $(this).val("");
    getData(userInput, displayYouTubeData);
  });
}

$(userSubmit);