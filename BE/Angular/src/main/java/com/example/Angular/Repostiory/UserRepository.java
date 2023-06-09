package com.example.Angular.Repostiory;

import com.example.Angular.Domain.Login;
import com.example.Angular.Entity.User;
import com.example.Angular.IUserRepository.IUserRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.Optional;

@Repository
public class UserRepository implements IUserRepository {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public User login(Login login) {
        return (User) entityManager.createQuery("select * from user where user.email = :email and user.username = :username")
                .setParameter("email", login.getEmail())
                .setParameter("username", login.getPassword())
                .getResultStream().findFirst().orElse(null);
    }

    @Override
    public User create(User user) {
        return null;
    }
}
