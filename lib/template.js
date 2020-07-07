const event = require('./event');

const reserv_sheet = `
    <form action="reserving" method="post">
        <div>
            <span style="margin-right: 0.6rem;">예약자 이름 : </span><input type="text" name="name" placeholer="이름">
        </div>
        <div style="margin-top: 0.6rem;">
            <span style="margin-right: 0.6rem;">예약 인원 : </span>
            <select name="peopleNo">
                <option value="">인원선택</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
            </select>
        </div>
        <div style="margin-top: 0.6rem;">
            <span style="margin-right: 0.6rem;">예약 날짜 : </span>
            <select name="month">
                <option value="">월 선택</option>
                <option value="Jan">Jan</option>
                <option value="Feb">Feb</option>
                <option value="Mar">Mar</option>
                <option value="Apr">Apr</option>
                <option value="May">May</option>
                <option value="Jun">Jun</option>
                <option value=Jul">Jul</option>
                <option value="Aug">Aug</option>
                <option value="Sep">Sep</option>
                <option value="Oct">Oct</option>
                <option value="Nov">Nov</option>
                <option value="Dec">Dec</option>
            </select>
            <select name="day">
                <option value="">일 선택</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
                <option value="31">31</option>
            </select>
            <select name="time">
                <option value="">시간선택</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
            </select>
        </div>
        <input type="submit" value="제출" style="margin-top: 0.6rem;">
    </form>
`;

exports.food_select = (reserving_data, selected_food) => {
    return `
    <div style="display: block;
    position: absolute; top: 35%; left: 30%; padding: 1rem;
    color: white; background-color: gray; width: 40%; height: auto;">
        <form action='add_food' method="post">
            <input type="hidden" name="name" value="${reserving_data.name}">
            <input type="hidden" name="peopleNo" value="${reserving_data.peopleNo}">
            <input type="hidden" name="month" value="${reserving_data.month}">
            <input type="hidden" name="day" value="${reserving_data.day}">
            <input type="hidden" name="time" value="${reserving_data.time}">
            <input type="hidden" name="reservNo" value="${reserving_data.reservNo}">
            
            <select name="food">
                <option value="">요리 선택</option>
                <option value="pasta">pasta</option>
                <option value="pizza">pizza</option>
                <option value="friedrice">friedrice</option>
                <option value="beer">beer</option>
                <option value="coke">coke</option>
            </select>
            <select name="foodNo">
                <option value="">요리 개수</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <input type="submit" value="요리추가">
        </form>

        <form action="reserving_process" method="post"
        class="food_select">
            <input type="hidden" name="name" value="${reserving_data.name}">
            <input type="hidden" name="peopleNo" value="${reserving_data.peopleNo}">
            <input type="hidden" name="month" value="${reserving_data.month}">
            <input type="hidden" name="day" value="${reserving_data.day}">
            <input type="hidden" name="time" value="${reserving_data.time}">
            <input type="hidden" name="reservNo" value="${reserving_data.reservNo}">

            ${selected_food}
            <input type="submit" value="예약신청">
        </form>
    </div>
    `;
}

exports.selected_food = (foods) => {
    let list = '';
    
    foods.map( (food) => {
        list+=
        `
        <li style="margin-bottom: 0.6rem;">
            <span>요리 : </span>
            <span class="selected_food">${food.food} / </span>
            <span>주문량 : </span>
            <span class="selected_foodNo">${food.foodNo}</span>
            <input type="hidden" name="food" value="${food.food}">
            <input type="hidden" name="foodNo" value="${food.foodNo}">
        </li>
        `;
    });

    return `
        <ul>
            ${list}
        </ul>
    `;
}

exports.reserv_list = (reservations) => {
    let list = '';

    reservations.map( (reservation) => {
        list += `
        <li style="margin-bottom: 0.6rem;">
            <span> 예약번호 : </span><a href="reserved_food?id=${reservation.reservNo}">${reservation.reservNo}</a>
            <ul>
                <li>
                    <span>예약자명 : </span>${reservation.name}
                </li>
                <li>
                    <span>예약자 인원 : </span>${reservation.peopleNo}
                </li>
                <li>
                    <span>예약 일시 : </span>${reservation.created}
                </li>
            </ul>
            <a href="delete_process?id=${reservation.reservNo}">delete</a>
        </li>
        `
    });
    return `
        <ul>
            ${list}
        </ul>
    `
};

exports.reserved_food = (foods) => {
    let list = '';
    foods.map( (food) => {
        list += `
            <li style="margin-bottom: 0.6rem">
                <div>
                    <span>요리명 : </span>${food.food}
                </div>
                <div>
                    <span>요리 개수 : </span>${food.foodNo}
                </div>
            </li>
        `
    });

    return `
    <div style="display: block;
    position: absolute; top: 35%; left: 30%; padding: 1rem;
    color: white; background-color: gray; width: 40%; height: auto;">
        <div style="margin-bottom: 0.6rem">
            <span>예약번호 : </span>${foods[0].reservNo}
        </div>    
        <ul>${list}</ul>
    </div>
    `;
}

exports.home = (reserv_list, food_select, reserved_food) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body style="margin: 0; width: 100%; background-color: #ddd;">
        <div class="container" style="padding-top: 3rem; display: flex; justify-content: space-around; width: 100%; height: auto;">
            <div class="reservation_sheet" style="width: 30%; background-color: #fff;">
                <div class="title_box" style="background-color: #ff007f; width: 100%; height: 4rem; color: #eee; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; font-weight: 600;">
                    Reservation Sheet
                </div>
                <div class="content_box" style="width: 100%; height: 500px; padding: 0.6rem;">
                    ${reserv_sheet}
                </div>
                ${food_select}
            </div>
            <div class="reservation_list" style="width: 30%; background-color: #fff;">
                <div class="title_box" style="background-color: #ff007f; width: 100%; height: 4rem; color: #eee; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; font-weight: 600;">
                    Reservation List
                </div>
                <div class="content_box" style="width: 100%; height: 500px; padding: 0.6rem;">
                    ${reserv_list}
                </div>
                ${reserved_food}
            </div>
        </div>
        
        <script>
            const food_select = document.querySelector('.food_select');
            const onToggle = () => {
                event.preventDefault();
                
                if (food_select.style.display === "none") {
                    food_select.style.display = "block";
                }
                else {
                    food_select.style.display = "none";
                }
            }
        </script>
    </body>
    </html>
    `;
}