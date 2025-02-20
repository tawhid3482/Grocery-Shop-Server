import { User } from "./user.model";


 const findLastUserId = async () => {
  const lastUser = await User
    .findOne(
      {
        role: 'user',
      },
      {
        id: 1,
        _id: 0,
      }
    )
    .sort({ createdAt: -1 })
    .lean();
  return lastUser?.id ? lastUser.id : undefined;
};

export const generatedUserId = async () => {
    let currentId = (0).toString();
    const lastUserId = await findLastUserId();
  
    if (lastUserId) {
      currentId = lastUserId.substring(2);
    }
  
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  
    incrementId = `U-${incrementId}`;
    return incrementId;
};


// Admin ID
 const findLastAdminId = async () => {
  const lastAdmin = await User.findOne(
    {
      role: 'admin',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const generateAdminId = async () => {
  let currentId = (0).toString();
  const lastAdminId = await findLastAdminId();

  if (lastAdminId) {
    currentId = lastAdminId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `A-${incrementId}`;
  return incrementId;
};
