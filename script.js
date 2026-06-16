if(localStorage.getItem("loggedIn") !== "true"){
  window.location.href = "login.html";
}let leads = JSON.parse(localStorage.getItem("leads")) || [];

function addLead(){

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let source = document.getElementById("source").value;
  let status = document.getElementById("status").value;
  let notes = document.getElementById("notes").value;

  if(name === "" || email === ""){
    alert("Enter Name and Email");
    return;
  }

  let lead = {
    id: Date.now(),
    name,
    email,
    source,
    status,
    notes
  };

  leads.push(lead);

  localStorage.setItem("leads", JSON.stringify(leads));

  displayLeads();

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("notes").value = "";
}
document.getElementById("totalLeads").innerText =
  leads.length;

document.getElementById("convertedLeads").innerText =
  leads.filter(
    lead => lead.status === "Converted"
  ).length;
function displayLeads(){

  let leadList = document.getElementById("leadList");

  leadList.innerHTML = "";

  leads.forEach((lead)=>{

    leadList.innerHTML += `
      <div class="card">
        <h3>${lead.name}</h3>

        <p><b>Email:</b> ${lead.email}</p>

        <p><b>Source:</b> ${lead.source}</p>

        <p><b>Status:</b>
          <select onchange="updateStatus(${lead.id},this.value)">
            <option ${lead.status==="New"?"selected":""}>New</option>
            <option ${lead.status==="Contacted"?"selected":""}>Contacted</option>
            <option ${lead.status==="Converted"?"selected":""}>Converted</option>
          </select>
        </p>

        <p><b>Notes:</b> ${lead.notes}</p>

        <button class="delete" onclick="deleteLead(${lead.id})">
          Delete
        </button>
      </div>
    `;
  });
}

function updateStatus(id,newStatus){

  leads = leads.map(lead=>{
    if(lead.id===id){
      lead.status=newStatus;
    }
    return lead;
  });

  localStorage.setItem("leads",JSON.stringify(leads));
}

function deleteLead(id){

  leads = leads.filter(lead=>lead.id!==id);

  localStorage.setItem("leads",JSON.stringify(leads));

  displayLeads();
}

displayLeads();
function logout(){
    localStorage.removeItem("loggedIn");
    window.location.href="login.html";
}
