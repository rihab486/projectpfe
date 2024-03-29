package com.ecommerce.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ecommerce.dao.UserDao;
import com.ecommerce.modal.User;
import com.ecommerce.service.UserService;

@Transactional
@Component
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserDao userDao;

	@Override
	public User editUser(User user, long id) {
		User existUser = userDao.findById(id).orElse(null);
		existUser.setUsername(user.getUsername());
		existUser.setPassword(user.getPassword());
		
		
		return userDao.save(existUser);
	}

	@Override
	public User findUserById(long id) {
      return userDao.findById(id).orElse(null);
	}

	@Override
	public void deleteUser(long id) {
		userDao.deleteById(id);
	}

}
