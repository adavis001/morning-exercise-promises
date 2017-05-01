const data = ['first', 'second', 'third'];

function getData(index, cb) {
  let err = null;
  if (index < 0) { err = new Error('index out of bounds'); }
  return cb(err, data[index]);
}

// wrap getData in a promise and console log the output
new Promise((resolve, reject) => {
  getData(1, (err, data) => {
    if (err) { return reject(err); }
    else { return resolve(data); }
  });
})
.then(console.log);


// call getData three times and console log the output (use .then for the second and third call) using promises
new Promise((resolve, reject) => {
  getData(0, (err, data) => {
    if (err) { return reject(err); }
    else { return resolve(data); }
  });
})
.then((data) => {
  console.log(data);
  new Promise((resolve, reject) => {
    getData(1, (err, data) => {
      if (err) { return reject(err); }
      else { return resolve(data); }
    });
  })
  .then(console.log);
})
.then(() => {
  new Promise((resolve, reject) => {
    getData(2, (err, data) => {
      if (err) { return reject(err); }
      else { return resolve(data); }
    });
  })
  .then(console.log);
});


// create a promise within getData and use the promise to trigger the callback in getData

function getData(index, cb) {
  new Promise((resolve, reject) => {
    if (index < 0) { return reject(new Error('index out of bounds')); }
    return resolve(data[index]);
  })
  .then((data) => {
    return cb(null, data);
  })
  .catch((err) => {
    return cb(err, null);
  });
}

// create a promisified version of getData

function getDataAsync(index) {
  return new Promise((resolve, reject) => {
    if (index < 0) { return reject(new Error('index out of bounds')); }
    return resolve(data[index]);
  });
}

// call the promisified version of getData with -1, console log the error in a .catch

getDataAsync(-1)
.then((data) => {
  console.log(data);
})
.catch((err) => {
  console.log(err);
});