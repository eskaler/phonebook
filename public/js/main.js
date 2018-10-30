include('../js/ajax.js');
// -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
window.onload = ()=>{

    sendRequest('GET', '', 'type=positions', ( req ) => {
        document.getElementById("position").innerHTML = req.response;
    })

    document.getElementById('accept').onclick = function(){
        sendRequest('GET', '', formatQuery(), ( req ) => {
            document.getElementById('result').innerHTML = req.response || '<p><h5>Данные не найдены</h4>';
        })
    }

    document.getElementById('name').onkeyup = function(){
        sendRequest('GET', '', formatQuery(), ( req ) => {
            document.getElementById('result').innerHTML = req.response || '<p><h5>Данные не найдены</h4>';
        })
    }

    document.getElementById("expand").onclick = function(){
        let name = document.getElementById("name");
        let name1 = document.getElementById("name1");
        let exp = document.getElementById("expand");
        if(name.style.visibility == "visible"){
            if(exp.getAttribute("aria-expanded") == "false"){
                name.classList.add("animated", "fadeOutDown");
                name.style.visibility = "hidden";
                name1.value = name.value;
            }
        }
        else{
            name.style.visibility = "visible"
            name.value = name1.value;
        }        
    }

    document.getElementById("reset").onclick = function(){
        document.getElementById("name").value = '';
        document.getElementById("name1").value = '';
        document.getElementById("phoneNumber").value = '';
        document.getElementById("email").value = '';
        document.getElementById("subdivision").value = '';
        document.getElementById("address").value = '';
        document.getElementById('position').selectedIndex = 0;
        
    }


}

function formatQuery(){
    let query = `type=${'GET'}`;
    let expanded = document.getElementById("expand").getAttribute("aria-expanded");
    query += `&name=${expanded == "true" ? document.getElementById('name1').value : document.getElementById('name').value}`;
    query += `&phoneNumber=${document.getElementById('phoneNumber').value}`;
    query += `&email=${document.getElementById('email').value}`;
    query += `&subdivision=${document.getElementById('subdivision').value}`;
    
    let pos = document.getElementById('position');
    posText = pos.options[pos.selectedIndex].text;
    posText = (posText == 'Любая' ? '' : posText);
    console.log(`postext = "${posText}"`);
    query += `&position=${posText}`;
    query += `&address=${document.getElementById('address').value}`;
    return query;
}

function include(src) {
    let script = document.createElement('script');
    script.src = src;
    document.getElementById('scripts').appendChild(script);
}