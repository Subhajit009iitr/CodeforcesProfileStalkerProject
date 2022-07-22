var data;
function getData(){
    var handle= document.getElementById("account").value
    var urlh='https://codeforces.com/api/user.info?handles='+handle
    fetch(urlh).then(response => response.json()).then(data => {
        if (data.status == 'FAILED'){
            document.getElementById('user').style.display = "none"
            document.getElementById('noUser').style.display = "block"
            document.getElementById('noUser').innerHTML = "User Doesn't exist!"
        }
        else
        {
            document.getElementById('user').style.display = "block"
            document.getElementById('noUser').style.display = "none"
            console.log(data)
            userInfo(data)
        }
    })
}
function lag(t) {
    return new Promise(resolve => setTimeout(resolve, t));
}
async function userInfo(data){
    await lag(2000);
    var lastOnline= new Date(data.result[0].lastOnlineTimeSeconds*1000);
    var avatar=data.result[0].avatar;
    console.log(avatar)
    var display="<h2>User Info</h2><br>"+"<img src='"+avatar+"' alt='Pic Not Found'><br>"+
    "<b>Name : </b>"+((data.result[0].firstName == undefined)?'?':data.result[0].firstName)+' '+
    ((data.result[0].lastName == undefined)?'?':data.result[0].lastName)+
    "<br> <b>Handle : </b>"+data.result[0].handle+
    "<br> <b>Country : </b>"+((data.result[0].country == undefined)?'?':data.result[0].country)+
    "<br> <b>Organization : </b>"+((data.result[0].organization == undefined)?'?':data.result[0].organization)+
    "<br> <b>Rating : </b>"+data.result[0].rating+
    "<br> <b>Max Rating : </b>"+data.result[0].maxRating+
    "<br> <b>Rank : </b>"+data.result[0].rank+
    "<br> <b>Max Rank : </b>"+data.result[0].maxRank+
    "<br> <b>Friend of Count : </b>"+data.result[0].friendOfCount+
    "<br> <b>Last Online : </b>"+lastOnline;
    document.getElementById('userInfo').style.display='block';
    document.getElementById('userInfo').innerHTML=display;
}