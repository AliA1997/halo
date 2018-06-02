CREATE TABLE halo_users (
    id SERIAL PRIMARY KEY,
    profile_picture VARCHAR(200),
    auth0_id VARCHAR(100),
    username VARCHAR(50)
);