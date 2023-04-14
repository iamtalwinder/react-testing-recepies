import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface ProfileParams {
  [key: string]: string | undefined;
  userId: string;
}
interface UserProfile {
  id: number;
  name: string;
  username: string;
  email: string;
}

function Profile() {
  const { userId } = useParams<ProfileParams>();
  const [profileData, setProfileData] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: UserProfile = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error('Fetch error:', error);
        setProfileData(null);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div>
      {profileData ? (
        <div>
          <h2>{profileData.name}</h2>
          <p>Username: {profileData.username}</p>
          <p>Email: {profileData.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
