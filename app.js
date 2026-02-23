let user, team;
let viewDate=new Date();

function enter(){
user=username.value;
team=team.value;

login.classList.add("hidden");
planner.classList.remove("hidden");

load();
}

async function api(action,data={}){
data.action=action;
let res=await fetch("api.php",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(data)
});
return await res.json();
}

async function add(){

let start=new Date(start.value);
let end=new Date(end.value);

while(start<=end){

await api("add",{
user,
team,
date:start.toISOString().split('T')[0],
status:status.value
});

start.setDate(start.getDate()+1);
}

load();
}

function change(n){
viewDate.setMonth(viewDate.getMonth()+n);
load();
}

async function load(){

let data=await api("list",{team});

let cal=document.getElementById("calendar");
cal.innerHTML="";

let y=viewDate.getFullYear();
let m=viewDate.getMonth();

month.innerText=viewDate.toLocaleString("default",{month:"long",year:"numeric"});

let last=new Date(y,m+1,0);

for(let d=1;d<=last.getDate();d++){

let date=`${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;

let div=document.createElement("div");
div.className="day";
div.innerHTML="<b>"+d+"</b>";

data
.filter(e=>e.date===date)
.forEach(e=>{
let ev=document.createElement("div");
ev.className="event "+e.status;
ev.textContent=e.user;
div.appendChild(ev);
});

cal.appendChild(div);
}
}
