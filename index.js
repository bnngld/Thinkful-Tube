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
    <span class="js-thumbnail">
      <a href="https://www.youtube.com/watch?v=${item.id.videoId}"><img src="${item.snippet.thumbnails.medium.url}"></a>
      <h3>${item.snippet.title}</h3>
      <h4><a href="https://www.youtube.com/channel/${item.snippet.channelId}/videos">Channel: ${item.snippet.channelTitle}</a>
    </span>
  `;
}

function displayYouTubeData(data) {
  const result = data.items.map((item, i) => displayResults(item));
  $('.js-search-results').append(result);
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