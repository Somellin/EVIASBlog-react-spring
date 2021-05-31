package com.kirill.kamelyazev.eviasblog.model;

import javax.persistence.*;

@Entity
@Table(name = "comments")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String text;

    @ManyToOne
    @JoinColumn( name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToOne
    @JoinColumn( name = "post_id", referencedColumnName = "id")
    private Post post;

    public Comment() {
    }

    public Comment(String text) {
        super();
        this.text = text;
    }

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getText() {
        return text;
    }
    public void setText(String text) {
        this.text = text;
    }
    public String getUserName() {
        return user.getUsername();
    }
    public Long getUserId() {
        return user.getId();
    }
    public Long getPostId(){
        return post.getId();
    }
}
