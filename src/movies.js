// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
    const array = moviesArray.map(movie => movie.director);
    return array;
  }
  
  // Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
  function howManyMovies(moviesArray) {
    const array = moviesArray.filter(movie => movie.director === "Steven Spielberg" && movie.genre.includes("Drama"));
    return array.length;
  }
  
  // Iteration 3: All scores average - Get the average of all scores with 2 decimals
  function scoresAverage(moviesArray) {
    if(moviesArray.length === 0) {
        return 0;
    }
    const sum = moviesArray.reduce(function(accumulator, current) {
        if(!current.score) {
            return accumulator;
        }
        return accumulator + current.score;
    },0);
    const average = sum/moviesArray.length;
    return Math.round((average + Number.EPSILON) * 100) / 100;
  }
  
  // Iteration 4: Drama movies - Get the average of Drama Movies
  function dramaMoviesScore(moviesArray) {
    let drama = moviesArray.filter(movie => movie.genre.includes("Drama"));
    return scoresAverage(drama);
  }
  
  // Iteration 5: Ordering by year - Order by year, ascending (in growing order)
  function orderByYear(moviesArray) {
    let copy = [...moviesArray];
    copy.sort(function(movie1, movie2) {
      
      if(movie1.year-movie2.year !== 0) {
        return movie1.year-movie2.year;
      }
      return movie1.title.localeCompare(movie2.title);
    });
    return copy;
  }
  
  // Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
  function orderAlphabetically(moviesArray) {
    let copy = [...moviesArray];
    copy.sort(function(movie1,movie2) {
        return movie1.title.localeCompare(movie2.title);
    });
    const aux = copy.filter((movie, index) => index < 20);
    const ans = aux.map(movie => movie.title);
    return ans;
  }
  
  // BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
  function turnHoursToMinutes(moviesArray) {

    let newArray = moviesArray.map(function(movie) {
        let newMovie = {...movie};
        let str = newMovie.duration;
        let timeArray = str.split(" ");
        let hours = 0;
        let minutes = 0;
        if(timeArray[1]) {
            if(timeArray[1].length === 5) {
                minutes = Number(timeArray[1][0] + timeArray[1][1]);
            }
            else {
                minutes = Number(timeArray[1][0]);
            }
            hours = Number(timeArray[0][0]);
        } else {
            if(timeArray[0].includes("h")) {
                hours = Number(timeArray[0][0]);
            }
            else {
                if(timeArray[0].length === 5) {
                    minutes = Number(timeArray[0][0] + timeArray[0][1]);
                }
                else {
                    minutes = Number(timeArray[0][0]);
                }
            }
        }
        newMovie.duration = hours*60 + minutes;
        return newMovie;
    });
    return newArray;
  }
  
  // BONUS - Iteration 8: Best yearly score average - Best yearly score average
  function average(array) {
    let s = 0;
    for(let n of array) {
        s += n;
    }
    return s/array.length;
  }
  
  function bestYearAvg(moviesArray) {
    if(moviesArray.length === 0) {
        return null;
    }
    let dict = {};
    for(let movie of moviesArray) {
        if(movie.year in dict) {
            dict[movie.year].push(movie.score);
        }
        else {
            dict[movie.year] = [movie.score];
        }
    }
    for(let year of Object.keys(dict)) {
        dict[year] = average(dict[year]);
    }

    let year = 0;
    let max = 0;

    for(let y of Object.keys(dict)) {
        if(dict[y] > max) {
            max = dict[y];
            year = y; 
        }
        if(dict[y] === max) {
            if(y < year) {
                year = y;
            }
        }
    }
    return "The best year was " + year + " with an average score of " + max;
  }
