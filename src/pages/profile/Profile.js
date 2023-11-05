import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDocument } from '../../hooks/useDocument';
import { useAuthContext } from '../../hooks/useAuthContext';

// styles
import './Profile.css';

export default function Profile() {
  const { id } = useParams();
  const { user: globalUser } = useAuthContext();
  const { document, error } = useDocument('users', id);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (document) {
      setUser(document);
    }
  }, [document]);

  const updateHandler = () => {
    navigate('/update-profile', { state: user });
  };

  return (
    <div className="profile-page">
      {!user && <div>please wait!</div>}
      {user && (
        <div className="general-section">
          <h4>General Information</h4>
          <ul>
            <li>
              <span>Name : </span> {user.name}
            </li>
            <li>
              <span>Admission No : </span> {user.admissionNo}
            </li>
            <li>
              <span>Department : </span> {user.department}
            </li>
            <li>
              <span>Address : </span> {user.currentAddress}
            </li>
          </ul>
        </div>
      )}
      {user && (
        <div className="contact-section">
          <h4>Contact Information</h4>
          <ul>
            <li>
              <span>Email :</span> {user.email}
            </li>
            <li>
              <span>Mobile No: </span> {user.mobileNo}
            </li>
          </ul>
        </div>
      )}
      {user && globalUser.uid === id && (
        <button className="btn" onClick={updateHandler}>
          Update Profile
        </button>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}