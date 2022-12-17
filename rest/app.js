const insertUsersInTable = (users) => {
  let dataHTML = getDataHtmlHeader();
  let searchedData = getDataHtmlHeader();

  document.querySelector("#searchInput").addEventListener("input", (e) => {
    const searchValue = e.target.value;

    searchedData = displayDataAndCheckLength(
      searchValue,
      users,
      searchedData,
      dataHTML
    );
  });

  users.forEach(({ _id, name, lastName }) => {
    dataHTML += `<tr>
        <td>${_id}</td>
        <td>${name}</td>
        <td>${lastName}</td>
        <td><button value="${_id}" class="editBtn">Edit</button></td>
        <td><button value="${_id}" class="deleteBtn">Delete</button></td>
     </tr>`;
  });
  document.querySelector("table").innerHTML = dataHTML;
};

const refresh = async () => {
  const users = await fetchUsers();
  insertUsersInTable(users);
};

const hideEditBox = () => {
  document.querySelector("#editNotification").innerHTML = "";
};
const getNewUserData = () => {
  const name = document.querySelector("#nameInput").value;
  const lastName = document.querySelector("#lastNameInput").value;
  return { name, lastName };
};
const getDataHtmlHeader = () => {
  return ` <tr>
<th>UID</th>
<th>Name</th>
<th>Last Name</th>
<th>Edit</th>
<th>Delete</th>
</tr>`;
};

const getNewUsersToUpdate = () => {
  const name = document.querySelector("#newName").value;
  const lastName = document.querySelector("#newLastName").value;
  return { name, lastName };
};

const fetchUsers = async () => {
  const response = await fetch("http://localhost:3000/users");
  return await response.json();
};

document.querySelector("body").addEventListener("click", async (e) => {
  if (e.target?.matches("#addUser")) {
    addNewUserOperation(e);
  }

  if (e.target?.matches(".deleteBtn")) {
    deleteUserOperation(e);
  }

  if (e.target?.matches(".editBtn")) {
    editUserOperation(e);
  }
});

const addNewUserOperation = async (e) => {
  const { name, lastName } = getNewUserData();

  const addUser = async () => {
    await fetch("http://localhost:3000/add", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name,
        lastName,
      }),
    }).then((res) => res.json());
  };
  addUser();
  await refresh();
};

const editUserOperation = (e) => {
  const _id = e.target.value;

  displayEditBox();

  document.querySelector("#update").addEventListener("click", async () => {
    const { name, lastName } = getNewUsersToUpdate();

    const updateUser = async () => {
      await fetch("http://localhost:3000/update", {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          _id,
          name,
          lastName,
        }),
      }).then((res) => res.json());
    };
    updateUser();
    hideEditBox();
    await refresh();
  });
};

const deleteUserOperation = async (e) => {
  const _id = e.target.value;
  await fetch("http://localhost:3000/delete", {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      _id,
    }),
  })
    .then((res) => res.json())
    .catch(console.error);
  await refresh();
};

try {
  const users = await fetchUsers();
  insertUsersInTable(users);
} catch (e) {
  console.error(`Error ${e}`);
}
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

const displayDataAndCheckLength = (
  searchValue,
  users,
  searchedData,
  dataHTML
) => {
  if (searchValue.length >= 3) {
    const result = users.filter(({ name, _id, lastName }) =>
      [name, _id, lastName].includes(searchValue)
    );

    result.forEach(({ _id, name, lastName }) => {
      searchedData = `<tr>
            <th>UID</th>
            <th>Name</th>
            <th>Last Name</th>
            <th>Edit</th>
            <th>Delete</th>
            </tr>
            <tr>
            <td>${_id}</td>
            <td>${name}</td>
            <td>${lastName}</td>
            <td><button value="${_id}" class="editBtn">Edit</button></td>
            <td><button value="${_id}" class="deleteBtn">Delete</button></td>
         </tr>`;
    });
    document.querySelector("table").innerHTML = searchedData;
  } else {
    document.querySelector("table").innerHTML = dataHTML;
  }
  return searchedData;
};
