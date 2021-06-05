var current_lab;
var p = 1;
var database = firebase.firestore();
var program_id;
var id;
var Labname;
var profileImg;
var Uname;
var Labcode;
var titlee;

document.getElementById("loader").style.display="none";

function toggleVisibility(checkbox, id) {
  
  var content = document.getElementById(id);
  
  if(checkbox.checked == true) {
    content.style.display = "block";
    checkbox.checked = "false";
  }
  
  else {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    var checkedOne = Array.prototype.slice.call(checkboxes).some(x => x.checked);
    
    if(!checkedOne) {
      checkbox.checked = "true";
    } else {
      content.style.display = "none";
    }
  }
}

var uiddd;
var firestore = firebase.firestore();
var USER_GLOBAL = null;

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    // console.log("==================== ", user);
    getUser(user.uid);
    uiddd = user.uid;
    getHistory(user.uid);
    USER_GLOBAL = user;
    changeProPic(user);
  } else {
    // No user is signed in.
    window.location.href="file:///Users/ketan_priya/Desktop/vsc/compile-anywhere-master/compile-anywhere/landing.html";
  }
});

const getUser = (uiddd) => {
  firestore
  .collection("faculty-user")
  .where("uid", "==", uiddd)
  .get()
  .then((result) => {
    // console.log("============== ", result);
    if (result.docs.length == 1) {
      // console.log("============== ", result.docs[0].data());
      const name = result.docs[0].data().userName;
      const image = result.docs[0].data().profilepicurl;
      profileImg = image;
      Uname = name;
      const Email = result.docs[0].data().Email;
      document.querySelector("#name1").innerText = name;
      document.querySelector("#name2").innerText = Email;
    }
  });
};

const getHistory = (uiddd) => {
  let tableData = [];
  firestore
  .collection("lastedited")
  .orderBy("Details.dateandtime" , "desc")
  .where("name", "==", uiddd)
  .get()
  .then((result) => {
    result.docs.forEach((element) => {
      console.log("============== ", element.data());
      tableData.push({
        labcode: element.data().labcode,
        progname: element.data().progname,
        action: element.data().Details.action,
        date: element.data().Details.dateandtime,
      });
    });
    bindDataToDataTable(tableData);
  });
};

const bindIcon = (data) => {
  if (data === "deleted") {
    return "<i class='material-icons trash'>delete</i>";
  } else if (data === "edited") {
    return "<i class='material-icons home'>description</i>";
  } else if (data === "Added") {
    return "<i class='material-icons shop'>note_add</i>";
  }
};

const bindDataToDataTable = (data) => {
  if (data.length === 0) {
    $("#productTable").append("<tbody></tbody>");
  }

  data.forEach((element) => {
    // historyTable
    $("#historyTable tbody").append(
      "<tr style='border:2px solid black;'>" +
        "<td>" +
        element.labcode +
        "</td>" +
        "<td>" +
        element.progname +
        "</td>" +
        "<td>" +
        bindIcon(element.action) +
        "</td>" +
        "<td>" +
        element.date +
        "</td>" +
        "</tr>"
    );
  });
};

var language_list = ["Java", "Java (Advanced)", "C", "C++", "C#", "PHP", "Perl", "Ruby", "Python2",
"Python3", "SQL", "Scala", "VB.Net", "Pascal", "Haskell", "Kotlin", "Objective-C", "Groovy", "Fortran",
"Brainf**k", "Hack", "TCL", "Lua", "Rust", "F#", "Ada", "D", "Dart", "YaBasic", "Free Basic", "Clojure",
"Verilog", "NodeJS", "Scheme", "Forth", "Prolog", "Bash", "COBO", "OCTAVE/Matlab", "Icon", "CoffeeScript",
"Assembler (GCC)", "R", "Assembler (NASM)", "Intercal", "Nemerle", "Ocaml", "Unlambda", "Picolisp",
"CLISP", "Elixir", "SpiderMonkey", "Rhino JS", "BC", "Nim", "Factor", "Falcon", "Fantom", "Pike",
"Go", "OZ-Mozart", "LOLCODE", "Racket", "SmallTalk", "Whitespace", "Erlang", "J Lang", 
"HTML", "Javascript"];

var languages_list = ``;
var languages_info = ``;

language_list.forEach(function (language) {
  languages_list += `<a class="options" href="#Java">${language}</a>`
  languages_info += `<p>${language}</p>`
});

