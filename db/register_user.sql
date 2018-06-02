INSERT INTO halo_users (profile_picture, username, auth0_id) VALUES
 (${profile_picture}, ${username}, ${auth0_id}) RETURNING *;