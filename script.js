var previousRepos = false;

function watchForm(){
  $('form').submit(event => {
    event.preventDefault();
    let username = $('#username-search').val();
    getRepos(username);
  })
}

function getRepos(username){
  fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(responseJson => logReposDisplayRepos(responseJson))
    .catch(err => {
      alert(`Oops something went wrong: ${err.message}`);
    })
}

function logReposDisplayRepos(responseJson){
  console.log(responseJson);
  console.log(responseJson.length);
  if (previousRepos === true){
    $('li, p').remove();
    previousRepos = false;
  }
  if (responseJson.message === "Not Found"){
    alert('No user by that name try again')
  }
  else{
  for(let i = 0; i < responseJson.length; i++){
    $('ul').append(`<p>${responseJson[i].name}</p><li><a href="${responseJson[i].svn_url}">${responseJson[i].svn_url}</a></li>`)
  }
}
  previousRepos = true;
}

$(watchForm())
