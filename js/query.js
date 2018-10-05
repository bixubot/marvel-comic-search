// MARVEL API Keys - Remember to set correspondent domain on Marvel Insider Portal
const PRIVATE_KEY = "054c2d9120aedfc0b699094158a5a68dcb4437a3";
const PUBLIC_KEY = "2a019e7db0853f68be9f54c805253592";
// const PRIVATE_KEY = "544ea10de8973bd949f986f0607faa96bc92bf88";
// const PUBLIC_KEY = "1252db1789cdde15d2a58d418d371e64";
const imgNotFound = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";
const emptyTitleAlert = '<div class="alert alert-danger fade show" role="alert" data-dismiss="alert">Title cannot be empty! Please try with some starting words or letters.<button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div>';
const emptyYearAlert = '<div class="alert alert-danger fade show" role="alert" data-dismiss="alert">Start year is invalid or empty! Try a year after 1967.<button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div>';
const emptyResultAlert = '<div class="alert alert-warning fade show" role="alert" data-dismiss="alert">Sorry, no record matches the requested information! Try something different.<button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div>';
var sortOrder = 1; // 1 for ascending, 2 for descending
var resultList;
var pageCount;

function clearStatus(){
    resultList = new Array();
    pageCount = 0;
    document.getElementById("result").innerHTML = "";
}

function changeSortOrder(){
    if (sortOrder == 1) {
        sortOrder = 2;
        $('#sortOrder').text("Descending");
    } else {
        sortOrder = 1;
        $('#sortOrder').text("Ascending");
    }
}

function sortBy(){
    return null;
}

function nextPage(){
    return null;
}

function prevPage(){
    return null;
}

function listItem(item, i, total_count, callback) {
    var description;
    if (item.description) {
        description = item.description;
    } else {
        description = "Sorry, the description of this comic is not available! Try more recent issues.";
    }
    var title = item.title;
    var issueNumber = item.issueNumber;
    var imgSrc = item.thumbnail.path+"."+item.thumbnail.extension;
    var charIDs = new Array();
    for (var n=0; n<item.characters.returned; n++){
        var items = item.characters.items[n].resourceURI.split("/");
        charIDs[n] = items[items.length-1];
    }
    // request for character's thumbnails
    var url = "http://gateway.marvel.com:80/v1/public/characters/";
    var charHTML = '<div class="row chars">';
    var allChars = new Array();
    if (charIDs.length > 0){
        for (var j = 0; j<charIDs.length; j++){
            var ts = new Date().getTime();
            var hash = md5(ts+PRIVATE_KEY+PUBLIC_KEY).toString();
            var url_temp = url + charIDs[j];
            $.getJSON(url_temp, {
                ts: ts,
                apikey: PUBLIC_KEY,
                hash: hash
                })
                .done(function(data){
                    console.log(data);
                    var tb = data.data.results[0].thumbnail;
                    if (tb.path+'.'+tb.extension == imgNotFound){
                        tb.path = "img/unknown";
                        tb.extension = "jpg";
                    }
                    var name = data.data.results[0].name;
                    var charDescription = data.data.results[0].description;
                    var temp = '<div class="column col-item" data-toggle="tooltip" data-html="true" data-placement="top" title="<b><u>'+name
                        + '</u></b><br><em>'+charDescription+'</em>'
                        +'"><img src="'+tb.path+'.'+tb.extension+'" alt="img/unknown.jpg" width="64" class="border crop rounded-circle"></div>';
                    allChars.push(temp);
                    if (allChars.length == charIDs.length){
                        for (var k = 0; k < allChars.length; k++){
                            charHTML += allChars[k];
                        }
                        charHTML += '</div>';

                        var itemString ='<a class="list-group-item list-group-item-action" data-toggle="collapse" href="#collapseExample'+i
                            +'" role="button" aria-expanded="false" aria-controls="collapseExample'+i+'">' + title
                            + '</a>';
                        itemString += '<div class="collapse" id="collapseExample'+i+'"><div class="card card-body"><div class="media card-content"><img class="mr-3" width="128" src="'+imgSrc+'" alt="unnamed.jpg">'
                            +'<div class="media-body"><h5 class="mt-0">Description</h5>'+description+'</div></div>'+charHTML+'</div></div>';

                        callback(i, itemString);
                    }
                })
                .fail(function(err) {
                    console.log(err);
                });
        }
    } else {
        charHTML += '<div class="column col-item"><img data-toggle="tooltip" data-placement="top" title="Characters Not Recorded" src="img/unknown.jpg" width="64" class="border crop rounded-circle"></div></div>';

        var itemString ='<a class="list-group-item list-group-item-action" data-toggle="collapse" href="#collapseExample'+i
            +'" role="button" aria-expanded="false" aria-controls="collapseExample'+i+'">' + title
            + '</a>';
        itemString += '<div class="collapse" id="collapseExample'+i+'"><div class="card card-body"><div class="media card-content"><img class="mr-3" width="128" src="'+imgSrc+'" alt="unnamed.jpg">'
            +'<div class="media-body"><h5 class="mt-0">Description</h5>'+description+'</div></div>'+charHTML+'</div></div>';

        callback(i, itemString);
    }
}

function getMarvelResponse(){
    clearStatus();
    var ts = new Date().getTime();
    var currentYear = new Date().getFullYear();
    var hash = md5(ts+PRIVATE_KEY+PUBLIC_KEY).toString();
    var url = "http://gateway.marvel.com:80/v1/public/comics";
    var titleStartWith = document.getElementById("title").value;
    if (jQuery.trim(titleStartWith).length == 0){
        $('#result').append(emptyTitleAlert);
        return null;
    }
    var startYear = document.getElementById("startYear").value;
    if ((jQuery.trim(startYear).length == 0) || (parseInt(startYear) < 1967) || (parseInt(startYear)>currentYear)){
        $('#result').append(emptyYearAlert);
        return null;
    }
    var format = document.getElementById("issueFormat").value;

    $.getJSON(url, {
        ts: ts,
        apikey: PUBLIC_KEY,
        hash: hash,
        limit: 100,
        titleStartsWith: titleStartWith,
        startYear: startYear,
        format: format
        })
        .done(function(data){
            console.log(data);
            if (data.data.count == 0){
                $('#result').append(emptyResultAlert);
                return resultList;
            }
            for (var i = 0; i < data.data.count; i++) {
                listItem(data.data.results[i], i, data.data.count, function(l, item){
                    if (l < 10) {
                        $('#result').append(item);
                    }
                    $(document).ready(function () {
                        $('[data-toggle="tooltip"]').tooltip();
                    });
                    resultList[l] = item;
                });
            }
        })
        .fail(function(err){
            console.log(err);
        });
    return resultList
}

