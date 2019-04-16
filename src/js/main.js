$(document).ready(function () {
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

    $('[data-toggle="tooltip"]').tooltip();

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

function LogoutController($scope) {
    let user = JSON.parse(localStorage.getItem('username'));
    let realUser = user[0].uname;
    $scope.users = realUser;
}
function doLogout() {
    localStorage.clear();
    window.location.href = '/WowsTrackrHTML/login.html'
}