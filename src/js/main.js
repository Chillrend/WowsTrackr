var regionSelected;

$(document).ready(function () {
    var usernameSelected = $('#ilieksearch');
    $('.searchresult').hide();
    var usernameWarning = $('#res');

    usernameSelected.blur(function () {
        // $('.searchresult').hide();
    });

    usernameSelected.keyup(function() {

        regionSelected = $('#inputState :selected').val();

        var url = 'https://api.worldofwarships.'+regionSelected+'/wows/account/list/?application_id=5683096485795178c5de2515394ade39';
        var formData = {
        'search' : usernameSelected.val(),
        'limit'  : 5
        };
        let appends = $('.searchresult');
        $.ajax({
            type: 'POST',
            url: url,
            data: formData,
            dataType: 'JSON',
            encode: true,
            success: function (data) {
                if (data.status == "ok" && data.data.length > 0) {
                    let actual_resp = data.data;
                    appends.show();
                    appends.empty();
                    actual_resp.forEach(element => {
                        appends.append('<a class="searchlist" onclick="searchstore(event,this.id)" href="#" id="' + element.account_id + '">' + element.nickname + '</a>');
                    })
                } else {
                    appends.empty();

                    appends.append('<a class="searchlist">' + 'Players Not Found' + '</a>');
                }
            },
            error: function (xhr, status, error) {
                appends.empty();
                appends.append('<a class="searchlist">' + 'Something Went Wrong..' + '</a>');
            }
        });



    });



    $('[data-toggle="tooltip"]').tooltip();

    var ctx = document.getElementById('warship-types').getContext('2d');
    var labels = ['Battleships', 'Destroyers', 'Cruisers', 'Aircraft Carriers'];
    var data = [683, 7, 696, 97];
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'doughnut',

        // The data for our dataset
        data: {
            labels: labels,
            datasets: [{
                label: 'Warship Types',
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                data: data,
            }]
        },

        // Configuration options go here
        options: {

        }
    });

    var natCtx = document.getElementById('nation-types').getContext('2d');
    var natLabels = ['Japan', 'U.S.S.R', 'Germany', 'U.K.'];
    var natData = [683, 7, 696, 97];
    var natChart = new Chart(natCtx, {
        // The type of chart we want to create
        type: 'doughnut',

        // The data for our dataset
        data: {
            labels: natLabels,
            datasets: [{
                label: 'Nations',
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                data: natData,
            }]
        },

        // Configuration options go here
        options: {

        }
    });

    $('body > *').not('.searchlist, .searchresult, #res').click(function () {
        $('.searchresult').hide();
    });

    $(document.body).on('click', 'a.searchlist', function (event) {

    })

});

// function openCity(evt, tabName) {
//     var i, tabcontent, tablinks;
//     tabcontent = document.getElementsByClassName("tabcontent");
//     for (i = 0; i < tabcontent.length; i++) {
//         tabcontent[i].style.display = "none";
//     }
//     tablinks = document.getElementsByClassName("tablinks");
//     for (i = 0; i < tablinks.length; i++) {
//         tablinks[i].className = tablinks[i].className.replace(" active", "");
//     }
//     document.getElementById(tabName).style.display = "block";
//     evt.currentTarget.className += " active";
// }

$('.tablinks').click(function () {
   let tab_id = $(this).attr('data-tab');
   $('.tablinks').removeClass('active');
   $('.tabcontent').fadeOut('fast', function () {
       $("#"+tab_id).fadeIn('fast');
   });
    $(this).addClass('active');
});

function searchstore(event,id) {
    event.preventDefault();

    localStorage.setItem('account_id', id);
    localStorage.setItem('region', regionSelected);

    console.log('account_id = ' + localStorage.getItem('account_id') + ' region = ' + localStorage.getItem('region'));

    window.location.href = './stat_players.html'
}

function LogoutController($scope) {
    let user = JSON.parse(localStorage.getItem('username'));
    let realUser = user[0].uname;
    if(user == null){
        $scope.users = 'Login';
    
    }
    else{
        $scope.users = realUser;
    }
    
}
function doLogout() {
    localStorage.clear();
    window.location.href = '/WowsTrackr/login.html'
}