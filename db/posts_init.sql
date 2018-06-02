CREATE TABLE halo_posts (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(140) REFERENCES halo_users(auth0_id) ON UPDATE CASCADE ON DELETE CASCADE,
    title VARCHAR(50),
    content VARCHAR(100),
    imageurl VARCHAR(200)
);