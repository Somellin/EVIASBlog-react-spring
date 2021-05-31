package com.kirill.kamelyazev.eviasblog.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String title;
    private String description;

    @ManyToOne
    @JoinColumn( name = "user_id", referencedColumnName = "id")
    private User user;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn( name = "post_id", referencedColumnName = "id")
    List<Comment> comments = new ArrayList<>();

    private String date;

    private String fullText;

    public Post() {
    }
    public Post(String title, String description, String fullText) {
        super();
        this.title = title;
        this.description = description;
        this.fullText = fullText;

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public long getUserID() {
        return user.getId();
    }

    public void setUserID(Long id) {
        this.user.setId(id);
    }

    public String getUserName() {
        return user.getUsername();
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getFullText() {
        return fullText;
    }

    public void setFullText(String fullText) {
        this.fullText = fullText;
    }
}