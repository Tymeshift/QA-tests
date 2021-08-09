/**
 *
 */

$(document).ready(function()

{

    $("#secondpassword").keypress(function(evt)
    {
        if (evt.keyCode==13)
        {

            var password1= document.getElementById("firstpassword").value;
            var password2=document.getElementById("secondpassword").value;

            if (!(password1==password2))
            {
                input.setCustomValidity('Passwords dont match');

            }
            else
            {
                $("#submitbtn").click();
            }


        }

    })


    $(".avddbl").on('dblclick',function()
    {
        evt.stopPropagation();
        evt.preventDefault();
    })
    $(document).on('click',function()
    {
     if ($("ul.ui-corner-all")[0])
     {
         $("ul.ui-corner-all")[0].parentElement.style.display="none";
     }

    })




    $.getJSON('https://restcountries.eu/rest/v1/all').success(function(data)
    {

      var cdd= $('#countries');
        for  ( var i=0; i< data.length;i++)
        {
            var countryname= data[i].name;
        cdd.append($("<option></option>").attr("value",countryname).text(countryname));
        }

    });



    $.getJSON('Languages.json').success(function(data)
    {



        var cdd= $('#Languages');
        for  ( var i=0; i< data.length;i++)
        {
            var Language= data[i].name;
            cdd.append($("<option></option>").attr("value",Language).text(Language));
        }

    }).error(function(err)
    {

       // console.log(JSON.stringify(err));
    });

    $.getJSON('Skills.json').success(function(data)
    {


        var cdd= $('#Skills');
        for  ( var i=0; i< data.length;i++)
        {
            var skill= data[i].name;
            cdd.append($("<option></option>").attr("value",skill).text(skill));
        }

    }).error(function(err)
    {

        console.log(JSON.stringify(err));
    });




    var yb= $('#yearbox');
    var min=1916;
    var max= 2016;

    for (min; min<max;min++)
    {
        yb.append($("<option></option>").attr("value",min).text(min));

    }



});
