INSERT INTO halo_posts (user_id, title, content, imageurl) VALUES (${auth0_id}, ${title}, ${content}, ${imageurl});
SELECT * FROM halo_posts WHERE user_id = ${auth0_id};