/**
 * Created by Sujith Alla on 3/30/2016.
 */


var app=angular.module("Registerform",['ui.grid','ui.grid.edit','ngCookies','ui.grid.pagination']);


angular.module("Registerform").factory('dataservice',['$http','$q','$interval',dataservice]);

var FormCtrl=function ($scope,dataservice)
{
    var userdetails;
    var existingdata;
    var uniqueness;
    $scope.errorlabel=false;
    $scope.EmailExists=false;
    $scope.PhoneExists=false;
    $scope.initialshow=false;

    $scope.createdata=function()
    {
        $scope.errorlabel=false;
        $scope.EmailExists=false;
        $scope.PhoneExists=false;

        var uniqueness=true;

      $scope.myData=[{FirstName:$scope.FirstName,
            LastName:$scope.LastName,
            Email:$scope.EmailAdress,
        Phone : $scope.Phone,
        Gender:$scope.radiovalue}];

        $scope.emaildata=[
            {
                Email:$scope.EmailAdress,
                Password:$scope.Password
            }
        ]

       userdetails=$scope.myData;
        emaildetails=$scope.emaildata;
        existingdata=dataservice.rtrndata();
        existingdata.filter(function(el)
        {
            if (el.Email==$scope.EmailAdress || el.Phone==$scope.Phone)
            {
                uniqueness=false;
                $scope.errorlabel=true;
            }
            if (el.Email==$scope.EmailAdress )
            {
                $scope.EmailExists=true;
            }
                if( el.Phone==$scope.Phone)
                {

                    $scope.PhoneExists=true;
                }
        })

        if (uniqueness)
        {
            dataservice.postdata(userdetails).then(dataservice.postemail(emaildetails));
        }
        else
        {
            uniqueness=true;
        }


    };

    dataservice.getdata();

    dataservice.refreshdata();
};

app.controller("FormCtrl",FormCtrl);


var LoginCtrl=function($scope,dataservice)
{
    var newdata=[] ;
    var emailvalid=true;
    var redrct=false;
    $scope.showerror=false;
    dataservice.getemail().then(
        function(response)
        {

            for (var i=0; i<response.data.length;i++)
            {
                var obj={
                    Email: response.data[i].Email,
                    Password:response.data[i].Password
                                    }
                newdata.push(obj);

            }
        }
    );

    $scope.CheckCredentials= function()
    {

        newdata.filter(function(el)
        {
            if ((el.Email==$scope.Email)&&(el.Password==$scope.Password))
            {
                window.location.href="Register.html"
              redrct=true;
            }

        })

        emailvalid=false;

  if (!redrct)
  {
      if (emailvalid)
      {
          $scope.showerror=false;
      }
    else
      {
          $scope.showerror=true;
      }

  }

    }
}


app.controller("LoginCtrl",LoginCtrl)

