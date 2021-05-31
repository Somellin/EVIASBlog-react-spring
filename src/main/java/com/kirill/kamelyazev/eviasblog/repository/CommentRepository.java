package com.kirill.kamelyazev.eviasblog.repository;


import com.kirill.kamelyazev.eviasblog.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment,Long> {
}
