package com.kirill.kamelyazev.eviasblog.controller;

import com.kirill.kamelyazev.eviasblog.exception.ResourceNotFoundException;
import com.kirill.kamelyazev.eviasblog.model.Comment;
import com.kirill.kamelyazev.eviasblog.model.Post;
import com.kirill.kamelyazev.eviasblog.model.User;
import com.kirill.kamelyazev.eviasblog.payload.response.MessageResponse;
import com.kirill.kamelyazev.eviasblog.repository.CommentRepository;
import com.kirill.kamelyazev.eviasblog.repository.PostRepository;
import com.kirill.kamelyazev.eviasblog.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test/post")
public class PostController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PostRepository postRepository;

    @Autowired
    CommentRepository commentRepository;

    //get all posts
    @GetMapping("/all_posts")
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    //get post by postId
    @GetMapping("/post/{id}")
    public ResponseEntity<Post> getPost(@PathVariable Long id){

        Post post = postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post not exist with id: " + id));
        return ResponseEntity.ok(post);
    }

    //get all posts bu userId
    @GetMapping("/all_posts/{id}")
    public ResponseEntity<List<Post>> getPostByUserId(@PathVariable Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id: " + id));

        List<Post> posts = postRepository.findAllByUserId(user.getId());
        return ResponseEntity.ok(posts);
    }

    //create post
    @PostMapping("/all_posts/{id}")
    public ResponseEntity<?> createPost(@PathVariable Long id, @RequestBody Post newPost) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not exist with id: " + id));

        SimpleDateFormat dateFormat = new SimpleDateFormat("dd.MM.yyyy");
        String date = dateFormat.format(new Date());

        Post post = postRepository.save(newPost);
        post.setDate(date);
        post = postRepository.save(post);
        user.getPosts().add(post);

        userRepository.save(user);
        return ResponseEntity.ok(new MessageResponse("Post created successfully!"));
    }

//    delete post
    @DeleteMapping("/post/{id}")
    public ResponseEntity<?> deletePost(@PathVariable Long id){

        Post post = postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post not exist with id: " + id));

        postRepository.delete(post);
        return ResponseEntity.ok(new MessageResponse("Post deleted successfully!"));
    }

    //update employee by id
    @PutMapping("/post/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable Long id, @RequestBody Post postDetails) {

        Post post = postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post not exist with id: " + id));

        post.setTitle(postDetails.getTitle());
        post.setDescription(postDetails.getDescription());
        post.setFullText(postDetails.getFullText());

        Post updatedPost = postRepository.save(post);
        return ResponseEntity.ok(updatedPost);
    }

    //COMMENTS---------------------------------------------------------------------------------------------------

    //get all comments by post id
    @GetMapping("/comments/{id}")
    public ResponseEntity<List<Comment>> getAllComments(@PathVariable Long id) {

        Post post = postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post not exist with id: " + id));

        List<Comment> comments = post.getComments();
        return ResponseEntity.ok(comments);
    }

//    create  comment
    @PostMapping("/comment/{uid}/{pid}")
    public ResponseEntity<?> createComment(@PathVariable Long uid,
                                           @PathVariable Long pid,
                                           @RequestBody Comment commentDetails){

        User user = userRepository.findById(uid)
                .orElseThrow(() -> new ResourceNotFoundException("Post not exist with id: " + uid));
        Post post = postRepository.findById(pid)
                .orElseThrow(() -> new ResourceNotFoundException("Post not exist with id: " + pid));

        Comment comment = commentRepository.save(commentDetails);
        user.getComments().add(comment);
        post.getComments().add(comment);

        userRepository.save(user);
        postRepository.save(post);

        return ResponseEntity.ok(new MessageResponse("Comment created successfully!"));
    }

}
