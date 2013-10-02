package hottiehotspots.tests;

import static org.junit.Assert.assertTrue;
import hottiehotspots.model.GEOCities;
import hottiehotspots.service.GEOCitiesService;
import hottiehotspots.service.GEOCitiesServiceImpl;

import java.util.HashMap;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;

import org.hibernate.ejb.HibernatePersistence;
import org.junit.Test;

public class GEOCitiesTests {

	EntityManager em;
	public GEOCitiesTests() {

		HibernatePersistence persistence = new HibernatePersistence();
		EntityManagerFactory hemf = persistence.createEntityManagerFactory("punit", new HashMap());
		em = hemf.createEntityManager(); 
	}

	@Test
	public void locateCityByName() {
		System.out.println("Test if we can locate a GEOCities by name...");

		GEOCities city = new GEOCities();
		city.setCity("Manchester");
		GEOCitiesService citiesService = new GEOCitiesServiceImpl();
		
		// start the transaction
		//em.getTransaction().begin();
		citiesService.setEntityManager(em);
		List<GEOCities> foundCities = citiesService.findCities(city);
		
		assertTrue(foundCities != null && foundCities.size() > 1);
		
		
	
	}


}
