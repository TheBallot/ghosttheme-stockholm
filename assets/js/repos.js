$(document).ready(function() {

  function getRepos() {
    $.get('https://qky5pkgwmg.execute-api.us-east-1.amazonaws.com/github/testing', function(result) {
      for (var index in result) {
        var repo = result[index];
        $('.repos').append('<a href=https://github.com/' + repo['full_name'] + '><div class="repo"><div class="lang ' + repo['language'] + '"><span>' + repo['language'] + '</span></div><div class="details"><h3><i class="fab fa-github"></i> ' + repo['name'] + '</h3><p class="description">' + repo['description'] + '</p><p class="author"><img src="' + repo['avatar'] + '"> <span class="author">' + repo['author'] + '<span></div></div></a>');
      }
    }).done(function() {

      var reposHeight = 0;

      $(".repos").children().each(function(){
          reposHeight = reposHeight + $(this).outerHeight(true);
      });

      $('.repos').animate({
        height: reposHeight/2,
      }, 800);


      $('.repos .loader').animate({
        opacity: 0,
      }, 800, function() {
        $(this).css('display', 'none');
      });


      $('.repo').animate({
        opacity: 1,
      }, 800, function() {
        $('.repos .loader').css('display', 'none');
      });
    });

  }

  function getFeed() {
    $.get('https://qky5pkgwmg.execute-api.us-east-1.amazonaws.com/github/github-activity', function(result) {
      for (var index in result) {
        var repo = result[index];
        var commits_array = []
        var created_array = []

        if (repo['description'].includes(",")) {
          commits_array = repo['description'].split(',');
        } else {
          commits_array.push(repo['description']);
        }

        if (repo['created'].includes(",")) {
          created_array = repo['created'].split(',');
        } else {
          created_array.push(repo['created']);
        }

        for (var index in created_array) {
          var cleanedDate = created_array[index].replace(" ", "");
          var newDate = new Date(cleanedDate);
          var month = newDate.getMonth() + 1;
          var date = newDate.getDate();
        }

        var commits_length = commits_array.length;

        var newItem = $('<div class="activity"><div class="intro"><h3>' + commits_length + '</h3><div class="summary"><span>changes made to</span><h4>' + repo['repo_name'] + '</h4></div></div><div class="body"><span class="author"><img src="' + repo['avatar'] + '"><span class="name">' + repo['author'] + '</span> <span class="commits">made the following commits:</span></span><ul></ul></div></div>');
        $('.feed').append(newItem);

        $.each(commits_array, function(i, value) {
          //var date = created_array[i].split('T')[0].split('2018-')[1].replace('-', '/');
          newItem.find('ul').append('<li><span class="date">' + month + '/' + date + '</span>' + '"' + value + '"</li>');
        });

        $(".activity").not(":first").find('.body').addClass('disappear');
        $(".intro").click(function() {
          $(".activity").find('.body').addClass('disappear');
          $(this).parent().find('.body').removeClass('disappear');
        });
      }
      //removeLoaders()
    }).done(function() {


      $('.feed .loader').animate({
        opacity: 0
      }, 800, function() {
        $(this).css('display', 'none');
      });

      $('.feed').animate({
        height: '600px',
      }, 800);


      $('.feed .activity').animate({
        opacity: 1
      }, 800, function() {
        //$('.feed img').css('display', 'none');
      });
    });
  }
  getRepos();
  getFeed();
});