var gridctrl=function ($scope,dataservice,$cookies,$interval)
{
    var mydata;
    console.log($scope);
    $scope.Emailvalid=true;
    $scope.FirstNamevalid=true;
    $scope.Gendervalid=true;
    $scope.LastNamevalid=true;
    $scope.Phonevalid=true;

  $scope.shows='true';
    $scope.stop=function(evt)
    {
        evt.stopImmediatePropagation();
    }

    $scope.start=function(evt)
    {
        $(evt.currentTarget.parentElement.parentElement).dblclick();
    }
   $scope.Delete= function(row)
    {
       if (confirm("Delete the record permanently")==true)
       {
           var index=$scope.gridoptions.data.indexOf(row.entity);
           $scope.gridoptions.data.splice(index,1)
           dataservice.deletedata(row.entity.id);
           $cookies.cmprsnt=false;
       }
        $scope.Emailvalid=true;
        $scope.FirstNamevalid=true;
        $scope.Gendervalid=true;
        $scope.LastNamevalid=true;
        $scope.Phonevalid=true;


        $('.contextshw').css('display','none');
    }
    $scope.gridoptions={
        paginationPageSizes: [10, 20, 30],
        paginationPageSize: 10,
        enableSorting: true,


  columnDefs: [
      {
   field:"Email",
          enableCellEdit: false,
          enableSorting: true

      },
      {
          field:"FirstName",
          enableCellEdit: false
      },
      {
          field:"Gender",
          enableCellEdit: false
      },
      {
          field:"LastName",
          enableCellEdit: false
      },
      {
          field:"Phone",
          enableCellEdit: false
      },
      {
          field:"id",
          visible:false
      },
      {
          field:"Action",
          enableCellEdit: false,
          cellTemplate: ' <user-click-select> <div class="avddbl" style="margin:7px" ng-dblclick="grid.appScope.stop($event)" ><button style="padding:2px 7px;background-color:#4caeea" class="btn btn-xs btn-custom" ng-dblclick="grid.appScope.start($event)"><i  class="fa fa-pencil" style="color:black;font-size:14px"></i></button> <del-click><button style="padding:2px 7px" class="btn btn-danger btn-xs" >' +
          '<i style="font-size:14px" class="fa fa-trash-o ">' + '</i></button></del-click> <div  class="contextshw" style="display:none;color: bisque; background-color: crimson; border-radius: 6px; padding: 3px;"> <ul style="margin-left: -37px"><li ng-click="grid.appScope.Delete(row)"><button style="padding:5px 12px" class="btn btn-danger btn-xs">Delete</button></li> <li><button style="padding:5px 12px;background-color:#4caeea"" class="btn btn-xs btn-custom">Cancel</button></li> </ul></div></div>' +
          '<div class="avddbl" ng-dblclick="grid.appScope.stop($event)" style="display:none;margin-left: 3px" data-ids="{{row.entity.id}}"> <save-click><button  type="button"  class="btn btn-primary">Save</button> </save-click>' +
          ' <cancel-click><button  type="button" class="btn btn-danger">Cancel</button></cancel-click></div>' +
          '   </user-click-select>'
      }

  ]


    }

    dataservice.getdata().then(
        function(response)
        {
            var newdata=[] ;
             for (var i=0; i<response.data.length;i++)
             {
                 var obj={
                     Email: response.data[i].Email,
                     FirstName: response.data[i].FirstName,
                     Gender: response.data[i].Gender,
                     LastName:response.data[i].LastName,
                     Phone:response.data[i].Phone,
                     id:response.data[i]._id.$oid
                     //id:response.data[i]._id.$oid
                            }
                 newdata.push(obj);

             }
            $scope.gridoptions.data=newdata;

        }
    );

    dataservice.refreshdata();
    dataservice.rtrnemaildata();
}

app.controller("gridctrl",gridctrl)
// Code to create a data service

