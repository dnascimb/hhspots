package hottiehotspots.tests;

import static org.junit.Assert.assertTrue;
import hottiehotspots.model.Location;
import hottiehotspots.service.LocationService;
import hottiehotspots.service.LocationServiceImpl;

import java.util.Date;
import java.util.HashMap;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;

import org.hibernate.ejb.HibernatePersistence;
import org.junit.Test;

public class LocationTests {

	EntityManager em;
	public LocationTests() {

		HibernatePersistence persistence = new HibernatePersistence();
		EntityManagerFactory hemf = persistence.createEntityManagerFactory("punit", new HashMap());
		em = hemf.createEntityManager(); 
	}

	@Test
	public void addLocation() {
		System.out.println("Test if we can ADD a location...");

		Location location = new Location();
		location.setName("Starbucks");
		location.setAddress1("185 Spencer St");
		location.setCity("Manchester");
		location.setCountry("US");
		location.setState("CT");
		location.setLatitude("41.767486");
		location.setLongitude("-72.568741");
		location.setPostalCode("06040");
		location.setType("Business");
		location.setCreatedDate(new Date());

		LocationService locationService = new LocationServiceImpl();
		
		// start the transaction
		em.getTransaction().begin();
		locationService.setEntityManager(em);
		try {
			locationService.save(location);
    	}
    	catch(Exception e) {
    		if(e.getMessage().equals("duplicate"))
    			System.out.println("There is already an entry for this Hotspot");
    		else
    			System.out.println("Sorry, we couldn't tag this Hotspot at this time. Please try again later.");
    		
    		assertTrue(false);
    	}
		
		
		// commit the transaction
		em.getTransaction().commit();
		

		Location foundLocation = locationService.findById(location.getLocationId());
		assertTrue(foundLocation != null);
		assertTrue(foundLocation.getName().equals("Starbucks"));
		

	}
	
	@Test
	public void updateAndDeleteLocation() {
		System.out.println("Test if we can UPDATE a location...");

		Location location = new Location();
		location.setName("Starbucks");
		location.setAddress1("185 Spencer St");
		location.setCity("Manchester");
		location.setPostalCode("06040");
		location.setType("Business");
		
		LocationService locationService = new LocationServiceImpl();
		Location foundLocation = locationService.find(location);
		
		assertTrue(foundLocation != null);
		
		if(foundLocation != null)
		{
			// found the existing Location we created in the addLocation test, now
			// we will update it and then remove it
			foundLocation.setAddress1("186 Spencer St");
			
			// start the transaction
			em.getTransaction().begin();
			locationService.setEntityManager(em);
			try {
				locationService.save(foundLocation);
	    	}
	    	catch(Exception e) {
	    		if(e.getMessage().equals("duplicate"))
	    			System.out.println("There is already an entry for this Hotspot");
	    		else
	    			System.out.println("Sorry, we couldn't tag this Hotspot at this time. Please try again later.");
	    		
	    		assertTrue(false);
	    	}
			
			
			// commit the transaction
			em.getTransaction().commit();
			
			Location updatedLocation = locationService.findById(foundLocation.getLocationId());
			assertTrue(updatedLocation != null);
			assertTrue(updatedLocation.getAddress1().equals("186 Spencer St"));
			
			// DELETE
			em.getTransaction().begin();
			locationService.setEntityManager(em);
			locationService.remove(updatedLocation.getLocationId());
			em.getTransaction().commit();
		}
	
	}
}
