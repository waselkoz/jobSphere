import React from 'react';
import ProfileCard from '../components/ProfileCard';
import { useAuth } from '../context/AuthContext';
import client from '../api/client';
import { toast } from 'react-toastify';

const Profile = () => {
    const { user } = useAuth();
    const [profileData, setProfileData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await client.get('/profile/me');
                setProfileData(data);
            } catch (err) {
                // If 404, it just means no profile created yet, which is fine
                if (err.response?.status !== 404) {
                    setError('Failed to load profile');
                }
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchProfile();
        }
    }, [user]);

    const handleSaveProfile = async (updatedData) => {
        try {
            const { data } = await client.post('/profile', updatedData);
            setProfileData(data);
            toast.success('Profile updated successfully!');
            return true;
        } catch (err) {
            console.error(err);
            toast.error('Failed to update profile');
            return false;
        }
    };

    if (loading) return <div className="text-white text-center pt-24">Loading profile...</div>;

    return (
        <div className="min-h-screen pt-24 px-4 pb-12">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">My Profile</h1>
                        <p className="text-slate-400">Manage your professional identity</p>
                    </div>
                </div>

                <ProfileCard
                    user={user}
                    initialData={profileData}
                    onSave={handleSaveProfile}
                />
            </div>
        </div>
    );
};

export default Profile;
