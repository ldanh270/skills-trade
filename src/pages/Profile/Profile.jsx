import * as styles from './Profile.module.scss'
import { useSelector } from 'react-redux'
import React, { useState } from 'react'
import coverImg from '../../assets/images/cover-img.jpg';

function getDaysAgo(dateString) {
    if (!dateString) return 'N/A';
    const postDate = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - postDate);
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return days === 0 ? 'today' : `${days} day${days > 1 ? 's' : ''} ago`;
}

function Profile() {
    const user = useSelector(state => state.user.user)
    const posts = useSelector(state => state.post.posts)
    const [coverImgPreview, setCoverImgPreview] = useState(null);
    const fileInputRef = React.useRef();
    const [showEditModal, setShowEditModal] = useState(false);
    const [profile, setProfile] = useState(user);
    const [editForm, setEditForm] = useState({ ...user });

    const handleEditCoverClick = () => {
        fileInputRef.current.click();
    };

    const handleCoverChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setCoverImgPreview(ev.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditProfileClick = () => {
        setEditForm({
            fullName: user.fullName || '',
            username: user.username || '',
            gender: user.gender || '',
            dateOfBirth: user.dateOfBirth || '',
            address: user.address || '',
            email: user.email || '',
            phone: user.phone || '',
            region: user.region || '',
            description: user.description || '',
        });
        setShowEditModal(true);
    };

    const handleEditFormChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
        if (e.target.name === 'description') {
            setProfile(prev => ({ ...prev, description: e.target.value }));
        }
    };

    const handleEditFormSave = (e) => {
        e.preventDefault();
        // Ở đây chỉ cập nhật local state, nếu muốn cập nhật Redux/server thì bổ sung sau
        setShowEditModal(false);
    };

    return (
        <div className={styles.ProfilePage}>
            {/* Cover + Avatar + Name */}
            <div className={styles.ProfileHeader}>
                <img
                    className={styles.CoverImg}
                    src={coverImgPreview || user.coverImg || coverImg}
                    alt="Cover"
                />
                <button
                    className={styles.EditCoverBtn}
                    onClick={handleEditCoverClick}
                    type="button"
                >
                    Edit Cover Photo
                </button>
                <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                    onChange={handleCoverChange}
                />
                <div className={styles.AvatarWrap}>
                    <img className={styles.Avatar} src={user.avatar || '/assets/avatar-placeholder.jpg'} alt="Avatar" />
                </div>
                <div className={styles.ProfileInfo}>
                    <h2 className={styles.Name}>{editForm.fullName || 'No Name'}</h2>
                    <p className={styles.Role}>{editForm.username || 'username'}</p>
                    <button className={styles.EditProfileBtn} type="button" onClick={handleEditProfileClick}>
                        Edit Profile
                    </button>
                </div>
            </div>
            {/* Modal Edit Profile */}
            {showEditModal && (
                <div className={styles.ModalOverlay}>
                    <div className={styles.ModalContent}>
                        <h3>Edit Profile</h3>
                        <form onSubmit={handleEditFormSave} className={styles.EditProfileForm}>
                            <label>
                                Full Name:
                                <input name="fullName" value={editForm.fullName} onChange={handleEditFormChange} />
                            </label>
                            <label>
                                Username:
                                <input name="username" value={editForm.username} onChange={handleEditFormChange} />
                            </label>
                            <label>
                                Gender:
                                <select name="gender" value={editForm.gender} onChange={handleEditFormChange}>
                                    <option value="">Select gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </label>
                            <label>
                                Date of Birth:
                                <input type="date" name="dateOfBirth" value={editForm.dateOfBirth} onChange={handleEditFormChange} />
                            </label>
                            <label>
                                Address:
                                <textarea name="address" value={editForm.address} onChange={handleEditFormChange} />
                            </label>
                            <label>
                                Email:
                                <input name="email" value={editForm.email} onChange={handleEditFormChange} />
                            </label>
                            <label>
                                Phone:
                                <input name="phone" value={editForm.phone} onChange={handleEditFormChange} />
                            </label>
                            <label>
                                Region:
                                <input name="region" value={editForm.region} onChange={handleEditFormChange} />
                            </label>
                            <label>
                                Description:
                                <textarea name="description" value={editForm.description} onChange={handleEditFormChange} />
                            </label>
                            <div className={styles.ModalActions}>
                                <button type="submit">Save</button>
                                <button type="button" onClick={() => setShowEditModal(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Module nằm dưới header */}
            <div className={styles.ProfileModule}>
                <p className={styles.ProfileDesc}>
                    {profile.description || 'No description provided.'}
                </p>
                <ul className={styles.ProfileSkills}>
                    {(user.skills && user.skills.length > 0) ? user.skills.map((skill, idx) => (
                        <li key={idx}>{skill}</li>
                    )) : <li>No skills listed</li>}
                </ul>
            </div>
            {/* Main layout */}
            <div className={styles.ProfileLayout}>
                {/* Left: About */}
                <div className={styles.Sidebar}>
                    <h3>About</h3>
                    <ul className={styles.AboutList}>
                        <li><span>📧</span> {user.email || 'No email'}</li>
                        <li><span>📞</span> {user.phone || 'No phone'}</li>
                        <li><span>📍</span> {user.region || 'No region'}</li>
                        <li><span>⭐</span> Rating: <span className={styles.Stars}>{user.rating ? user.rating.toFixed(2) : 'N/A'}</span></li>
                        <li><span>💰</span> Point: {user.point !== undefined ? user.point : 'N/A'}</li>
                        <li><span>Status:</span> <span className={user.status === 'online' ? styles.Online : styles.Busy}>{user.status || 'unknown'}</span></li>
                    </ul>
                </div>
                {/* Center: PostBar + Card(s) */}
                <div className={styles.MainContent}>
                    {posts && posts.length > 0 ? posts.map((post, idx) => (
                        <div className={styles.Card} key={post.id || idx}>
                            <div className={styles.CardHeader}>
                                <span className={styles.CardTag}>{post.type || 'N/A'}</span>
                                <span className={styles.CardTime}>Posted {getDaysAgo(post.createdAt)}</span>
                                <span className={styles.CardPrice}>
                                    Hourly: {post.price ? `${post.price.min} - ${post.price.max} points` : 'N/A'}
                                </span>
                                <span className={styles.CardAuthor}>
                                    Author: {post.author && post.author.name ? post.author.name : (post.author && post.author.id ? post.author.id : 'No author')}
                                </span>
                            </div>
                            <h4 className={styles.CardTitle}>{post.title || 'No title'}</h4>
                            <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
                                <span style={{fontWeight: 600}}>Rating: {post.rating ? post.rating.toFixed(2) : 'N/A'}</span>
                                <span className={styles.CardStars}>
                                    {post.rating ? '★'.repeat(Math.round(post.rating)) + '☆'.repeat(5 - Math.round(post.rating)) : '☆☆☆☆☆'}
                                </span>
                            </div>
                            {post.skills && post.skills.length > 0 && (
                                <ul className={styles.ProfileSkills}>
                                    {post.skills.map((skill, i) => <li key={i}>{skill}</li>)}
                                </ul>
                            )}
                            <p className={styles.CardDesc}>{post.description || 'No description'}</p>
                            {/* Proofs */}
                            {post.proofs && (post.proofs.links.length > 0 || Object.keys(post.proofs.files || {}).length > 0) && (
                                <div>
                                    <strong>Proofs:</strong>
                                    <ul>
                                        {post.proofs.links.map((link, i) => (
                                            <li key={i}><a href={link} target="_blank" rel="noopener noreferrer">{link}</a></li>
                                        ))}
                                        {post.proofs.files && Object.entries(post.proofs.files).map(([name, url], i) => (
                                            <li key={i}><a href={url} target="_blank" rel="noopener noreferrer">{name}</a></li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {/* Nếu muốn thêm nút like/dislike/save thì chèn component ReactionButtons ở đây */}
                        </div>
                    )) : <div className={styles.Card}>No posts</div>}
                </div>
                {/* Right: Sidebar */}
                <div className={styles.RightSidebar}>
                    <div className={styles.SideBlock}>
                        <h4>Followers</h4>
                        <ul>
                            {(user.follower && user.follower.length > 0) ? user.follower.map((f, idx) => (
                                <li key={idx}>
                                    <img src={f.avatar || '/assets/avatar-placeholder.jpg'} alt="" />
                                    <div>
                                        <span>{f.fullName || 'No name'}</span>
                                        <span className={f.status === 'online' ? styles.Online : styles.Busy}>{f.status || 'unknown'}</span>
                                    </div>
                                </li>
                            )) : <li>No followers</li>}
                        </ul>
                    </div>
                    <div className={styles.SideBlock}>
                        <h4>Following</h4>
                        <ul>
                            {(user.following && user.following.length > 0) ? user.following.map((f, idx) => (
                                <li key={idx}>
                                    <img src={f.avatar || '/assets/avatar-placeholder.jpg'} alt="" />
                                    <div>
                                        <span>{f.fullName || 'No name'}</span>
                                        <span className={f.status === 'online' ? styles.Online : styles.Busy}>{f.status || 'unknown'}</span>
                                    </div>
                                </li>
                            )) : <li>No following</li>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;
