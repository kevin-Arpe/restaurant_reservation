const template = require('./template');
const qs = require('querystring');
const db = require('./db');

const templateHome = template.home;
const templateList = template.reserv_list;

exports.home = (request, response) => {
  db.query(`SELECT * FROM reserv;`, (err, reservations) => {
    const reserv_list = templateList(reservations);
    const template = templateHome(reserv_list);

    response.writeHead(200); 
    response.end(template);
  });
}

exports.reserving = (request, response) => {
  var body = '';

  request.on('data', (data) => {
    body += data;
    if (body.length > 1e6) {
      request.connection.destroy();
    }
  });
  request.on('end', () => {
    const post = qs.parse(body);
    let name = post.name;
    let peopleNo = post.peopleNo;
    let month = post.month;
    let day = post.day;
    let time = post.time;
    let reservNo = `${name}-${month}-${day}-${time}-peopleNo.${peopleNo}`;

    db.query(`INSERT INTO reserv (name, peopleNo, month, day, time, reservNo, created) VALUES (?, ?, ?, ?, ?, ?, NOW())`, [name, peopleNo, month, day, time, reservNo], (err) => {
      if (err) {
        throw err;
      }
      
      response.writeHead(302, {Location: '/'});
      response.end();
    });
  });
}

exports.submit_food = (request, response) => {
  var body = '';

  request.on('data', (data) => {
    body += data;
    if (body.length > 1e6) {
      request.connection.destroy();
    }
  });
  request.on('end', () => {
    const post = qs.parse(body);
    let food = post.food;
    let foodNo = post.foodNo;

    db.query(`INSERT INTO food2 (food, foodNo) VALUES (?, ?)`, [food, foodNo], (err) => {
      if (err) {
        throw err;
      }
      
      response.writeHead(302, {Location: '/'});
      response.end();
    });
  });
}