/* eslint-disable */

// pass url string, json data object and callback function
function postForm(url, data, callback) {
  if (typeof callback === "function") {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {
          callback(null, xhr.response);
        } else {
          callback(this.status, null);
        }
      }
    }
    var qstr = "";
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        qstr += key+"="+data[key]+"&";
      }
    }
    xhr.send(encodeURI(qstr.slice(0, -1)));
  } else {
    throw new TypeError("TypeError: Invalid Callback Function");
  }
}

//pass url string, json data object and callback function
function postJson(url, data, callback) {
  if (typeof callback === "function") {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {
          callback(null, xhr.response);
        } else {
          callback(this.status, null);
        }
      }
    }
    xhr.send(JSON.stringify(data));
  } else {
    throw new TypeError("TypeError: Invalid Callback Function");
  }
}
