var shiparray = [];
var page_count = 1;
var ship_url = 'https://api.worldofwarships.asia/wows/encyclopedia/ships/?application_id=5683096485795178c5de2515394ade39&language=en&page_no='+ page_count +'&fields=description%2Cimages%2Cnation%2Cis_premium%2Cship_id%2Ctype%2Cname%2Ctier';

var account_id = localStorage.getItem('account_id');
var region = localStorage.getItem('region');

var player_ship_url = 'https://api.worldofwarships.'+ region +'/wows/ships/stats/?application_id=5683096485795178c5de2515394ade39&account_id='+ account_id +'&in_garage=1&language=en';

function getShipArray(){
    for (let i = 1; i < 5; i++) {
        ship_url = 'https://api.worldofwarships.asia/wows/encyclopedia/ships/?application_id=5683096485795178c5de2515394ade39&language=en&page_no='+ page_count +'&fields=description%2Cimages%2Cnation%2Cis_premium%2Cship_id%2Ctype%2Cname%2Ctier';
        $.ajax({
            type : 'GET',
            url : ship_url,
            dataType : 'JSON',
            async: false,
            encode : true,
            success: function (data) {
                if (data.status == "ok") {
                    let real_data = data.data;

                    for (let key in real_data) {

                        let ship_to_push = [];
                        ship_to_push[key] = {
                            description: real_data[key].description,
                            nation: real_data[key].nation,
                            is_premium: real_data[key].is_premium,
                            ship_id: real_data[key].ship_id,
                            images: real_data[key].images,
                            type: real_data[key].type,
                            name: real_data[key].name,
                            tier: real_data[key].tier,
                        };

                        switch (ship_to_push[key].nation) {
                            case 'japan' :
                                ship_to_push[key]['waving_flag'] = './src/img/flags/item_image_flag__japan.webp';
                                ship_to_push[key]['static_flag'] = 'http://wiki.gcdn.co/images/5/5b/Wows_flag_Japan.png';
                                break;
                            case 'commonwealth' :
                                ship_to_push[key]['waving_flag'] = './src/img/flags/item_image_flag__commonwealth.webp';
                                ship_to_push[key]['static_flag'] = 'http://wiki.gcdn.co/images/3/3e/Wows_flag_Commonwealth.PNG';
                                break;
                            case 'france' :
                                ship_to_push[key]['waving_flag'] = './src/img/flags/item_image_flag__france.webp';
                                ship_to_push[key]['static_flag'] = 'http://wiki.gcdn.co/images/7/71/Wows_flag_France.png';
                                break;
                            case 'germany' :
                                ship_to_push[key]['waving_flag'] = './src/img/flags/item_image_flag__germany.webp';
                                ship_to_push[key]['static_flag'] = 'http://wiki.gcdn.co/images/6/6b/Wows_flag_Germany.png';
                                break;
                            case 'italy' :
                                ship_to_push[key]['waving_flag'] = './src/img/flags/item_image_flag__italy.png';
                                ship_to_push[key]['static_flag'] = 'http://wiki.gcdn.co/images/d/d1/Wows_flag_Italy.png';
                                break;
                            case 'pan_asia' :
                                ship_to_push[key]['waving_flag'] = './src/img/flags/item_image_flag__panasia.webp';
                                ship_to_push[key]['static_flag'] = 'http://wiki.gcdn.co/images/3/33/Wows_flag_Pan_Asia.png';
                                break;
                            case 'poland' :
                                ship_to_push[key]['waving_flag'] = './src/img/flags/item_image_flag__japan.webp';
                                ship_to_push[key]['static_flag'] = 'http://wiki.gcdn.co/images/5/5b/Wows_flag_Japan.png';
                                break;
                            case 'uk' :
                                ship_to_push[key]['waving_flag'] = './src/img/flags/item_image_flag__uk.webp';
                                ship_to_push[key]['static_flag'] = 'http://wiki.gcdn.co/images/3/34/Wows_flag_UK.png';
                                break;
                            case 'ussr' :
                                ship_to_push[key]['waving_flag'] = './src/img/flags/item_image_flag__ussr.webp';
                                ship_to_push[key]['static_flag'] = 'http://wiki.gcdn.co/images/0/04/Wows_flag_Russian_Empire_and_USSR.png';
                                break;
                            case 'usa' :
                                ship_to_push[key]['waving_flag'] = './src/img/flags/item_image_flag__usa.webp';
                                ship_to_push[key]['static_flag'] = 'http://wiki.gcdn.co/images/f/f2/Wows_flag_USA.png';
                                break;
                            default:
                                ship_to_push[key]['waving_flag'] = '';
                                ship_to_push[key]['static_flag'] = 'http://wiki.gcdn.co/images/f/f2/Wows_flag_USA.png';
                                break;

                        }
                        switch(ship_to_push[key].type){
                            case 'Battleship':
                                ship_to_push[key]['icons'] = 'icon-BB';
                                break;
                            case 'Cruiser':
                                ship_to_push[key]['icons'] = 'icon-CA';
                                break;
                            case 'Destroyer':
                                ship_to_push[key]['icons'] = 'icon-DD';
                                break;
                            case 'AirCarrier':
                                ship_to_push[key]['icons'] = 'icon-CV';
                                break;
                            default:
                                ship_to_push[key]['icons'] = 'icon-CA';
                                break;
                        }
                        if(ship_to_push[key].is_premium == true){
                            ship_to_push[key]['premium_css'] = 'text-premium';
                        }else{
                            ship_to_push[key]['premium_css'] = 'text-white';
                        }

                        shiparray[key] = ship_to_push[key];
                    }

                    console.log(shiparray);
                }else{
                    alert('we couldn`t find any players, please try again. reason = api error at retrieving ship list');
                    console.log(data.error.message);
                    // document.location.href = './404.html'
                }
            },
            error: function (xhr, status, error) {
                alert('we couldn`t find any players ship, please try again. reason = ' + xhr.responseText);
                // document.location.href = './404.html'

            }
        });
        page_count = page_count+1;

    }
}
function getPlayerShipStatistics(){
    $.ajax({
            type : 'GET',
            url : player_ship_url,
            async: false,
            dataType : 'JSON',
            encode : true,
            success: function (data) {
                if (data.status == "ok") {
                    let real_data = data.data[account_id];
                    real_data.forEach(function (value,index) {
                        let ship_id = value.ship_id;
                        let ship_fetched_arr = shiparray[ship_id];
                        console.log(ship_fetched_arr);
                        if (ship_fetched_arr == null){

                        }else{
                            $('#ship-stats:hidden').append('<div class="card bg-dark '+ ship_fetched_arr.premium_css +'">\n' +
                                '        <img src="'+ ship_fetched_arr.waving_flag +'" class="card-img img-fluid" alt="'+ ship_fetched_arr.nation +' Flag">\n' +
                                '        <div class="card-img-overlay">\n' +
                                '            <h5 class="card-title '+ ship_fetched_arr.premium_css +'"><img height="24px" src="'+ ship_fetched_arr.static_flag +'" alt="'+ ship_fetched_arr.nation +'"><i class="ship-icon '+ ship_fetched_arr.icons +'"></i> '+ romanize(ship_fetched_arr.tier) +  ' ' + ship_fetched_arr.name + '</h5>\n' +
                                '            <img class="img-fluid" src="' + ship_fetched_arr.images.large + '" alt="' + ship_fetched_arr.name + '">\n' +
                                '        </div>\n' +
                                '        <div class="card-img-overlay no-display p-lg-5">\n' +
                                '            <p><i class="icon-battle"></i> Battles : ' + value.battles + '</p>\n' +
                                '            <p><i class="fas fa-flag"></i> Winrates : ' + calculatePercentage(value.pvp.wins, value.battles) + '</p>\n' +
                                '            <p><i class="icon-sunk"></i> Ships Sunk : ' + value.pvp.max_frags_battle + '</p>\n' +
                                '            <p><i class="fas fa-star"></i> Experience : ' + floorNum(value.pvp.xp/value.battles) + '</p>\n' +
                                '        </div>\n' +
                                '    </div>');
                        }
                    });
                    $('#ship-stats:hidden > div.card').chunk(4).wrap('<div class="card-group mt-4"></div>')
                }else{
                    alert('we couldn`t find any players, please try again. reason = api error at retrieving player ship stat');
                    document.location.href = './404.html'
                }
            },
            error: function (xhr, status, error) {
                alert('we couldn`t find any players ship, please try again. reason = ' + xhr.responseText);
                document.location.href = './404.html'

            }
        });
}

