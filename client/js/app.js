"use strict";

var ControlApp = function () {
    var self = this;
    this.xhr = new XMLHttpRequest();
    self.allCars = '';
    self.idCar = '';
    self.orderCar = {};
    self.search = {};
    self.findCars = '';
    self.error = document.querySelector('.error');

    /**
     * function object check for empty
     * @param obj
     * @returns {boolean}
     */
    function isEmpty(obj) {
        for (var key in obj) {
            return false;
        }
        return true;
    }

    /**
     * function checks whether the string is JSON
     * @param str
     * @returns {boolean}
     */
    function IsJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    /**
     * get a list of cars from soap
     */
    this.getAllCars = function()
    {
        var divSearch = document.querySelector('.form-serch');
        divSearch.style.display = "none";
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

    /**
     * get a car for id from soap
     * @param id
     */
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

    /**
     * Write to db pre-orders
     */
    this.getOrderCar = function () {
        self.error.innerHTML ='';
        self.orderCar.id_car = document.getElementById("id_car").value;
        self.orderCar.f_name = document.getElementById("inputFname").value;
        self.orderCar.l_name = document.getElementById("inputLname").value;
        self.orderCar.payment = document.getElementById("paySelect").value;
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
                  self.error.innerHTML = self.xhr.responseText;
              }
          }
      }
    };

    /**
     * Find cars by params from form search
     */
    this.getCarsByParams = function ()
    {
        self.search.year = document.getElementById("inputYear").value;
        self.search.model = document.getElementById("inputModel").value;
        self.search.engine = document.getElementById("inputEngine").value;
        self.search.color = document.getElementById("inputColor").value;
        self.search.max_speed = document.getElementById("inputSpeed").value;
        self.search.price = document.getElementById("inputPrice").value;

        var body = "searchCar=" + JSON.stringify(self.search);
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
                self.drawSearchResult(self.xhr.responseText);
            }
        }
    };

    /**
     * Active Form-Search
     */
    this.getFormSearch = function () {
        var divFormOrder = document.querySelector(".form-order");
        divFormOrder.style.display = "none";
        var divSearch = document.querySelector('.form-serch');
        divSearch.style.display = "block";
        var divAllCars = document.querySelector('.allCars');
        divAllCars.innerHTML = '';
    };

    /**
     * Form for order
     * @param id
     */
    this.formOrderCar = function (id) {
        var divAllCars = document.querySelector(".allCars");
        divAllCars.innerHTML = '';
        var divOrder = document.querySelector('.form-order');
        divOrder.style.display = "block";
        var idCar = document.getElementById("id_car");
        idCar.setAttribute("value", id);
    };

    /**
     * Draw on page result from search
     * @param response
     * @returns {string}
     */
    this.drawSearchResult = function (response) {
        self.error.innerHTML = '';
        if(!IsJsonString(response))
        {
            self.error.innerHTML = response;
        }
        else
        {
            self.findCars = JSON.parse(response);
            var cars = self.findCars;
            if (isEmpty(cars))
            {
                return self.error.innerHTML = 'No matches found!';
            }
            var divAllCars = document.querySelector('.allCars');
            divAllCars.innerHTML = "";
            var ul = document.createElement('ul');
            ul.setAttribute("class", "text-center");
            for (var key in cars)
            {
                var span = document.createElement('span');
                span.setAttribute("class", "car btn");
                span.setAttribute("onclick", "app.getCarById(" + cars[key].id + ")");
                span.innerHTML = "id: " + cars[key].id + " Brand: " + cars[key].brand + " Model: " +cars[key].model +
                    " Engine: " + cars[key].engine + " Price: " + cars[key].price + " Year: " + cars[key].year + " Color: " +
                    cars[key].color + " Speed: " + cars[key].max_speed;
                var li = document.createElement('li');
                li.appendChild(span);
                ul.appendChild(li);
            }
            divAllCars.appendChild(ul);
        }
    };

    /**
     * Draw car list
     * @returns {boolean}
     */
    this.drawCarsList = function()
    {
        self.error.innerHTML =''
        var divOrder = document.querySelector('.form-order');
        divOrder.style.display = "none";
        if (!self.allCars)
        {
            self.error.innerHTML = 'No Cars Found!';
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
            span.innerHTML = 'id: ' + val.id + ' Brand: ' + val.brand + ' Model: ' + val.model;
            li.appendChild(span);
            ul.appendChild(li);
        });
        var p = document.createElement('p');
        p.setAttribute("class", "text-center");
        p.innerHTML = 'Click on the Car: ';
        divAllCars.appendChild(p);
        divAllCars.appendChild(ul);
    };

    /**
     * Draw list detail about car
     * @param id
     * @returns {boolean}
     */
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
        btnOrder.setAttribute("class", "btn alert-success");
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

    /**
     * Draw button "select all cars"
     */
    this.drawBtnAllCars = function () {
      var btn = document.createElement('button');
      btn.setAttribute("class", "btn alert-info");
      btn.setAttribute("onclick", "app.getAllCars()");
      btn.innerHTML = 'Show All Cars';
      var divMain = document.querySelector(".main");
      divMain.appendChild(btn);
    };

    /**
     * Draw button - Search cars by Params
     */
    this.drawBtnSerchParam = function () {
      var btn = document.createElement('button');
      btn.setAttribute("class", "btn alert-info");
      btn.setAttribute("onclick", "app.getFormSearch()");
      btn.innerHTML = 'Find car by parameters';
      var divMain = document.querySelector(".main");
      divMain.appendChild(btn);
    };
};
/**
 * Start application
 */
var app = new ControlApp();
app.drawBtnAllCars();
app.drawBtnSerchParam();