document.getElementById("myDropdown").innerHTML += languages_list;
document.getElementById("languages").innerHTML = languages_info;

var modal = document.getElementById("modal2");

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};


// TM CHANGE -->

function changeProPic(user){
  
  var proPics = [];
  var usernames = [];
  var emails = [];
  proPics.push(document.getElementById("proPicId"))
  proPics.push(document.getElementById("proPicModal1"))
  proPics.push(document.getElementById("proPicModal2"))
  usernames.push(document.getElementById("name1"))
  usernames.push(document.getElementById("username"))
  emails.push(document.getElementById("name2"))
  
  var name;
  var email;
  name = user.displayName;
  email = user.email;
  
  emails.forEach(emailDom => {
    emailDom.value = email;
    emailDom.innerHTML = email;
  });
  
  db = firebase.firestore();
  var dbRef = db.collection("faculty-user").where("uid", "==", uiddd); //TM USERDETAILS
  dbRef.get().then((querySnapshot) => {
    if(querySnapshot.length == 0){
      proPics.forEach(function(propic){
        proPic.setAttribute('src', 'profile.png');
      })
    }
    querySnapshot.forEach(async (doc) => {
      var userDoc = doc.data();
      console.log("userDoc QUERY",userDoc, email) 
      var proPicUrl = userDoc['profilepicurl'];
      var username = userDoc['userName'];
      usernames.forEach(usernameDom => {
        usernameDom.value = username;
        usernameDom.innerHTML = username;
      });
      proPics.forEach(function(proPic){
        proPic.setAttribute('src', proPicUrl);
      })
    });
  });
}

function setDummyPicAndUpload(inputDOM, picholder){
  var file = inputDOM.files[0];
  picholder.file = file;
  
  const reader = new FileReader();
  reader.onload = (function(aImg, inpDOM) { return function(e) { 
    var email = USER_GLOBAL.email;
    var photoDataURL = e.target.result;
    if(photoDataURL == null){
      proPic = "https://firebasestorage.googleapis.com/v0/b/compiler-2ab9e.appspot.com/o/photos%2Fprofile.png?alt=media&token=27debe28-7e34-42f6-832b-03b70cb14e48"
    }
    var storageRef = firebase.storage().ref("photos/" + email); //TODO better path
    storageRef.putString(photoDataURL, 'data_url').then(function(snapshot) {
      console.log('Uploaded a data_url string!', snapshot);
      snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log("File available at", downloadURL);
        db = firebase.firestore();
        var dbRef = db.collection("faculty-user").where("Email", "==", email);
        dbRef.get().then((querySnapshot) => {
          querySnapshot.forEach(async (doc) => {
            var userDeets = doc.data();
            console.log("docdocdocdoc",doc.id, userDeets);
            db.collection('faculty-user').doc(doc.id).set({ //TM USERDETAILS
              profilepicurl: downloadURL,
            }, { merge: true })
            .then(function(result) {
              if (result.docs.length == 1){
                const Profilepic = result.docs[0].data().profilepicurl;
                Profile_pic = Profilepic;
              }
              console.log("USER PRO PIC CHANGED: ", USER_GLOBAL);
              changeProPic(USER_GLOBAL)
            })
          })
        });
      });
    });
    aImg.src = photoDataURL; 
    inpDOM.setAttribute('fileData',photoDataURL); 
  }; })(picholder, inputDOM);
  reader.readAsDataURL(file);
  // TM CHANGE -->
}

const docProfile = database.collection("faculty-user").doc();
const docDetail = database.collection("lastedited").doc();
const outputHeader1 = document.querySelector("#program_num");
const outputHeader2 = document.querySelector("#blank");
const progDesc = document.querySelector("#progDesc");
const progCode = document.querySelector("#progCode");
const progInput = document.querySelector("#runTimeInput");
const progOutput = document.querySelector("#progOutput");
const progTitle = document.querySelector("#latestTitle");
const lang = document.querySelector("#language"); 
const osUsed = document.querySelector("#os"); 
const softwareUsed = document.querySelector("#software"); 
const tagUsed = document.querySelector("#thisValue3"); 
const youtubeLink = document.querySelector("#site"); 
const saveButton = document.querySelector("#saveButton");
const undoButton = document.querySelector("#undoButton");

