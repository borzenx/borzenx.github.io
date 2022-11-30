const insertUsersInTable = (html) => {
  document.querySelector("table").innerHTML = html;
};
const refresh = () => {
  window.location.reload();
};
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

const fetchUsers = async () => {
  const response = await fetch("http://localhost:3000/users");
  const data = await response.json();
  let dataHTML = ` <tr>
    <th>UID</th>
    <th>Name</th>
    <th>Last Name</th>
    <th>Edit</th>
    <th>Delete</th>
</tr>`;

  data.forEach(({ name, lastName }, i) => {
    dataHTML += `<tr>
        <td>${i}</td>
        <td>${name}</td>
        <td>${lastName}</td>
        <td><button value="${i}" id="editBtn${i}" class="editBtn">Edit</button></td>
        <td><button value="${i}" id="deleteBtn${i}" class="deleteBtn">Delete</button></td>
     </tr>`;
  });
  insertUsersInTable(dataHTML);
};

document.querySelector("body").addEventListener("click", (e) => {
  if (e.target?.matches("#addUser")) {
    const name = document.querySelector("#nameInput").value;
    const lastName = document.querySelector("#lastNameInput").value;

    fetch("http://localhost:3000/add", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name: name,
        lastName: lastName,
      }),
    }).then((res) => {
      return res.json();
    });
    refresh();
  }

  if (e.target?.matches(".deleteBtn")) {
    const id = e.target.value;

    fetch("http://localhost:3000/delete", {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        id: id,
      }),
    }).then((res) => {
      return res.json();
    });
    refresh();
  }

  if (e.target?.matches(".editBtn")) {
    const id = e.target.value;

    displayEditBox();

    document.querySelector("#update").addEventListener("click", (e) => {
      const name = document.querySelector("#newName").value;
      const lastName = document.querySelector("#newLastName").value;

      fetch("http://localhost:3000/update", {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          id: id,
          name: name,
          lastName: lastName,
        }),
      }).then((res) => {
        return res.json();
      });
      hideEditBox();
      refresh();
    });
  }
});

try {
  fetchUsers();
} catch (e) {
  console.error(`Error ${e}`);
}
