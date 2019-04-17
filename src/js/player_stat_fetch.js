$(document).ready(function () {
   var shiparray = [];
   var account_id = localStorage.getItem('account_id');
   var region = localStorage.getItem('region');

   var player_stat_url = 'https://api.worldofwarships.'+ region +'/wows/account/info/?application_id=5683096485795178c5de2515394ade39&account_id='+ account_id;
    $.ajax({
        type : 'GET',
        url : player_stat_url,
        dataType : 'JSON',
        encode : true,
        success: function (data) {
            if (data.status == "ok" && data.data.length > 0) {

            }else{
               alert('we couldn`t find any players, please try again reason = api error at player stat');
               document.location.href = '.404.html'
            }
        },
        error: function (xhr, status, error) {
            alert('we couldn`t find any players, please try again');
        }
    });
});