function save_details() {
  var d = new Date();
  document.getElementById("loader").style.display="block";
  
  setTimeout(function(){ 
    $('.loader').css('display', 'none');
  }, 2000); // it will remove after 2 seconds
  
  const saveTitle = progTitle.value;
  titlee = saveTitle;
  const saveDesc = progDesc.value;
  const saveCode = progCode.value;
  const saveInput = progInput.value;
  const saveOutput = progOutput.value;
  const saveLang = lang.value;
  const saveOs = osUsed.value;
  const saveSoftware = softwareUsed.value;;
  const saveLink = youtubeLink.value;
  // var saveDate = d.toUTCString();
  var sDate = d.toLocaleDateString();
  var sTime = d.toLocaleTimeString();
  
  var x = document.querySelectorAll(".tag");
  var tag1 = [];
  
  for (let i = 0; i < x.length; i++) {
    const element = x[i];
    var hi = element.innerText.indexOf("close");
    var finall = element.innerText.substr(0,hi).trim();
    tag1.push(finall);
  }
  
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      
      var uidd = user.uid;
      database.collection("programs").doc(program_id).update({
        Program_Title: saveTitle,
        Program_Description: saveDesc,
        Program_Code: saveCode,
        Program_Input: saveInput,
        Program_Output: saveOutput,
        Language: saveLang,
        Os_used: saveOs,
        Software_used: saveSoftware,
        Tags: tag1,
        Date: sDate,
        Time: sTime,
        Youtube_link: saveLink,
        Profile_pic_url: profileImg,
        UserName: Uname,
        Uid: uidd,
      })
      .then(function () {
        document.querySelector('#blank').innerHTML = Program_Title + ". . . Last edited on " + sDate +" at " + sTime;
        history.go(0);
      })
      .catch(function (error) {
        console.log("got an error:", error);
      });
    }
  });
  docDetail
  .set({
    currentStatus: "Available",
    Details:{
      action: "edited",
      dateandtime: sDate + " " + sTime
    },
    name: uiddd,
    progname: titlee,
    labcode: Labcode
  })
  .then(function () {
    console.log("status saved!");
  })
  .catch(function (error) {
    console.log("got an error:", error);
  });
}

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("language");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

var modal = document.getElementById('hint');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  
  if (event.target == modal) {
    
    modal.style.display = "none";
    
  }
}

function changeModal(){
  document.getElementById("modalIN").style.display = "none";
  document.getElementById("modal").style.display = "block";
}

const tagContainer = document.querySelector('.tag-container');

const input = document.querySelector('.tag-container input');

var tags = [];

function createTag(label){
  const div = document.createElement('div');
  div.setAttribute('class','tag');
  const span = document.createElement('span');
  span.innerHTML = label;
  const closeBtn = document.createElement('i');
  closeBtn.setAttribute('class','material-icons close');
  closeBtn.setAttribute('data-item', label);
  closeBtn.innerHTML = 'close';
  
  div.appendChild(span);
  div.appendChild(closeBtn);
  return div;
}

function reset() {
  document.querySelectorAll('.tag').forEach(function(tag){
    tag.parentElement.removeChild(tag);
  })
}

function addTags(){
  reset();
  tags.slice().reverse().forEach(function(tag){
    const input = createTag(tag);
    tagContainer.prepend(input);
  })
}

input.addEventListener('keyup', function(e){
  if(e.key === 'Enter'){
    tags.push(input.value);
    addTags();
    input.value = '';
  }
})

document.addEventListener('click',function(e){
  if(e.target.tagName ===  "I"){
    const value = e.target.getAttribute('data-item');
    const index = tags.indexOf(value);
    tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
    addTags();
  }
})

$(document).on('click', 'a', function(e) {
  e.preventDefault();
  e = $(this).text();//This gets the text
  $('.drop3').val(e);
});

function logout() 
{
  firebase.auth().signOut();
}

function showUp(){
  $('.sem').on('click', function(){
    $('.sem').removeClass('decide');
    $(this).addClass('decide');
  }); 
}