function dataservice($http,$q,$interval) {
    var upddata = [];
    var emaildata=[];
    return {
        getemaildatartrn:getemaildatartrn,
        rtrndata: rtrndata,
        postdata: postdata,
        getdata: getdata,
        deletedata: deletedata,
        updatedata: updatedata,
        refreshdata: refreshdata,
        postemail:postemail,
        rtrnemaildata:rtrnemaildata,
        updateemail:updateemail,
        getemail:getemail
    }

    function postemail(emaildetails)
    {
        return $http(
            {
                method: 'POST',
                url: "https://api.mlab.com/api/1/databases/userdetails/collections/usertable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X",
                data: JSON.stringify(emaildetails),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ).then(postemaildone, postemailerror);
    }
    function postemaildone()
    {

    }

    function postemailerror()
    {

    }

    function updateemail(emaildetails,usid)
    {
        return $http(
            {
                method: 'PUT',
                url: "https://api.mlab.com/api/1/databases/userdetails/collections/usertable/" + usid + "?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X",
                data: JSON.stringify(emaildetails),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ).then(updateemaildone).catch(updateemailerror);
    }

    function updateemaildone()
    {}

    function updateemailerror()
    {}

    function postdata(userdetails) {
        return $http(
            {
                method: 'POST',
                url: "https://api.mlab.com/api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X",
                data: JSON.stringify(userdetails),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ).then(updatesuccess, updateerror);
    }

    function updatesuccess(response) {
        console.log("User details created succesfully");
        window.location.href="WebTable.html"
    }

    function updateerror(response) {
        console.log("error occured");
    }

    function getdata() {
        return $http(
            {
                method: 'GET',
                url: "https://api.mlab.com/api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ).then(getsuccess).catch(geterror);
    }

    function getsuccess(response) {
        console.log("User details retrieved succesfully");

        return response;
    }

    function geterror(response) {
        console.log("error occured");
    }

    function updatedata(userdetails, usid) {

        return $http(
            {
                method: 'PUT',
                url: "https://api.mlab.com/api/1/databases/userdetails/collections/newtable/" + usid + "?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X",
                data: JSON.stringify(userdetails),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ).then(updateprogress).then(rtrnemaildata).catch(updateerror);
    }

    function updateprogress(response) {
        console.log("User details updated succesfully");
    }

    function updateerror(response) {
        console.log("error occured");
    }


    function deletedata(usid) {
        return $http(
            {
                method: 'DELETE',
                url: "https://api.mlab.com/api/1/databases/userdetails/collections/newtable/" + usid + "?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X"

            }
        ).then(deletesuccess).catch(deleteerror);
    }

    function deletesuccess(response) {
        console.log("User details deleted succesfully");
    }

    function deleteerror(response) {
        console.log("error occured");
    }

    function refreshdata() {
        ( function () {
            getnewdata().then(
                function (response) {
                    upddata = [];
                    for (var i = 0; i < response.data.length; i++) {
                        var obj = {
                            Email: response.data[i].Email,
                            FirstName: response.data[i].FirstName,
                            Gender: response.data[i].Gender,
                            LastName: response.data[i].LastName,
                            Phone: response.data[i].Phone,
                            id: response.data[i]._id.$oid
                            //id:response.data[i]._id.$oid
                        }

                        upddata.push(obj);

                    }

                }
            )
        })();
    }

    function rtrndata() {
        refreshdata();
        return upddata;
    }

    function getnewdata() {
        return $http(
            {
                method: 'GET',
                url: "https://api.mlab.com/api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

    }

    function getemail()
    {
        return $http(
            {
                method: 'GET',
                url: "https://api.mlab.com/api/1/databases/userdetails/collections/usertable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    }
    function getemaildatartrn()
    {
        return emaildata;
    }


    function getemailerror()
    {}

    function rtrnemaildata()
    {
        return getemail().then(function(response)
        {
           emaildata=[];
            for (var i = 0; i < response.data.length; i++) {
                var obj = {
                    Email: response.data[i].Email,
                    Password: response.data[i].Password,
                    id: response.data[i]._id.$oid

                }

                emaildata.push(obj);

            }
        });
    }


}

app.directive('userClickSelect', function()
{
    return {
        restrict:"E",
        controllerAs:'vm',
        bindToController:true,
        scope: {

        },

        controller:function($scope)
        {
            this.storingdivs= function storingdivs(parentdivs)
            {
                for (var i=0;i<parentdivs.length; i++)
                {
                   $(parentdivs[i].firstChild).addClass('ui-grid-cell-contents-hidden');
                    var inputtxt='<div> <input style="background-color:white;height:32px" type="text" value="'  + parentdivs[i].firstChild.innerText  + '"> </div>';
                    $(parentdivs[i]).append(inputtxt);
                    $(parentdivs[i]).css("background-color","white");
                    $(parentdivs[i]).css("color","black");
                }
                this.storage=parentdivs;
            }
        },


        link : function(scope,el,attrs)
        {

            el.on('dblclick',function()
            {
                scope.$root.$$childTail.Emailvalid=true;
                scope.$root.$$childTail.FirstNamevalid=true;
                scope.$root.$$childTail.Gendervalid=true;
                scope.$root.$$childTail.LastNamevalid=true;
                scope.$root.$$childTail.Phonevalid=true;
                var parentdivs=  $(this.parentElement).prevAll();
                $(this.parentElement).css("background-color","white");
                scope.vm.storingdivs(parentdivs);
                if (this.innerText.indexOf("Save")>-1)
                {

                    this.children[0].style.display="";
                    this.children[1].style.display="none";
                }
                else
                {

                    this.children[1].style.display="";
                    this.children[0].style.display="none";

                }

                for (var i=0;i<parentdivs.length;i++)
                {
//                        $(parentdivs[i].firstChild).trigger("dblclick");
                }

            })
        }

    }

})

app.directive('delClick', function($cookies)
{
return {
    restrict:"E",
    link : function(scope,el,attrs)
    {

        el.on('click', function(evt)
        {
          evt.stopPropagation();
        })

        el.on('contextmenu',function(evt)
        {
            evt.preventDefault();
            evt.stopPropagation();
            var divs;
            if (!$cookies.cmprsnt)
            {

                this.parentElement.children[2].style.display="";
                $cookies.cmprsnt=true;

            }
            else
            {
                $(document).click();
            }



            $(document).click(function()
            {
                if ($cookies.cmprsnt)
                {
                    $('.contextshw').css('display','none');
                    $cookies.cmprsnt=false;
                }


            })

            $(document).on('contextmenu',function()
            {
                if ($cookies.cmprsnt)
                {
                    $('.contextshw').css('display','none');
                    $cookies.cmprsnt=false;
                }


            })

            $('.contextshw').on('click',function(evt)
            {
                evt.preventDefault();
                evt.stopPropagation();
            })

            $('.contextshw>ul>li').on('click',function(evt)
            {
                evt.preventDefault();
                evt.stopPropagation();
                if (this.innerText=='Cancel')
                {
                    $('.contextshw').css('display','none');
                }
                else {

                     }
            })
            {

            }

        })
    }
}
})

app.directive('saveClick', function(dataservice)
{
    return {
        restrict:"E",
        require:'^userClickSelect',
        controller: function($scope,dataservice)
        {
            $scope.updatedata=function(thisdivs,objid,presentemail)
            {

                var emlid=presentemail[0].id;
                var updobj = {
                        Email: thisdivs[4].firstChild.innerText.trim(),
                        FirstName: thisdivs[3].firstChild.innerText.trim(),
                        Gender: thisdivs[2].firstChild.innerText.trim(),
                        LastName: thisdivs[1].firstChild.innerText.trim(),
                        Phone: thisdivs[0].firstChild.innerText.trim()

                    };

                var updeml=
                {
                    Email:thisdivs[4].firstChild.innerText.trim(),
                    Passowrd:presentemail[0].Passowrd
                }

                    dataservice.updatedata(updobj, objid).then(dataservice.updateemail(updeml,emlid));

            }
        },
        link : function(scope,el,attrs,userClickSelectCtrl)
        {

            el.on('click', function(evt)
            {
                evt.stopPropagation();


                var emailddataid;
                var uniqueness =true;
                var allowupdate=true;
                var pattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                var existingdata;
                var emaildata=dataservice.getemaildatartrn();
                existingdata=dataservice.rtrndata();
                var objid= this.parentElement.getAttribute("data-ids");
                var thisdivs=userClickSelectCtrl.storage;
                var presentemail=emaildata.filter(function(el)
                {

                   return el.Email==thisdivs[4].firstChild.innerText.trim();

                });


            $(this.parentElement.parentElement.parentElement).css("background-color","");

                if ((thisdivs[3].children[1].firstElementChild.value.trim()==undefined || thisdivs[3].children[1].firstElementChild.value.trim()===""))
                {
                    scope.$root.$$childTail.FirstNamevalid=false;
                }

                    if    (thisdivs[1].children[1].firstElementChild.value.trim()==undefined || thisdivs[1].children[1].firstElementChild.value.trim()==="")
                    {
                        scope.$root.$$childTail.LastNamevalid=false;
                    }
                        if  (!(thisdivs[2].children[1].firstElementChild.value.trim().toUpperCase()=="MALE" || thisdivs[2].children[1].firstElementChild.value.trim().toUpperCase()=="FEMALE"))
                        {
                            scope.$root.$$childTail.Gendervalid=false;
                        }
                        if   (!(thisdivs[0].children[1].firstElementChild.value.trim().length==10 && !isNaN(thisdivs[0].children[1].firstElementChild.value.trim())))
                        {
                            scope.$root.$$childTail.Phonevalid=false;
                        }
                        if ( !(pattern.test(thisdivs[4].children[1].firstElementChild.value.trim())))
                        {
                            scope.$root.$$childTail.Emailvalid=false;
                        }




                if ((thisdivs[3].children[1].firstElementChild.value.trim()==undefined || thisdivs[3].children[1].firstElementChild.value.trim()==="")
                    ||    (thisdivs[1].children[1].firstElementChild.value.trim()==undefined || thisdivs[1].children[1].firstElementChild.value.trim()==="")
                    ||  !(thisdivs[2].children[1].firstElementChild.value.trim().toUpperCase()=="MALE" || thisdivs[2].children[1].firstElementChild.value.trim().toUpperCase()=="FEMALE")
                    ||  !(thisdivs[0].children[1].firstElementChild.value.trim().length==10 && !isNaN(thisdivs[0].children[1].firstElementChild.value.trim()))
                    || !(pattern.test(thisdivs[4].children[1].firstElementChild.value.trim()))
                )
                {

                    allowupdate=false;
                }

                    existingdata.filter(function(el)
                {
                    if ((el.Email.trim()==thisdivs[4].children[1].firstElementChild.value.trim() || el.Phone.trim()==thisdivs[0].children[1].firstElementChild.value.trim()) && (!(objid==el.id)))
                    {
                        uniqueness=false;
                        evt.preventDefault();
                        evt.stopPropagation();
                    }

                })

                if (uniqueness && allowupdate)
                {
                    for (var i=0;i<thisdivs.length;i++)
                    {

                        thisdivs[i].firstChild.innerText=thisdivs[i].children[1].firstElementChild.value;
                        $(thisdivs[i].firstChild).removeClass('ui-grid-cell-contents-hidden');
                        $(thisdivs[i].children[1]).remove();
                        $(thisdivs[i]).css("background-color","");
                        $(thisdivs[i]).css("color","");

                    }

                    scope.updatedata(thisdivs,objid,presentemail);

                }

                else {
                    angular.element(document.querySelector("#uniquenessMessage")).css('display','inline');

                    for (var i=0;i<thisdivs.length;i++)
                    {

                        $(thisdivs[i].firstChild).removeClass('ui-grid-cell-contents-hidden');
                        $(thisdivs[i].children[1]).remove();
                        $(thisdivs[i]).css("background-color","");
                        $(thisdivs[i]).css("color","");

                    }
                    uniqueness=true;
                    allowupdate=true;
                }



                this.parentElement.parentElement.children[0].style.display="";
                this.parentElement.parentElement.children[1].style.display="none";

            })
        }
    }
})


app.directive('cancelClick', function()
{
    return {
        restrict:"E",
        require:'^userClickSelect',
        link : function(scope,el,attrs,userClickSelectCtrl)
        {

            el.on('click', function(evt)
            {
                evt.stopPropagation();
//                $(this.parentElement.parentElement).css("background-color","");
                $(this.parentElement.parentElement.parentElement).css("background-color","");
                var thisdivs=userClickSelectCtrl.storage;
                for (var i=0;i<thisdivs.length;i++)
                {
                    $(thisdivs[i].firstChild).removeClass('ui-grid-cell-contents-hidden');
                    $(thisdivs[i].children[1]).remove();
                    $(thisdivs[i]).css("background-color","");
                    $(thisdivs[i]).css("color","");

                }
                this.parentElement.parentElement.children[0].style.display="";
                this.parentElement.parentElement.children[1].style.display="none";

            })
        }
    }
})


app.directive('multiSelect',function()
{

    return {
        restrict:"E",
        controller : function($scope,$compile)
        {

            $scope.getdata= function()
            {
                $.getJSON('Languages.json').success(function(data)
                {


                 $scope.languageslist=data;
                $scope.menucontainer=$('<div ></div>');
                    $scope.menucontainer.css('display','none');
                    $scope.menu=$('<ul style="list-style:none;max-height: 230px;overflow: scroll;" class="ui-autocomplete ui-front ui-menu ui-widget ui-widget-content ui-corner-all"> </ul>');
                 $scope.menucontainer.append($scope.menu[0]);
                  //  var cdd= $('#Languages');
                    for  ( var i=0; i< data.length;i++)
                    {
                        var Language= data[i].name;
                       var newelem=$compile( '<li list-select > <a  style="text-decoration:none" class="ui-corner-all">' + Language + '</a> </li> ' )($scope);

                       // $scope.menu.append($("<li list-select > <a style='text-decoration:none' class='ui-corner-all'>" + Language + "</a></li>").attr("value",Language)[0]);
          $scope.menu.append(newelem);

                    }


                }).error(function(err)
                {

                    // console.log(JSON.stringify(err));
                });
            }
        },
        link : function(scope,el,attrs)
        {


                scope.getdata();
                setTimeout(function()
                {
                    el.append(scope.menucontainer[0]);

                },500);
                 el.on('click',function(evt)
                 {
                     evt.stopPropagation();
                     var self=this;

                     this.children[1].style.display="block";
                 })

        }
    }

})

app.directive('listSelect', function () {
   return{
       restrict:"A",
       scope : false,
       link : function(scope,el,attr)
       {

           el.hover(function()
          {
            el.addClass('ui-elemfocus');
          }, function()
          {
              el.removeClass('ui-elemfocus')
          }
          )
           el.on('click',function()
           {

               $("#msdd").append( $("<div ></div>")
                   .addClass("ui-autocomplete-multiselect-item")
                   .text(this.innerText).click(function(evt)
                   {
                       evt.stopPropagation();
                   }).append($("<span style='display: inline-block;'></span>").addClass("ui-icon ui-icon-close").css('cursor','pointer')
                       .click(function(evt)
                       {
                           evt.stopPropagation();
                           var nde=this.parentElement.innerText;


                           var newelem=$("ul.ui-corner-all > li").filter(function(index)
                           {
                               if (this.innerText.trim()==nde)
                               {
                                    this.style.display="";
                               }

                           })
                           this.parentElement.parentElement.nextElementSibling.children[0];
                    $(this.parentElement).remove();

                       })));
               this.style.display="none";

           })

       }
   }
})


