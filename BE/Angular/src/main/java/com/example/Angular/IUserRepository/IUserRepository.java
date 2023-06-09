package com.example.Angular.IUserRepository;

import com.example.Angular.Domain.Login;
import com.example.Angular.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IUserRepository {
    User login(Login login);

    User create(User user);

}
