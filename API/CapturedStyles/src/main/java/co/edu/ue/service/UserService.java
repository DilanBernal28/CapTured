package co.edu.ue.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.ue.dao.IUserDao;
import co.edu.ue.model.User;
import co.edu.ue.model.User.Status;

@Service
public class UserService implements IUserService {

	@Autowired
	IUserDao dao;
	
		//Todos los Create
	
	@Override
	public User addUser(User user) {
		return dao.registerUser(user);		
	}

		//Todos los Read
	@Override
	public List<User> allUser() {
		return dao.allUser();
	}
	
	@Override
	public User getById(int id) {
		return dao.searchById(id);
	}
	
	@Override
	public User getByUsername(String username) {
		return dao.searchByUsername(username);
	}
	
	@Override
	public List<User> getByStatus(Status status) {
		return dao.searchByStatus(status);
	}
	
		//Todos losUpdate
	
	@Override
	public User upUser(String usrnm, User newDataUser) {
		//hace busqueda de el username para actualizar los campos
			User existingDataUser = dao.searchByUsername(usrnm);
			
			existingDataUser.setUsrNombres(newDataUser.getUsrNombres());
			existingDataUser.setUsrApellidos(newDataUser.getUsrApellidos());
			existingDataUser.setUsrDireccion(newDataUser.getUsrDireccion());
			existingDataUser.setUsrEmail(newDataUser.getUsrEmail());
			existingDataUser.setUsrTelefono(newDataUser.getUsrTelefono());
			existingDataUser.setUsrUsername(newDataUser.getUsrUsername());
			
			return dao.updateUser(existingDataUser);
	}
	@Override
	public User statusUser(String usrnm, User newDataUser) {
		User existingDataUser = dao.searchByUsername(usrnm);
		
		existingDataUser.setUsrActive(newDataUser.getUsrActive());
		
		return dao.updateUser(existingDataUser);
	}
	
	@Override
	public User upPasswordUser(String usrnm,User newPasswordUser) {
		User existingDataUser = dao.searchByUsername(usrnm);
		existingDataUser.setUsrPassword(newPasswordUser.getUsrPassword());
		
		return dao.updateUser(existingDataUser);
}
	
	public boolean existsByUsername(String username) {
		return dao.existByUsername(username);
	}

		//El Delete
	
	@Override
	public void deleteUser(int id) {
		dao.deleteUser(id);		
	}
	
}
