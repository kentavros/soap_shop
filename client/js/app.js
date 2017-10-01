"use strict";

var ControlApp = function () {
  var self = this;
  this.xhr = new XMLHttpRequest();
  self.allCars = '';
  self.idCar = '';
  self.orderCar = {};

  this.getAllCars = function()
  {
      var body = "allCars=" + encodeURIComponent(1);
      self.xhr.open('POST', 'http://soap/soap_shop/client/SoapClient.php', true);
      self.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      self.xhr.send(body);
      self.xhr.onreadystatechange = function()
      {
          if (self.xhr.readyState != 4)
          {
              return;
          }
          if (self.xhr.status != 200)
          {
              alert(self.xhr.status + ' - ' + self.xhr.statusText);
          }
          else
          {
              self.allCars = self.xhr.responseText;
              self.drawCarsList();
          }

      }
  };

  this.getCarById = function (id) {
      var body = "idCar=" + encodeURIComponent(id);
      self.xhr.open('POST', 'http://soap/soap_shop/client/SoapClient.php', true);
      self.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      self.xhr.send(body);
      self.xhr.onreadystatechange = function()
      {
          if (self.xhr.readyState != 4)
          {
              return;
          }
          if (self.xhr.status != 200)
          {
              alert(self.xhr.status + ' - ' + self.xhr.statusText);
          }
          else
          {
              self.idCar = self.xhr.responseText;
              self.drawCarById(id);
          }

      }
  };

  this.drawCarById  = function (id) {
    if (!self.idCar)
    {
        alert('No Car by this ID');
        return false;
    }
    var car = JSON.parse(self.idCar);
    car = car[0];
    var divAllCars = document.querySelector(".allCars");
    divAllCars.innerHTML = '';

    var btnOrder = document.createElement('button');
    btnOrder.setAttribute("class", "btn alert-warning");
    btnOrder.setAttribute("onclick", "app.formOrderCar(" + id + ")");
    btnOrder.innerHTML = 'Pre-order this Car';
    divAllCars.appendChild(btnOrder);

    var div = document.createElement('div');
    div.setAttribute("class", "container");
    var table = document.createElement('table');
    var tbody = document.createElement('tbody');
    table.setAttribute("class", "table");
      for(var key in car)
      {
        var tr = document.createElement('tr');
        var th = document.createElement('th');
        th.innerHTML = key;
        var td = document.createElement('td');
        td.innerHTML = car[key];
        tr.appendChild(th);
        tr.appendChild(td);
        tbody.appendChild(tr);
      }

    table.appendChild(tbody);
    div.appendChild(table);
    divAllCars.appendChild(div);


  };

  this.getOrderCar = function () {
      self.orderCar.id_car = document.getElementById("id_car").value;
      self.orderCar.f_name = document.getElementById("inputFname").value;
      self.orderCar.l_name = document.getElementById("inputLname").value;
      self.orderCar.payment = document.getElementById("paySelect").value;
      // console.log(self.orderCar);
      var body = "orderCar=" + JSON.stringify(self.orderCar);
      self.xhr.open('POST', 'http://soap/soap_shop/client/SoapClient.php', true);
      self.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      self.xhr.send(body);
      self.xhr.onreadystatechange = function()
      {
          if (self.xhr.readyState != 4)
          {
              return;
          }
          if (self.xhr.status != 200)
          {
              alert(self.xhr.status + ' - ' + self.xhr.statusText);
          }
          else
          {
              if (self.xhr.responseText == 1)
              {
                  alert('Thank you for the order, expect representatives of our company to contact you!');
                  self.getAllCars();
              }
              else
              {
                  alert(self.xhr.responseText);
              }


          }

      }

  };

  this.formOrderCar = function (id) {
          var divAllCars = document.querySelector(".allCars");
          divAllCars.innerHTML = '';
          var divOrder = document.querySelector('.form-order');
          divOrder.style.display = "block";
          var idCar = document.getElementById("id_car");
          idCar.setAttribute("value", id);
  };

  this.drawCarsList = function()
  {
      var divOrder = document.querySelector('.form-order');
      divOrder.style.display = "none";
      if (!self.allCars)
      {
          alert('No Cars Found!');
          return false;
      }
      var cars = JSON.parse(self.allCars);
      var divAllCars = document.querySelector(".allCars");
      divAllCars.innerHTML = '';
      var ul = document.createElement('ul');
      ul.setAttribute("class", "text-center");
      cars.forEach(function (val) {
          var li = document.createElement('li');
          var span = document.createElement('span');
          span.setAttribute("class", "car btn");
          span.setAttribute("onclick", "app.getCarById("+ val.id +")");
          span.innerHTML = 'id: ' + val.id + ' Brand: ' + val.brand + ' Model: ' + val.model
          li.appendChild(span);
          ul.appendChild(li);
      });
      var p = document.createElement('p');
      p.setAttribute("class", "text-center");
      p.innerHTML = 'Click on the Car: ';
      divAllCars.appendChild(p);
      divAllCars.appendChild(ul);

  };

  this.drawBtnAllCars = function () {
      var btn = document.createElement('button');
      btn.setAttribute("class", "btn alert-info");
      btn.setAttribute("onclick", "app.getAllCars()");
      btn.innerHTML = 'Show All Cars';
      var divMain = document.querySelector(".main");
      divMain.appendChild(btn);
  };

  this.drawBtnSerchParam = function () {
      var btn = document.createElement('button');
      btn.setAttribute("class", "btn alert-info");
      btn.setAttribute("onclick", "2");
      btn.innerHTML = 'Find car by parameters';
      var divMain = document.querySelector(".main");
      divMain.appendChild(btn);
  };
};

var app = new ControlApp();
app.drawBtnAllCars();
app.drawBtnSerchParam();
