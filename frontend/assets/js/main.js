$.jribbble.setToken('ceac665a498052b5cd3a515b4da0724eb2309853daba5ae2651cc8ddd40e9937');

$.jribbble.shots('teams', {
  'per_page': 24,
  'timeframe': 'month',
  'sort': 'views'
}).then(function(res) {
  var html = [];
  res.forEach(function(shot, i) {
    html.push('<li>');
    html.push('<a href="' + shot.html_url + '" target="_blank">');
    html.push('<img src="' + shot.images.normal + '">');
    html.push('</a></li>');
  });

  $('.shots').append(html.join(''));
});