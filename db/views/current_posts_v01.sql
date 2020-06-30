select distinct on (posts.id) posts.id,
                              question_id,
                              current.title,
                              current.body,
                              first.user_id                 as author,
                              current.user_id               as editor,
                              coalesce(vote_count.count, 0) as score,
                              first.created_at,
                              current.created_at            as updated_at
from posts
         join revisions current on posts.id = current.post_id
         join revisions first on posts.id = first.post_id
         left outer join (select target_id, count(*) as count
                          from votes
                          where target_type = 'Post'
                          group by target_id) vote_count on
        vote_count.target_id = posts.id
order by posts.id, first.id, current.id desc;