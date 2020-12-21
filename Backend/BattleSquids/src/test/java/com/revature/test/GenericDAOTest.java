package com.revature.test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Set;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.revature.data.GenericDAO;

public abstract class GenericDAOTest<T> {
	protected GenericDAO<T> dao;
	abstract void setDao();
	
	protected T sample;
	abstract void setSample();
	
	protected Integer sampleId;
//	abstract void setSampleId();
	
	protected T updatedSample;
	abstract void setUpdatedSample();
	
	@BeforeEach
	public void initialize(){
		setDao();
		setSample();
		setSampleId(-1);
	}
	
	@Test
	void testAdd() {
		Integer newId = dao.add(sample);
		assertNotEquals(newId, -1);
		setSampleId(newId);
	}
	
	@Test
	void testGetById() {
		System.out.println(this.sampleId);
		T t = dao.getById(this.sampleId);
		assertEquals(t, sample);
	}
	
	@Test
	void testGetAll() {
		Set<T> all = dao.getAll();
		assertTrue(all.contains(sample));
	}
	
	@Test
	void testUpdate() {
		dao.update(this.updatedSample);
		assertNotEquals(sample, dao.getById(this.sampleId));
	}
	
	public void setSampleId(Integer id) {
		this.sampleId = id;
	}
	
	@Test
	void testDelete() {
		dao.delete(sample);
		assertFalse(dao.getAll().contains(sample));
	}
}
