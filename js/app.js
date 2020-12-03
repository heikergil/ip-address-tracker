const form_submit = document.getElementById('submit-button');
let api_url = 'https://geo.ipify.org/api/v1?apiKey=at_msnQA4lEQtN5nwJGwjHmh3K9nKlkX';       
get_data(api_url);


function ValidateIPaddress(ipaddress) 
{
 if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress))
  {
    document.getElementById('ip-tracker').classList.remove('warning');
    document.getElementById('warning-text').classList.add('hidden');
    return (true);
  }
    document.getElementById('ip-tracker').classList.add('warning');
    document.getElementById('warning-text').classList.remove('hidden');
    console.log("You have entered an invalid IP address!");
    return (false);
}

   

        function get_data(url) {
            fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const ip = data.ip;

            const location = data.location.country;
            const time_zone = data.location.timezone;
            const isp = data.isp;

            
            const ip_address_info = document.getElementById('ip_address_info');
            ip_address_info.innerHTML = ip;

            const location_info = document.getElementById('location_info');
            location_info.innerHTML = location;

            const time_zone_info = document.getElementById('time_zone');
            // const utc_info = document.getElementById('utc');
            time_zone_info.innerHTML = time_zone;

            const isp_info = document.getElementById('isp_info');
            isp_info.innerHTML = isp;
            
            
            lat = data.location.lat;
            lng = data.location.lng;

        var mymap = L.map('map').setView([lat, lng], 13);

         L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox/streets-v11',
                tileSize: 512,
                zoomOffset: -1,
                accessToken: 'pk.eyJ1IjoiZXhwb25lbnRpYWwiLCJhIjoiY2tpMXEzdGczMG56ZDJ5bXN1dWljNm1uaSJ9.Woneln9FvtHIeqAEShnr2A'
                }).addTo(mymap);


                form_submit.addEventListener('click', function(event) {

                    event.preventDefault();
                    // gets the user ip from the html form
                    const user_ip = document.getElementById('ip-input').value;
                    ValidateIPaddress(user_ip);                                           
                    let api_url = 'https://geo.ipify.org/api/v1?apiKey=at_msnQA4lEQtN5nwJGwjHmh3K9nKlkX&ipAddress=' + user_ip; 
    
                    fetch(api_url)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        const ip = data.ip;
            
                        const location = data.location.country;
                        const time_zone = data.location.timezone;
                        const isp = data.isp;
            
                        
                        const ip_address_info = document.getElementById('ip_address_info');
                        ip_address_info.innerHTML = ip;
            
                        const location_info = document.getElementById('location_info');
                        location_info.innerHTML = location;
            
                        const time_zone_info = document.getElementById('time_zone');
                        // const utc_info = document.getElementById('utc');
                        time_zone_info.innerHTML = time_zone;
            
                        const isp_info = document.getElementById('isp_info');
                        isp_info.innerHTML = isp;
                        
                        
                        let lat = data.location.lat;
                        let lng = data.location.lng;
    
                        mymap.setView([lat,lng], 13);
                        
                });
    
                });


        }) 



    }

   