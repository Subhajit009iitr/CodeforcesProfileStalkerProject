var data,cdata;
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
            userContestRating(handle)
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
async function userContestRating(handle){
    await lag(2000);
    var urlc='https://codeforces.com/api/user.rating?handle='+handle;
    fetch(urlc).then(response => response.json()).then(cdata => {
        console.log(cdata)
        var conNameDisplay='';
        var size =cdata.result.length;
        if(size == 0){
            document.getElementById('userContest').style.display='block';
            document.getElementById('userContest').innerHTML= 'No Contests Given yet!!!'
        }
        else{
            if(size > 4){
                for(i = size-1 ; i>=size-5 ; i--){
                conNameDisplay+="<tr><td>"+(cdata.result[i].contestName)+"</td><td>"+(cdata.result[i].newRating)+"</td><td>"+
                (cdata.result[i].rank)+"</td></tr>";
                }
            }
            else
            {
                for(i = size-1 ; i>=0 ; i--){
                    conNameDisplay+="<tr><td>"+(cdata.result[i].contestName)+"</td><td>"+(cdata.result[i].newRating)+"</td><td>"+
                    (cdata.result[i].rank)+"</td></tr>";
                    }
            }
            var conDisplay="<center><h2>Recent Contests</h2><table><tr><th><u>Contests</u></th><th><u>Ratings</u></th><th><u>Rank</u></th></tr>"+
            conNameDisplay+"</table></center>";
            document.getElementById('userContest').style.display='block';
            document.getElementById('userContest').innerHTML= conDisplay;
            chart(cdata,size);
            rankChart(cdata,size);
        }
    })
}
async function chart(cdata,size){
    document.getElementById('chart').style.display='block'
    document.getElementById('headChart').innerHTML='<h2>Rating Chart</h2>'
    const xValues  = new Array();
    const yValues  = new Array();
    for(i=0 ; i<size ; i++){
       xValues[i] = cdata.result[i].contestName;
       yValues[i] = cdata.result[i].newRating;
    }
    new Chart("myChart",{
        type: "line",
        data:{
            labels:xValues,
            datasets:[{
                pointRadius:3, 
                pointBackgroundColor: "rgb(0,0,255)",
                data:yValues,
            }]
        },
        options: {
            legend:{
                display:false
            }
        }
    })
}
async function rankChart(cdata,size){
    document.getElementById('newchart').style.display='block'
    document.getElementById('headChartRank').innerHTML='<h2>Rank Chart</h2>'
    const xValues  = new Array();
    const yValues  = new Array();
    for(i=0 ; i<size ; i++){
       xValues[i] = cdata.result[i].contestName;
       yValues[i] = cdata.result[i].rank;
    }
    new Chart("RankChart",{
        type: "line",
        data:{
            labels:xValues,
            datasets:[{
                pointRadius:3, 
                pointBackgroundColor: "rgb(0,0,255)",        
                data:yValues,
            }]
        },
        options: {
            legend:{
                display:false
            }
        }
    })
}