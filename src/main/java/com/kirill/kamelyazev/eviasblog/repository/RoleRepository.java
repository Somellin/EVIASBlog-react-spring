package com.kirill.kamelyazev.eviasblog.repository;

import com.kirill.kamelyazev.eviasblog.model.ERole;
import com.kirill.kamelyazev.eviasblog.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
