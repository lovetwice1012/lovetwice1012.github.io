$(function () {
  $('#recapchajs').submit(function () {
    var flag = 0;
    var grecaptcharesponse = grecaptcha.getResponse();
    var secretAPIkey = $('#grecaptchakey').val();
    $.post("https://script.google.com/macros/s/AKfycbyC-ANdo97T-1V3c4rZ1EAGkxOF0VukbLXa7Og4-mcUW6mmhvM/exec", JSON.stringify({
      'secret': secretAPIkey,
      'response': grecaptcharesponse,
    }), function (data) {
      data = JSON.parse(data);
      if (data.success) {
        alert("success");
        let f = document.createElement('form');
        f.method = 'post';
        f.action = document.getElementById("recapchajs").action;
        var innerHTML = "";
        for (const element of document.getElementById("recapchajs").elements) {
          innerHTML = innerHTML + "<input type=\"hidden\" name=\"" + element.name + "\" id=\"" + element.id + "\" + class=\"" + element.id + "\" value=\"" + element.value + "\" />";
        }
        f.innerHTML = innerHTML
        document.body.append(f);
        f.submit();
      } else {
        alert("faild");
      }
    }).fail(function (jqXHR, textStatus, errorThrown) {
      alert("error");
    });
  });
});
