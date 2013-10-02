package hottiehotspots.tests;

import static org.junit.Assert.assertTrue;
import hottiehotspots.model.GEOCountries;
import hottiehotspots.model.Hotspot;
import hottiehotspots.model.HotspotRating;
import hottiehotspots.model.Label;
import hottiehotspots.model.Location;
import hottiehotspots.service.GEOCountriesService;
import hottiehotspots.service.GEOCountriesServiceImpl;
import hottiehotspots.service.LocationService;
import hottiehotspots.service.LocationServiceImpl;

import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;

import org.hibernate.ejb.HibernatePersistence;
import org.junit.Test;

public class GEOCountriesTests {

	EntityManager em;
	public GEOCountriesTests() {

		HibernatePersistence persistence = new HibernatePersistence();
		EntityManagerFactory hemf = persistence.createEntityManagerFactory("punit", new HashMap());
		em = hemf.createEntityManager(); 
	}

	@Test
	public void locateCountryByName() {
		System.out.println("Test if we can locate a country by name...");

		GEOCountries country = new GEOCountries();
		country.setCountry("United States");
		GEOCountriesService countriesService = new GEOCountriesServiceImpl();
		
		// start the transaction
		//em.getTransaction().begin();
		countriesService.setEntityManager(em);
		GEOCountries foundCountry = countriesService.find(country);
		
		assertTrue(foundCountry != null);
		assertTrue(foundCountry.getISO2().equals("US"));
		
	
	}


}
