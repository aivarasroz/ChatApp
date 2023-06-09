
const generateAvatar = (email) => {
  const options = {
    seed: email,
    radius: 50,
    backgroundColor: '#f3f3f3',
    color: ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e', '#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50', '#f1c40f', '#e67e22', '#e74c3c', '#95a5a6', '#f39c12', '#d35400', '#c0392b', '#bdc3c7', '#7f8c8d'],
  };
  
  const avatarUrl = `https://avatars.dicebear.com/api/avataaars/${email}.svg?options=${encodeURIComponent(JSON.stringify(options))}`;
  
  return avatarUrl;
}

module.exports = generateAvatar;