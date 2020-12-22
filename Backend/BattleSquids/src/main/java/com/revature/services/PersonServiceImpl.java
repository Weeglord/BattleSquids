package com.revature.services;

import java.util.Set;

import com.revature.beans.Person;
import com.revature.data.DAOFactory;
import com.revature.data.PersonDAO;

public class PersonServiceImpl implements PersonService {
	private PersonDAO personDao;
	
	public PersonServiceImpl() {
		personDao = DAOFactory.getPersonDAO();
	}
	
	@Override
	public Integer addPerson(Person p) {
		return personDao.add(p);
	}

	@Override
	public Person getPersonById(Integer id) {
		return personDao.getById(id);
	}

	@Override
	public Person getPersonByUsername(String username) {
		return personDao.getByUsername(username);
	}

	@Override
	public Set<Person> getAllPerson() {
		return personDao.getAll();
	}

	@Override
	public void updatePerson(Person p) {
		personDao.update(p);
	}

	@Override
	public void deletePerson(Person p) {
		personDao.delete(p);
	}

}