$.fn.chunk = function(size) {
    var arr = [];
    for (var i = 0; i < this.length; i += size) {
        arr.push(this.slice(i, i + size));
    }
    return this.pushStack(arr, "chunk", size);
};

$(document).ready(function () {
    $.when(getShipArray()).then(function () {
        getPlayerShipStatistics();
    });
   var account_details = [];

   var player_stat_url = 'https://api.worldofwarships.'+ region +'/wows/account/info/?application_id=5683096485795178c5de2515394ade39&account_id='+ account_id;
    $.ajax({
        type : 'GET',
        url : player_stat_url,
        dataType : 'JSON',
        encode : true,
        success: function (data) {
            if (data.status == "ok") {

                account_details = data;

                let real_data = data.data[account_id];

                $('td.account_name').append('<h4 class="condensed">'+ real_data.nickname +'</h4>\n' +
                    '                            <span>Registered: '+ formatDate(real_data.created_at) +'</span>\n' +
                    '                            <p>Rank 14, Level ' + real_data.leveling_tier +' of service record</p>');

                let avg_exp = Math.round(real_data.statistics.pvp.xp/real_data.statistics.pvp.battles);
                let damage_per_bat = Math.round(real_data.statistics.pvp.damage_dealt/real_data.statistics.pvp.battles);
                let kill_death = real_data.statistics.pvp.frags/(real_data.statistics.pvp.battles - real_data.statistics.pvp.survived_battles);

                $('#basic_stats').append('<div>' + addCommas(real_data.statistics.pvp.battles) + '</div>\n' +
                    '                    <div>' + calculatePercentage(real_data.statistics.pvp.wins, real_data.statistics.pvp.battles) +'</div>\n' +
                    '                    <div>'+ addCommas(avg_exp) +'</div>\n' +
                    '                    <div>' + addCommas(damage_per_bat) + '</div>\n' +
                    '                    <div>'+ floorNum(kill_death) +'</div>');


                $('#overall_result').append('<tr>\n' +
                    '                            <td class="_name"><span>Battles</span></td>\n' +
                    '                            <td class="_value"><span>' + addCommas(real_data.statistics.pvp.battles) + '</span></td>\n' +
                    '                        </tr>\n' +
                    '                        <tr>\n' +
                    '                            <td class="_name"><span>Victories</span></td>\n' +
                    '                            <td class="_value"><span>' + addCommas(real_data.statistics.pvp.wins) + '</span>\n' +
                    '                                <small>(' + calculatePercentage(real_data.statistics.pvp.wins, real_data.statistics.pvp.battles) + ')</small>\n' +
                    '                            </td>\n' +
                    '                        </tr>\n' +
                    '                        <tr>\n' +
                    '                            <td class="_name"><span>Battles survived</span></td>\n' +
                    '                            <td class="_value"><span>' + real_data.statistics.pvp.survived_battles + '</span></td>\n' +
                    '                        </tr>\n' +
                    '                        <tr>\n' +
                    '                            <td class="_name"><span>Hit Ratio</span></td>\n' +
                    '                            <td class="_value"><span>' + calculatePercentage(real_data.statistics.pvp.main_battery.hits, real_data.statistics.pvp.main_battery.shots) + '</span></td>\n' +
                    '                        </tr>\n' +
                    '                        <tr>\n' +
                    '                            <td class="_name"><span>Damage caused</span></td>\n' +
                    '                            <td class="_value"><span>' + addCommas(real_data.statistics.pvp.damage_dealt) + '</span></td>\n' +
                    '                        </tr>\n' +
                    '                        <tr>\n' +
                    '                            <td class="_name"><span>Warships destroyed</span></td>\n' +
                    '                            <td class="_value"><span>' + addCommas(real_data.statistics.pvp.frags) + '</span></td>\n' +
                    '                        </tr>\n' +
                    '                        <tr>\n' +
                    '                            <td class="_name"><span>Aircraft destroyed</span></td>\n' +
                    '                            <td class="_value"><span>' + addCommas(real_data.statistics.pvp.planes_killed) + '</span></td>\n' +
                    '                        </tr>');

                let avg_sunk_battle = floorNum(real_data.statistics.pvp.frags/real_data.statistics.pvp.battles);
                let avg_planes_down_battle =floorNum(real_data.statistics.pvp.planes_killed/real_data.statistics.pvp.battles);

                $('#average_result').append('<tr>\n' +
                    '                            <td class="_name"><span>Experience</span></td>\n' +
                    '                            <td class="_value"><span>' + addCommas(avg_exp) + '</span></td>\n' +
                    '                        </tr>\n' +
                    '                        <tr>\n' +
                    '                            <td class="_name"><span>Damage caused</span></td>\n' +
                    '                            <td class="_value"><span>' + addCommas(damage_per_bat) + '</span></td>\n' +
                    '                        </tr>\n' +
                    '                        <tr>\n' +
                    '                            <td class="_name"><span>Warships destroyed</span></td>\n' +
                    '                            <td class="_value"><span>' + addCommas(avg_sunk_battle) + '</span></td>\n' +
                    '                        </tr>\n' +
                    '                        <tr>\n' +
                    '                            <td class="_name"><span>Aircraft destroyed</span></td>\n' +
                    '                            <td class="_value"><span>' + addCommas(avg_planes_down_battle) + '</span></td>\n' +
                    '                        </tr>');


                $('#highest_score').append('<tr>\n' +
                    '                            <td class="_name"><span>Experience</span></td>\n' +
                    '                            <td class="_value"><span>' + addCommas(real_data.statistics.pvp.max_xp) + '</span></td>\n' +
                    '                        </tr>\n' +
                    '                        <tr>\n' +
                    '                            <td class="_name"><span>Damage caused</span></td>\n' +
                    '                            <td class="_value"><span>' + addCommas(real_data.statistics.pvp.max_damage_dealt) + '</span></td>\n' +
                    '                        </tr>\n' +
                    '                        <tr>\n' +
                    '                            <td class="_name"><span>Warships destroyed</span></td>\n' +
                    '                            <td class="_value"><span>' + addCommas(real_data.statistics.pvp.max_frags_battle) + '</span></td>\n' +
                    '                        </tr>\n' +
                    '                        <tr>\n' +
                    '                            <td class="_name"><span>Aircraft destroyed</span></td>\n' +
                    '                            <td class="_value"><span>' + addCommas(real_data.statistics.pvp.max_planes_killed) + '</span></td>\n' +
                    '                        </tr>');

                $('#armament_use').append('<div>' + addCommas(real_data.statistics.pvp.main_battery.frags) + '</div>\n' +
                    '                    <div>' + addCommas(real_data.statistics.pvp.aircraft.frags) + '</div>\n' +
                    '                    <div>' + addCommas(real_data.statistics.pvp.torpedoes.frags) + '</div>\n' +
                    '                    <div>' + addCommas(real_data.statistics.pvp.second_battery.frags + real_data.statistics.pvp.ramming.frags) + '</div>');



                $('#detailed_warship_sunks:hidden').append('<tr>\n' +
                    '                            <td class="_name"><span>Main battery</span></td>\n' +
                    '                            <td class="_value"><span>' + addCommas(real_data.statistics.pvp.main_battery.frags) + '</span></td>\n' +
                    '                        </tr>\n' +
                    '                        <tr>\n' +
                    '                            <td class="_name"><span>Torpedoes</span></td>\n' +
                    '                            <td class="_value"><span>' + addCommas(real_data.statistics.pvp.torpedoes.frags) + '</span></td>\n' +
                    '                        </tr>\n' +
                    '                        <tr>\n' +
                    '                            <td class="_name"><span>Secondary battery</span></td>\n' +
                    '                            <td class="_value"><span>' + addCommas(real_data.statistics.pvp.second_battery.frags) + '</span></td>\n' +
                    '                        </tr>\n' +
                    '                        <tr>\n' +
                    '                            <td class="_name"><span>Aircraft</span></td>\n' +
                    '                            <td class="_value"><span>' + addCommas(real_data.statistics.pvp.aircraft.frags) + '</span></td>\n' +
                    '                        </tr>\n' +
                    '                        <tr>\n' +
                    '                            <td class="_name"><span>Ramming</span></td>\n' +
                    '                            <td class="_value"><span>' + addCommas(real_data.statistics.pvp.ramming.frags) + '</span></td>\n' +
                    '                        </tr>');
                let mb_ratio = calculatePercentage(real_data.statistics.pvp.main_battery.hits, real_data.statistics.pvp.main_battery.shots);
                let torp_ratio = calculatePercentage(real_data.statistics.pvp.torpedoes.hits, real_data.statistics.pvp.torpedoes.shots);
                let secondary_ratio = calculatePercentage(real_data.statistics.pvp.second_battery.hits, real_data.statistics.pvp.second_battery.shots)

                $('#detailed_ratio:hidden').append('<tr>\n' +
                    '                            <td class="_name"><span>Main battery</span></td>\n' +
                    '                            <td class="_value"><span>'+ mb_ratio +'</span></td>\n' +
                    '                        </tr>\n' +
                    '                        <tr>\n' +
                    '                            <td class="_name"><span>Torpedoes</span></td>\n' +
                    '                            <td class="_value"><span>'+ torp_ratio +'</span></td>\n' +
                    '                        </tr>\n' +
                    '                        <tr>\n' +
                    '                            <td class="_name"><span>Secondary battery</span></td>\n' +
                    '                            <td class="_value"><span>'+ secondary_ratio +'</span></td>\n' +
                    '                        </tr>');

                $('#detailed_max_frags:hidden').append('<tr>\n' +
                    '                            <td class="_name"><span>Main battery</span></td>\n' +
                    '                            <td class="_value"><span>'+ real_data.statistics.pvp.main_battery.max_frags_battle +'</span></td>\n' +
                    '                        </tr>\n' +
                    '                        <tr>\n' +
                    '                            <td class="_name"><span>Torpedoes</span></td>\n' +
                    '                            <td class="_value"><span>'+ real_data.statistics.pvp.torpedoes.max_frags_battle +'</span></td>\n' +
                    '                        </tr>\n' +
                    '                        <tr>\n' +
                    '                            <td class="_name"><span>Secondary battery</span></td>\n' +
                    '                            <td class="_value"><span>'+ real_data.statistics.pvp.second_battery.max_frags_battle +'</span></td>\n' +
                    '                        </tr>\n' +
                    '                        <tr>\n' +
                    '                            <td class="_name"><span>Aircraft</span></td>\n' +
                    '                            <td class="_value"><span>'+ real_data.statistics.pvp.aircraft.max_frags_battle +'</span></td>\n' +
                    '                        </tr>\n' +
                    '                        <tr>\n' +
                    '                            <td class="_name"><span>Ramming</span></td>\n' +
                    '                            <td class="_value"><span>'+ real_data.statistics.pvp.ramming.max_frags_battle +'</span></td>\n' +
                    '                        </tr>');

                $('#detailed_endurance:hidden').append('<tr>\n' +
                    '                            <td class="_name"><span>Battle Survived</span></td>\n' +
                    '                            <td class="_value"><span>'+ addCommas(real_data.statistics.pvp.survived_battles) +'</span></td>\n' +
                    '                        </tr>\n' +
                    '                        <tr>\n' +
                    '                            <td class="_name"><span>Victories in Battle Survived</span></td>\n' +
                    '                            <td class="_value"><span>'+ addCommas(real_data.statistics.pvp.survived_wins) +'</span></td>\n' +
                    '                        </tr>\n' +
                    '                        <tr>\n' +
                    '                            <td class="_name"><span>Distance Sailed in Whole time (Miles)</span></td>\n' +
                    '                            <td class="_value"><span>'+ addCommas(real_data.statistics.distance) +'</span></td>\n' +
                    '                        </tr>')

            }else{
               alert('we couldn`t find any players, please try again. reason = api error at player stat');
               document.location.href = './404.html'
            }
        },
        error: function (xhr, status, error) {
            alert('we couldn`t find any players, please try again. reason = ' + xhr.responseText);
            document.location.href = './404.html'

        }
    });

    var players_clans_url = 'https://api.worldofwarships.asia/wows/clans/accountinfo/?application_id=5fc36a66ef983d8db733247ce21643f9&account_id=' + account_id +'&extra=clan';
    $.ajax({
        type : 'GET',
        url : players_clans_url,
        dataType : 'JSON',
        encode : true,
        success: function (data) {
            if (data.status == "ok") {
                let real_data = data.data[account_id];
                let clan_tag = '[' + real_data.clan.tag + ']';
                let clan_name = real_data.clan.name;
                let technical_position;
                switch (real_data.role) {
                    case 'executive_officer' :
                        technical_position = 'Deputy Commander';
                        break;
                    case 'commander' :
                        technical_position= 'Commander';
                        break;
                    case 'recruitment_officer' :
                        technical_position = 'Recruiter';
                        break;
                    default :
                        technical_position = 'Line Officer';
                        break;
                }

                $('#clans').append('<h4 class="condensed">Clans</h4>\n' +
                    '                <h6>' + clan_tag + clan_name +'</h6>\n' +
                    '                <p>'+ technical_position +'</p>')
            }else{
                alert('we couldn`t find any players, please try again. reason = api error at player stat');
                document.location.href = './404.html';
            }
        },
        error: function (xhr, status, error) {
            alert('we couldn`t find any players, please try again. reason = ' + xhr.responseText);
            document.location.href = './404.html';

        }
    });

});

function addCommas(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function floorNum(num) {
    number = Math.round(num*100)/100;
    return number.toString();
}

function formatDate(epoch) {
    var date = new Date(epoch*1000);
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

function calculatePercentage(win, battles) {

    let winrate = (win/battles) * 100;
    let floored_wr = Math.round(winrate * 100) / 100;
    return (floored_wr.toString() + '%');
}

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
    }
    return copy;
}

function romanize (num) {
    if (isNaN(num))
        return NaN;
    var digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
            "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
            "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}