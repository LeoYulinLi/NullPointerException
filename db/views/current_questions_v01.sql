select distinct on (questions.id) questions.id,
                                  question_post.id                  as post_id,
                                  question_post.title,
                                  question_post.body,
                                  coalesce(question_post.score, 0)  as score,
                                  coalesce(post_count.count - 1, 0) as answer_count,
                                  question_post.author as owner,
                                  all_posts.id as active_id,
                                  all_posts.author as active_by,
                                  question_post.created_at,
                                  question_post.updated_at,
                                  all_posts.created_at as active_created_at,
                                  all_posts.updated_at as active_updated_at
from questions
         join current_posts question_post on questions.id = question_post.question_id
         join current_posts all_posts on questions.id = all_posts.question_id
         left outer join (select question_id as qid, count(*) as count from posts group by question_id) as post_count
                         on post_count.qid = question_post.question_id
order by questions.id, question_post.id, all_posts.updated_at desc;