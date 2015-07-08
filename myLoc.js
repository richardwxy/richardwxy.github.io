/**
 * Created by richard on 15/7/7.
 */
window.onload = getMyLocation;
var outCoords = {
    latitude:47.624851,
    longitude:-122.52099
};
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

    var km = computeDistance(position.coords,outCoords);
    var distance = document.getElementById("distance");
    distance.innerHTML = "you are "+ km + "from me";

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
function computeDistance(startCoords,destCoords)
{
    var startLatRads = degreesToRadians(startCoords.latitude);
    var startLongRads = degreesToRadians(startCoords.longitude);
    var endLatRads = degreesToRadians(destCoords.latitude);
    var endLongRads = degreesToRadians(destCoords.longitude);

    var Radius = 6371;
    var distance = Math.acos(Math.sin(startLatRads)*Math.sin(endLatRads)+Math.cos(startLatRads)*Math.cos(endLatRads)*Math.cos(startLongRads-endLongRads))*Radius;
    alert(distance);

    return distance;
}
function degreesToRadians(degress)
{
    var radians = (degress * Math.PI)/180;
    return radians;
}
