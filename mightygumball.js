/**
 * Created by richard on 15/7/8.
 */

window.onload = function()
{
    var url = "http://wickedlysmart.com/ifeelluckytoday";
    var request = new XMLHttpRequest();
    request.onload = function()
    {
        if(request.status == 200) {
            alert(request.responseText);
        }
    }
    request.open("GET",url);
    request.send(null);//null表示不传入任何数据

    JSON.stringify()
}
