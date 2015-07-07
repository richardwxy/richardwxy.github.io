/**
 * Created by richard on 15/7/7.
 */
window.onload = getMyLocation;
function getMyLocation()
{
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(disPlayLocation,displayError);
    alert("hh");
    }
    else
    {
        alert("oops ");
    }
}
function disPlayLocation(position)
{
    var la = position.coords.latitude;
    var lo = position.coords.longitude;
    var div = document.getElementById("location");
    div.innerHTML = "you at la "+la+" lo "+lo;
}
function displayError(error)
{
    var errorType = {
        0:"unknow error",
        1:"permission denied ",
        2:"not available",
        3:"time out"
    };
    alert(error.errorCode);
    var msg = errorType[error.errorCode];
    if(error.errorCode == 0 || error.errorCode==2)
    {
        msg= msg+" "+error.message;
    }
    var div = window.document.getElementById("location");
    div.innerHTML = msg;
}
