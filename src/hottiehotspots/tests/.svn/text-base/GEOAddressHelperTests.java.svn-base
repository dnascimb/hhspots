package hottiehotspots.tests;

import static org.junit.Assert.assertTrue;
import hottiehotspots.model.GEOCities;
import hottiehotspots.service.GEOAddressHelper;
import hottiehotspots.service.GEOCitiesService;
import hottiehotspots.service.GEOCitiesServiceImpl;
import hottiehotspots.service.GEOCountriesService;
import hottiehotspots.service.GEOCountriesServiceImpl;
import hottiehotspots.service.GEORegionsService;
import hottiehotspots.service.GEORegionsServiceImpl;

import java.util.HashMap;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;

import org.hibernate.ejb.HibernatePersistence;
import org.junit.Test;

public class GEOAddressHelperTests {

	EntityManager em;
	public GEOAddressHelperTests() {

		HibernatePersistence persistence = new HibernatePersistence();
		EntityManagerFactory hemf = persistence.createEntityManagerFactory("punit", new HashMap());
		em = hemf.createEntityManager(); 
	}

	@Test
	public void locateOneOrMoreCitiesByName() {
		System.out.println("Test if we can locate a GEOCities by name...");

		String address = "Manchester";	
		
		GEOCitiesService citiesService = new GEOCitiesServiceImpl();
		citiesService.setEntityManager(em);
		GEORegionsService regionsService = new GEORegionsServiceImpl();
		regionsService.setEntityManager(em);
		GEOCountriesService countriesService = new GEOCountriesServiceImpl();
		countriesService.setEntityManager(em);
		
		GEOAddressHelper helper = new GEOAddressHelper(citiesService, regionsService, countriesService);
		
		List<GEOCities> foundCities = helper.getListofCities(address);
		
		assertTrue(foundCities != null && foundCities.size() > 1);
		
		
	
	}

	@Test
	public void locateOneCityByName() {
		System.out.println("Test if we can locate a GEOCities by name...");

		String address = "Manchester";
		
		GEOCitiesService citiesService = new GEOCitiesServiceImpl();
		citiesService.setEntityManager(em);
		GEORegionsService regionsService = new GEORegionsServiceImpl();
		regionsService.setEntityManager(em);
		GEOCountriesService countriesService = new GEOCountriesServiceImpl();
		countriesService.setEntityManager(em);
		
		GEOAddressHelper helper = new GEOAddressHelper(citiesService, regionsService, countriesService);
		
		GEOCities foundCity = helper.getExactCity(address);
		
		// should be null since there are multiple cities that meet this criteria
		assertTrue(foundCity == null);
		
		address = "Manchester, Connecticut";
		GEOCities exactCity = helper.getExactCity(address);
		
		// should not be null since there is not more than one city that meets the criteria
		assertTrue(exactCity != null);
		
		address = "Manchester, Connecticut, United States";
		GEOCities exactCity2 = helper.getExactCity(address);
		
		// should not be null since there is not more than one city that meets the criteria
		assertTrue(exactCity2 != null);
		
		address = "Manchester, CT";
		GEOCities exactCity3 = helper.getExactCity(address);
		
		// should not be null since there is not more than one city that meets the criteria
		assertTrue(exactCity3 != null);
		
	
	}

}
