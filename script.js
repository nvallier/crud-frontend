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
  userList(user);
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
    console.log("Error");
  }
});

function addUser(user) {
  users.push(user);
  userList(user);
}

function userList(user) {
  $("#userTable > tbody:last-child").append(`
        <tr id="user-${user.id}">
            <td class="userData" name="name">${user.name}</td>
            '<td align="center">
                <button class="form-control" onClick="editUser(${user.id})" data-toggle="modal" data-target="#myModal")">EDIT</button>
            </td>
            <td align="center">
                <button class="form-control" onClick="deleteUser(${user.id})">DELETE</button>
            </td>
        </tr>
    `);
}

function deleteUser(id) {
  var deleteMsg = confirm("Confirm to delete.");
  users.forEach(function(user, i) {
    if (user.id == id && deleteMsg != false) {
      users.splice(i, 1);
      $("#userTable #user-" + user.id).remove();
    }
  });
}