function program_details(id, program_no) {
  showUp();
  database.collection("programs").doc(id).get().then((querySnapshot) => {
    const Data = querySnapshot.data();
    document.querySelector("#program_num").innerHTML = 'Program #' + program_no + ": " + querySnapshot.data().Program_Title;
    if(Data.Date != "" && Data.Time != "") {
      document.querySelector('#blank').innerHTML = ". . . Last edited on " + Data.Date +" at " + Data.Time;
    }
    document.querySelector("#program_num").innerHTML = 'Program #' + program_no + ": " + querySnapshot.data().Program_Title;
    document.getElementById('latestTitle').value = Data.Program_Title;
    document.getElementById('progDesc').value = Data.Program_Description;
    document.getElementById('progCode').value = Data.Program_Code;
    document.getElementById('runTimeInput').value = Data.Program_Input;
    document.getElementById('progOutput').value = Data.Program_Output;
    document.getElementById('language').value = Data.Language;
    document.getElementById('os').value = Data.Os_used;
    document.getElementById('software').value = Data.Software_used;
    document.getElementById('site').value = Data.Youtube_link;
    document.querySelector("#thisValue3").value  = Data.Tags;
    
    program_id = querySnapshot.id;
  });
}

function checkCookies() { 
  id = window.localStorage.getItem('id');
  Labname = window.localStorage.getItem('Labname');
  Labcode = window.localStorage.getItem('Labcode');
  document.querySelector("#Labname").innerHTML = Labname;
  retrieve_programs(Labname);
}

function retrieve_programs(Labname) {
  var program_list = {};
  labname = Labname;
  var i = 1;
  database.collection("programs").where("Lab", "==", Labname).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      program_no = i++;
      displayProgram(program_no, doc.id);
      program_list[doc.data().Program_no] =  doc.data().Program_Title;
    });
  });
}

function displayProgram(program_no, id) {
  let program = `<div class="sem" onclick="program_details('${id}', ${program_no})">
  <div class="row no-gutters">
      <div class="col-9">
          <span class="sem_font">Program #${program_no}</span>
      </div>
      <span class="col-2">
          <div class="duo">
              <span class="material-icons reset" data-target="#trash_modalreset" data-toggle="modalreset" onclick="save_id('reset_me', '${id}')"></span>
              <span class="material-icons delete" data-target="#trash_modaldelete" data-toggle="modaldelete" onclick="save_id('delete_me', '${id}')"></span>
          </div>
      </span>
  </div>
  </div>`

  document.querySelector("#sem_list").innerHTML += program;
}

var t = new Date();

function delete_program() {
  close_it('delete_me');
  database.collection("programs").doc(current_lab).delete();
  var sDate = t.toLocaleDateString();
  var sTime = t.toLocaleTimeString();
  const saveTitle = progTitle.value;
  titlee = saveTitle;
  database.collection("lastedited").doc()
  .set({
    currentStatus: "Deleted",
    Details:{
      action: "deleted",
      dateandtime: sDate + " " + sTime
    },
    name: uiddd,
    progname: titlee,
    labcode: Labcode
  })
  .then(function () {
    console.log("status saved!");
  })
  .catch(function (error) {
    console.log("got an error:", error);
  });
}

function refresh_data() {
  database.collection("programs").doc(current_lab).update(
    { Program_Title: "",
    Date: "",
    Language: "",
    Os_used: "",
    Program_Code: "",
    Program_Description: "",
    Program_Input: "",
    Program_Output: "",
    Program_Title: "", 
    Software_used: "",
    Time: "",
    Youtube_link: "",
    Tags: [],
  }
  )
  close_it('reset_me');
}

function save_id(id, program_id) {
  document.getElementById(id).style.display='block';
  current_lab = program_id;
} 

function close_it(id) {
  document.getElementById(id).style.display='none';
}


function open_it(){
  document.getElementById('modal1').style.display='none';
  document.getElementById('modal2').style.display='block';
}

const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');

togglePassword.addEventListener('click', function (e) {
    
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
});

const togglenewPassword = document.querySelector('#togglenewPassword');
const newpassword = document.querySelector('#newpassword');
const confirmPassword = document.querySelector('#confirmPassword');

togglenewPassword.addEventListener('click', function (e) {
    
    const type = newpassword.getAttribute('type') === 'password' ? 'text' : 'password';
    newpassword.setAttribute('type', type);
    const conf_type = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmPassword.setAttribute('type', conf_type);
    this.classList.toggle('fa-eye-slash');
});

var check = function () {
  if (document.getElementById("confirmPassword").value.length == 0) {
    document.getElementById("indicator").style.color = "#0183d2";
  }
  else
  { if (
    document.getElementById("newpassword").value ==
    document.getElementById("confirmPassword").value
  ) {
    document.getElementById("indicator").style.color = "rgb(103, 212, 64)";
    
  } else {
    document.getElementById("indicator").style.color = "rgb(228, 52, 52)";
    
  }
}
};

function logout() 
{
    firebase.auth().signOut();
}

