$(".open").on("click", function(){
  $(".modal, .modal-content, .update").addClass("active");
});

$(".close").on("click", function(){
  $(".modal, .modal-content, .update").removeClass("active");
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
                <button class="form-control open" onClick="editUser(${user.id})" data-toggle="modal" data-target="#update")">EDIT</button>
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

function editUser(id) {
  users.forEach(function(user, i) {
    if (user.id == id) {
      $(".update").empty().append(`
          <form id="updateUser" action="">
              <p>Name</p>
              <input class="form-control" type="text" name="name" value="${user.name}"/>
              <button type="button" class="form-control" type="submit" onClick="updateUser(${id})">Save changes</button>
              <button type="button" data-dismiss="modal">Close</button>
          </form>
      `);
    }
  });
}

function updateUser(id) {
  var user = {};
  user.id = id;
  users.forEach(function(user, i) {
    if (user.id == id) {
      $("#updateUser").children("input").each(function() {
        var value = $(this).val();
        var attr = $(this).attr("name");
        if (attr == "name") {
          user.name = value;
        }
      });
      users.splice(i, 1);
      users.splice(user.id - 1, 0, user);
      $("#userTable #user-" + user.id).children(".userData").each(function() {
        var attr = $(this).attr("name");
        if (attr == "name") {
          $(this).text(user.name);
        } 
      });
    }
  });
}

window.onbeforeunload = function() {
  localStorage.setItem("name", user.name);
  userList(user);
}