import Global from "./Global";

let URL = "http://39.98.43.215:9001";
// 39.98.43.215:9000;
// let URL = "http://192.168.3.137:9001"

export default class Http {
    // let origin:number = 0;
    // static sessionId:number;
    // static userId:number;
    // static master_url:number;
    static url:string = URL;
    static sendRequest(path:string,data:object,handler:Function,extraUrl?:string) {
        let xhr = new XMLHttpRequest()
        xhr.timeout = 5000;
        var str = "?msg=" + JSON.stringify(data);
        // for(var k in data){
        //     if(str != "?"){
        //         str += "&";
        //     }
        //     str += k + "=" + data[k];
        // }
        if(extraUrl == null){
            extraUrl = Http.url;
        }
        var requestURL = extraUrl + path + encodeURI(str);
        xhr.open("GET",requestURL, true);
        if (cc.sys.isNative){
            xhr.setRequestHeader("Accept-Encoding","gzip,deflate");
            xhr.setRequestHeader("contentType","text/html;charset=UTF-8" );
        }
        
        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)){
                Global.instance.NetStatus = true;
                //console.log("http res("+ xhr.responseText.length + "):" + xhr.responseText);
                try {
                    
                    var ret = JSON.parse(xhr.responseText);
                    if(handler !== null){
                        handler(ret);
                    }                        /* code */
                } catch (e) {
                    
                    console.log("err:" + e);
                    //handler(null);
                }
                finally{
                    // if(cc.vv && cc.vv.wc){
                    // //       cc.vv.wc.hide();    
                    // }
                }
            }
            else{
                //Global.instance.NetStatus = false;
            }
        };
        
        // if(cc.vv && cc.vv.wc){
        //     //cc.vv.wc.show();
        // }
        try {
            xhr.send();
        } catch (error) {
            Global.instance.NetStatus = false;
            //console.log(" Global.instance.NetStatus "+Global.instance.NetStatus);
            console.log("HTTP    "+error);
            
        }
        
        return xhr;
    };

    static sendPost(path:string,data:object,handler:Function,extraUrl?:string) {
        let xhr = new XMLHttpRequest()
        xhr.timeout = 5000;
       
        xhr.open("POST", Http.url + path, true);

        // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");//缺少这句，后台无法获取参数
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function() {
            //console.info(xhr.getResponseHeader('content-type')==='application/json');
            if(xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)){
                Global.instance.NetStatus = true;
                //console.log("http res("+ xhr.responseText.length + "):" + xhr.responseText);
                try {
                    
                    var ret = JSON.parse(xhr.responseText);
                    if(handler !== null){
                        handler(ret);
                    }                        /* code */
                } catch (e) {
                    console.log("err:" + e);
                    //handler(null);
                }
                finally{
                    // if(cc.vv && cc.vv.wc){
                    // //       cc.vv.wc.hide();    
                    // }
                }
            }
            else{
            }
        };
   
        //console.info(JSON.stringify(data));
        try {
            xhr.send("a=1&a=2");
        } catch (error) {
            Global.instance.NetStatus = false;
        }
        
        return xhr;
    };
    
// 中文乱码解决
// if (request.getMethod().equalsIgnoreCase("POST"))
// {
// 	request.setCharacterEncoding("UTF-8");
// 	System.out.println(request.getParameter("value"));
// }
// // 处理GET请求
// else if (request.getMethod().equalsIgnoreCase("GET"))
// {
// 	String tmp = request.getParameter("value");
// 	String a = new String(tmp.getBytes("ISO-8859-1") , "UTF-8");
// 	System.out.println(a);
// }

}
