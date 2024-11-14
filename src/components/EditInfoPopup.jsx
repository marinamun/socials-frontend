import React, { useState } from "react";
import "../style/Profile.css";

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
      reader.readAsDataURL(newProfilePicture);

      reader.onloadend = async () => {
        updatedUser.profilePicture = reader.result;

        // Wait for onSave to finish
        await onSave(updatedUser);
        onClose();
      };
    } else {
      await onSave(updatedUser);
      onClose();
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>Edit Profile</h3>
        <div>
          <label>
            Bio:
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Profile Picture:
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>
        </div>
        <div className="edit-profile-btns">
          <button onClick={onClose}>❌</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditInfoPopup;
