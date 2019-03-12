document.getElementById("button1").addEventListener("click", loadUser);
document.getElementById("button2").addEventListener("click", loadUsers);

const api =
  "https://api.nasa.gov/planetary/apod?api_key=zo9zo2uFmheXDPrbSwQWuwvmFf6e5nwsz4P8Igj8";

const spacex = "https://api.spacexdata.com/v3/launches/";

function loadUser() {
  document.getElementById("user").innerHTML = "";
  document.getElementById("users").innerHTML = "";
  var xhr = new XMLHttpRequest();
  xhr.open("GET", api, true);

  xhr.onload = function() {
    if (this.status == 200) {
      var data = JSON.parse(this.responseText);
      console.log(data);
      var output = "";
      if (data.hdurl) {
        output +=
          "<ul>" +
          "<li><strong>Date:</strong> " +
          data.date +
          "</li>" +
          "<li><strong>Title:</strong> " +
          data.title +
          "</li>" +
          "<li><strong>Description:</strong> " +
          data.explanation +
          "</li>" +
          "<img id='image_nasa' src='" +
          data.hdurl +
          "'alt='NASA Picture'></img>" +
          "</ul>";
      } else {
        output +=
          "<ul>" +
          "<li><strong>Date:</strong> " +
          data.date +
          "</li>" +
          "<li><strong>Title:</strong> " +
          data.title +
          "</li>" +
          "<li><strong>Description:</strong> " +
          data.explanation +
          "</li>" +
          "<iframe class='youtubevid' src='" +
          data.url +
          "'></iframe>" +
          "</ul>";
      }
      document.getElementById("user").innerHTML = output;
    }
  };

  xhr.send();
}

function loadUsers() {
  document.getElementById("user").innerHTML = "";
  document.getElementById("users").innerHTML = "";
  var xhr = new XMLHttpRequest();
  xhr.open("GET", spacex, true);

  xhr.onload = function() {
    if (this.status == 200) {
      var data = JSON.parse(this.responseText);

      var output = "";

      for (var i in data) {
        var image_src = data[i].links.mission_patch;
        if (image_src) {
          output += `<div class="card column is-one-quarter">
          <div class="card-image">
            <figure id="patch_image">
              <img src="${image_src}" alt="Mission Patch">
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img src="${
                    data[i].links.mission_patch_small
                  }" alt="Mission Patch Small">
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">${data[i].rocket.rocket_name}</p>
                <p class="subtitle is-6">${data[i].rocket.rocket_type}</p>
              </div>
            </div>
        
            <div class="content">
              ${data[i].details}
              <br>
              <time><strong>Launch Year:</strong> ${data[i].launch_year}</time>
              <br>
              <a class="button is-info" href="${
                data[i].links.article_link
              }">Article</a>
            </div>
          </div>
        </div>`;
        }
      }

      document.getElementById("users").innerHTML = output;
    }
  };

  xhr.send();
}
