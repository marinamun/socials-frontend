import React, { useState } from "react";

const EditInfoPopup = ({ user, onClose, onSave }) => {
  const [bio, setBio] = useState(user.bio);
  const [newProfilePicture, setNewProfilePicture] = useState(null);

  const handleImageChange = (e) => {
    setNewProfilePicture(e.target.files[0]);
  };

  const handleSave = async () => {
    const updatedUser = { ...user, bio };

    if (newProfilePicture) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatedUser.profilePicture = reader.result;
        onSave(updatedUser);
      };
      reader.readAsDataURL(newProfilePicture);
    } else {
      onSave(updatedUser);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>Edit Profile</h3>
        <label>
          Bio:
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
        </label>
        <label>
          Profile Picture:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        <button onClick={onClose}>Cancel</button>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default EditInfoPopup;
