module.exports = {
  personsCards : (data)=>{
    var response = '';
    console.log(data);
    data.forEach(element => {
        response += ` <!--Card-->
        <div class="col-4 p-1">
    <div class="card shadow">
        <!-- Card body -->
    <div class="card-body text-center">
        <h5 class="card-title pt-2 pb-0 mb-2">${element.lastname} ${element.firstname} ${element.patronymic}</h5>`
        posts = element.post.split(',');
        subdivisions = element.subdivision.split(',');
        for(let i = 0; i < posts.length; i++){
            response += `<p class="card-subtitle justify-content-between">${posts[i]} : ${subdivisions[i]}</p>`;
        }
        
        response += `<div class="card-footer bg-transparent justify-content-between text-right> <ul class="clear">
        <li class="d-flex justify-content-between">
            <i class="mi mi-MapPin2"></i>
            <span>${element.address}</span>
        </li>`
        var i = 0;
        element.phone.split(',').forEach(phone =>{
            response += `<li class="d-flex justify-content-between">
            ${i == 0 ?  `<i class="mi mi-Phone"></i>` : `<i class="mi"></i>`}
            <span>${phone}</span>
            </li>`;
            i++;
        })
        i = 0;
        element.email.split(',').forEach(email =>{
            response += `<li class="d-flex justify-content-between">
            ${i == 0 ?  `<i class="mi mi-Mail"></i>` : `<i class="mi"></i>`}
            <span><a href="mailto:">${email}</a></span>
            </li>`;
            i++;
        })
        response +=`</ul>
            </div>
            </div>
            </div>

        </div>`
    });

    return response;

  },

    positionsOptions :(data)=>{
      var response = '<option selected="selected">Любая</option>';
      data.forEach(element => {
          response += `<option>${element.positionname}</option>`
      });
      return response;
    }
}