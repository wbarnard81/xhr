window.addEventListener('load', () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    '.temperature-description'
  );
  let temperatureDegree = document.querySelector('.temperature-degree');
  let temperatureSection = document.querySelector('.temperature');
  let temperatureSpan = document.querySelector('.temperature span');
  let locationTimezone = document.querySelector('.location-timezone');
  let weatherImage = document.querySelector('img');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api = `${proxy}https://api.darksky.net/forecast/d7bb2eccb9e9f80e5b9cfd19843ef9e6/${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          const { temperature, summary, icon } = data.currently;
          let celsius = Math.floor((temperature - 32) * (5 / 9));
          temperatureDegree.textContent = celsius;
          temperatureDescription.textContent = `It's ${summary}`;
          locationTimezone.textContent = `Location: ${data.timezone}`;

          weatherImage.src = `images/${icon}.jpg`;

          setIcons(icon, document.querySelector('.icon'));

          temperatureSection.addEventListener('click', () => {
            if (temperatureSpan.textContent === 'C') {
              temperatureSpan.textContent = 'F';
              temperatureDegree.textContent = Math.floor(temperature);
            } else {
              temperatureSpan.textContent = 'C';
              temperatureDegree.textContent = celsius;
            }
          });

          document.querySelector('#loadingImage').setAttribute('hidden', '');
          document.querySelector('.hidden').removeAttribute('hidden');
        });
    });
  } else {
    h1.textContent =
      'This site needs to know your location to work properly. :-(';
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: 'white' });
    const currentIcon = icon.replace(/-/g, '_').toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
