package hottiehotspots.tests;

import static org.junit.Assert.assertTrue;
import hottiehotspots.model.Hotspot;
import hottiehotspots.model.HotspotRating;
import hottiehotspots.model.Label;
import hottiehotspots.model.Location;
import hottiehotspots.model.User;
import hottiehotspots.service.LocationService;
import hottiehotspots.service.LocationServiceImpl;

import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;

import org.hibernate.ejb.HibernatePersistence;
import org.junit.Test;

public class HotspotTests {

	EntityManager em;
	public HotspotTests() {

		HibernatePersistence persistence = new HibernatePersistence();
		EntityManagerFactory hemf = persistence.createEntityManagerFactory("punit", new HashMap());
		em = hemf.createEntityManager(); 
	}

	@Test
	public void addHotspot() {
		System.out.println("Test if we can ADD a hotspot...");

		
		// create location
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
		
		// create a user to associate this hotspot tagging with
		User user = new User();
		user.setBirthday(new Date());
		user.setCountry("US");
		user.setUserName("hhUnitTests");
		user.setPassword("283Kdwl#@");
		user.setFirstName("HH");
		user.setLastName("UnitTests");
		
		// create Hotspot
		Hotspot hs = new Hotspot();
		hs.setCurrentRating(new Double(80));
		hs.setUps(1);
		hs.setDowns(0);
		hs.setOriginallyTaggedBy(user.getUserName());
		hs.setOriginallyTaggedDate(new Date());
		hs.setTimesRated(1);
		
		//create a hotspotRating to associate with the hotspot
		HotspotRating hr = new HotspotRating();
		hr.setRating(new Double(80));
		hr.setComment("This is a test comment.");
		hr.setTimeDateStamp(new Date());
		
		//create hotspotLabels to associate with the hotspot
		Label hl1 = new Label();
		hl1.setLabel("coffee");
		Label hl2 = new Label();
		hl2.setLabel("wealthy");
		
	    HashSet<Label> labels = (HashSet<Label>) location.getLabels();
	    HashSet<HotspotRating> ratings = (HashSet<HotspotRating>) hs.getRatings();
	    
	    labels.add(hl1);
	    labels.add(hl2);
	    ratings.add(hr);
	    
	    hs.setRatings(ratings); //attach the ratings to the hotspot
	    location.setLabels(labels); //attach the labels to the hotspot
		location.setHotspot(hs); //attach the hotspot to the location
		
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
		
		// create 2nd location
		Location location2 = new Location();
		location2.setName("Starbucks");
		location2.setAddress1("336 Spencer St");
		location2.setCity("Manchester");
		location2.setCountry("US");
		location2.setState("CT");
		location2.setLatitude("41.767486");
		location2.setLongitude("-72.568741");
		location2.setPostalCode("06040");
		location2.setType("Business");
		location2.setCreatedDate(new Date());
		// create 2nd Hotspot
		hs = new Hotspot();
		hs.setCurrentRating(new Double(90));
		hs.setUps(1);
		hs.setDowns(0);
		hs.setOriginallyTaggedBy(user.getUserName());
		hs.setOriginallyTaggedDate(new Date());
		hs.setTimesRated(1);
		
		hr = new HotspotRating();
		hr.setRating(new Double(90));
		hr.setComment("This is a test comment.");
		hr.setTimeDateStamp(new Date());
		
		labels = (HashSet<Label>) location2.getLabels();
	    ratings = (HashSet<HotspotRating>) hs.getRatings();
	    
	    labels.add(hl1);
	    labels.add(hl2);
	    ratings.add(hr);
	    
	    hs.setRatings(ratings); //attach the ratings to the hotspot
	    location2.setLabels(labels); //attach the labels to the hotspot
		location2.setHotspot(hs); //attach the hotspot to the location
		
		// start the transaction
		em.getTransaction().begin();
		locationService.setEntityManager(em);
		try {
			locationService.save(location2);
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
		
/**		if(foundLocation != null)
		{
			// DELETE
			em.getTransaction().begin();
			locationService.setEntityManager(em);
			locationService.remove(foundLocation.getLocationId());
			em.getTransaction().commit();
		}
**/		

	}
	
	@Test
	public void CleanUpHotSpot() {
		System.out.println("Clean Up Stuff");

		Location location = new Location();
		location.setName("Starbucks");
		location.setAddress1("185 Spencer St");
		location.setCity("Manchester");
		location.setPostalCode("06040");
		location.setType("Business");
		
		Location location2 = new Location();
		location2.setName("Starbucks");
		location2.setAddress1("336 Spencer St");
		location2.setCity("Manchester");
		location2.setPostalCode("06040");
		location2.setType("Business");
		
		
		// FIND 1st Location
		LocationService locationService = new LocationServiceImpl();
		Location foundLocation = locationService.find(location);
		
		assertTrue(foundLocation != null);
		
		if(foundLocation != null)
		{			
			// DELETE 1st Location
			em.getTransaction().begin();
			locationService.setEntityManager(em);
			locationService.remove(foundLocation.getLocationId());
			em.getTransaction().commit();
		}
		
		
		//FIND 2nd Location
		
		foundLocation = locationService.find(location2);
		
		assertTrue(foundLocation != null);
		
		if(foundLocation != null)
		{			
			// DELETE 2nd Location
			em.getTransaction().begin();
			locationService.setEntityManager(em);
			locationService.remove(foundLocation.getLocationId());
			em.getTransaction().commit();
		}
	
	}

}
