select distinct on (posts.question_id) question_id as id, id as post_id
from posts
order by posts.question_id, posts.id;