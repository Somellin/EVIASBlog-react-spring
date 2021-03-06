package com.kirill.kamelyazev.eviasblog.repository;


import com.kirill.kamelyazev.eviasblog.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post,Long> {

    List<Post> findAllByUserId(Long id);

}
