package com.revature.data;

import org.hibernate.Session;
import org.hibernate.query.Query;

import com.revature.beans.Person;

public class PersonHibernate extends GenericHibernate<Person> implements PersonDAO {

	public PersonHibernate() {
		super(Person.class);
	}

	@Override
	public Person getByUsername(String username) {
		Person p = null;
		try (Session s = hu.getSession()) {
			s.beginTransaction();
			String hql = "FROM Person where username = :username";
			Query<Person> q = s.createQuery(hql, Person.class);
			p = q.getSingleResult();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return p;
	}

}
