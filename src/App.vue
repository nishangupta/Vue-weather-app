<template>
  <div id="app" :class="temp()>20?'warm':''">
    <main>
      <div class="search-box">
        <input
          type="text"
          class="search-bar"
          placeholder="Search..."
          v-model="query"
          @keyup.enter="fetchWeather"
        />
      </div>
      <div class="weather-wrap" v-if="weather.main">
        <div class="location-box">
          <div class="location">{{weather.name}},{{weather.sys.country}}</div>
          <div class="date">{{dateBuilder()}}</div>
        </div>
        <div class="weather-box">
          <div class="temp">{{temp()}}°C</div>
          <div class="weather">{{weather.weather[0].main}}</div>
        </div>
      </div>
      <div v-if="!weather.main">
        <div class="row">
          <div class="col-md-8 text-center mx-auto">
            <h5 class="text-light">Enter a valid city name!</h5>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      api_key: "c39f0f6060fc59c002a463956550356c",
      base_url: "https://api.openweathermap.org/data/2.5/",
      query: "",
      weather: {},
    };
  },
  methods: {
    fetchWeather(e) {
      if (e.key == "Enter") {
        fetch(
          `${this.base_url}weather?q=${this.query}&units=metric&APPID=${this.api_key}`
        )
          .then((res) => res.json())
          .then(this.setResults);
      }
    },
    setResults(results) {
      this.weather = results;
    },
    temp() {
      if (this.weather.main) {
        return Math.round(this.weather.main.temp);
      } else {
        return 0;
      }
    },
    dateBuilder() {
      let d = new Date();
      let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
      return `${day},${date} ${month} ${year}`;
    },
  },
  components: {},
  computed: {},
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
#app {
  background-image: url("./assets/cold-bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
  transition: 0.3s;
  &.warm {
    background-image: url("./assets/warm-bg.jpg");
  }
}

main {
  min-height: 100vh;
  padding: 25px;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.25),
    rgba(0, 0, 0, 0.75)
  );
}
.search-box {
  width: 100%;
  margin-bottom: 30px;
  .search-bar {
    display: block;
    width: 100%;
    padding: 15px;
    color: #313131;
    font-size: 20px;
    appearance: none;
    border: none;
    outline: none;
    background: none;
    background-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
    border-radius: 0px 16px 0px 16px;
    transition: 0.2s;
    &:focus {
      background-color: rgba(255, 255, 255, 0.75);
      box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
      border-radius: 16px 0px 16px 0px;
    }
  }
}

.location-box {
  .location {
    color: #fff;
    font-size: 32px;
    font-weight: 500;
    text-align: center;
    text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
  }
  .date {
    color: #fff;
    font-size: 20px;
    font-weight: 300;
    font-style: italic;
    text-align: center;
  }
}
.weather-box {
  text-align: center;
  .temp {
    display: inline-block;
    padding: 10px 25px;
    color: white;
    font-size: 102px;
    font-weight: 900;
    text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
    background-color: rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    margin: 30px 0px;
    box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  }
  .weather {
    color: white;
    font-size: 36px;
    font-weight: 700;
    font-style: italic;
    text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  }
}
@media screen and (min-width: 450px) {
  body {
    display: flex;
    justify-content: center;
    align-content: center;
  }
  #app {
    align-content: center;
    width: 450px;
  }
}
</style>
