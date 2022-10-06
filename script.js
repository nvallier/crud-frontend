$(".open").on("click", function(){
  $(".modal, .modal-content").addClass("active");
});

$(".close").on("click", function(){
  $(".modal, .modal-content").removeClass("active");
});

var users = [
  {
    id: 1,
    name: "Global User"
  }
];

$.each(users, function(i, user) {
  appendToUsrTable(user);
});

$("form").submit(function(e) {
  e.preventDefault();
});

$("form#addUser").submit(function() {
  var user = {};
  var nameInput = $('input[name="name"]').val().trim();
  $(this).serializeArray().map(function(data) {
    user[data.name] = data.value;
  });
  if (nameInput) {
  var lastUser = users[Object.keys(users).sort().pop()];
  user.id = lastUser.id + 1;
  
  addUser(user);
  } else {
    alert("hello");
  }
});

function addUser(user) {
  users.push(user);
  appendToUsrTable(user);
  console.log("deu")
}

function appendToUsrTable(user) {
  $("#userTable > tbody:last-child").append(`
        <tr id="user-${user.id}">
            <td class="userData" name="name">${user.name}</td>
            '<td align="center">
                <button class="btn btn-success form-control" onClick="editUser(${user.id})" data-toggle="modal" data-target="#myModal")">EDIT</button>
            </td>
            <td align="center">
                <button class="btn btn-danger form-control" onClick="deleteUser(${user.id})">DELETE</button>
            </td>
        </tr>
    `);
}
