var api_key = "261978d410e663014daad5bc75369221";

function sendRequest () {
    var myInput = document.getElementById("output");
    if (myInput) {
        myInput.remove();
    }
    var output = document.createElement("div");
    output.setAttribute('id','output');
    var xhr = new XMLHttpRequest();
    var method = "artist.getinfo";
    var artist = encodeURI(document.getElementById("form-input").value);
    xhr.open("GET", "proxy.php?method="+method+"&artist="+artist+"&api_key="+api_key+"&format=json", true);
    xhr.setRequestHeader("Accept","application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            var str = JSON.stringify(json,undefined,2);
            if(json.artist){
                var artistname = json.artist.name;
                var artistidvalue = document.createElement("h1");
                artistidvalue.innerHTML = artistname;
                output.appendChild(artistidvalue);

                var linkid = document.createElement("h3");
                linkid.innerHTML += "Link To Last.fm";
                output.appendChild(linkid);
                var linkidvalue = document.createElement("a");
                var link = json.artist.url;
                linkidvalue.href = link;
                linkidvalue.target = '_blank';
                linkidvalue.innerHTML = link;
                linkidvalue.title = link;
                output.appendChild(linkidvalue);

                var bioid = document.createElement("h3");
                bioid.innerHTML += "Biography";
                output.appendChild(bioid);
                var bioidvalue = document.createElement("h4");
                var bio = json.artist.bio.summary;
                bioidvalue.innerHTML = bio;
                bioidvalue.style.wordBreak = 'break-word';
                bioidvalue.style.width = '1050px';
                bioidvalue.style.fontWeight = 'normal';
                output.appendChild(bioidvalue);

                var artistImgId = document.createElement("img");
                var img;
                for(let i=0; i< json.artist.image.length; i++){
                    if(json.artist.image[i].size=="extralarge"){
                        img = json.artist.image[i];
                    }
                }
                var imsSrc = img[Object.keys(img)[0]];
                artistImgId.src = imsSrc;
                artistImgId.style.position = 'absolute';
                artistImgId.style.left = '1100px';
                artistImgId.style.top = '220px';
                artistImgId.style.height = '250px';
                output.appendChild(artistImgId);
            }else{
                alert("incorrect Artist name");
            }
        }
    };
    xhr.send();

    var xhr2 = new XMLHttpRequest();
    var method2 = "artist.gettopalbums";
    //var artist = encodeURI(document.getElementById("form-input").value);
    xhr2.open("GET", "proxy.php?method="+method2+"&artist="+artist+"&api_key="+api_key+"&format=json", true);
    xhr2.setRequestHeader("Accept","application/json");
    xhr2.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            var str = JSON.stringify(json,undefined,2);
            if(json.topalbums){
            var topAlbumsid = document.createElement("h3");
            topAlbumsid.innerHTML += "Top Albums";
            output.appendChild(topAlbumsid);

            var unorderList = document.createElement("ul");
            
            for(let i=0; i<=json.topalbums.album.length;i++){
                var albumarray = json.topalbums.album[i];
                var orderList = document.createElement("li");
                orderList.setAttribute('class','topAlbums');
                var albumname = document.createElement("p");
                var abc;
                if(albumarray){
                    abc = albumarray.name;
                }
                
                albumname.innerHTML = abc;
                orderList.appendChild(albumname);

                var link = document.createElement("a");
                var url;
                if(albumarray){
                    url = albumarray.url;
                }
                link.href = url;
                link.target = '_blank';
                link.innerHTML = url;
                link.title = url;
                orderList.appendChild(link);

                var img = document.createElement("img");
                var imgtxt;
                if(albumarray){
                for(let j=0; j< albumarray.image.length; j++){
                    if(albumarray.image[j].size=="extralarge"){
                        imgtxt = albumarray.image[j];
                    }
                }
                }
                var imsSrc = imgtxt[Object.keys(imgtxt)[0]];
                img.src = imsSrc;
                orderList.appendChild(img);
                unorderList.appendChild(orderList);    
            }
            output.appendChild(unorderList);   
        } 
        }
    };
    xhr2.send();

    var xhr3 = new XMLHttpRequest();
    var method3 = "artist.getsimilar";
    //var artist = encodeURI(document.getElementById("form-input").value);
    xhr3.open("GET", "proxy.php?method="+method3+"&artist="+artist+"&api_key="+api_key+"&format=json", true);
    xhr3.setRequestHeader("Accept","application/json");
    xhr3.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            var str = JSON.stringify(json,undefined,2);
            if(json.similarartists){
            var similarArtist = document.createElement("h3");
            similarArtist.innerHTML += "Similar Artist";
            output.appendChild(similarArtist);

            var unorderList = document.createElement("ul");
            for(let i=0; i<json.similarartists.artist.length; i++){
                var similarArtistArry = json.similarartists.artist[i];
                var orderList = document.createElement("li");
                orderList.setAttribute('class','similarArtist');
                var artistName = document.createElement("p");
                var name;
                if(similarArtistArry){
                    name = similarArtistArry.name;
                }
                artistName.innerHTML = name;
                orderList.appendChild(artistName);

                var link = document.createElement('a');
                var url;
                if(similarArtistArry){
                    url = similarArtistArry.url;
                }
                link.href = url;
                link.target = '_blank';
                link.innerHTML = url;
                link.title = url;
                orderList.appendChild(link);
                unorderList.appendChild(orderList);
            }
            output.appendChild(unorderList);  
        }
        }
    };
    xhr3.send();

    document.body.appendChild(output); 
    
}
