package com.ecommerce.service;

import java.util.List;

import com.ecommerce.modal.User;

public interface UserService {

	
  
  User editUser(User user, long id);
  
  User findUserById(long id);
  
  void deleteUser(long id);
  
}
