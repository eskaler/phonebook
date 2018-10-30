function sendRequest(method, path, args, handler) {
    let request = new XMLHttpRequest();
    if(!request) return;

    request.onreadystatechange = function(){
        if(request.readyState == 4){
            if(request.status == 200){
                handler( request );
            }else{
                console.error('Error on AJAX!');
            }
        }
         
    }

    if(method.toLowerCase() == 'get' && args.length > 0) path += `?${args}`;

    request.open(method, path, true);

    if(method.toLowerCase() == 'post'){
        request.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=utf-8");
        request.send(args);
    }else{
        request.send(null);
    }
}