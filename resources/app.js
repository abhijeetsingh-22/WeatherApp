window.addEventListener('load',()=>{
    let temp=document.querySelector(".temperature-value");
    let description=document.querySelector(".description");
    let tzone=document.querySelector(".location h1");
    let tempGroup=document.querySelector(".temperature-group")
    let tempSpan=document.querySelector(".temperature-group span")
    let tempValue=document.querySelector(".temperature-value");

    let long;
    let lat;
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            console.log(position);
            long=position.coords.longitude;
            lat=position.coords.latitude;
            const proxy="https://cors-anywhere.herokuapp.com/"; 
            const api=`${proxy}https://api.darksky.net/forecast/8e8d03cd7a865c5c4f37e41780c7d639/${lat},${long}`;
            fetch(api).then(response =>{
                return response.json();
            }).then(data =>{
                const {temperature,icon,summary}= data.currently;
                let tempCelsius=((temperature-32)*5/9).toFixed(2);
                console.log(tempCelsius);
                console.log(data);
                
                temp.textContent=temperature;
                description.textContent=summary;
                tzone.textContent=data.timezone;
                setIcon(icon,document.querySelector(".icon")); 
                tempGroup.addEventListener("click",()=>{
                    if(tempSpan.textContent==="F"){
                        tempSpan.textContent="C";
                        tempValue.textContent=tempCelsius;


                    }else{
                        tempSpan.textContent="F";
                        tempValue.textContent=temperature;

                    }
                })
            })
        });
        function setIcon(icon, iconID){
            const curIcon=icon.replace(/-/g,"_");
            const skycons= new Skycons({color:"white"});
            skycons.play();
            return skycons.set(iconID,curIcon);
             
        }
    }
});