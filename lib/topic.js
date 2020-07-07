const template = require('./template');
const qs = require('querystring');
const db = require('./db');
const url = require('url');

const templateHome = template.home;
const templateList = template.reserv_list;
const templateFood = template.food_select;
const templateSelected = template.selected_food;
const templateReserved_food = template.reserved_food;

exports.home = (request, response) => {
  db.query(`SELECT * FROM reserv;`, (err, reservations) => {
    const reserv_list = templateList(reservations);
    const template = templateHome(reserv_list, '', '');

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
    let reservNo = `${name}_${month}_${day}_${time}_peopleNo.${peopleNo}`;

    let reserving_data = {
      'name': name,
      'peopleNo': peopleNo,
      'month': month,
      'day': day,
      'time': time,
      'reservNo': reservNo
      };

    db.query(`SELECT * FROM reserv;`, (err, reservations) => {
      const reserv_list = templateList(reservations);
      const food_select = templateFood(reserving_data, '');
      const template = templateHome(reserv_list, food_select, '');
  
      response.writeHead(200); 
      response.end(template);
    });
  });
}

exports.add_food = (request, response) => {
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
    let reservNo = post.reservNo;

    let reserving_data = {
      'name': name,
      'peopleNo': peopleNo,
      'month': month,
      'day': day,
      'time': time,
      'reservNo': reservNo
      };

    let food = post.food;
    let foodNo = post.foodNo;

    db.query(`INSERT INTO food2 (reservNo, food, foodNo) VALUES (?, ?, ?)`, [reservNo, food, foodNo], (err) => {
      db.query(`SELECT * FROM reserv;`, (err, reservations) => {
        db.query(`SELECT * FROM food2`, (err, foods) => {
          const reserv_list = templateList(reservations);
          const selected_food = templateSelected(foods);
          const food_select = templateFood(reserving_data, selected_food);
          const template = templateHome(reserv_list, food_select, '');
      
          response.writeHead(200); 
          response.end(template);
        });
      });
    });
  });
}

exports.reserving_process = (request, response) => {
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
    let reservNo = post.reservNo;

    db.query(`INSERT INTO reserv (name, peopleNo, month, day, time, reservNo, created) VALUES (?, ?, ?, ?, ?, ?, NOW());`, [name, peopleNo, month, day, time, reservNo], (err) => {
      db.query(`INSERT INTO food (reservNo, food, foodNo) SELECT reservNo, food, foodNo FROM food2;`, (err) => {
        if (err) {
          throw err;
        }
        db.query(`TRUNCATE food2;`, (err) => {
          response.writeHead(302, {Location: '/'});
          response.end();
        });
      });
    });
  });
}

exports.reserved_food = (request, response) => {
  const queryData = url.parse(request.url, true).query;
  
  db.query(`SELECT * FROM reserv`, (err, reservations) => {
    db.query(`SELECT * FROM food WHERE food.reservNo=?`, [queryData.id], (err, foods) => {
      const reserv_list = templateList(reservations);
      const reserved_food = templateReserved_food(foods);
      const template = templateHome(reserv_list, '', reserved_food);

      response.writeHead(200); 
      response.end(template);
    });
  });
}

exports.delete_process = (request, response) => {
  const queryData = url.parse(request.url, true).query;

  db.query(`DELETE FROM reserv WHERE reserv.reservNo = ?`, [queryData.id], (err) => {
    db.query(`DELETE FROM food WHERE food.reservNo = ?`, [queryData.id], (err) => {
      response.writeHead(302, {Location: '/'});
      response.end();
    });
  });
}