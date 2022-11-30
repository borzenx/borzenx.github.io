/*
Requirements:
    1. console should return numbers in order from 1 to 6,
    2. at the end of the console log should be the name and last name of the user with id = 1 as a string, e.g.: "John Rambo"
    3. max 9 lines/things to modify - remove, add or change line, change/add parameter to method
    4. do not rewrite whole blocks

Console result: 
    1
    2
    3
    4
    5
    6
    John Rambo
*/
setTimeout(() => {
  console.log(1);
}, 100);

setTimeout(() => {
  console.log(2);
}, 300); //1st change
console.log("Start");
new Promise((res) => {
  //   return rej("Ops, something went wrong!!"); //2nd change
  setTimeout(() => {
    console.log(3);
    res();
  }, 0);
}).catch(console.error);
console.log("next");

const getDefaultUser = async () => {
  const user = await new Promise((res) => {
    setTimeout(() => {
      res({ name: "Default", lastName: "User" });
    }, 1);
  });

  return user;
};

const getUser = (id) => {
  return new Promise((res) => {
    setTimeout(() => {
      if (id === 1) {
        res({ name: "John", lastName: "Rambo" });
      } else {
        getDefaultUser().then(res);
      }
    }, 500);
  }).catch((e) => {
    console.error(e);
  });
};

let counter = 0;

const interval = setInterval(async () => {
  if (counter < 3) {
    counter++;
    console.log(3 + counter);
  } else {
    const user = await getUser(1); //4th change
    const userString = `${user.name} ${user.lastName}`; //5th change
    console.log(userString); //6th change

    clearInterval(interval); //3rd change
  }
}, 1000);
