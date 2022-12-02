//DOM MANIPULATION FUNCTIONS

const insertUsersInTable = (html) => {
  document.querySelector("table").innerHTML = html;
};

const refresh = () => {};

const displayEditBox = () => {
  document.querySelector("#editNotification").innerHTML = `
    <div id="editContainer">
        <div id="editBox">
        <input type="text" placeholder="Name" id="newName">
        <input type="text" placeholder="last name" id="newLastName">
        <button id="update">Update</button>
    </div>
</div>`;
};

const hideEditBox = () => {
  document.querySelector("#editNotification").innerHTML = "";
};

getNewUserData = () => {
  const name = document.querySelector("#nameInput").value;
  const lastName = document.querySelector("#lastNameInput").value;
  return { name, lastName };
};
getDataHtmlHeader = () => {
  return ` <tr>
<th>UID</th>
<th>Name</th>
<th>Last Name</th>
<th>Edit</th>
<th>Delete</th>
</tr>`;
};

getNewUsersToUpdate = () => {
  const name = document.querySelector("#newName").value;
  const lastName = document.querySelector("#newLastName").value;
  return { name, lastName };
};

const fetchAndManipulateUsers = async () => {
  const response = await fetch("http://localhost:3000/users");
  const data = await response.json();

  let dataHTML = getDataHtmlHeader();

  data.forEach(({ name, lastName }, i) => {
    dataHTML += `<tr>
        <td>${i}</td>
        <td>${name}</td>
        <td>${lastName}</td>
        <td><button value="${i}" class="editBtn">Edit</button></td>
        <td><button value="${i}" class="deleteBtn">Delete</button></td>
     </tr>`;
  });
  insertUsersInTable(dataHTML);
};

document.querySelector("body").addEventListener("click", (e) => {
  if (e.target?.matches("#addUser")) {
    addNewUserOperation();
  }

  if (e.target?.matches(".deleteBtn")) {
    deleteUserOperation();
  }

  if (e.target?.matches(".editBtn")) {
    editUserOperation();
  }

  addNewUserOperation = () => {
    const { name, lastName } = getNewUserData();

    const addUser = async () => {
      const response = await fetch("http://localhost:3000/add", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          name,
          lastName,
        }),
      }).then((res) => res.json());
      await response;
    };
    addUser();
    refresh();
  };

  function editUserOperation() {
    const id = e.target.value;

    displayEditBox();

    document.querySelector("#update").addEventListener("click", () => {
      const { name, lastName } = getNewUsersToUpdate();

      const updateUser = async () => {
        const response = await fetch("http://localhost:3000/update", {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            id,
            name,
            lastName,
          }),
        }).then((res) => res.json());
        await response;
      };
      updateUser();
      hideEditBox();
      refresh();
    });
  }

  function deleteUserOperation() {
    const id = e.target.value;

    const deleteUser = async () => {
      const response = await fetch("http://localhost:3000/delete", {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          id,
        }),
      }).then((res) => res.json());
      await response;
    };
    deleteUser();
    refresh();
  }
});

try {
  fetchAndManipulateUsers();
} catch (e) {
  console.error(`Error ${e}`);
}
