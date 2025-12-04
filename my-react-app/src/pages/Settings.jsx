import React, { useState } from 'react';
import '../css/Settings.css';

const Settings = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleUpdateEmail = () => {
        console.log('Email updated to:', email);
        alert(`Email updated to: ${email}`);
    };

    const handleUpdatePassword = () => {
        console.log('Password updated to:', password);
        alert(`Password updated to: ${password}`);
    };

    return (
        <div className="settings-page">
            <div className="account-settings">
                <h2>Account Settings</h2>

                <div className="settings-section">
                    <h3>Change Email</h3>
                    <input
                        type="email"
                        placeholder="New Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button onClick={handleUpdateEmail}>Update</button>
                </div>

                <div className="settings-section">
                    <h3>Change Password</h3>
                    <input
                        type="password"
                        placeholder="New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleUpdatePassword}>Update</button>
                </div>
            </div>

            {/* App Preferences section is commented out for now as it doesn't serve any functional purpose */}
            {/* <div className="app-preferences">
                <h2>App Preferences</h2>

                <div className="settings-section">
                    <h3>Manage Favorite Teams</h3>
                    <button>Edit</button>
                </div>

                <div className="settings-section">
                    <h3>Receive Prediction Alerts</h3>
                    <button>ON</button>
                </div>
            </div> */}
        </div>
    );
};

export default Settings;