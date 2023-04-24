import qs from "qs"

const generateAvatar = (email) => {
  const options = {
      width: 50,
      height: 50,
      color: "set1",
      backgroundColor: "#f2f2f2",
      format: "svg",
      version: "5.1.0",
      name: email
  };
  const avatarUrl = `https://avatars.dicebear.com/api/bottts/${email}.svg?${qs.stringify(
      options
  )}`;

  return avatarUrl;
};

export default generateAvatar;