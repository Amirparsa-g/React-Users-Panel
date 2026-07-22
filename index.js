const users = [
  {
    ID: 1,
    fullName: "Parsa Gorji",
    age: 20,
    role: "admin",
    isActive: true,
  },
  {
    ID: 2,
    fullName: "John Doe",
    age: 34,
    role: "operator",
    isActive: true,
  },
  {
    ID: 3,
    fullName: "matin tavakoli",
    age: 19,
    role: "customer",
    isActive: false,
  },
  {
    ID: 4,
    fullName: "Ali Mohammadi",
    age: 73,
    role: "customer",
    isActive: true,
  },
  {
    ID: 5,
    fullName: "sara mohammadi",
    age: 29,
    role: "operator",
    isActive: false,
  },
  {
    ID: 6,
    fullName: "Amir mohammadi",
    age: 30,
    role: "admin",
    isActive: false,
  },
];
const usersBuffer = [...users];
// تمرین 1 : نمایش نام کاربران
const userNames = users.map((user) => {
  return user.fullName;
});
console.log(userNames);

// تمرین 2: نمایش کاربران فعال
const activeUsers = users.filter((user) => {
  return user.isActive === true;
});

console.log(activeUsers);
if (JSON.users === JSON.usersBuffer)
  console.log("the main array has'nt changed");

// تمرین 3:پیدا کردن کاربر با شناسه
const findUserByID = (id) => {
  const usersIDs = users.map((user) => {
    return user.ID;
  });
  if (!usersIDs.includes(id)) return "کاربر مورد نظر یافت نشد";

  const selectedUser = users.find((user) => {
    return user.ID === id;
  });
  return selectedUser;
};
console.log(findUserByID(2));
console.log(findUserByID(20));

// تمرین 4:جست و جو بر اساس عبارت موجود در نام
const searchUser = (searchTerm) => {
  const selectedPeople = users.filter((user) => {
    const nameLower = user.fullName.toLowerCase();
    const trimmedTerm = searchTerm.trim().toLowerCase();
    return nameLower.includes(trimmedTerm);
  });
  return selectedPeople;
};

console.log(searchUser("parsa"));
console.log(searchUser("OhaMMadi"));
console.log(searchUser("susan"));

//تمرین 5: فیلتر کردن بر اساس نقش
const filterUserByRole = (role) => {
  const filteredByRoleUsers = users.filter((user) => {
    return user.role === role;
  });
  return filteredByRoleUsers;
};

console.log(filterUserByRole("admin"));
console.log(filterUserByRole("customer"));
console.log(filterUserByRole("abcd"));

//تمرین 6: تغییر وضعیت کاربر بدون اینکه ارایه ی اصلی تغییر بکند
const toggleUserStatus = (id) => {
  const toggleUser = users.map((user) => {
    if (user.ID === id) return { ...user, isActive: !user.isActive };
    return user;
  });
  return toggleUser;
};
const usersWithUpdatedStatus = toggleUserStatus(2);
console.log(usersWithUpdatedStatus);
console.log(users);

//تمرین 7: اضافه کردن یک کحاربر جدید به لیست بدون استفاده از پوش کردن
const newUser = {
  ID: 7,
  fullName: "Mahdi Mohammadi",
  age: 40,
  role: "operator",
  isActive: true,
};

const UpdatedUsers = [...users, newUser];
console.log(UpdatedUsers);
console.log(users);

// نمایش متن مشابه برای یک کاربر دلخواه
const selectedUser = users[0];
const templateLiteralText = `${selectedUser.age} years old ${selectedUser.fullName} with the ${selectedUser.role} role`;
console.log(templateLiteralText);

// تمرین اختیاری : محاسبه ی تعداد کاربران فعال
const allActiveUsers = users.filter((user) => {
  return user.isActive;
});
console.log(allActiveUsers.length);
